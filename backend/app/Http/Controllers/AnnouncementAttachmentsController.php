<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\announcement_attachments;
use Illuminate\Http\Request;

class AnnouncementAttachmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $announcements = announcement_attachments::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar pengumuman",
            'data' => $announcements
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'announcement_id' => 'required|exists:announcements,id',
            'file_path' => 'required|string|max:255'
        ]);

        $attachment = announcement_attachments::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(announcement_attachments $announcement_attachments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(announcement_attachments $announcement_attachments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, announcement_attachments $announcement_attachments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(announcement_attachments $announcement_attachments)
    {
        //
    }
}
