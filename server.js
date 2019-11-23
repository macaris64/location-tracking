const mosca = require('mosca');
const redis = require('redis');

const ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true, // to handle binary payloads
    host: "localhost"
};

const moscaSettings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Redis
    }
};

const server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.topic, packet.payload);
});

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}
