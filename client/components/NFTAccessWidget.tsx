
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const NFTAccessWidget = () => {
  const nftData = {
    currentTier: 'Captain',
    nextTier: 'Legend',
    progress: 73,
    totalMinted: 1247,
    maxSupply: 2500,
    currentPrice: '0.25 ETH',
    benefits: ['Priority Voting', 'Exclusive Events', 'Merch Discounts']
  };

  return (
    <Card className="command-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-orbitron font-bold neon-text">Access Pass</h3>
        <Badge className="bg-gradient-to-r from-electric-purple to-neon-red text-white font-orbitron">
          {nftData.currentTier}
        </Badge>
      </div>

      {/* NFT Visualization */}
      <div className="relative mb-6">
        <div className="w-full h-32 bg-gradient-to-br from-electric-purple/20 to-neon-blue/20 rounded-lg border border-electric-purple/30 flex items-center justify-center mb-4">
          <div className="text-4xl">🏆</div>
        </div>
        
        {/* Tier Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress to {nftData.nextTier}</span>
            <span className="text-sm text-electric-purple">{nftData.progress}%</span>
          </div>
          <Progress value={nftData.progress} className="h-2" />
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h4 className="text-sm font-orbitron font-bold mb-3 text-electric-purple">Current Benefits</h4>
        <div className="space-y-2">
          {nftData.benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-electric-purple rounded-full" />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Minting Info */}
      <div className="command-card p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Minted</span>
          <span className="text-sm font-orbitron text-neon-green">
            {nftData.totalMinted}/{nftData.maxSupply}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-sm font-orbitron text-cyber-yellow">
            {nftData.currentPrice}
          </span>
        </div>
      </div>

      {/* Mint Button */}
      <Button className="w-full glow-button bg-gradient-to-r from-electric-purple to-neon-red text-white font-orbitron font-bold">
        Mint Access Pass
      </Button>
    </Card>
  );
};

export default NFTAccessWidget;
