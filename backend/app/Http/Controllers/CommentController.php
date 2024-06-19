<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bookId' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails())
            return response()->json(['status' => '400', 'errors' => $validator->errors()], 400);


        $create = Comment::create([
            'book_id' => $request->bookId,
            'posted_by' => Auth::id(),
            'content' => $request->content,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Comment created successfully!',
            'comment' => $create
        ], 200);
    }

    public function show(Comment $comment)
    {
        //
    }

    public function edit(Comment $comment)
    {
        //
    }

    public function update(Request $request, Comment $comment)
    {
        //
    }

    public function destroy(Comment $comment)
    {
        //
    }
}
