<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $announcement = Announcement::with(['category', 'author'])
            ->whereNull('archived_at')
            ->orderBy('created_at', 'desc')
            ->get();
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:5120',
        ]);

        $announcement = Announcement::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
            'author_id' => $request->user()->id,
            'status' => 'draft',
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $originalName = $file->getClientOriginalName();
                $storedPath = $file->store('announcement_attachments', 'public');

                $attachment = $announcement->attachments()->create([
                    'file_path' => $storedPath,
                    'original_filename' => $originalName,
                ]);

                $attachments[] = [
                    'id' => $attachment->id,
                    'file_path' => $storedPath,
                    'original_filename' => $originalName,
                    'url' => Storage::url($storedPath),
                ];
            }
        }

        return response()->json([
            'message' => 'Pengumuman berhasil dibuat',
            'data' => $announcement,
            'attachments' => $attachments,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $announcement = Announcement::with(['category', 'author', 'comments.user'])
            ->find($id);

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
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $announcement->update($validated);
        $announcement->load(['category', 'author']);

        return response()->json([
            'message' => 'Pengumuman berhasil diperbarui',
            'data' => $announcement
        ], 200);
    }

    /**
     * Archive or unarchive an announcement.
     */
    public function toggleArchive(Request $request, $id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'message' => 'Pengumuman tidak ditemukan',
            ], 404);
        }

        if ($announcement->archived_at) {
            // Unarchive
            $announcement->archived_at = null;
            $announcement->archived_by = null;
            $message = 'Pengumuman berhasil dibatalkan dari arsip';
        } else {
            // Archive
            $announcement->archived_at = now();
            $announcement->archived_by = $request->user()->id;
            $message = 'Pengumuman berhasil diarsipkan';
        }

        $announcement->save();

        return response()->json([
            'message' => $message,
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
