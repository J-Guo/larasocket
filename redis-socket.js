/**
 * Created by Junjie on 11/02/2016.
 */
var server = require('http').Server();

var io = require('socket.io')(server);

var Redis = require('ioredis');

var redis = new Redis();

redis.subscribe('test-channel');


redis.on('message',function(channel,message){

    console.log('message Received');

    io.emit(channel,message);

});

server.listen(3000);
