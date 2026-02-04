import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader, DiagramContainer } from '@/components/Section';
import { FeatureCard, StatCard } from '@/components/Cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Zap, 
  TrendingDown, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Globe,
  Code2
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <PageHeader
          title="Identity Strategy"
          description="Reducing cost, improving security, and enabling seamless experience across the enterprise."
          icon={<Shield className="w-7 h-7 text-white" />}
        />

        {/* Key Principles */}
        <Section variant="muted">
          <SectionHeader
            subtitle="Strategic Focus"
            title="Three Pillars of Identity Transformation"
            description="Our identity strategy is built on three fundamental principles that drive every decision and implementation."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={<TrendingDown className="w-6 h-6" />}
              title="Reduce Cost"
              description="Eliminate manual processes and operational overhead through automation and self-service capabilities."
              outcome="Lower operational costs and faster time-to-value"
              delay={0}
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Improve Security"
              description="Build security controls directly into the platform with continuous validation and real-time monitoring."
              outcome="Stronger security posture with reduced risk exposure"
              delay={100}
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Enable Business"
              description="Provide seamless identity experiences that enable the business to move faster with confidence."
              outcome="Faster delivery and improved business agility"
              delay={200}
            />
          </div>
        </Section>

        {/* Overview Diagram */}
        <Section>
          <SectionHeader
            subtitle="Platform Overview"
            title="A Unified Identity Platform"
            description="Identity is fundamental to how applications are onboarded, accessed, secured, and governed."
          />
          
          <DiagramContainer
            src="/assets/hero-diagram.svg"
            alt="Identity Platform Overview"
            caption="The Identity Platform connects applications, security, and business value"
          />
          
          <div className="mt-12 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Today, identity capabilities exist across the organisation, but they are fragmented, 
              manually operated, and difficult to scale. This strategy defines how we simplify 
              identity so it works <strong className="text-foreground">for the business</strong>, not against it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By shifting identity from a process-heavy control function to a data-driven platform, 
              we reduce cost, strengthen security, and enable the business to move faster with confidence.
            </p>
          </div>
        </Section>

        {/* Quick Navigation */}
        <Section variant="muted">
          <SectionHeader
            subtitle="Explore the Strategy"
            title="Understanding the Change"
            description="Dive deeper into each aspect of our identity transformation journey."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="icon-container mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Why Change</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Understand the current challenges and why transformation is needed now.
                </p>
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to="/why-change" className="flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="icon-container mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">What Is Changing</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  See how we&apos;re repositioning identity from back-office to business enabler.
                </p>
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to="/what-is-changing" className="flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="icon-container mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Security Posture</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Discover how the strategy strengthens our overall security posture.
                </p>
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to="/security" className="flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="icon-container mb-4">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Business Experience</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Learn how this improves the day-to-day experience for teams.
                </p>
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to="/business" className="flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Learn More?
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore the full identity strategy documentation to understand 
              the changes and how they impact your teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/why-change">Start with Why Change</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/security">View Security Benefits</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
