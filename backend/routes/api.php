<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Dashboard routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('dashboard/stats', [DashboardController::class, 'stats'])->name('dashboard.stats');
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('me', [AuthController::class, 'me'])->name('auth.me');
        Route::post('register', [AuthController::class, 'register'])->name('auth.register');
    });
});

Route::prefix('pengumuman')->group(function () {
    Route::get('/', [App\Http\Controllers\AnnouncementController::class, 'index'])->name('pengumuman.index');
    Route::get('{id}', [App\Http\Controllers\AnnouncementController::class, 'show'])->name('pengumuman.show')->whereNumber('id');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [App\Http\Controllers\AnnouncementController::class, 'store'])->name('pengumuman.store');
        Route::put('{id}', [App\Http\Controllers\AnnouncementController::class, 'update'])->name('pengumuman.update')->whereNumber('id');
        Route::delete('{id}', [App\Http\Controllers\AnnouncementController::class, 'destroy'])->name('pengumuman.destroy')->whereNumber('id');
        Route::post('{id}/publish', [App\Http\Controllers\AnnouncementController::class, 'publish'])->name('pengumuman.publish')->whereNumber('id');
        Route::post('{id}/toggle-archive', [App\Http\Controllers\AnnouncementController::class, 'toggleArchive'])->name('pengumuman.toggle-archive')->whereNumber('id');

        // Comment routes
        Route::post('{id}/comments', [App\Http\Controllers\CommentController::class, 'store'])->name('pengumuman.comments.store')->whereNumber('id');
        Route::put('comments/{id}', [App\Http\Controllers\CommentController::class, 'update'])->name('comments.update')->whereNumber('id');
        Route::delete('comments/{id}', [App\Http\Controllers\CommentController::class, 'destroy'])->name('comments.destroy')->whereNumber('id');

        Route::post('{pengumuman}/lampiran', [App\Http\Controllers\AnnouncementAttachmentsController::class, 'store'])->name('pengumuman.lampiran.store')->whereNumber('pengumuman');
        Route::get('{pengumuman}/lampiran', [App\Http\Controllers\AnnouncementAttachmentsController::class, 'index'])->name('pengumuman.lampiran.index')->whereNumber('pengumuman');
        Route::get('{pengumuman}/lampiran/{lampiran}', [App\Http\Controllers\AnnouncementAttachmentsController::class, 'show'])->name('pengumuman.lampiran.show')->whereNumber(['pengumuman', 'lampiran']);
        Route::delete('{pengumuman}/lampiran/{lampiran}', [App\Http\Controllers\AnnouncementAttachmentsController::class, 'destroy'])->name('pengumuman.lampiran.destroy')->whereNumber(['pengumuman', 'lampiran']);
    });
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [App\Http\Controllers\UserController::class, 'index'])->name('users.index');
    Route::post('/', [App\Http\Controllers\UserController::class, 'store'])->name('users.store');
    Route::get('{id}', [App\Http\Controllers\UserController::class, 'show'])->name('users.show')->whereNumber('id');
    Route::put('{id}', [App\Http\Controllers\UserController::class, 'update'])->name('users.update')->whereNumber('id');
    Route::delete('{id}', [App\Http\Controllers\UserController::class, 'destroy'])->name('users.destroy')->whereNumber('id');
});

Route::prefix('berkas')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [App\Http\Controllers\RegistrationFileController::class, 'index'])->name('berkas.index');
    Route::post('/', [App\Http\Controllers\RegistrationFileController::class, 'store'])->name('berkas.store');
    Route::get('{id}', [App\Http\Controllers\RegistrationFileController::class, 'show'])->name('berkas.show')->whereNumber('id');
    Route::put('{id}', [App\Http\Controllers\RegistrationFileController::class, 'update'])->name('berkas.update')->whereNumber('id');
    Route::delete('{id}', [App\Http\Controllers\RegistrationFileController::class, 'destroy'])->name('berkas.destroy')->whereNumber('id');
});

Route::prefix('notifications')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/', [App\Http\Controllers\NotificationController::class, 'store'])->name('notifications.store');
    Route::put('{id}', [App\Http\Controllers\NotificationController::class, 'update'])->name('notifications.update')->whereNumber('id');
    Route::delete('{id}', [App\Http\Controllers\NotificationController::class, 'destroy'])->name('notifications.destroy')->whereNumber('id');
});

Route::prefix('categories')->group(function () {
    Route::get('/', [App\Http\Controllers\CategoryController::class, 'index'])->name('categories.index');
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [App\Http\Controllers\CategoryController::class, 'store'])->name('categories.store');
        Route::get('{id}', [App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show')->whereNumber('id');
        Route::put('{id}', [App\Http\Controllers\CategoryController::class, 'update'])->name('categories.update')->whereNumber('id');
        Route::delete('{id}', [App\Http\Controllers\CategoryController::class, 'destroy'])->name('categories.destroy')->whereNumber('id');
    });
});


