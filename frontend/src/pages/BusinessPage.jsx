import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader, DiagramContainer } from '@/components/Section';
import { FeatureCard } from '@/components/Cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  ArrowRight,
  Target,
  Layers,
  Activity,
  CheckCircle2,
  Home
} from 'lucide-react';

const businessBenefits = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'One Identity Entry Point',
    description: 'A single place to interact with identity. Consistent experience across access, privilege, and lifecycle actions.',
    outcome: 'Less confusion, fewer handoffs, faster outcomes.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Multi-Channel Access',
    description: 'A consistent API layer supports user interfaces, system integrations, automation pipelines, and developer workflows.',
    outcome: 'Faster integration and less duplication.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Real-Time Identity Data',
    description: 'Identity data is available through APIs and events. Business teams can see access posture and changes when they need it.',
    outcome: 'Reduced dependency on central teams and faster decision-making.',
  },
];

const channels = [
  { name: 'User Interface', description: 'Self-service portals for end users and administrators' },
  { name: 'System Integration', description: 'Automated provisioning and deprovisioning workflows' },
  { name: 'Automation Pipelines', description: 'CI/CD integration for infrastructure as code' },
  { name: 'Developer Workflows', description: 'APIs and SDKs for application development' },
];

const BusinessPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title="How This Improves the Business Experience"
          description="Identity becomes an enabler of business velocity, not a barrier to getting work done."
          icon={<Briefcase className="w-7 h-7 text-white" />}
        />

        {/* Business Overview */}
        <Section>
          <SectionHeader
            subtitle="Business Enablement"
            title="Identity That Works For You"
            description="The new identity platform provides a unified, consistent experience that enables teams to move faster."
          />
          
          <DiagramContainer
            src="/assets/business-diagram.svg"
            alt="Business Experience"
            caption="Multiple channels accessing a unified identity platform"
          />
        </Section>

        {/* Business Benefits */}
        <Section variant="muted">
          <SectionHeader
            subtitle="Key Benefits"
            title="Transforming the Business Experience"
            description="Three fundamental improvements that change how teams interact with identity."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {businessBenefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                outcome={benefit.outcome}
                delay={index * 100}
              />
            ))}
          </div>
        </Section>

        {/* Multi-Channel Access */}
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="Multi-Channel Platform"
              title="Access Identity Your Way"
              description="A consistent API layer supports multiple channels, enabling teams to interact with identity in the way that works best for them."
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {channels.map((channel, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{channel.name}</h4>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Summary */}
        <Section variant="muted">
          <div className="max-w-3xl mx-auto">
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent">
                  <Briefcase className="w-6 h-6" />
                  Business Experience Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The identity strategy transforms the business experience by providing 
                  a unified, self-service platform that enables teams to manage identity 
                  without dependencies on central teams.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Single entry point for all identity interactions</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Consistent APIs across all integration patterns</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Real-time visibility into identity posture</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Self-service capabilities that reduce bottlenecks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" /> Back to Overview
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/security">Review Security Benefits</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessPage;
