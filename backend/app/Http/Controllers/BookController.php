<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return response()->json(['books' => $books], 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $rules = [
            'author' => 'required',
            'description' => 'required',
            'page_number' => 'required|numeric',
            'title' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return response()->json(['status' => '400', 'errors' => $validator->errors()], 400);


        $request['created_by'] = Auth::id();


        return $request;


        return $request;

    }

    public function show(Book $book)
    {
        return $book;
    }

    public function edit(Book $book)
    {
        //
    }


    public function update(Request $request, Book $book)
    {
        //
    }

    public function destroy(Book $book)
    {
        //
    }
}
