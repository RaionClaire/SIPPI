<?php

namespace App\Http\Controllers;

use App\Models\RegistrationFile;
use Illuminate\Http\Request;

class RegistrationFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registrationFile = RegistrationFile::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar berkas pendaftaran",
            'data' => $registrationFile
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'file_path' => 'required|string',
            'file_type' => 'required|string',
        ]);

        $registrationFile = RegistrationFile::create($validated);

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil dibuat',
            'data' => $registrationFile
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $registrationFile = RegistrationFile::find($id);

        if (!$registrationFile) {
            return response()->json([
                'message' => 'Berkas pendaftaran tidak ditemukan',
            ], 404);
        }

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

        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'file_path' => 'required|string',
            'file_type' => 'required|string',
        ]);

        $registrationFile->update($validated);

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil diperbarui',
            'data' => $registrationFile
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

        $registrationFile->delete();

        return response()->json([
            'message' => 'Berkas pendaftaran berhasil dihapus',
        ], 200);
    }
}
