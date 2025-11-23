<?php

namespace App\Http\Controllers;

use App\Models\InfoPage;
use Illuminate\Http\Request;

class InfoPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infoPage = InfoPage::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => "Daftar halaman informasi",
            'data' => $infoPage
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
        ]);

        $infoPage = InfoPage::create($validated);

        return response()->json([
            'message' => 'Halaman informasi berhasil dibuat',
            'data' => $infoPage
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $infoPage = InfoPage::find($id);

        if (!$infoPage) {
            return response()->json([
                'message' => 'Halaman informasi tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail halaman informasi',
            'data' => $infoPage
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $infoPage = InfoPage::find($id);

        if (!$infoPage) {
            return response()->json([
                'message' => 'Halaman informasi tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $infoPage->update($validated);

        return response()->json([
            'message' => 'Halaman informasi berhasil diperbarui',
            'data' => $infoPage
        ], 200);
    }



    public function destroy($id)
    {
        $infoPage = InfoPage::find($id);

        if (!$infoPage) {
            return response()->json([
                'message' => 'Halaman informasi tidak ditemukan',
            ], 404);
        }

        $infoPage->delete();

        return response()->json([
            'message' => 'Halaman informasi berhasil dihapus',
        ], 200);
    }
}
