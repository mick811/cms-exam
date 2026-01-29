| title     | eksamensprojekt: cms forløb                                  |
| --------- | ------------------------------------------------------------ |
| kunde     | tattoo shop                                                  |
| koncept   | en moderne tattoo shop med fokus på portfolio og salg.       |
| målgruppe | folk der søger kunstneriske tattoos og relaterede produkter. |

> [!warning]
> dette er et eksamensprojekt. koden er til undervisningsformål og er ikke optimeret til produktionsbrug.

# projektbeskrivelse

> [!note]
> strapi-typer (`strapi/types/generated/`) er ignoreret i git, da de genereres automatisk.
> for at undgå typescript-fejl og sikre opdaterede typer skal strapi køres lokalt første gang:
> `cd strapi && bun develop`

dette projekt løser "mulighed 1" i cms-opgaven. sitet er bygget som en headless løsning til en fiktiv tattoo shop. sitet er en ssr side bygget i laravel, som får sin data fra strapi, der fungerer som headless cms.

## spec liste

### fase 1: setup & cms

- [x] projektstruktur og dokumentation
- [x] readme.md med oversigt, features, tech stack
- [x] .env med strapi url og token
- [ ] hero indholdstype i strapi
- [ ] portfolioitem indholdstype i strapi
- [ ] product indholdstype i strapi
- [ ] about indholdstype i strapi
- [ ] eksempeldata i strapi
- [ ] strapiservice med hero, portfolio, product, about
- [ ] strapi image url helper

### fase 2: components

- [x] layout component
- [ ] header component
- [ ] footer component
- [x] button component
- [x] card component
- [x] input, textarea, label components
- [ ] image component

### fase 3: pages

- [ ] home page
- [ ] featured portfolio
- [ ] portfolio page
- [ ] product card og grid
- [ ] products page
- [ ] pricing page
- [ ] faq page
- [ ] testimonials page
- [ ] contact page
- [ ] about page

### fase 4: polish

- [x] loading states (skeleton)
- [ ] error states og fallback ui
- [ ] mobile responsive
- [ ] page transition animationer

### fase 5: testing & quality

- [ ] feature test: homepage loading
- [ ] feature test: portfolio page accessibility
- [ ] feature test: contact form validation
- [ ] eslint fix
- [ ] pint fix
- [ ] kør tests
- [ ] build production assets

### fase 6: documentation

- [ ] screenshots
- [ ] dokumentation

## tech stack

- laravel 12 (php 8.2+)
- inertia v2 med ssr
- react 19
- tailwind css v4
- vite
- strapi som headless cms
- bun som package manager
- laravel fortify til authentication
- shadcn/ui components

## setup

```bash
# installer dependencies
composer install
npm install

# kopier .env og generer key
cp .env.example .env
php artisan key:generate

# kør strapi (i separate terminal)
cd strapi && bun develop

# kør dev server
composer run dev
```

## tests

```bash
# kør alle tests
php artisan test

# kør kun feature tests med filter
php artisan test --compact tests/feature/dashboardtest.php
```

## licens

mit
