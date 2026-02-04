/**
 * Footer Component
 *
 * Displays copyright and footer information.
 * Uses theme color variables from app.css for consistent styling.
 */
export function Footer() {
    return (
        <footer className="mt-auto border-t border-border bg-secondary py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Vinyl Shop. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
