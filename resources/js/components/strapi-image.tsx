import { useMemo } from 'react';
import type { StrapiImage as StrapiImageType } from '@/types';

interface StrapiImageProps {
    image: StrapiImageType;
    alt?: string;
    className?: string;
    fallback?: React.ReactNode;
}

export function StrapiImage({
    image,
    alt,
    className,
    fallback = null,
}: StrapiImageProps) {
    const src = useMemo(() => {
        if (!image?.url) return null;
        return image.url.startsWith('http')
            ? image.url
            : `${import.meta.env.VITE_STRAPI_URL}${image.url}`;
    }, [image?.url]);

    if (!src) {
        return <>{fallback}</>;
    }

    return <img src={src} alt={alt || ''} className={className} />;
}
