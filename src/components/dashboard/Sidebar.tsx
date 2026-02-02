
import { 
  LayoutDashboard, 
  CreditCard, 
  Bell, 
  Settings, 
  Headset, 
  LogOut, 
  FileText,
  Calendar
} from 'lucide-react';
import { cn } from '../ui/design-system';
import logo from '../../assets/logo.png';

interface SidebarProps {
  className?: string;
  activePage: string;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
}

export function Sidebar({ className, activePage, onNavigate, onSignOut }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: CreditCard, label: 'Subscriptions', id: 'subscriptions' },
    { icon: FileText, label: 'Reports', id: 'reports' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Bell, label: 'Reminders', id: 'reminders' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className={cn("w-64 bg-[#0F1113] text-white flex flex-col h-full", className)}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="OrBit Logo" className="w-10 h-10 rounded-xl" />
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">OrBit</h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-0.5">Finance</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activePage === item.id
                ? "bg-[#FF971D] text-white shadow-lg shadow-orange-900/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => onNavigate('help')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Headset className="w-5 h-5" />
          Help & Support
        </button>
        <button 
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors mt-1"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
