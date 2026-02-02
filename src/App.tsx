import { useState } from 'react';
import { Sidebar } from './components/dashboard/Sidebar';
import { Header } from './components/dashboard/Header';
import { ChartsSection } from './components/dashboard/ChartsSection';
import { SubscriptionTable, Subscription } from './components/dashboard/SubscriptionTable';
import { EditSubscriptionModal } from './components/dashboard/EditSubscriptionModal';
import { AddSubscriptionModal } from './components/dashboard/AddSubscriptionModal';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { SettingsView } from './components/views/SettingsView';
import { CalendarView } from './components/views/CalendarView';
import { ReportsView } from './components/views/ReportsView';
import { RemindersView } from './components/views/RemindersView';
import { SubscriptionsView } from './components/views/SubscriptionsView';
import { ThemeProvider } from "next-themes";
import { Button } from './components/ui/design-system';
import { Modal } from './components/ui/form-elements';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import logo from './assets/logo.png';
import type { User } from './components/auth/Login';

// Demo data - used to populate the dashboard upon user login
const demoSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Spotify Premium',
    logo: 'https://logo.clearbit.com/spotify.com',
    category: 'Entertainment',
    amount: '$9.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 12, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '2',
    name: 'Adobe Creative Cloud',
    logo: 'https://logo.clearbit.com/adobe.com',
    category: 'Design Tools',
    amount: '$54.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 15, 2024',
    status: 'process',
    statusLabel: 'Pending',
  },
  {
    id: '3',
    name: 'Netflix',
    logo: 'https://logo.clearbit.com/netflix.com',
    category: 'Entertainment',
    amount: '$15.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 20, 2024',
    status: 'error',
    statusLabel: 'Cancelled',
  },
  {
    id: '4',
    name: 'Figma Professional',
    logo: 'https://logo.clearbit.com/figma.com',
    category: 'Design Tools',
    amount: '$12.00',
    cycle: 'Monthly',
    nextPayment: 'Apr 22, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '5',
    name: 'Notion Plus',
    logo: 'https://logo.clearbit.com/notion.so',
    category: 'Productivity',
    amount: '$8.00',
    cycle: 'Monthly',
    nextPayment: 'Apr 28, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '6',
    name: 'GitHub Pro',
    logo: 'https://logo.clearbit.com/github.com',
    category: 'Productivity',
    amount: '$4.00',
    cycle: 'Monthly',
    nextPayment: 'Apr 10, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '7',
    name: 'Slack Pro',
    logo: 'https://logo.clearbit.com/slack.com',
    category: 'Productivity',
    amount: '$7.25',
    cycle: 'Monthly',
    nextPayment: 'Apr 18, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '8',
    name: 'Disney+',
    logo: 'https://logo.clearbit.com/disneyplus.com',
    category: 'Entertainment',
    amount: '$13.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 25, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '9',
    name: 'Amazon Prime',
    logo: 'https://logo.clearbit.com/amazon.com',
    category: 'Entertainment',
    amount: '$14.99',
    cycle: 'Monthly',
    nextPayment: 'May 1, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '10',
    name: 'Dropbox Plus',
    logo: 'https://logo.clearbit.com/dropbox.com',
    category: 'Utilities',
    amount: '$11.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 30, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '11',
    name: 'Google One',
    logo: 'https://logo.clearbit.com/google.com',
    category: 'Utilities',
    amount: '$2.99',
    cycle: 'Monthly',
    nextPayment: 'May 5, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '12',
    name: 'Microsoft 365',
    logo: 'https://logo.clearbit.com/microsoft.com',
    category: 'Productivity',
    amount: '$12.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 14, 2024',
    status: 'process',
    statusLabel: 'Pending',
  },
  {
    id: '13',
    name: 'YouTube Premium',
    logo: 'https://logo.clearbit.com/youtube.com',
    category: 'Entertainment',
    amount: '$13.99',
    cycle: 'Monthly',
    nextPayment: 'May 8, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '14',
    name: 'Canva Pro',
    logo: 'https://logo.clearbit.com/canva.com',
    category: 'Design Tools',
    amount: '$12.99',
    cycle: 'Monthly',
    nextPayment: 'May 12, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '15',
    name: 'ChatGPT Plus',
    logo: 'https://logo.clearbit.com/openai.com',
    category: 'Productivity',
    amount: '$20.00',
    cycle: 'Monthly',
    nextPayment: 'Apr 16, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '16',
    name: 'Hulu',
    logo: 'https://logo.clearbit.com/hulu.com',
    category: 'Entertainment',
    amount: '$17.99',
    cycle: 'Monthly',
    nextPayment: 'May 3, 2024',
    status: 'error',
    statusLabel: 'Cancelled',
  },
  {
    id: '17',
    name: 'Zoom Pro',
    logo: 'https://logo.clearbit.com/zoom.us',
    category: 'Productivity',
    amount: '$15.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 19, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '18',
    name: 'iCloud+',
    logo: 'https://logo.clearbit.com/apple.com',
    category: 'Utilities',
    amount: '$2.99',
    cycle: 'Monthly',
    nextPayment: 'May 10, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '19',
    name: 'LinkedIn Premium',
    logo: 'https://logo.clearbit.com/linkedin.com',
    category: 'Productivity',
    amount: '$29.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 24, 2024',
    status: 'process',
    statusLabel: 'Pending',
  },
  {
    id: '20',
    name: 'Sketch',
    logo: 'https://logo.clearbit.com/sketch.com',
    category: 'Design Tools',
    amount: '$10.00',
    cycle: 'Monthly',
    nextPayment: 'May 15, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '21',
    name: 'HBO Max',
    logo: 'https://logo.clearbit.com/hbomax.com',
    category: 'Entertainment',
    amount: '$15.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 27, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '22',
    name: '1Password',
    logo: 'https://logo.clearbit.com/1password.com',
    category: 'Utilities',
    amount: '$2.99',
    cycle: 'Monthly',
    nextPayment: 'May 2, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '23',
    name: 'Grammarly Premium',
    logo: 'https://logo.clearbit.com/grammarly.com',
    category: 'Productivity',
    amount: '$12.00',
    cycle: 'Monthly',
    nextPayment: 'Apr 21, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '24',
    name: 'Webflow',
    logo: 'https://logo.clearbit.com/webflow.com',
    category: 'Design Tools',
    amount: '$16.00',
    cycle: 'Monthly',
    nextPayment: 'May 7, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
  {
    id: '25',
    name: 'NordVPN',
    logo: 'https://logo.clearbit.com/nordvpn.com',
    category: 'Utilities',
    amount: '$11.99',
    cycle: 'Monthly',
    nextPayment: 'Apr 29, 2024',
    status: 'success',
    statusLabel: 'Active',
  },
];

type ViewState = 'login' | 'signup' | 'dashboard' | 'subscriptions' | 'settings' | 'reports' | 'reminders' | 'calendar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('login');
  
  // User State
  const [user, setUser] = useState<User | null>(null);
  
  // Data State - Start with empty subscriptions (populated on login)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  // Handlers
  const handleLogin = (userData: User) => {
    setUser(userData);
    setSubscriptions(demoSubscriptions); // Restore demo data on login
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const handleEdit = (sub: Subscription) => {
    setSelectedSub(sub);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedSub: Subscription) => {
    setSubscriptions(subs => subs.map(s => s.id === updatedSub.id ? updatedSub : s));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subs => subs.filter(s => s.id !== id));
    }
  };

  const handleAdd = (newSubData: Omit<Subscription, 'id'>) => {
    const newSub: Subscription = {
      ...newSubData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSubscriptions(prev => [newSub, ...prev]);
  };

  // Filter Subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render Content based on View
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto space-y-8 pb-10">
             {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
                <p className="text-gray-500 mt-1">Overview of your subscriptions and spending.</p>
              </div>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="shadow-lg shadow-purple-900/20 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Subscription
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                title="Total Monthly Cost" 
                value={`$${subscriptions.reduce((acc, curr) => acc + (parseFloat(curr.amount.replace(/[^0-9.]/g, '')) || 0), 0).toFixed(2)}`}
                trend="↑ 2.5%"
                trendLabel="from last month"
                icon="💰"
                color="bg-purple-50"
                trendColor="bg-green-100 text-green-600"
                delay={0.1}
              />
              <StatsCard 
                title="Active Subscriptions" 
                value={subscriptions.filter(s => s.status === 'success').length.toString()}
                trend="2 expiring soon"
                trendLabel=""
                icon="📊"
                color="bg-blue-50"
                trendColor="text-gray-500"
                delay={0.2}
              />
              <StatsCard 
                title="Upcoming Payments" 
                value={subscriptions.length.toString()}
                trend="Next 7 days"
                trendLabel=""
                icon="📅"
                color="bg-orange-50"
                trendColor="text-gray-500"
                delay={0.3}
              />
            </div>

            {/* Charts Section */}
            <ChartsSection subscriptions={subscriptions} />

            {/* Recent Subscriptions Table (limited to 5) */}
            <SubscriptionTable 
              subscriptions={filteredSubscriptions.slice(0, 5)} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
          </div>
        );

      case 'subscriptions':
        return (
          <SubscriptionsView
            subscriptions={subscriptions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={() => setIsAddModalOpen(true)}
          />
        );
      
      case 'settings':
        return <SettingsView user={user || undefined} />;
      
      case 'reports':
        return <ReportsView subscriptions={subscriptions} />;

      case 'calendar':
        return <CalendarView />;

      case 'reminders':
        return <RemindersView subscriptions={subscriptions} />;

      default:
        return <div>View not found</div>;
    }
  };

  // Auth Views
  if (!isAuthenticated) {
    if (currentView === 'signup') {
      return <Signup onSignup={handleLogin} onNavigateToLogin={() => setCurrentView('login')} />;
    }
    return <Login onLogin={handleLogin} onNavigateToSignup={() => setCurrentView('signup')} />;
  }

  // Authenticated Layout
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-[#F3F4F6] dark:bg-black font-sans overflow-hidden transition-colors">
        {/* Desktop Sidebar */}
        <Sidebar 
          className="hidden lg:flex" 
          activePage={currentView}
          onNavigate={(page) => {
            if (page === 'help') {
               setIsHelpOpen(true);
            } else {
               setCurrentView(page as ViewState);
            }
          }}
          onSignOut={handleSignOut}
        />

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden shadow-2xl"
              >
                <Sidebar 
                  className="w-full h-full"
                  activePage={currentView}
                  onNavigate={(page) => {
                    if (page === 'help') {
                      setIsHelpOpen(true);
                    } else {
                      setCurrentView(page as ViewState);
                    }
                    setIsMobileSidebarOpen(false);
                  }}
                  onSignOut={handleSignOut}
                />
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header 
            onMenuClick={() => setIsMobileSidebarOpen(true)} 
            onSearch={setSearchQuery}
            onSignOut={handleSignOut}
            onNavigate={(page) => setCurrentView(page as ViewState)}
            user={user || undefined}
          />

          <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <EditSubscriptionModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          subscription={selectedSub}
          onSave={handleSaveEdit}
        />

        <AddSubscriptionModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAdd}
        />

        {/* Help Modal */}
        <Modal
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          title="Help & Support"
          footer={<Button onClick={() => setIsHelpOpen(false)}>Close</Button>}
        >
          <div className="text-center p-4">
            <img src={logo} alt="OrBit Logo" className="w-14 h-14 rounded-xl mx-auto mb-4 shadow-md" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Need assistance?</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">
              Our support team is available 24/7. Contact us at <a href="mailto:support@orbit.finance" className="text-[#FF971D] hover:underline">support@orbit.finance</a> or check our documentation.
            </p>
            <Button variant="secondary" className="w-full">View Documentation</Button>
          </div>
        </Modal>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  icon: string;
  color: string;
  trendColor: string;
  delay: number;
}

// Helper Component for Stats
function StatsCard({ title, value, trend, trendLabel, icon, color, trendColor, delay }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
    >
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
        <p className={`text-xs mt-1 flex items-center font-medium ${trendColor === 'text-gray-500' ? 'text-gray-500' : 'text-green-600'}`}>
          {trendColor !== 'text-gray-500' && <span className="bg-green-100 px-1.5 py-0.5 rounded mr-1">{trend}</span>}
          {trendColor === 'text-gray-500' && <span className="mr-1">{trend}</span>}
          {trendLabel}
        </p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </motion.div>
  );
}
