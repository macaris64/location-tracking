var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');

client.subscribe('new-user');
client.subscribe('location');

client.on('connect', () => {
    console.log('a client has been connected');

    client.publish('new-user','Mehmet-' + Math.ceil(Math.random() * 10));
});

client.on('message', (topic, message) => {
    console.log(topic, ' : ', message.toString())
});