import Header from '@/components/header';

interface SimpleHeaderLayoutProps {
    children: React.ReactNode;
}

export default function SimpleHeaderLayout({
    children,
}: SimpleHeaderLayoutProps) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
