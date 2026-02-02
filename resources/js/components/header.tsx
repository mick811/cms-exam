import { Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { search } from '@/routes';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(search.url(), { q: searchQuery.trim() });
        }
    };

    return (
        <header className="fixed top-0 right-0 left-0 z-50 bg-sidebar text-sidebar-foreground">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link
                            href="/products"
                            className="font-medium tracking-wide uppercase transition-colors hover:text-sidebar-accent-foreground"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="font-medium tracking-wide uppercase transition-colors hover:text-sidebar-accent-foreground"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="font-medium tracking-wide uppercase transition-colors hover:text-sidebar-accent-foreground"
                        >
                            Contact Us
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <form
                        onSubmit={handleSearch}
                        className="hidden items-center sm:flex"
                    >
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-64 rounded-xs bg-sidebar-accent px-4 pr-10 text-sidebar-accent-foreground placeholder:text-sidebar-foreground/70 focus:ring-2 focus:ring-sidebar-ring focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="-ml-8 flex items-center justify-center p-2 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
                        >
                            <Search className="size-4" />
                        </button>
                    </form>

                    <button className="flex items-center justify-center p-2 transition-colors hover:text-sidebar-accent-foreground">
                        <User className="size-5" />
                    </button>

                    <button className="flex items-center justify-center p-2 transition-colors hover:text-sidebar-accent-foreground">
                        <ShoppingCart className="size-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
