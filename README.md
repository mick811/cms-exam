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

- [x] Set up project structure and documentation
- [x] Create README.md with project overview, features, tech stack, setup instructions
- [x] Update .env with Strapi URL and token for production
- [ ] Strapi: Create Hero content type (headline, subtext, image, CTA text, CTA link)
- [ ] Strapi: Create PortfolioItem content type (title, image, style/category, description)
- [ ] Strapi: Create Product content type (name, image, price, description, category)
- [ ] Strapi: Create About content type (title, body text, image, signature)
- [ ] Strapi: Add sample data (3-5 portfolio items, 2-3 products, hero content)
- [ ] Update StrapiService.php with methods for Hero, Portfolio, Product, About endpoints
- [ ] Create Strapi image URL helper function to handle media assets

### Fase 2: Components

- [x] Create reusable Layout component with header and footer (app-layout.tsx)
- [ ] Build responsive Header component with navigation menu
- [ ] Build Footer component with contact info and social links
- [x] Build Button component with variants (primary, secondary, outline, ghost)
- [x] Build Card component for portfolio items and products
- [x] Build Input, Textarea, Label components for forms
- [ ] Build Image component with lazy loading and fallback

### Fase 3: Pages

- [ ] Build HomePage with hero section fetching from CMS
- [ ] Build FeaturedPortfolio component for home page
- [ ] Build PortfolioPage with full gallery grid
- [ ] Build ProductCard and ProductGrid components
- [ ] Build ProductsPage displaying all products
- [ ] Build PricingPage with service list from CMS or static data
- [ ] Build FAQPage with accordion component
- [ ] Build TestimonialsPage with review cards
- [ ] Build ContactPage with form (name, email, phone, message)
- [ ] Build AboutPage with story and image

### Fase 4: Polish

- [x] Add loading states (skeleton components) for async data (skeleton.tsx exists)
- [ ] Add error states and fallback UI for failed data fetching
- [ ] Ensure all pages are mobile responsive (test breakpoints)
- [ ] Add page transition animations between routes

### Fase 5: Testing & Quality

- [ ] Write feature test for home page loading
- [ ] Write feature test for portfolio page accessibility
- [ ] Write feature test for contact form validation
- [ ] Run lint:check and fix all ESLint errors
- [ ] Run pint:check and fix all PHP style issues
- [ ] Run full test suite and ensure all tests pass
- [ ] Build production assets (npm run build)

### Fase 6: Documentation

- [ ] Take screenshots for documentation (home, portfolio, contact)
- [ ] Write project documentation (features, CMS content types, setup guide)

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
