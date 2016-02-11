<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;

class SocketController extends Controller
{
    public function writeToConsole(){

      $data = [
          'event'=>'chat begin',
          'name' => 'Tony'
      ];

    Redis::publish('test-channel','JohnDoe');

        return 'done';

    }

    public function showReceiveMessage(){
        return view('receive');
    }

    public function handleMessage(Request $request){
        $msg = $request->input('message');
        Redis::publish('test-channel', $msg );
    }
}
