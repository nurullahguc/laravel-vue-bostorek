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

    public function uploader()
    {
        $books = Book::where('created_by', Auth::id())->get();

        return response()->json(['status' => 200, 'books' => $books], 200);
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
        $request['rating'] = 0;

        $create = Book::create($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Book created successfully!',
            'book' => $create
        ]);
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
        $book->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Book updated successfully!',
            'book' => $book
        ], 200);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['status' => 200, 'message' => 'Delete successfully!'], 200);
    }
}
