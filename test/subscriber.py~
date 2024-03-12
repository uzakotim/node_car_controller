import zmq
#create a ZeroMQ subscriber

context = zmq.Context()
subscriber = context.socket(zmq.SUB)
subscriber.connect("tcp://127.0.0.1:8081")
subscriber.setsockopt_string(zmq.SUBSCRIBE, "")

while True:
    string = subscriber.recv_string()
    print(string)
