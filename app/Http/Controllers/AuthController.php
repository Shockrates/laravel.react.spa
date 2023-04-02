<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Traits\HttpResponses;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    // register a new user method
    public function register(RegisterRequest $request){

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return $this->success([
            'user' => new UserResource($user),
            'token' => $token
            
        ])->withCookie($cookie);
    }

    // login user method
    public function login(LoginRequest $request){

        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Emial or password is incorrect'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);


        return $this->success([
            //'user' => $user,
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);

    }

    // logout a user method
    public function logout(){

       Auth::user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return $this->success([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);

    } 

    // get the authenticated user method
    public function user(Request $request){

        return $this->success([
            'user' => new UserResource($request->user())
        ]);
       
    }

}
