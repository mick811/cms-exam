<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class StrapiService
{
    protected string $baseUrl;

    protected ?string $token;

    protected array $query = [];

    public function __construct()
    {
        $this->baseUrl = rtrim(config('strapi.url'), '/');
        $this->token = config('strapi.token');
    }

    /**
     * Start a fluent query builder for a content type.
     */
    public function for(string $contentType): self
    {
        $this->query['contentType'] = $contentType;

        return $this;
    }

    /**
     * Include related fields (populate).
     *
     * @param  string|array<string>  $relations
     */
    public function with(string|array $relations): self
    {
        if (is_array($relations)) {
            $this->query['populate'] = count($relations) === 1 ? $relations[0] : $relations;
        } else {
            $this->query['populate'] = $relations;
        }

        return $this;
    }

    /**
     * Select specific fields.
     *
     * @param  array<string>|string  $fields
     */
    public function fields(array|string $fields): self
    {
        if (is_string($fields)) {
            $fields = [$fields];
        }

        $this->query['fields'] = $fields;

        return $this;
    }

    /**
     * Get the first (or only) result.
     *
     * @return array<string, mixed>|null
     */
    public function first(): ?array
    {
        $contentType = $this->query['contentType'] ?? throw new \InvalidArgumentException('Content type not specified');
        $params = array_diff_key($this->query, ['contentType' => true]);

        $response = $this->request('get', "/api/{$contentType}", $params);

        $this->query = [];

        return $response->json('data');
    }

    /**
     * Get entries for a specific content type.
     *
     * @param  array<string, mixed>  $params
     */
    public function get(string $contentType, array $params = []): Response
    {
        return $this->request('get', "/api/{$contentType}", $params);
    }

    /**
     * Get a single entry by ID.
     *
     * @param  array<string, mixed>  $params
     */
    public function entry(string $contentType, int|string $id, array $params = []): Response
    {
        return $this->request('get', "/api/{$contentType}/{$id}", $params);
    }

    /**
     * Handle the HTTP request to Strapi.
     *
     * @param  array<string, mixed>  $data
     */
    protected function request(string $method, string $path, array $data = []): Response
    {
        $url = $this->baseUrl.$path;

        $request = Http::acceptJson();

        if ($this->token) {
            $request->withToken($this->token);
        }

        return $request->{$method}($url, $data);
    }
}
