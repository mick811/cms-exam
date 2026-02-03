import Header from '@/components/header';

interface SimpleHeaderLayoutProps {
    children: React.ReactNode;
}

export default function SimpleHeaderLayout({
    children,
}: SimpleHeaderLayoutProps) {
    return (
        <div className="pt-16">
            <Header />
            {children}
        </div>
    );
}
