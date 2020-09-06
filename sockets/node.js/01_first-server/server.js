var net = require('net');

var HOST = '127.0.0.1';
var PORT = 7000;

var server = net.createServer(handleClient);

server.listen(PORT, HOST, () => {
    console.log(`Server listening at: ${HOST}:${PORT}`);
})

function handleClient(sock) {
    let client = `${sock.remoteAddress}:${sock.remotePort}`;
    console.log(`New client connected: ${client}`);

    sock.on('data', (data) => {
        console.log(`${client} -> ${data}`);
        sock.write(data);
        sock.write('exit');
    });

    sock.on('end', () => {
        console.log(`Disconnected from ${client}`);
    });

    sock.on('error', (err) => {
        // TODO: Implement a meaningful error handling here
        throw err;
    });
}
