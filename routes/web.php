<?php

use App\Services\StrapiService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function (StrapiService $strapi) {
    $hero = $strapi->for('hero')
        ->with('image')
        ->first();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'hero' => $hero,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('profile');
});

require __DIR__.'/settings.php';
