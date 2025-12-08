<?php

namespace App\Http\Controllers;

use App\Models\RegistrationFile;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RegistrationFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // If mahasiswa, only show their own files
        // If admin, show all files
        $query = RegistrationFile::with('user:id,name,email,npm_nip');
        
        if ($user->role === 'mahasiswa') {
            $query->where('user_id', $user->id);
        }
        
        $registrationFiles = $query->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($file) {
                $file->url = Storage::url($file->file_path);
                return $file;
            });

        return response()->json([
            'message' => "Daftar berkas pendaftaran",
            'data' => $registrationFiles
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:proposal,hasil,kompre,kp',
            'file' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $storedPath = $file->store('registration_files', 'public');

        $registrationFile = RegistrationFile::create([
            'user_id' => $request->user()->id,
            'type' => $validated['type'],
            'file_path' => $storedPath,
            'filename' => $originalName,
            'status' => 'pending',
        ]);

        // Create notifications for all admin users
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'type' => 'berkas_status',
                'title' => 'Berkas Baru Menunggu Persetujuan',
                'message' => 'Berkas "' . $this->getTypeLabel($validated['type']) . '" dari ' . $request->user()->name . ' menunggu persetujuan.',
                'registration_file_id' => $registrationFile->id,
            ]);
        }

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil diunggah',
            'data' => $registrationFile,
            'url' => Storage::url($storedPath),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $registrationFile = RegistrationFile::with('user:id,name,email')->find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

        $registrationFile->url = Storage::url($registrationFile->file_path);

        return response()->json([
            'message' => 'Detail berkas pendaftaran',
            'data' => $registrationFile
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $registrationFile = RegistrationFile::find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

        // Check authorization
        if ($registrationFile->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk mengubah berkas ini',
            ], 403);
        }

        $validated = $request->validate([
            'type' => 'sometimes|in:proposal,hasil,kompre,kp',
            'file' => 'sometimes|file|mimes:pdf,doc,docx|max:10240',
        ]);

        // If new file uploaded, delete old file and upload new one
        if ($request->hasFile('file')) {
            // Delete old file
            if (Storage::disk('public')->exists($registrationFile->file_path)) {
                Storage::disk('public')->delete($registrationFile->file_path);
            }

            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $storedPath = $file->store('registration_files', 'public');

            $registrationFile->file_path = $storedPath;
            $registrationFile->filename = $originalName;
        }

        if (isset($validated['type'])) {
            $registrationFile->type = $validated['type'];
        }

        $registrationFile->save();

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil diperbarui',
            'data' => $registrationFile,
            'url' => Storage::url($registrationFile->file_path),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $registrationFile = RegistrationFile::find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

        // Delete physical file from storage
        if (Storage::disk('public')->exists($registrationFile->file_path)) {
            Storage::disk('public')->delete($registrationFile->file_path);
        }

        $registrationFile->delete();

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil dihapus',
        ], 200);
    }

    /**
     * Approve a registration file (admin only).
     */
    public function approve($id)
    {
        $registrationFile = RegistrationFile::find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

        $registrationFile->status = 'approved';
        $registrationFile->rejection_reason = null;
        $registrationFile->save();

        // Create notification for the user
        Notification::create([
            'user_id' => $registrationFile->user_id,
            'type' => 'berkas_status',
            'title' => 'Berkas Disetujui',
            'message' => 'Berkas "' . $this->getTypeLabel($registrationFile->type) . '" Anda telah disetujui.',
            'registration_file_id' => $registrationFile->id,
        ]);

        return response()->json([
            'message' => 'Berkas berhasil disetujui',
            'data' => $registrationFile
        ], 200);
    }

    /**
     * Reject a registration file (admin only).
     */
    public function reject(Request $request, $id)
    {
        $validated = $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $registrationFile = RegistrationFile::find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

        $registrationFile->status = 'rejected';
        $registrationFile->rejection_reason = $validated['rejection_reason'];
        $registrationFile->save();

        // Create notification for the user
        Notification::create([
            'user_id' => $registrationFile->user_id,
            'type' => 'berkas_status',
            'title' => 'Berkas Ditolak',
            'message' => 'Berkas "' . $this->getTypeLabel($registrationFile->type) . '" Anda ditolak. Alasan: ' . $validated['rejection_reason'],
            'registration_file_id' => $registrationFile->id,
        ]);

        return response()->json([
            'message' => 'Berkas berhasil ditolak',
            'data' => $registrationFile
        ], 200);
    }

    /**
     * Get label for file type.
     */
    private function getTypeLabel($type)
    {
        $labels = [
            'proposal' => 'Lembar Persetujuan Pembimbing',
            'hasil' => 'Berita Acara',
            'kompre' => 'Kartu Kendali Bimbingan',
            'kp' => 'Draf Laporan Proposal',
        ];

        return $labels[$type] ?? $type;
    }
}
