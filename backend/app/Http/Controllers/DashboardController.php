<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\RegistrationFile;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function stats(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            // Admin dashboard stats
            $stats = [
                'totalPengumuman' => Announcement::count(),
                'pengumumanAktif' => Announcement::where('status', 'published')->count(),
                'pengumumanPenting' => Announcement::where('is_important', true)->count(),
                'berkasPending' => RegistrationFile::where('status', 'pending')->count(),
                'berkasDisetujui' => RegistrationFile::where('status', 'approved')->count(),
                'berkasDitolak' => RegistrationFile::where('status', 'rejected')->count(),
                'totalUsers' => User::count(),
                'totalMahasiswa' => User::where('role', 'mahasiswa')->count(),
                'totalAdmin' => User::where('role', 'admin')->count(),
            ];
        } else {
            // Mahasiswa dashboard stats
            $stats = [
                'totalPengumuman' => Announcement::where('status', 'published')->count(),
                'pengumumanPenting' => Announcement::where('status', 'published')
                    ->where('is_important', true)
                    ->count(),
                'berkasSaya' => RegistrationFile::where('user_id', $user->id)->count(),
                'berkasPending' => RegistrationFile::where('user_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
                'berkasDisetujui' => RegistrationFile::where('user_id', $user->id)
                    ->where('status', 'approved')
                    ->count(),
            ];
        }

        return response()->json([
            'message' => 'Dashboard statistics',
            'data' => $stats
        ], 200);
    }
}
