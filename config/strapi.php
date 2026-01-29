<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Strapi API Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your Strapi API connection details.
    |
    */

    'url' => env('STRAPI_URL', 'http://localhost:1337'),

    'cache_time' => env('STRAPI_CACHE_TIME', 3600),

    'token' => env('STRAPI_TOKEN'),
];
