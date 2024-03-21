#include <chrono>
#include <atomic>
#include <boost/asio.hpp>
#include <fstream>
#include <iostream>
#include <mutex>
#include <thread>
#include <sstream>
#include <string>
#include <stdlib.h>
#include <vector>
#include <map>
#include <colors.h>
#include <Eigen/Dense>
#include <kalman.h>
#include <zmq.hpp>
#include <config.h>

bool stop_threads = false;
std::string address = "127.0.0.1";
std::string port = "8081";
char cur = 'k';
char prev = 'k';
char stored = 'k';
std::fstream ser_motors("/dev/ttyUSB0");
std::string port_sensors = "/dev/ttyUSB1";

std::pair<int, int> key_to_speeds(char key)
{
    std::map<char, std::pair<int, int>> switch_map = {
        {'w', {SPEED_TRANSLATION, SPEED_TRANSLATION}},
        {'s', {-SPEED_TRANSLATION, -SPEED_TRANSLATION}},
        {'q', {0, SPEED_ROTATION}},
        {'e', {SPEED_ROTATION, 0}},
        {'a', {0, -SPEED_ROTATION}},
        {'d', {-SPEED_ROTATION, 0}},
        {'r', {0, 0}}};
    return switch_map.count(key) ? switch_map.at(key) : std::make_pair(0, 0);
}

void on_press_vel(const int left_speed, const int right_speed)
{
    ser_motors.flush();
    ser_motors << std::to_string(left_speed) << ' ' << std::to_string(right_speed) << '\n';
}
void commander(int delay)
{
    std::cout << "Commander is starting" << std::endl;
    size_t counter = 0;
    while (!stop_threads)
    {
        if (cur == 'r')
        {
            counter++;
        }
        if (counter > 5)
        {
            on_press_vel(0, 0);
            ser_motors.close();
            stop_threads = true;
            break;
        }
        std::pair<int, int> speeds = key_to_speeds(cur);
        std::cout << "Speeds: " << speeds.first << " " << speeds.second << std::endl;
        on_press_vel(speeds.first, speeds.second);
        std::this_thread::sleep_for(std::chrono::milliseconds(delay));
    }
    std::cout << "Commander is stopping" << std::endl;
    return;
}
void get_var(const int &delay)
{
    std::cout << "Input thread is starting" << std::endl;
    // ZMQ socket sub init
    zmq::context_t context(1);
    zmq::socket_t socket(context, ZMQ_SUB);
    socket.connect("tcp://" + address + ":" + port);
    socket.set(zmq::sockopt::subscribe, "");

    std::cout << "Listening for UDP messages on " << address << ":" << port << std::endl;

    while (!stop_threads)
    {
        // receive a char from socket
        zmq::message_t message;
        zmq::recv_result_t recv_result = socket.recv(message, zmq::recv_flags::none);
        if (!recv_result.has_value())
        {
            // Handle the receive error
            std::cerr << "Receive failed: " << zmq_strerror(errno) << std::endl;
        }

        std::string received_reply = std::string(static_cast<char *>(message.data()), message.size());
        std::cout << received_reply[0];
        cur = received_reply[0];
        prev = stored;
        stored = cur;
        if (cur == 'r')
        {
            on_press_vel(0, 0);
            stop_threads = true;
            break;
        }
        if (DEBUG)
        {
            std::cout << "Received command: " << cur << std::endl;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(delay));
    }
    std::cout << "Input thread is stopping" << std::endl;
    return;
}
void sensor_thread(const int &delay)
{
    std::cout << "Sensor is starting" << std::endl;
    Eigen::VectorXd init_state(4, 1);
    init_state << 1200, 1200, 0, 0;
    KalmanFilter kf = KalmanFilter(4, 2, init_state);
    double dt = 0;
    double now = 0;
    double end = 0;
    int distance_front = 0;
    int distance_back = 0;
    Eigen::VectorXd measurement = Eigen::VectorXd::Zero(2);

    boost::asio::io_service io;
    boost::asio::serial_port port(io);
    char c;
    std::string line;
    port.open(port_sensors);
    // Set port settings
    port.set_option(boost::asio::serial_port_base::baud_rate(9600));
    port.set_option(boost::asio::serial_port_base::flow_control(boost::asio::serial_port_base::flow_control::none));
    port.set_option(boost::asio::serial_port_base::parity(boost::asio::serial_port_base::parity::none));
    port.set_option(boost::asio::serial_port_base::stop_bits(boost::asio::serial_port_base::stop_bits::one));
    port.set_option(boost::asio::serial_port_base::character_size(8));

    while (!stop_threads)
    {
        // get current timestamp in s
        now = std::chrono::duration_cast<std::chrono::duration<double>>(std::chrono::system_clock::now().time_since_epoch()).count();
        if (DEBUG)
        {
            std::cout << "Current command: " << cur << std::endl;
        }
        kf.predict(dt, 0.1);
        if (kf.state[0] <= kf.state[1])
        {
            if ((kf.state[0] < ULTRASOUND_SENSOR_FRONT_THRESHOLD) && (cur == 'w'))
            {
                // Send command to motors
                cur = 'o';
                prev = stored;
                stored = cur;
                if (DEBUG)
                {
                    std::cout << "Stop front!" << std::endl;
                }
            }
        }
        else
        {
            if ((kf.state[1] < ULTRASOUND_SENSOR_BACK_THRESHOLD) && (cur == 's'))
            {
                // Send command to motors
                cur = 'o';
                prev = stored;
                stored = cur;
                if (DEBUG)
                {
                    std::cout << "Stop back!" << std::endl;
                }
            }
        }
        // Get line
        boost::asio::read(port, boost::asio::buffer(&c, 1));
        while (c != '\n')
        {
            line += c;
            boost::asio::read(port, boost::asio::buffer(&c, 1));
        }
        // ---------------------------------
        std::istringstream iss(line);
        int num;
        std::vector<int> numbers;
        while (iss >> num)
        {
            numbers.push_back(num);
        }

        measurement[0] = numbers[0]; // front
        measurement[1] = numbers[1]; // back
        kf.correct(measurement, 1.0);
        line.clear();
        if (DEBUG)
        {
            std::cout << "Current state: " << kf.state.transpose() << std::endl;
        }
        // end the cycle
        std::this_thread::sleep_for(std::chrono::milliseconds(delay));
        end = std::chrono::duration_cast<std::chrono::duration<double>>(std::chrono::system_clock::now().time_since_epoch()).count();
        dt = end - now;
        if (DEBUG)
        {
            std::cout << "dt: " << dt << std::endl;
        }
    }

    std::cout << "Sensor is stopping" << std::endl;
    return;
}

int main(int argc, char *argv[])
{
    if (!ser_motors.is_open())
        std::cout << FRED("Failed to open motors serial port\n");

    // create a thread with input argument delay
    std::thread th1(commander, 500);
    std::thread th2(sensor_thread, 10);
    std::thread in1(get_var, 10);
    th1.join();
    th2.join();
    in1.join();
    return 0;
}