<?php

use App\Services\StrapiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function (StrapiService $strapi) {
    $data = $strapi->getAll([
        'hero' => ['with' => 'image', 'first' => true],
        'products' => ['with' => 'images', 'limit' => 4],
    ]);

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'hero' => $data['hero'],
        'products' => $data['products'],
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('profile');
});

Route::get('/search', function (Request $request, StrapiService $strapi) {
    $query = $request->input('q', '');
    $products = $query ? $strapi->searchProducts($query) : [];

    return Inertia::render('search', [
        'products' => $products,
        'query' => $query,
    ]);
})->name('search');

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');

require __DIR__.'/settings.php';
