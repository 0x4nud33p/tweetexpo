"use client";

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import ProposalCard from '@/components/ProposalCard';
import TreasuryWidget from '@/components/TreasuryWidget';
import NFTAccessWidget from '@/components/NFTAccessWidget';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
  const mockProposals = [
    {
      id: '1',
      title: "Champion's Tifo Banner",
      description: 'Create massive tifo display for the Champions League final featuring club legends and motivational quotes.',
      status: 'active' as const,
      votesFor: 847,
      votesAgainst: 123,
      totalVotes: 970,
      timeLeft: '3d 14h left',
      budget: '15,000 CHZ',
      category: 'Stadium Culture',
      teamColor: 'neon-blue'
    },
    {
      id: '2', 
      title: 'Player Meet & Greet Event',
      description: 'Organize exclusive fan meetup with first team players at training ground.',
      status: 'pending' as const,
      votesFor: 234,
      votesAgainst: 56,
      totalVotes: 290,
      timeLeft: '6d 8h left',
      budget: '8,500 CHZ',
      category: 'Fan Experience',
      teamColor: 'electric-purple'
    },
    {
      id: '3',
      title: 'Limited Edition Jersey Drop',
      description: 'Commission artist-designed jersey celebrating 125 years of club history.',
      status: 'passed' as const,
      votesFor: 1205,
      votesAgainst: 187,
      totalVotes: 1392,
      timeLeft: 'Passed',
      budget: '25,000 CHZ',
      category: 'Merchandise',
      teamColor: 'neon-green'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Dashboard Content */}
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Proposals Column */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-orbitron font-bold neon-text">Active Proposals</h2>
                  <Badge className="bg-neon-red/20 text-neon-red border-neon-red/30 font-orbitron">
                    {mockProposals.filter(p => p.status === 'active').length} Live
                  </Badge>
                </div>
                
                <div className="space-y-6">
                  {mockProposals.map((proposal) => (
                    <ProposalCard key={proposal.id} {...proposal} />
                  ))}
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                <TreasuryWidget />
                <NFTAccessWidget />
                
                {/* Quick Actions */}
                <div className="command-card p-6">
                  <h3 className="text-lg font-orbitron font-bold mb-4 neon-text">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full glow-button bg-gradient-to-r from-neon-blue to-electric-purple text-command-center-900 font-orbitron font-bold">
                      Create Proposal
                    </Button>
                    <Button variant="outline" className="w-full neon-border bg-command-center-800 hover:bg-command-center-700">
                      Delegate Votes
                    </Button>
                    <Button variant="outline" className="w-full border-electric-purple/30 text-electric-purple hover:bg-electric-purple hover:text-command-center-900">
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
