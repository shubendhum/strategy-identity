import React from 'react';
import { Link } from 'react-router-dom';
import { getNavItems } from '@/config/pages';

export const Footer = () => {
  const navItems = getNavItems();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo.svg" 
                alt="Identity Strategy" 
                className="h-10 w-10"
              />
              <div>
                <div className="font-semibold text-foreground">Identity Strategy</div>
                <div className="text-sm text-muted-foreground">Enterprise Platform</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Reducing cost, improving security, and enabling seamless business experience through modern identity management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navItems.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>For questions about the Identity Strategy, please contact the Identity Platform team.</p>
              <p className="text-primary font-medium">identity-platform@company.com</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Identity Strategy. Internal Use Only.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Version 1.0</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
