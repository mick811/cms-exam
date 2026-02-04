import { Link } from '@inertiajs/react';
import { ShoppingCart, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { CartItemCard } from './cart-item';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, total, itemCount } =
        useCartStore();

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="flex w-full flex-col p-0 sm:max-w-md [&>button]:hidden"
            >
                <SheetHeader className="relative flex flex-row items-center justify-between border-b border-border p-4">
                    <SheetTitle className="flex items-center gap-2 text-xl">
                        <ShoppingCart className="size-5" />
                        Cart ({itemCount()} items)
                    </SheetTitle>
                    <button
                        onClick={onClose}
                        className="rounded-xs p-1 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Close cart"
                    >
                        <X className="size-5" />
                    </button>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
                            <ShoppingCart className="size-16 text-muted-foreground" />
                            <p className="text-center text-muted-foreground">
                                Your cart is empty
                            </p>
                            <Link
                                href="/products"
                                onClick={onClose}
                                className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    ) : (
                        <div>
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
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-4 border-t border-border p-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Subtotal:</span>
                            <span className="text-xl font-bold text-foreground">
                                {formatPrice(total())}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="flex items-center justify-center rounded-xs border border-foreground bg-background py-3 font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="flex items-center justify-center rounded-xs bg-foreground py-3 font-medium text-background transition-colors hover:bg-foreground/90"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
