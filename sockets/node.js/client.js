var net = require('net');

var HOST = '127.0.0.1'
var PORT = 7000;

var client = new net.Socket();

client.connect(PORT, HOST, () => {
    client.write('Hallo, Welt!');
});

client.on('data', (data) => {
    console.log(`Received: ${data}`);
    if(data.toString().endsWith('exit'))
        client.destroy();
});

client.on('close', () => {
    console.log('Connection closed...');
});

client.on('error', (err) => {
    console.log(err);
});
