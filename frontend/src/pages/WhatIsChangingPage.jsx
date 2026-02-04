import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader, DiagramContainer } from '@/components/Section';
import { TransformationCard } from '@/components/Cards';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RefreshCcw, 
  ArrowRight,
  Database,
  Activity,
  Code2,
  Eye,
  CheckCircle2
} from 'lucide-react';

const transformations = [
  {
    from: ['Ticket-driven', 'Manual and batch-based', 'Tool-centric', 'Reactive and review-based'],
    to: ['Data-driven', 'Event-based', 'API-enabled', 'Observable and resilient'],
  },
];

const capabilities = [
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Data-Driven',
    description: 'Identity decisions powered by real-time data and contextual information, not static rules.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Event-Based',
    description: 'Identity changes processed as events occur, enabling immediate response and automation.',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'API-Enabled',
    description: 'Consistent API layer that supports multiple channels and integration patterns.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Observable',
    description: 'Full visibility into identity operations with monitoring, alerting, and diagnostics.',
  },
];

const WhatIsChangingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title="What Is Changing"
          description="We are repositioning identity from a back-office function to a business-enabled platform."
          icon={<RefreshCcw className="w-7 h-7 text-white" />}
        />

        {/* Transformation Overview */}
        <Section>
          <SectionHeader
            subtitle="The Shift"
            title="From Back-Office to Business Enabler"
            description="A fundamental repositioning of how identity serves the organisation."
          />
          
          <TransformationCard
            from={transformations[0].from}
            to={transformations[0].to}
            className="mb-8"
          />
          
          <DiagramContainer
            src="/assets/transformation-diagram.svg"
            alt="Identity Transformation"
            caption="The transformation from legacy processes to modern identity platform"
          />
        </Section>

        {/* New Capabilities */}
        <Section variant="muted">
          <SectionHeader
            subtitle="New Capabilities"
            title="Building a Modern Identity Platform"
            description="The new platform introduces capabilities that fundamentally change how identity supports the business."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {capabilities.map((capability, index) => (
              <Card 
                key={index} 
                className="border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="icon-container flex-shrink-0">
                      {capability.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                      <p className="text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Key Benefit */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                The Result
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              This allows identity to support delivery at speed, without increasing risk 
              or operational overhead. Teams can move faster, with built-in security and 
              governance that works automatically.
            </p>
            
            <div className="bg-muted/50 rounded-xl p-6 border border-border/50 mb-8">
              <h3 className="font-semibold text-foreground mb-4">Key Outcomes:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Faster application onboarding with automated identity provisioning</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Reduced operational overhead through self-service and automation</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Improved security with continuous validation and real-time controls</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Better visibility for business teams into their identity posture</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/security" className="flex items-center gap-2">
                  See Security Benefits <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/why-change">Back to Why Change</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default WhatIsChangingPage;
