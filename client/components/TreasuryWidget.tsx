
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign, Wallet } from 'lucide-react';

const TreasuryWidget = () => {
  const treasuryData = {
    totalBalance: '47,284.56',
    chzBalance: '42,108.33',
    usdValue: '12,847.22',
    monthlyInflow: '+8.7%',
    activeStaking: '15,240.00'
  };

  return (
    <Card className="command-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-orbitron font-bold neon-text">Treasury Command</h3>
        <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-cyber-yellow rounded-lg flex items-center justify-center animate-pulse">
          <Coins className="w-5 h-5 text-command-center-900" />
        </div>
      </div>

      {/* Main Balance */}
      <div className="mb-6">
        <div className="text-3xl font-orbitron font-bold text-neon-green mb-1">
          {treasuryData.chzBalance} CHZ
        </div>
        <div className="text-muted-foreground text-sm">
          ≈ ${treasuryData.usdValue} USD
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="command-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-neon-blue" />
            <span className="text-xs text-muted-foreground">Monthly Flow</span>
          </div>
          <div className="text-lg font-orbitron font-bold text-neon-green">
            {treasuryData.monthlyInflow}
          </div>
        </div>
        
        <div className="command-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-electric-purple" />
            <span className="text-xs text-muted-foreground">Staking</span>
          </div>
          <div className="text-lg font-orbitron font-bold text-electric-purple">
            {treasuryData.activeStaking}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full glow-button bg-gradient-to-r from-neon-green to-cyber-yellow text-command-center-900 font-orbitron font-bold">
          Stake CHZ
        </Button>
        <Button variant="outline" className="w-full neon-border bg-command-center-800 hover:bg-command-center-700">
          View Transactions
        </Button>
      </div>
    </Card>
  );
};

export default TreasuryWidget;
