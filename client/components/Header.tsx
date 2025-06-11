
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Settings } from 'lucide-react';

const Header = () => {
  const [walletAddress] = useState('0x742d...8b9f');
  const [role] = useState('Captain');
  const [xp] = useState(2847);
  const [level] = useState(12);

  return (
    <header className="border-b border-command-center-600 bg-command-center-900/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-electric-purple rounded-lg flex items-center justify-center">
              <span className="text-command-center-900 font-orbitron font-bold text-lg">LR</span>
            </div>
            <div>
              <h1 className="text-2xl font-orbitron font-bold neon-text">LockerRoom DAO</h1>
              <p className="text-xs text-muted-foreground">SportFi Command Center</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-command-center-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-green rounded-full transition-all duration-300"
                  style={{ width: `${(xp % 1000) / 10}%` }}
                />
              </div>
              <span className="text-sm font-medium text-neon-blue">LVL {level}</span>
            </div>
            
            <Badge variant="secondary" className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">
              {role}
            </Badge>
          </div>

          {/* Wallet & Settings */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="neon-border bg-command-center-800 hover:bg-command-center-700">
              <Wallet className="w-4 h-4 mr-2" />
              {walletAddress}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-blue">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
