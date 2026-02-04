import React from 'react';
import { cn } from '@/lib/utils';

export const Section = ({ 
  children, 
  className,
  id,
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    primary: 'hero-gradient text-white',
  };

  return (
    <section id={id} className={cn("section-padding", variants[variant], className)}>
      <div className="container mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({ 
  title, 
  subtitle, 
  description,
  align = 'left',
  className 
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right',
  };

  return (
    <div className={cn("max-w-3xl mb-12", alignments[align], className)}>
      {subtitle && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export const DiagramContainer = ({ 
  src, 
  alt, 
  caption,
  className 
}) => {
  return (
    <figure className={cn("my-8", className)}>
      <div className="bg-muted/30 rounded-xl p-4 md:p-8 border border-border/50">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto max-w-4xl mx-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
