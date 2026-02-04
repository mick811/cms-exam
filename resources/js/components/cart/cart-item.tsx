import { Link } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { StrapiImage } from '@/components/strapi-image';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/stores/cart';

interface CartItemProps {
    item: CartItem;
    onRemove: () => void;
    onUpdateQuantity: (quantity: number) => void;
}

export function CartItemCard({
    item,
    onRemove,
    onUpdateQuantity,
}: CartItemProps) {
    const { product, quantity } = item;

    return (
        <div className="flex gap-4 border-b border-border p-4">
            <Link
                href={`/products/${product.slug}`}
                className="shrink-0 overflow-hidden rounded-xs"
            >
                <StrapiImage
                    image={product.images[0]}
                    alt={product.images[0]?.alternativeText || product.title}
                    className="size-20 object-cover"
                    fallback={<div className="size-20 bg-muted" />}
                />
            </Link>

            <div className="flex flex-1 flex-col gap-1">
                <Link
                    href={`/products/${product.slug}`}
                    className="line-clamp-1 font-medium hover:underline"
                >
                    {product.title}
                </Link>

                <p className="text-sm text-muted-foreground">
                    {product.artist}
                </p>

                <p className="font-semibold text-foreground">
                    {formatPrice(product.price)}
                </p>

                <div className="mt-2 flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-7 rounded-xs"
                        onClick={() => onUpdateQuantity(quantity - 1)}
                    >
                        <Minus className="size-3" />
                    </Button>

                    <span className="w-8 text-center text-sm">{quantity}</span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="size-7 rounded-xs"
                        onClick={() => onUpdateQuantity(quantity + 1)}
                        disabled={quantity >= (product.stock || 0)}
                    >
                        <Plus className="size-3" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-7 text-muted-foreground hover:text-foreground"
                        onClick={onRemove}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
