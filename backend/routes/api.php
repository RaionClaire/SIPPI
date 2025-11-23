<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


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

Route::prefix('registration-files')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [App\Http\Controllers\RegistrationFileController::class, 'index'])->name('registration_files.index');
    Route::post('/', [App\Http\Controllers\RegistrationFileController::class, 'store'])->name('registration_files.store');
    Route::put('{id}', [App\Http\Controllers\RegistrationFileController::class, 'update'])->name('registration_files.update')->whereNumber('id');
    Route::delete('{id}', [App\Http\Controllers\RegistrationFileController::class, 'destroy'])->name('registration_files.destroy')->whereNumber('id');
});

Route::prefix('notifications')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/', [App\Http\Controllers\NotificationController::class, 'store'])->name('notifications.store');
    Route::put('{id}', [App\Http\Controllers\NotificationController::class, 'update'])->name('notifications.update')->whereNumber('id');
    Route::delete('{id}', [App\Http\Controllers\NotificationController::class, 'destroy'])->name('notifications.destroy')->whereNumber('id');
});


