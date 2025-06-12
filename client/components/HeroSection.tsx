
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 stadium-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-red/5" />
      
      {/* Data Streams */}
      <div className="absolute left-10 top-0 data-stream" />
      <div className="absolute right-20 top-0 data-stream" style={{ animationDelay: '1s' }} />
      <div className="absolute left-1/3 top-0 data-stream" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-neon-blue via-electric-purple to-neon-red bg-clip-text text-transparent">
              LOCKER ROOM
            </span>
            <br />
            <span className="text-white">COMMAND</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Unite with fellow fans to fund campaigns, vote on initiatives, and shape the future of your team's culture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="glow-button bg-gradient-to-r from-neon-blue to-electric-purple hover:from-electric-purple hover:to-neon-blue text-command-center-900 font-orbitron font-bold text-lg px-8 py-6 h-auto"
            >
              🚀 CREATE PROPOSAL
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glow-button neon-border bg-command-center-800/50 hover:bg-command-center-700 text-neon-blue font-orbitron font-bold text-lg px-8 py-6 h-auto"
            >
              🏆 VIEW LOCKER
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Proposals', value: '23', color: 'neon-blue' },
              { label: 'Treasury', value: '$47.2K CHZ', color: 'neon-green' },
              { label: 'Members', value: '1,847', color: 'electric-purple' },
              { label: 'Campaigns Funded', value: '156', color: 'neon-red' },
            ].map((stat) => (
              <Card key={stat.label} className="command-card p-6 text-center group hover:scale-105 transition-transform">
                <div className={`text-3xl font-orbitron font-bold text-${stat.color} mb-2 animate-glow`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
