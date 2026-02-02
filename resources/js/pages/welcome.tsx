import { usePage } from '@inertiajs/react';
import { StrapiImage } from '@/components/strapi-image';
import type { HeroData, SharedData } from '@/types';

interface PageProps extends SharedData {
    hero: HeroData;
}

export default function Welcome() {
    const { hero } = usePage<PageProps>().props;

    return (
        <div>
            <StrapiImage
                image={hero.image}
                alt="billede af en hero"
                className="h-auto w-full object-cover"
            />
        </div>
    );
}
