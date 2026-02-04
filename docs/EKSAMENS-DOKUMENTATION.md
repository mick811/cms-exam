# Vinyl Shop - Eksamens Dokumentation

## Oversigt

Dette er en moderne vinyl webshop bygget med Laravel (backend) og React (frontend) forbundet via Inertia.js. Systemet henter produktdata fra Strapi CMS og har en fuld fungerende indkøbskurv.

---

## 1. Arkitektur & Teknologi Stack

### Hvorfor denne stack?

- **Laravel 12**: Populært PHP framework med god dokumentation, sikkerhed og økosystem
- **React 19**: Moderne frontend bibliotek med komponent-baseret udvikling
- **Inertia.js**: Giver SPA-oplevelse uden at bygge separat API - alt er i ét Laravel projekt
- **Strapi**: Headless CMS - nemt at administrere produkter uden at kode
- **Zustand**: Simple state management til indkøbskurv
- **Tailwind CSS**: Utility-first CSS framework - hurtig styling
- **TypeScript**: Type-sikkerhed - fanger fejl før runtime

### Arkitektur Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP Request
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    LARAVEL (Backend)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routes     │──│ Controllers  │──│   Services   │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
│                                              │              │
│  ┌──────────────┐  ┌──────────────┐         │              │
│  │ Inertia      │──│ React Pages  │◄────────┘              │
│  │ Middleware   │  │ (Components) │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                       │
                       │ API Request
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    STRAPI CMS                                │
│         (Produkter, Genrer, Formater, Billeder)              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Inertia.js - Hvad er det og hvorfor?

### Hvad er Inertia.js?

Inertia er en "glue" mellem backend og frontend. Det gør det muligt at bygge moderne SPAs (Single Page Applications) uden at bygge et separat REST API.

### Hvordan virker det?

1. **Traditionel webapp**: Browseren laver fuld page reload for hver navigation
2. **SPA med API**: Frontend henter JSON data via API kald
3. **Inertia**: Backend renderer React komponenter og sender dem som JSON til frontend, som så opdaterer DOM'en uden page reload

### Hvorfor bruge Inertia?

| Fordel                  | Forklaring                                        |
| ----------------------- | ------------------------------------------------- |
| **Én kodebase**         | Alt er i Laravel projektet - ingen separat API    |
| **Server-side routing** | Laravel kontrollerer routing - sikrere og nemmere |
| **Props fra backend**   | Data sendes som props til React komponenter       |
| **No API maintenance**  | Slip for at vedligeholde API endpoints            |
| **SEO venlig**          | Server-side rendering gør det søgemaskine-venligt |

### Eksempel - Inertia i praksis:

```php
// routes/web.php
Route::get('/products', [ProductController::class, 'index']);

// ProductController.php
public function index(Request $request, StrapiService $strapi): Response
{
    return Inertia::render('products', [
        'products' => $strapi->getProducts(),  // Data sendes som props
        'formats' => $strapi->getFormats(),
    ]);
}
```

```tsx
// resources/js/pages/products.tsx
export default function Products() {
    // Props modtages automatisk fra backend
    const { products, formats } = usePage<PageProps>().props;

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
```

---

## 3. Backend Struktur (Laravel)

### 3.1 Routes (`routes/web.php`)

**Hvorfor**: Routes definerer URL strukturen og peger på Controllers.

```php
// Enkel routing - GET request til /products kører ProductController@index
Route::get('/products', [ProductController::class, 'index'])->name('products');

// Route med parameter - {slug} er en variabel
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Named routes - gør det nemt at generere URLs i koden
// route('products') genererer "/products"
// route('products.show', 'dark-side') genererer "/products/dark-side"
```

### 3.2 Controllers (`app/Http/Controllers/`)

**Hvorfor**: Controllers håndterer HTTP requests og koordinerer mellem Services og Views.

**Single Responsibility Principle**: Hver controller har ét ansvar.

```php
class ProductController extends Controller
{
    // Dependency Injection - Laravel injecterer StrapiService automatisk
    // Hvorfor: Gør koden testbar og løst koblet
    public function index(Request $request, StrapiService $strapi): Response
    {
        // Henter filtre fra URL query string (?q=jazz&format=1)
        $filters = [
            'query' => $request->input('q'),
            'format' => $request->input('format'),
        ];

        // Render Inertia page med data
        return Inertia::render('products', [
            'products' => $strapi->getProducts($filters),
            'formats' => $strapi->getFormats(),
        ]);
    }
}
```

### 3.3 Services (`app/Services/`)

**Hvorfor**: Services indeholder forretningslogik og eksterne integrationer. Controllers skal være "tynde" - de skal bare kalde Services.

**StrapiService Pattern**:

```php
class StrapiService
{
    protected string $baseUrl;
    protected ?string $token;

    public function __construct()
    {
        // Henter config fra config/strapi.php (som læser fra .env)
        $this->baseUrl = config('strapi.url');
        $this->token = config('strapi.token');
    }

    // Hvorfor try-catch: Hvis Strapi er nede, skal app'en ikke crashe
    public function getProducts(array $filters = []): array
    {
        try {
            $response = Http::withToken($this->token)
                ->get("{$this->baseUrl}/api/products", $filters);

            return $response->json('data') ?? [];
        } catch (ConnectionException $e) {
            // Fallback: Returner tom array så siden stadig vises
            Log::error('Strapi connection failed: ' . $e->getMessage());
            return [];
        }
    }
}
```

**Fordele ved Service Pattern**:

1. **Reusability**: Samme service kan bruges i flere controllers
2. **Testability**: Nem at mock'e i tests
3. **Separation of Concerns**: Controller håndterer HTTP, Service håndterer data
4. **Error Handling**: Centraliseret fejlhåndtering

### 3.4 Configuration (`config/strapi.php`)

**Hvorfor**: Config filer holder miljø-specifikke værdier adskilt fra koden.

```php
// config/strapi.php
return [
    'url' => env('STRAPI_URL', 'http://localhost:1337'),
    'token' => env('STRAPI_TOKEN'),
];

// .env (ikke i git!)
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-secret-token
```

---

## 4. Frontend Struktur (React + TypeScript)

### 4.1 Pages (`resources/js/pages/`)

**Hvorfor**: Pages er "ruter" i React - én fil per URL.

```tsx
// pages/products.tsx
// Hver page modtager props fra Laravel via Inertia
export default function Products() {
    // usePage hook henter props fra backend
    const { products, formats, genres } = usePage<PageProps>().props;

    return (
        <div>
            <ProductFilters formats={formats} genres={genres} />
            <ProductGallery products={products} />
        </div>
    );
}

// Layout assignment - hvilken layout skal siden bruge?
Products.layout = (page: React.ReactNode) => (
    <SimpleHeaderLayout>{page}</SimpleHeaderLayout>
);
```

### 4.2 Components (`resources/js/components/`)

**Hvorfor**: Genbrugelige UI dele. Del op efter ansvar.

**Struktur**:

```
components/
├── cart/           # Indkøbskurv relaterede komponenter
│   ├── cart-drawer.tsx
│   └── cart-item.tsx
├── products/       # Produkt relaterede komponenter
│   ├── product-filters.tsx
│   └── product-search.tsx
├── ui/             # Genbrugelige UI komponenter (shadcn)
│   ├── button.tsx
│   ├── input.tsx
│   └── sheet.tsx
├── header.tsx      # Global header
├── footer.tsx      # Global footer
└── strapi-image.tsx # Billedkomponent med fallback
```

### 4.3 TypeScript Typer (`resources/js/types/`)

**Hvorfor**: Typer fanger fejl før runtime og giver autocompletion.

```typescript
// types/strapi.ts
// Definerer hvordan data fra Strapi ser ud
export type StrapiProduct = {
    id: number;
    title: string;
    artist: string;
    price: number;
    stock: number;
    images: StrapiImage[];
    format: StrapiFormat | null;
    genre: StrapiGenre | null;
    // ... flere felter
};

// types/index.ts
// SharedData er props som sendes med på ALLE sider
export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
};
```

---

## 5. State Management - Indkøbskurv

### 5.1 Hvorfor Zustand?

- **Simple**: Minimal boilerplate vs Redux
- **TypeScript native**: God type support
- **Persist middleware**: Nem localStorage integration
- **Small bundle size**: ~1KB

### 5.2 Cart Store (`resources/js/stores/cart.ts`)

```typescript
// Interface definerer strukturen
interface CartStore {
    items: CartItem[];
    addItem: (product: StrapiProduct) => boolean; // Returnerer om det lykkedes
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => boolean;
    total: () => number; // Computed værdi
    itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        // Middleware: Gemmer i localStorage
        (set, get) => ({
            items: [],

            addItem: (product) => {
                // Tjek om vi har nok på lager
                const existingItem = get().items.find(
                    (i) => i.id === product.id,
                );
                if ((existingItem?.quantity || 0) >= product.stock) {
                    return false; // Ikke nok på lager
                }

                // Opdater state med ny vare
                set((state) => ({
                    items: existingItem
                        ? state.items.map((i) =>
                              i.id === product.id
                                  ? { ...i, quantity: i.quantity + 1 }
                                  : i,
                          )
                        : [
                              ...state.items,
                              { id: product.id, product, quantity: 1 },
                          ],
                }));

                return true;
            },

            // Computed: Beregner total pris
            total: () =>
                get().items.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0,
                ),
        }),
        { name: 'cart-storage' }, // localStorage key
    ),
);
```

### 5.3 Hvordan bruges det?

```tsx
// I en komponent
function AddToCartButton({ product }) {
    // Henter funktion fra store
    const addItem = useCartStore((state) => state.addItem);

    const handleClick = () => {
        const success = addItem(product);
        if (!success) {
            alert('Not enough stock!');
        }
    };

    return <button onClick={handleClick}>Add to Cart</button>;
}
```

---

## 6. Database & CMS Integration

### 6.1 Strapi CMS

**Hvad er Strapi?**: Headless CMS - et admin panel til at administrere indhold uden at kode.

**Content Types**:

```
Product
├── title (text)
├── artist (text)
├── price (number)
├── stock (number)
├── description (richtext)
├── images (media - multiple)
├── format (relation to Format)
├── genre (relation to Genre)
└── slug (UID - URL-venlig identifikator)

Format
├── name (text)
└── slug (UID)

Genre
├── type (text)
└── slug (UID)
```

### 6.2 Hvorfor Strapi og ikke Laravel database?

1. **Separat ansvar**: Laravel håndterer webshop logik, Strapi håndterer indhold
2. **Client kan selv administrere**: Kunden kan tilføje produkter uden udvikler
3. **Media håndtering**: Strapi håndterer billedupload og -optimering
4. **Fleksibelt**: Nemt at tilføje nye felter uden migrationer

### 6.3 API Kald Flow

```
Browser
  │ Request: GET /products
  ▼
Laravel Route
  │
  ▼
ProductController@index
  │
  ▼
StrapiService::getProducts()
  │ HTTP Request: GET http://strapi:1337/api/products
  ▼
Strapi CMS
  │
  ▼
Database (SQLite/Postgres)
  │
  ▼
JSON Response
  │
  ▼
StrapiService (parser JSON)
  │
  ▼
ProductController
  │
  ▼
Inertia::render('products', [...])
  │
  ▼
Browser (React rendering)
```

---

## 7. Testing Strategi

### 7.1 Test Typer

| Type            | Hvad testes              | Eksempel                   |
| --------------- | ------------------------ | -------------------------- |
| **Unit**        | Enkelte funktioner       | Cart store beregninger     |
| **Feature**     | End-to-end flow          | Products page loading      |
| **Integration** | Flere komponenter sammen | Cart + Product interaktion |

### 7.2 Feature Tests - Hvorfor mock'e Strapi?

```php
public function test_products_page_loads_with_products(): void
{
    // Mock: Vi vil ikke kalde rigtig Strapi under test
    // Hvorfor: Tests skal være hurtige, isolerede og deterministiske
    $this->mock(StrapiService::class, function ($mock) {
        $mock->shouldReceive('getProducts')
            ->once()
            ->andReturn([
                ['id' => 1, 'title' => 'Test Album', ...],
            ]);
    });

    $response = $this->get(route('products'));

    // Assert: Tjek at responsen er OK
    $response->assertOk();

    // Assert: Tjek at Inertia fik rigtig data
    $response->assertInertia(fn ($page) => $page
        ->component('products')
        ->where('products.0.title', 'Test Album')
    );
}
```

**Hvorfor mocking?**

1. **Speed**: Ingen netværkskald = hurtige tests
2. **Reliability**: Tests fejler ikke pga. netværksproblemer
3. **Isolation**: Test kun vores kode, ikke Strapi
4. **Deterministic**: Samme resultat hver gang

---

## 8. Error Handling & Fallbacks

### 8.1 Niveauer af Error Handling

```
Niveau 1: Komponent (UI)
  └─ StrapiImage fallback hvis billede ikke findes

Niveau 2: Service (Data)
  └─ Try-catch i StrapiService, returner tom array

Niveau 3: Controller (HTTP)
  └─ Abort(404) hvis produkt ikke findes

Niveau 4: Global (Application)
  └─ Exception handler viser custom error page
```

### 8.2 Eksempel - Fuld error handling chain:

```
Scenario: Strapi er nede

1. Browser beder om /products
2. ProductController kalder StrapiService::getProducts()
3. StrapiService forsøger HTTP request → ConnectionException
4. Catch blok returnerer [] (tomt array)
5. Controller renderer products page med tom products array
6. React viser "No products found" besked
7. Bruger ser en fungerende side, ikke en fejlside!
```

---

## 9. Sikkerhed

### 9.1 CSRF Protection

Laravel genererer automatisk CSRF tokens til forms. Inertia håndterer dette transparent.

### 9.2 XSS Protection

- React escape'er automatisk output ({} viser text, ikke HTML)
- Laravel's e() helper escape'er i Blade templates

### 9.3 SQL Injection

Laravel's Query Builder og Eloquent beskytter mod SQL injection automatisk.

### 9.4 Environment Variables

Følsomme data (API keys, tokens) gemmes i `.env` som IKKE committes til git.

---

## 10. Performance Optimeringer

### 10.1 Implementeret

- **Lazy loading**: Inertia loader kun den aktuelle page
- **Image optimization**: Strapi genererer forskellige størrelser
- **localStorage**: Cart persistens reducerer server kald
- **Component lazy loading**: Kan implementeres med React.lazy()

### 10.2 Mulige Forbedringer

- **Caching**: Redis cache til Strapi responses
- **CDN**: Billeder via CDN (Cloudinary, AWS S3)
- **Database indexes**: Hvis vi migrerer fra Strapi til Laravel DB

---

## 11. Vigtige Koncepter at Huske til Eksamen

### Spørgsmål du kan få:

**"Hvad er Inertia.js og hvorfor bruger I det?"**

> Inertia er en protocol der forbinder Laravel backend med React frontend. Det giver SPA-oplevelse uden at bygge separat API. Fordelen er én kodebase, server-side routing, og bedre SEO end traditionelle SPAs.

**"Hvorfor har I en StrapiService i stedet for at kalde HTTP direkte i Controlleren?"**

> Service Pattern giver separation of concerns. Controlleren håndterer HTTP, Servicen håndterer data. Det gør koden testbar (vi kan mock'e servicen) og genbrugelig (samme service kan bruges flere steder).

**"Hvordan håndterer I hvis Strapi CMS er nede?"**

> Vi har try-catch blokke i StrapiService der catcher ConnectionException. Hvis Strapi er nede returnerer vi fallback data (tomme arrays) og logger fejlen. Brugeren ser en fungerende side med "No products found" i stedet for en fejlside.

**"Forklar jeres state management i indkøbskurven"**

> Vi bruger Zustand med persist middleware. Store'en gemmer cart items i localStorage så de overlever page reloads. Vi har actions til add/remove/update og computed values til total pris. Stock checking sker i addItem før vi opdaterer state.

**"Hvordan virker routing i Laravel vs React?"**

> Laravel har ansvaret for routing. Når brugeren klikker et link bruger Inertia's <Link> komponent et fetch kald til Laravel. Laravel returnerer JSON med React komponent navn og props. Inertia opdaterer så React DOM'en uden fuld page reload.

---

## Screenshots

Se `docs/screenshots/` mappen for visuelle referencer.

Anbefalede screenshots til at tage:

1. **Homepage** - Hero sektion og popular products
2. **Products page** - Grid layout med filtre
3. **Product detail** - Single product med add to cart
4. **Cart drawer** - Sidebar cart med items
5. **Cart page** - Full cart page med order summary
6. **Empty states** - Cart empty, no products found
7. **Mobile view** - Responsive design på mindre skærme
8. **Error page** - 404 error page

---

## Kode Stil & Konventioner

### PHP (Laravel)

- **Pint**: Koden formatteres automatisk med Laravel Pint
- **Type declarations**: Alt har type hints for bedre IDE support
- **Constructor injection**: Dependencies injectes i constructor
- **Named routes**: Alle routes har navne for nem URL generering

### TypeScript/React

- **ESLint**: Koden lintes automatisk
- **Functional components**: Alle komponenter er functions med hooks
- **Type safety**: Interface/Type for alle props og data
- **Destructuring**: Props destructures for readability
- **Named exports**: Komponenter exporteres med navn (export function)

---

## Ressourcer

- **Laravel docs**: https://laravel.com/docs/12.x
- **Inertia docs**: https://inertiajs.com/
- **React docs**: https://react.dev/
- **Zustand docs**: https://docs.pmnd.rs/zustand
- **Strapi docs**: https://docs.strapi.io/

---

_Dokumentation skrevet til eksamensformål. Senest opdateret: Februar 2025_
