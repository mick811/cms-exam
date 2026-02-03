<?php

namespace App\Http\Controllers;

use App\Services\StrapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Handles search autocomplete suggestions.
 * Returns json for the search dropdown in the header.
 */
class SearchController extends Controller
{
    /**
     * Get product suggestions matching the search query.
     *
     * Returns a simplified array with just id and title
     * since that's all the autocomplete dropdown needs.
     */
    public function __invoke(Request $request, StrapiService $strapi): JsonResponse
    {
        $query = trim((string) $request->input('q', ''));

        // don't search if query is empty
        if ($query === '') {
            return response()->json([]);
        }

        // fetch suggestions and map to a simpler format
        // only need id and title for the dropdown
        $suggestions = collect($strapi->getProductSuggestions($query))
            ->map(fn (array $p) => [
                'id' => $p['id'] ?? null,
                'title' => $p['title'] ?? '',
            ])
            ->values();

        return response()->json($suggestions);
    }
}
