import React from 'react';
import { Card, CardHeader, CardTitle, Badge, Button } from '../ui/design-system';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

// Using a type for the status to ensure type safety with our Badge component
export type SubscriptionStatus = 'success' | 'error' | 'process';

export interface Subscription {
  id: string;
  name: string;
  logo: string;
  category: string;
  amount: string;
  cycle: string;
  nextPayment: string;
  status: SubscriptionStatus;
  statusLabel: string;
}

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionTable({ subscriptions, onEdit, onDelete }: SubscriptionTableProps) {
  
  const handleExport = () => {
    // Mock export functionality
    const headers = ['Name', 'Category', 'Amount', 'Cycle', 'Next Payment', 'Status'];
    const csvContent = [
      headers.join(','),
      ...subscriptions.map(sub => 
        [sub.name, sub.category, sub.amount, sub.cycle, sub.nextPayment, sub.statusLabel].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'subscriptions_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 bg-gray-50/50">
        <CardTitle>Recent Subscriptions</CardTitle>
        <Button variant="secondary" size="sm" onClick={handleExport}>
          <ExternalLink className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 font-medium">Service Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Next Billing</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscriptions.length === 0 ? (
               <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No subscriptions found. Add one to get started!
                </td>
              </tr>
            ) : (
              subscriptions.map((sub, index) => (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center p-2 overflow-hidden border border-gray-200">
                      <img 
                        src={sub.logo} 
                        alt={sub.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${sub.name}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{sub.name}</div>
                      <div className="text-xs text-gray-500">{sub.cycle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{sub.category}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{sub.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{sub.nextPayment}</td>
                  <td className="px-6 py-4">
                    <Badge variant={sub.status}>{sub.statusLabel}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(sub)}
                        className="p-1.5 text-gray-500 hover:text-[#FF971D] hover:bg-orange-50 rounded-md transition-colors"
                        title="Edit Subscription"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(sub.id)}
                        className="p-1.5 text-gray-500 hover:text-[#F05252] hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Subscription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
