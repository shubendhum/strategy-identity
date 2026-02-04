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
  Shield, 
  ArrowRight,
  Activity,
  KeyRound,
  Settings,
  Bot,
  Eye,
  CheckCircle2
} from 'lucide-react';

const securityBenefits = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Continuous Instead of Periodic Controls',
    description: 'Identity events are captured as they occur. Access, authentication, and privilege changes are visible in real time. Failures are detected early, not months later during reviews.',
    outcome: 'Reduced exposure windows and faster response.',
  },
  {
    icon: <KeyRound className="w-6 h-6" />,
    title: 'Privileged Access Without Long-Lived Secrets',
    description: 'Reduced reliance on static credentials. Fewer shared or generic accounts. Increased use of workload identity and attestation.',
    outcome: 'Lower credential leakage risk and smaller blast radius.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Secure-by-Default Onboarding',
    description: 'Applications are onboarded with authentication, access management, governance, and privilege controls applied together from day one.',
    outcome: 'Fewer gaps, fewer retrofitted controls, stronger baseline security.',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'Automation Reduces Human Error',
    description: 'Manual identity steps are replaced with consistent workflows. Decisions are based on structured, real-time data.',
    outcome: 'Fewer misconfigurations and missed revocations.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Resilience Through Observability',
    description: 'Identity services are monitored like critical platforms. Failures are visible and actionable. Recovery is predictable.',
    outcome: 'Reduced operational risk and higher confidence in automated controls.',
  },
];

const SecurityPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title="How the Strategy Improves Security Posture"
          description="Security improves because controls are built into the platform, not layered on through process."
          icon={<Shield className="w-7 h-7 text-white" />}
        />

        {/* Security Overview */}
        <Section>
          <SectionHeader
            subtitle="Security by Design"
            title="Built-In, Not Bolted-On"
            description="The identity platform embeds security controls directly into its architecture, ensuring consistent protection without manual intervention."
          />
          
          <DiagramContainer
            src="/assets/security-diagram.svg"
            alt="Security Architecture"
            caption="Security controls embedded across all aspects of the identity platform"
          />
        </Section>

        {/* Security Benefits */}
        <Section variant="muted">
          <SectionHeader
            subtitle="Security Benefits"
            title="Five Pillars of Improved Security"
            description="Each aspect of the strategy contributes to a stronger overall security posture."
            align="center"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {securityBenefits.slice(0, 4).map((benefit, index) => (
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
          
          {/* Fifth card - full width */}
          <div className="max-w-5xl mx-auto mt-6">
            <FeatureCard
              icon={securityBenefits[4].icon}
              title={securityBenefits[4].title}
              description={securityBenefits[4].description}
              outcome={securityBenefits[4].outcome}
              delay={400}
              className="lg:max-w-2xl lg:mx-auto"
            />
          </div>
        </Section>

        {/* Summary */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Shield className="w-6 h-6" />
                  Security Posture Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The identity strategy transforms security from a compliance checkbox 
                  into a continuous, automated capability. By building controls into the 
                  platform itself, we achieve:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Continuous validation instead of periodic reviews</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Real-time visibility into identity events and changes</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Automated enforcement of security policies</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Reduced attack surface through modern credential practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/business" className="flex items-center gap-2">
                  See Business Benefits <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/what-is-changing">Back to What&apos;s Changing</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;
