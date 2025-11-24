<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\announcement_attachments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementAttachmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Announcement $pengumuman)
    {
        $attachments = $pengumuman->attachments()->latest()->get()->map(function ($attachment) {
            $attachment->url = Storage::url($attachment->file_path);
            return $attachment;
        });

        return response()->json([
            'message' => "Daftar lampiran",
            'announcement_id' => $pengumuman->id,
            'data' => $attachments
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Announcement $pengumuman)
    {
        $validated = $request->validate([
            'attachment' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:5120',
        ]);

        $file = $request->file('attachment');
        $originalName = $file->getClientOriginalName();
        $storedPath = $file->store('announcement_attachments', 'public');

        $attachment = $pengumuman->attachments()->create([
            'file_path' => $storedPath,
            'original_filename' => $originalName,
        ]);

        return response()->json([
            'message' => 'Lampiran berhasil diunggah',
            'data' => $attachment,
            'url' => Storage::url($storedPath),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $pengumuman, announcement_attachments $lampiran)
    {
        if ($lampiran->announcement_id !== $pengumuman->id) {
            return response()->json([
                'message' => 'Lampiran tidak ditemukan untuk pengumuman ini',
            ], 404);
        }

        $lampiran->url = Storage::url($lampiran->file_path);

        return response()->json([
            'message' => 'Detail lampiran',
            'data' => $lampiran,
        ], 200);
    }





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $pengumuman, announcement_attachments $lampiran)
    {
        if ($lampiran->announcement_id !== $pengumuman->id) {
            return response()->json([
                'message' => 'Lampiran tidak ditemukan untuk pengumuman ini',
            ], 404);
        }

        if (Storage::disk('public')->exists($lampiran->file_path)) {
            Storage::disk('public')->delete($lampiran->file_path);
        }

        $lampiran->delete();

        return response()->json([
            'message' => 'Lampiran berhasil dihapus',
        ], 200);
    }
}
