<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function updateUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $email = $request->email;
        $password = $request->password;
        $username = $request->username;

        $user = Auth::user();
        $user->email = $email;
        $user->name = $username;
        $user->password = Hash::make($password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User information updated successfully!'
        ], 200);
    }
}
