import { Head, usePage } from '@inertiajs/react';
import { ProductGallery } from '@/components/product-gallery';
import SimpleHeaderLayout from '@/layouts/simple-header-layout';
import type { SharedData, StrapiProduct } from '@/types';

interface PageProps extends SharedData {
    products: StrapiProduct[];
    query: string;
}

export default function Search() {
    const { products, query } = usePage<PageProps>().props;

    return (
        <div className="px-4 py-6 md:px-8 md:py-8 lg:px-12">
            <Head title={`Search: ${query}`} />

            <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl md:text-4xl">
                Search Results
            </h1>

            {query && (
                <p className="mt-2 text-muted-foreground">
                    Showing results for "{query}"
                </p>
            )}

            {products.length > 0 ? (
                <ProductGallery products={products} className="mt-6" />
            ) : (
                <div className="mt-8 text-center">
                    <p className="text-lg text-muted-foreground">
                        {query
                            ? 'No products found matching your search.'
                            : 'Enter a search term to find products.'}
                    </p>
                </div>
            )}
        </div>
    );
}

Search.layout = (page: React.ReactNode) => (
    <SimpleHeaderLayout>{page}</SimpleHeaderLayout>
);
