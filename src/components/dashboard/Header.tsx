import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import logo from '../../assets/logo.png';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '../ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';


interface HeaderProps {
  onMenuClick?: () => void;
  onSearch: (query: string) => void;
  onSignOut: () => void;
  onNavigate: (page: string) => void;
  user?: { name: string; email: string; avatar: string };
}

export function Header({ onMenuClick, onSearch, onSignOut, onNavigate, user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Netflix subscription renewing soon', time: '2 hours ago', read: false },
    { id: 2, title: 'Adobe Creative Cloud payment successful', time: '1 day ago', read: false },
    { id: 3, title: 'New feature: Dark mode is here!', time: '2 days ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 glass border-b border-gray-200/50 dark:border-gray-800/50 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF971D]/50"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2">
          <img src={logo} alt="OrBit Logo" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-gray-900">OrBit</span>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 hidden lg:block">Overview</h1>
        
        <div className="hidden md:flex ml-4 lg:ml-8 items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 focus-within:ring-2 focus-within:ring-[#FF971D] focus-within:border-transparent transition-all w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search subscriptions..." 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-none text-sm w-full focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button 
              className="relative p-2 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF971D]/50"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#F05252] rounded-full border-2 border-white dark:border-gray-900 ring-1 ring-white dark:ring-gray-900"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 dark:bg-gray-900 dark:border-gray-800" align="end">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className="text-xs text-[#FF971D] hover:underline font-medium">
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No notifications</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!n.read ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}>
                    <div className="flex justify-between items-start gap-2">
                      <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                        {n.title}
                      </p>
                      {!n.read && <span className="w-2 h-2 bg-[#FF971D] rounded-full mt-1.5 flex-shrink-0"></span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>
        
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="flex items-center gap-3 pl-1 pr-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF971D]/50"
            >
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                alt="User" 
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user?.name || "Tom Cook"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900 dark:border-gray-800">
            <DropdownMenuLabel className="dark:text-gray-200">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-800" />
            <DropdownMenuItem onClick={() => onNavigate('settings')} className="cursor-pointer dark:text-gray-300 dark:focus:bg-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('settings')} className="cursor-pointer dark:text-gray-300 dark:focus:bg-gray-800">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-gray-800" />
            <DropdownMenuItem onClick={onSignOut} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
