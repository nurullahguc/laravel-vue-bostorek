<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
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
        $create = Rating::create([
            'book_id' => $request->bookId,
            'rate' => $request->rate,
            'rated_by' => Auth::id()
        ]);

        return response()->json(['status' => 200, 'message' => 'Rate created successfully!'], 200);
    }

    public function raitings4Book($id)
    {
        $ratings = Rating::with('user')
            ->where('book_id', $id)
            ->get();

        return response()->json(['status' => 200, 'ratings' => $ratings], 200);
    }

    public function show(Rating $rating)
    {
        //
    }

    public function edit(Rating $rating)
    {
        //
    }

    public function update(Request $request, Rating $rating)
    {
        //
    }

    public function destroy(Rating $rating)
    {
        //
    }
}
