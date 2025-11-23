<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notification = Notification::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar notifikasi",
            'data' => $notification
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = Notification::create($validated);

        return response()->json([
            'message' => 'Notifikasi berhasil dibuat',
            'data' => $notification
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail notifikasi',
            'data' => $notification
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification->update($validated);

        return response()->json([
            'message' => 'Notifikasi berhasil diperbarui',
            'data' => $notification
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan',
            ], 404);
        }

        $notification->delete();

        return response()->json([
            'message' => 'Notifikasi berhasil dihapus',
        ], 200);
    }
}
