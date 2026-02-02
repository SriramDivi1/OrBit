import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../ui/design-system';
import { Input } from '../ui/form-elements';
import { User as UserIcon, Bell, Shield, CreditCard, CreditCard as CreditCardIcon } from 'lucide-react';
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import type { User } from '../auth/Login';

interface SettingsViewProps {
  user?: User;
}

export function SettingsView({ user }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  
  // Notification States
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  
  // Security States
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        toast.success("Settings saved successfully!");
    }, 800);
  };

  const handleChangeAvatar = () => {
      toast.info("Opening file uploader...");
      // In a real app, this would trigger a file input click
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-4 border-gray-50"
                />
                <div>
                  <Button variant="secondary" size="sm" onClick={handleChangeAvatar}>Change Avatar</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue={user?.name?.split(' ')[0] || ''} />
                <Input label="Last Name" defaultValue={user?.name?.split(' ').slice(1).join(' ') || ''} />
              </div>
              <Input label="Email Address" defaultValue={user?.email || ''} type="email" />
              <Input label="Phone Number" defaultValue="" type="tel" placeholder="+1 (555) 000-0000" />
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'notifications':
        return (
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive emails about your subscription updates.</p>
                </div>
                <Switch 
                  checked={emailNotifs}
                  onCheckedChange={setEmailNotifs}
                />
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                  <p className="text-sm text-gray-500">Receive emails about new features and offers.</p>
                </div>
                <Switch 
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive push notifications on your device.</p>
                </div>
                <Switch 
                  checked={pushNotifs}
                  onCheckedChange={setPushNotifs}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'security':
        return (
          <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
                <Switch 
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Security'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'billing':
        return (
           <Card>
            <CardHeader className="border-b border-gray-100">
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 flex items-start gap-4">
                 <div className="p-2 bg-white rounded-full text-orange-500 shadow-sm">
                    <CreditCardIcon className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="font-medium text-gray-900">Pro Plan</h4>
                    <p className="text-sm text-gray-600 mt-1">You are currently on the Pro plan at $29/month.</p>
                    <div className="mt-3">
                        <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50 text-orange-600 border-orange-200">Manage Subscription</Button>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="font-medium text-gray-900">Payment Method</h4>
                 <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">VISA</div>
                        <span className="text-sm font-medium">•••• •••• •••• 4242</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">Edit</Button>
                 </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                 <Button variant="outline" className="mr-3" onClick={() => toast.info("Downloading invoices...")}>Download Invoices</Button>
                 <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Billing Info'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'bg-[#FF971D] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <UserIcon className="w-4 h-4" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'notifications' 
                ? 'bg-[#FF971D] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'security' 
                ? 'bg-[#FF971D] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Shield className="w-4 h-4" /> Security
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'billing' 
                ? 'bg-[#FF971D] text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Billing
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
