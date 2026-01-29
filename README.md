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

- [x] Sæt projektstruktur og dokumentation op
- [x] Opret README.md med projekt oversigt, features, tech stack, setup instruktioner
- [x] Opdater .env med Strapi URL og token til produktion
- [ ] Strapi: Opret Hero indholdstype (overskrift, undertekst, billede, CTA tekst, CTA link)
- [ ] Strapi: Opret PortfolioItem indholdstype (titel, billede, stil/kategori, beskrivelse)
- [ ] Strapi: Opret Product indholdstype (navn, billede, pris, beskrivelse, kategori)
- [ ] Strapi: Opret About indholdstype (titel, brødtekst, billede, signatur)
- [ ] Strapi: Tilføj eksempeldata (3-5 portfolio items, 2-3 produkter, hero indhold)
- [ ] Opdater StrapiService.php med metoder til Hero, Portfolio, Product, About endpoints
- [ ] Opret Strapi image URL helper funktion til media assets

### Fase 2: Components

- [x] Opret genbrugelig Layout component med header og footer (app-layout.tsx)
- [ ] Byg responsiv Header component med navigationsmenu
- [ ] Byg Footer component med kontaktinfo og sociale links
- [x] Byg Button component med varianter (primary, secondary, outline, ghost)
- [x] Byg Card component til portfolio items og produkter
- [x] Byg Input, Textarea, Label components til forms
- [ ] Byg Image component med lazy loading og fallback

### Fase 3: Pages

- [ ] Byg HomePage med hero sektion der henter fra CMS
- [ ] Byg FeaturedPortfolio component til home page
- [ ] Byg PortfolioPage med fuldt galleri grid
- [ ] Byg ProductCard og ProductGrid components
- [ ] Byg ProductsPage der viser alle produkter
- [ ] Byg PricingPage med service liste fra CMS eller statisk data
- [ ] Byg FAQPage med accordion component
- [ ] Byg TestimonialsPage med anmeldelseskort
- [ ] Byg ContactPage med form (navn, email, telefon, besked)
- [ ] Byg AboutPage med historie og billede

### Fase 4: Polish

- [x] Tilføj loading states (skeleton components) til asynkron data (skeleton.tsx eksisterer)
- [ ] Tilføj error states og fallback UI til fejlede data fetches
- [ ] Sørg for alle sider er mobile responsive (test breakpoints)
- [ ] Tilføj side transition animationer mellem routes

### Fase 5: Testing & Quality

- [ ] Skriv feature test til home page loading
- [ ] Skriv feature test til portfolio page accessibility
- [ ] Skriv feature test til contact form validation
- [ ] Kør lint:check og fix alle ESLint errors
- [ ] Kør pint:check og fix alle PHP style issues
- [ ] Kør fuld test suite og sikre alle tests passerer
- [ ] Byg produktions assets (npm run build)

### Fase 6: Documentation

- [ ] Tag screenshots til dokumentation (home, portfolio, contact)
- [ ] Skriv projekt dokumentation (features, CMS indholdstyper, setup guide)

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
