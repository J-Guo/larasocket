/**
 * Created by Junjie on 9/02/2016.
 * Socket.io Server
 */

var server = require('http').Server();
var io = require('socket.io')(server);

var mysql = require('mysql');

/* Creating POOL MySQL connection.*/
var pool    =    mysql.createPool({
    connectionLimit   :   100,
    host              :   'localhost',
    user              :   'Orbella',
    password          :   'Orbelladata',
    database          :   'ratchet',
    debug             :   false
});

io.on('connection', function(socket){

    console.log('A new user connected');

    socket.on('test-channel', function(msg){
        console.log(msg);

        store_message(msg,function(res){
            if(res){
                io.emit('test-channel',msg);
            } else {
                io.emit('error');
            }
        });
    });
});


server.listen(3000, function(){
    console.log('listening on *:3000');
});


//functon to store message into DB
var store_message = function (message,callback) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            callback(false);
            return;
        }
        connection.query("INSERT INTO `chats` (`message`) VALUES ('"+message+"')",function(err,rows){
            connection.release();
            if(!err) {
                callback(true);
            }
        });
        connection.on('error', function(err) {
            callback(false);
            return;
        });
    });
}