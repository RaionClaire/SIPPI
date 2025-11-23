<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $announcement = Announcement::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar pengumuman",
            'data' => $announcement
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = request()->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $announcement = Announcement::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return response()->json([
            'message' => 'Pengumuman berhasil dibuat',
            'data' => $announcement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement)
    {
        $announcement = Announcement::find($announcement->id);

        if (!$announcement) {
            return response()->json([
                'message' => 'Pengumuman tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pengumuman',
            'data' => $announcement
        ], 200);
    }

    /**


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'message' => 'Pengumuman tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $announcement->update($validated);

        return response()->json([
            'message' => 'Pengumuman berhasil diperbarui',
            'data' => $announcement
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'message' => 'Pengumuman tidak ditemukan',
            ], 404);
        }

        $announcement->delete();

        return response()->json([
            'message' => 'Pengumuman berhasil dihapus',
        ], 200);
    }
}
