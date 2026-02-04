import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/why-change', label: 'Why Change' },
  { href: '/what-is-changing', label: 'What Is Changing' },
  { href: '/security', label: 'Security Posture' },
  { href: '/business', label: 'Business Experience' },
];

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img 
            src="/assets/logo.svg" 
            alt="Identity Strategy" 
            className="h-9 w-9"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-foreground leading-tight">Identity Strategy</span>
            <span className="text-xs text-muted-foreground">Enterprise Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/logo.svg" 
                  alt="Identity Strategy" 
                  className="h-8 w-8"
                />
                <span className="text-base font-semibold">Identity Strategy</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
