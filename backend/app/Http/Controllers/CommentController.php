<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comment = Comment::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar komentar",
            'data' => $comment
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $announcementId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = Comment::create([
            'announcement_id' => $announcementId,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        $comment->load('user');

        return response()->json([
            'message' => 'Komentar berhasil dibuat',
            'data' => $comment
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Komentar tidak ditemukan',
            ], 404);
        }
    
        return response()->json([
            'message' => 'Detail komentar',
            'data' => $comment
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Komentar tidak ditemukan',
            ], 404);
        }

        // Only allow user to edit their own comment
        if ($comment->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Tidak diizinkan',
            ], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);

        return response()->json([
            'message' => 'Komentar berhasil diperbarui',
            'data' => $comment
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Komentar tidak ditemukan',
            ], 404);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Komentar berhasil dihapus',
        ], 200);
    }
}
