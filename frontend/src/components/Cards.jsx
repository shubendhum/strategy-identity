import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  outcome,
  className,
  delay = 0 
}) => {
  return (
    <Card 
      className={cn(
        "feature-card border-border/50 bg-card hover:border-primary/30 animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-4">
        {icon && (
          <div className="icon-container mb-4">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </CardDescription>
        {outcome && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm">
              <span className="font-semibold text-primary">Outcome: </span>
              <span className="text-muted-foreground">{outcome}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const StatCard = ({ 
  value, 
  label, 
  icon,
  className,
  delay = 0 
}) => {
  return (
    <Card 
      className={cn(
        "text-center p-6 border-border/50 bg-card animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-0">
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="icon-container">
              {icon}
            </div>
          </div>
        )}
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
};

export const TransformationCard = ({ 
  from, 
  to,
  className 
}) => {
  return (
    <Card className={cn("p-6 border-border/50 bg-card", className)}>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* From */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-destructive uppercase tracking-wide">From</h4>
            <ul className="space-y-2">
              {from.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          
          {/* To */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-success uppercase tracking-wide">To</h4>
            <ul className="space-y-2">
              {to.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-success/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
