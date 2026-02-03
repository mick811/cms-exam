<?php

namespace App\Http\Controllers;

use App\Services\StrapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request, StrapiService $strapi): JsonResponse
    {
        $query = trim((string) $request->input('q', ''));

        if ($query === '') {
            return response()->json([]);
        }

        $suggestions = collect($strapi->getProductSuggestions($query))
            ->map(fn (array $p) => [
                'id' => $p['id'] ?? null,
                'title' => $p['Title'] ?? '',
            ])
            ->values();

        return response()->json($suggestions);
    }
}
