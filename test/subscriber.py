import zmq
from threading import Thread
from time import sleep



def listener(delay):
    #create a ZeroMQ subscriber
    context = zmq.Context()
    subscriber = context.socket(zmq.SUB)
    subscriber.connect("tcp://127.0.0.1:8081")
    subscriber.setsockopt_string(zmq.SUBSCRIBE, "")
    while True:
        string = subscriber.recv_string()
        print(string)
        sleep(delay)

if __name__ == "__main__":
    p1 = Thread(target=listener,args=([0.01]))
    p1.start()
    p1.join()