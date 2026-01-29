| Title     | Eksamensprojekt: CMS Forløb                                  |
| --------- | ------------------------------------------------------------ |
| Kunde     | Tattoo Shop                                                  |
| Koncept   | En moderne tattoo shop med fokus på portfolio og salg.       |
| Målgruppe | Folk der søger kunstneriske tattoos og relaterede produkter. |

> [!WARNING]
> Dette er et eksamensprojekt. Koden er til undervisningsformål og er ikke optimeret til produktionsbrug.

# Projektbeskrivelse

> [!NOTE]
> Strapi-typer (`strapi/types/generated/`) er ignoreret i git, da de genereres automatisk.
> For at undgå TypeScript-fejl og sikre opdaterede typer skal Strapi køres lokalt første gang:
> `cd strapi && bun develop`

Dette projekt løser "Mulighed 1" i CMS-opgaven. Sitet er bygget som en Headless løsning til en fiktiv tattoo shop. Sitet er en SSR side bygget i Laravel, som får sin data fra Strapi, der fungerer som Headless CMS.

## Spec liste

### Fase 1: Setup & CMS

- [x] Projektstruktur og dokumentation
- [x] README.md med oversigt, features, tech stack
- [x] .env med Strapi URL og token
- [ ] Hero indholdstype i Strapi
- [ ] PortfolioItem indholdstype i Strapi
- [ ] Product indholdstype i Strapi
- [ ] About indholdstype i Strapi
- [ ] Eksempeldata i Strapi
- [ ] StrapiService med Hero, Portfolio, Product, About
- [ ] Strapi image URL helper

### Fase 2: Components

- [x] Layout component
- [ ] Header component
- [ ] Footer component
- [x] Button component
- [x] Card component
- [x] Input, Textarea, Label components
- [ ] Image component

### Fase 3: Pages

- [ ] HomePage
- [ ] FeaturedPortfolio component
- [ ] PortfolioPage
- [ ] ProductCard og ProductGrid
- [ ] ProductsPage
- [ ] PricingPage
- [ ] FAQPage
- [ ] TestimonialsPage
- [ ] ContactPage
- [ ] AboutPage

### Fase 4: Polish

- [x] Loading states (skeleton)
- [ ] Error states og fallback UI
- [ ] Mobile responsive
- [ ] Page transition animationer

### Fase 5: Testing & Quality

- [ ] Feature test: HomePage loading
- [ ] Feature test: PortfolioPage accessibility
- [ ] Feature test: Contact form validation
- [ ] ESLint fix
- [ ] Pint fix
- [ ] Kør tests
- [ ] Build production assets

### Fase 6: Documentation

- [ ] Screenshots
- [ ] Dokumentation

## Tech Stack

- Laravel 12 (PHP 8.2+)
- Inertia v2 med SSR
- React 19
- Tailwind CSS v4
- Vite
- Strapi som Headless CMS
- Bun som package manager
- Laravel Fortify til authentication
- shadcn/ui components

## Setup

```bash
# Installer dependencies
composer install
npm install

# Kopier .env og generer key
cp .env.example .env
php artisan key:generate

# Kør Strapi (i separate terminal)
cd strapi && bun develop

# Kør dev server
composer run dev
```

## Tests

```bash
# Kør alle tests
php artisan test

# Kør kun feature tests med filter
php artisan test --compact tests/Feature/DashboardTest.php
```

## Licens

MIT
