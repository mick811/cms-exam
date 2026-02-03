<?php

namespace App\Http\Controllers;

use App\Services\StrapiService;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
    public function __invoke(StrapiService $strapi): Response
    {
        $data = $strapi->getAll([
            'hero' => ['with' => 'image', 'first' => true],
            'products' => ['with' => 'images', 'limit' => 4],
        ]);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'hero' => $data['hero'],
            'products' => $data['products'],
        ]);
    }
}
