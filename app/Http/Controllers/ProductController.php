<?php

namespace App\Http\Controllers;

use App\Services\StrapiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request, StrapiService $strapi): Response
    {
        $query = trim((string) $request->input('q', ''));

        return Inertia::render('products', [
            'products' => $strapi->getProducts($query ?: null),
            'query' => $query,
        ]);
    }

    public function show(int $product): Response
    {
        return Inertia::render('products/show', ['id' => $product]);
    }
}
