<?php

namespace App\Http\Controllers;

use App\Models\RegistrationFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RegistrationFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registrationFiles = RegistrationFile::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
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
        ]);

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
}
