<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable=[
        'user_id',
        'type',
        'title',
        'message',
        'announcement_id',
        'registration_file_id',
        'is_read'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function announcement(){
        return $this->belongsTo(Announcement::class);
    }

    public function registrationFile(){
        return $this->belongsTo(RegistrationFile::class);
    }
}
