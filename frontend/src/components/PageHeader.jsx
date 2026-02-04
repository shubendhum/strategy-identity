import React from 'react';
import { cn } from '@/lib/utils';

export const PageHeader = ({ 
  title, 
  description, 
  icon,
  className 
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background pattern */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {icon && (
            <div className="mb-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur">
                {icon}
              </div>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/80 leading-relaxed animate-fade-in animation-delay-100">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
