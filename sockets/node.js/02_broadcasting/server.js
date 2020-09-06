// Broadcast example
//
// In this example all client connections are stored in a Set. 
// Incoming messages are forwarded to all connected clients 
// (except for the original sender of the message).
//
// TODO: Correctly disconnect the clients even on SIGINT, errors etc.

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 7000;

var clientConnections = new Set();

var server = net.createServer(handleClient);

clientConnections.broadcast = function(data, sendingSock) {
    for (let sock of this)
        if (sock != sendingSock)
            sock.write(data);
};

server.listen(PORT, HOST, () => {
    console.log(`Server listening at: ${HOST}:${PORT}`);
})

function handleClient(sock) {
    let client = `${sock.remoteAddress}:${sock.remotePort}`;
    clientConnections.add(sock);
    console.log(`New client connected: ${client}`);

    sock.on('data', (data) => {
        console.log(`${client} -> ${data}`);
        clientConnections.broadcast(data, sock);
    });

    sock.on('end', () => {
        console.log(`Disconnected from ${client}`);
        clientConnections.delete(sock);
    });

    sock.on('error', (err) => {
        // TODO: Implement a meaningful error handling here
        throw err;
    });
}
