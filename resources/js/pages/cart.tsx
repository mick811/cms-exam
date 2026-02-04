import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CartItemCard } from '@/components/cart/cart-item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SimpleHeaderLayout from '@/layouts/simple-header-layout';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';

export default function Cart() {
    const { items, removeItem, updateQuantity, total, itemCount, clearCart } =
        useCartStore();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Cart" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-light tracking-tight">
                        Shopping Cart
                    </h1>
                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearCart}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Trash2 className="mr-2 size-4" />
                            Clear Cart
                        </Button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-24">
                        <ShoppingCart className="size-24 text-muted-foreground" />
                        <div className="text-center">
                            <h2 className="text-xl font-medium">
                                Your cart is empty
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Looks like you haven't added anything yet.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-xs bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded-xs border border-border">
                                {items.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onRemove={() => removeItem(item.id)}
                                        onUpdateQuantity={(q) =>
                                            updateQuantity(item.id, q)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6 rounded-xs border border-border p-6">
                                <h2 className="text-lg font-medium">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Items
                                        </span>
                                        <span>{itemCount()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>
                                        <span>{formatPrice(total())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Shipping
                                        </span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-medium">
                                    <span>Total</span>
                                    <span>{formatPrice(total())}</span>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/checkout"
                                        className="flex w-full items-center justify-center rounded-xs bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="flex w-full items-center justify-center rounded-xs border border-border bg-background py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Cart.layout = (page: React.ReactNode) => (
    <SimpleHeaderLayout>{page}</SimpleHeaderLayout>
);
