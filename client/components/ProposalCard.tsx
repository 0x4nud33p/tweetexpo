
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Coins, Heart } from 'lucide-react';

interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  timeLeft: string;
  budget: string;
  category: string;
  teamColor?: string;
}

const ProposalCard = ({ 
  title, 
  description, 
  status, 
  votesFor, 
  votesAgainst, 
  totalVotes,
  timeLeft, 
  budget, 
  category,
  teamColor = 'neon-blue'
}: ProposalCardProps) => {
  const votePercentage = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0;
  
  const statusColors = {
    active: 'neon-blue',
    passed: 'neon-green',
    rejected: 'neon-red',
    pending: 'cyber-yellow'
  };

  return (
    <Card className="command-card p-6 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
      {/* Status indicator */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-${statusColors[status]}`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`border-${teamColor} text-${teamColor}`}>
              {category}
            </Badge>
            <Badge 
              variant="secondary" 
              className={`bg-${statusColors[status]}/20 text-${statusColors[status]} border-${statusColors[status]}/30`}
            >
              {status.toUpperCase()}
            </Badge>
          </div>
          <h3 className="text-xl font-orbitron font-bold mb-2 group-hover:text-neon-blue transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Vote Progress</span>
          <span className="text-sm text-muted-foreground">
            {votesFor}/{totalVotes} votes
          </span>
        </div>
        <Progress value={votePercentage} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="text-neon-green">👍 {votesFor} For</span>
          <span className="text-neon-red">👎 {votesAgainst} Against</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between mb-6 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {timeLeft}
        </div>
        <div className="flex items-center gap-1 text-neon-green">
          <Coins className="w-4 h-4" />
          {budget}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          size="sm" 
          className="flex-1 bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-command-center-900"
        >
          Vote For
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 border-neon-red/30 text-neon-red hover:bg-neon-red hover:text-white"
        >
          Vote Against
        </Button>
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-neon-blue">
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ProposalCard;
