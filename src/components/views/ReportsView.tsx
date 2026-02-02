
import { Card, CardContent } from '../ui/design-system';
import { ChartsSection } from '../dashboard/ChartsSection';
import { Subscription } from '../dashboard/SubscriptionTable';
import { Download, Calendar, Filter } from 'lucide-react';
import { Button } from '../ui/design-system';
import { toast } from "sonner";

interface ReportsViewProps {
  subscriptions: Subscription[];
}

export function ReportsView({ subscriptions }: ReportsViewProps) {
  const totalCost = subscriptions.reduce((acc, sub) => acc + parseFloat(sub.amount.replace(/[^0-9.]/g, '') || '0'), 0);
  const averageCost = totalCost / (subscriptions.length || 1);
  const mostExpensive = [...subscriptions].sort((a, b) => parseFloat(b.amount.replace(/[^0-9.]/g, '')) - parseFloat(a.amount.replace(/[^0-9.]/g, '')))[0];

  // Dynamic Category Calculation
  const categories = Array.from(new Set(subscriptions.map(s => s.category)));
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Reports</h2>
          <p className="text-gray-500 mt-1">Detailed analysis of your subscription spending.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" className="gap-2" onClick={() => toast.info('Date range updated to "This Year"')}>
            <Calendar className="w-4 h-4" /> This Year
          </Button>
           <Button variant="secondary" className="gap-2" onClick={() => toast.info('Filter options panel opened')}>
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => toast.success('Report downloaded successfully')}>
            <Download className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#FF971D] to-[#FFAD4D] text-white border-none shadow-lg shadow-orange-200">
          <CardContent className="pt-6">
            <p className="text-white/90 font-medium">Total Annual Spend</p>
            <h3 className="text-3xl font-bold mt-2">${(totalCost * 12).toFixed(2)}</h3>
            <p className="text-sm text-white/75 mt-2">Projected based on current active subscriptions</p>
          </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
            <p className="text-gray-500 font-medium">Average Monthly Cost</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">${averageCost.toFixed(2)}</h3>
            <p className="text-sm text-gray-400 mt-2">Per subscription</p>
          </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
            <p className="text-gray-500 font-medium">Highest Expense</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{mostExpensive ? mostExpensive.amount : '$0.00'}</h3>
            <p className="text-sm text-gray-400 mt-2">{mostExpensive ? mostExpensive.name : 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      <ChartsSection subscriptions={subscriptions} />

      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-6">Category Breakdown</h3>
          <div className="space-y-6">
            {categories.map(cat => {
              const catSubs = subscriptions.filter(s => s.category === cat);
              const catTotal = catSubs.reduce((acc, s) => acc + parseFloat(s.amount.replace(/[^0-9.]/g, '')), 0);
              const percentage = totalCost > 0 ? (catTotal / totalCost) * 100 : 0;
              
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span className="text-gray-500 font-medium">${catTotal.toFixed(2)} <span className="text-gray-400 font-normal ml-1">({percentage.toFixed(0)}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-[#FF971D] h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
