<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Masukan extends Model
{
    use HasFactory;

    protected $table = 'masukan';

    protected $fillable = [
        'tanggapan',
    ];
}
