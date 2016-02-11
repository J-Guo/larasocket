@extends('app')

@section('content')

@stop


@section('footer')

    <script>
        var socket = io('http://localhost:3000');
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