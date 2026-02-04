import { Head, usePage } from '@inertiajs/react';
import { ProductGallery } from '@/components/product-gallery';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductSearch } from '@/components/products/product-search';
import { useProductFilters } from '@/hooks/useProductFilters';
import SimpleHeaderLayout from '@/layouts/simple-header-layout';
import type {
    SharedData,
    StrapiFormat,
    StrapiGenre,
    StrapiProduct,
} from '@/types';

interface Filters {
    query: string;
    format: number | null;
    genre: number | null;
    minPrice: number | null;
    maxPrice: number | null;
}

interface PageProps extends SharedData {
    products: StrapiProduct[];
    formats: StrapiFormat[];
    genres: StrapiGenre[];
    priceRange: { min: number; max: number };
    filters: Filters;
}

export default function Products() {
    const { products, formats, genres, priceRange, filters } =
        usePage<PageProps>().props;

    const {
        search,
        setSearch,
        format,
        setFormat,
        genre,
        setGenre,
        price,
        setPrice,
    } = useProductFilters({ initialFilters: filters, priceRange });

    return (
        <div className="flex gap-8 px-4 py-6 md:px-8 md:py-8 lg:px-12">
            <Head
                title={
                    filters.query ? `Products: ${filters.query}` : 'Products'
                }
            />

            <ProductFilters
                formats={formats}
                genres={genres}
                priceRange={priceRange}
                format={format}
                genre={genre}
                price={price}
                onFormatChange={setFormat}
                onGenreChange={setGenre}
                onPriceChange={setPrice}
            />

            <div className="flex-1">
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl md:text-4xl">
                            Products
                        </h1>
                        {filters.query && (
                            <p className="mt-2 text-muted-foreground">
                                Showing results for "{filters.query}"
                            </p>
                        )}
                    </div>

                    <ProductSearch value={search} onChange={setSearch} />
                </div>

                {products.length > 0 ? (
                    <ProductGallery
                        products={products}
                        variant="catalog"
                        className="mt-8"
                    />
                ) : (
                    <div className="mt-10 text-center">
                        <p className="text-lg text-muted-foreground">
                            No products found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

Products.layout = (page: React.ReactNode) => (
    <SimpleHeaderLayout>{page}</SimpleHeaderLayout>
);
