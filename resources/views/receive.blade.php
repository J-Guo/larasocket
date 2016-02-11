@extends('app')

@section('content')

@stop


@section('footer')

    <script>
      //  var socket = io('http://localhost:3000'); //local environment
          var socket = io('http://192.168.10.10:3000'); //product environment
        $('form').submit(function(){

            var msg = $('#m').val();
            socket.emit('test-channel',msg);

            $('#m').val('');
            return false;
        });

        socket.on('test-channel',function(data){
            $('#messages').append($('<li>').text(data));
        });


    </script>

@stop