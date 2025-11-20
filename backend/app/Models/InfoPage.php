<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\String\Slugger\SluggerInterface;

class InfoPage extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'content'
    ];  

    public function author(){
        return $this->belongsTo(User::class);
    }
}
