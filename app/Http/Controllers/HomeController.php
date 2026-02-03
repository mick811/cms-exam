<?php

namespace App\Http\Controllers;

use App\Services\StrapiService;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

/**
 * Handles the homepage / landing page.
 */
class HomeController extends Controller
{
    /**
     * Display the welcome page with hero and popular products.
     *
     * Uses getAll() to fetch hero and products in one go.
     * The hero is a single item, products is an array of 4 items.
     */
    public function __invoke(StrapiService $strapi): Response
    {
        // fetch hero image and popular products from strapi
        $data = $strapi->getAll([
            'hero' => ['with' => 'image', 'first' => true],
            'products' => ['with' => 'images', 'limit' => 4],
        ]);

        return Inertia::render('welcome', [
            // used to show/hide register link in the header
            'canRegister' => Features::enabled(Features::registration()),
            'hero' => $data['hero'],
            'products' => $data['products'],
        ]);
    }
}
