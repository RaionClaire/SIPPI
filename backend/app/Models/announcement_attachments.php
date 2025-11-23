<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class announcement_attachments extends Model
{
    protected $fillable = [
        'announcement_id',
        'file_path',
        'original_filename',
    ];

    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }
}
