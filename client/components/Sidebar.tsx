
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  Wallet, 
  Settings, 
  User
} from 'lucide-react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('locker');

  const menuItems = [
    { id: 'locker', label: 'Locker', icon: LayoutDashboard, badge: null },
    { id: 'proposals', label: 'Proposals', icon: FileText, badge: '12' },
    { id: 'treasury', label: 'Treasury', icon: Wallet, badge: null },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-72 bg-command-center-900 border-r border-command-center-600 h-screen overflow-y-auto">
      {/* User Profile Section */}
      <div className="p-6 border-b border-command-center-600">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-electric-purple rounded-full flex items-center justify-center">
            <span className="text-command-center-900 font-orbitron font-bold text-lg">JD</span>
          </div>
          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-white">John Doe</h3>
            <p className="text-sm text-muted-foreground">Team Captain</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs border-neon-blue text-neon-blue">
                LVL 12
              </Badge>
              <Badge variant="outline" className="text-xs border-electric-purple text-electric-purple">
                2,847 XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start font-orbitron ${
              activeTab === item.id 
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' 
                : 'text-muted-foreground hover:text-neon-blue hover:bg-command-center-800'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge 
                variant="secondary" 
                className="bg-neon-red/20 text-neon-red border-neon-red/30 text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* Team Connection */}
      <div className="p-4 border-t border-command-center-600 mt-auto">
        <div className="command-card p-4">
          <h4 className="font-orbitron font-bold text-sm mb-2 text-electric-purple">Connected Team</h4>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-red rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">⚽</span>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Barcelona FC</div>
              <div className="text-xs text-muted-foreground">2,847 $BAR held</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
