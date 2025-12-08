<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationFile extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'file_path',
        'filename',
        'status',
        'rejection_reason',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
