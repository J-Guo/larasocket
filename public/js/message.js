/**
 * Created by Junjie on 9/02/2016.
 */
var socket = io('http://localhost:3000');
var Redis = require('ioredis');
var redis = new Redis();
$('form').submit(function(){
    redis .publish('test-channel', $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('test-channel',function(data){
    $('#messages').append($('<li>').text(data));
});