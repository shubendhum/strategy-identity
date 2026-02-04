import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Eye, 
  ShieldAlert,
  ArrowRight,
  FileText,
  Settings,
  Unlink,
  Key,
  RefreshCcw
} from 'lucide-react';

const challenges = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Manual work orders and tickets',
    description: 'Identity changes require extensive manual processing through ticketing systems.',
  },
  {
    icon: <RefreshCcw className="w-5 h-5" />,
    title: 'Batch-based processing',
    description: 'Changes are processed in batches rather than in real-time, causing delays.',
  },
  {
    icon: <Unlink className="w-5 h-5" />,
    title: 'Disconnected tools and interfaces',
    description: 'Multiple siloed tools create fragmented experiences and inconsistent processes.',
  },
  {
    icon: <Key className="w-5 h-5" />,
    title: 'Long-lived credentials and static secrets',
    description: 'Over-reliance on persistent credentials increases security risk.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Periodic reviews instead of continuous validation',
    description: 'Access reviews happen periodically rather than continuously, missing real-time risks.',
  },
];

const impacts = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Slow Onboarding',
    description: 'Slow onboarding of applications and access changes delays time-to-value.',
    color: 'text-warning',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'High Costs',
    description: 'High operational cost for central teams managing manual processes.',
    color: 'text-destructive',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Limited Visibility',
    description: 'Limited visibility for business owners into their identity posture.',
    color: 'text-warning',
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: 'Increased Risk',
    description: 'Increased risk when access changes are delayed or missed entirely.',
    color: 'text-destructive',
  },
];

const WhyChangePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title="Why Change Is Needed Now"
          description="Understanding the current challenges that make transformation essential for the organisation's future."
          icon={<AlertTriangle className="w-7 h-7 text-white" />}
        />

        {/* Current Challenges */}
        <Section>
          <SectionHeader
            subtitle="Current State"
            title="Identity Controls Today"
            description="Across the organisation, identity controls rely heavily on outdated approaches that create operational friction."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card 
                key={index} 
                className="border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Business Impact */}
        <Section variant="muted">
          <SectionHeader
            subtitle="Business Impact"
            title="Real Consequences for the Organisation"
            description="These challenges create tangible business impact that affects delivery speed, costs, and risk."
            align="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impacts.map((impact, index) => (
              <Card 
                key={index} 
                className="text-center border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-full bg-background flex items-center justify-center mx-auto mb-4 ${impact.color}`}>
                    {impact.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{impact.title}</h3>
                  <p className="text-sm text-muted-foreground">{impact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Key Message */}
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              The Current Model Does Not Scale
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The current model does not scale with the pace at which the organisation 
              is building and operating applications. A fundamental shift is needed to 
              enable the business to move faster while maintaining—and improving—security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/what-is-changing" className="flex items-center gap-2">
                  See What's Changing <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Back to Overview</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyChangePage;
