var readline = require('readline');
var net = require('net');

var HOST = '127.0.0.1'
var PORT = 7000;

var rl = readline.createInterface(process.stdin, process.stdout);
var sock = new net.Socket();

sock.connect(PORT, HOST, () => {
    rl.on('line', (data) => {
        sock.write(data);
    });
});

sock.on('data', (data) => {
    console.log(`Received: ${data}`);
});

sock.on('end', () => {
    console.log('Connection closed...');
});

sock.on('error', (err) => {
    // TODO: Implement a meaningful error handling here
    throw err;
});
