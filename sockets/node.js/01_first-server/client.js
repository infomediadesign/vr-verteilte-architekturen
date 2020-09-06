var net = require('net');

var HOST = '127.0.0.1'
var PORT = 7000;

var sock = new net.Socket();

sock.connect(PORT, HOST, () => {
    sock.write('Hallo, Welt!');
});

sock.on('data', (data) => {
    console.log(`Received: ${data}`);
    if(data.toString().endsWith('exit'))
        sock.destroy();
});

sock.on('close', () => {
    console.log('Connection closed...');
});

sock.on('error', (err) => {
    console.log(err);
});
