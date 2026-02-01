import React from 'react';
import { Card, Button } from '../ui/design-system';
import { Subscription } from '../dashboard/SubscriptionTable';
import { Bell, CheckCircle, Clock, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from "sonner";

interface RemindersViewProps {
  subscriptions: Subscription[];
}

export function RemindersView({ subscriptions }: RemindersViewProps) {
  // Simulated "Today" is April 10, 2024 for demo purposes so the UI always looks populated
  const today = new Date('2024-04-10');

  const upcomingPayments = [...subscriptions]
    .map(sub => {
      const paymentDate = new Date(sub.nextPayment);
      // Calculate difference in days
      const diffTime = paymentDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return { ...sub, diffDays, paymentDate };
    })
    .sort((a, b) => a.paymentDate.getTime() - b.paymentDate.getTime());

  const handleSnooze = (name: string) => {
    toast.success(`Reminder for ${name} snoozed for 24 hours`);
  };

  const handlePay = (name: string) => {
    toast.success(`Marked ${name} as paid!`);
  };

  const handleGlobalAlert = () => {
    toast.info("Global payment alerts enabled for all subscriptions");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Payment Reminders</h2>
          <p className="text-gray-500 mt-1">Don't miss a payment. Track upcoming bills here.</p>
        </div>
        <Button className="gap-2" onClick={handleGlobalAlert}>
          <Bell className="w-4 h-4" /> Set Global Alert
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingPayments.map((sub, index) => {
          const isUrgent = sub.diffDays <= 3 && sub.diffDays >= 0;
          const isOverdue = sub.diffDays < 0;
          
          let statusColor = "border-l-[#FF971D]"; // Default orange
          if (isUrgent) statusColor = "border-l-[#F05252]"; // Red for urgent
          if (isOverdue) statusColor = "border-l-gray-400"; // Gray for overdue (or maybe red too)

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border-l-4 ${statusColor} hover:shadow-md transition-shadow`}>
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
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
                        <h3 className="font-bold text-gray-900">{sub.name}</h3>
                        <p className="text-sm text-gray-500">Amount: <span className="font-semibold text-gray-900">{sub.amount}</span></p>
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      {isUrgent ? (
                        <AlertCircle className="w-4 h-4 text-[#F05252]" />
                      ) : (
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-sm font-medium ${isUrgent ? 'text-[#F05252]' : 'text-gray-600'}`}>
                        {isOverdue 
                          ? `Overdue by ${Math.abs(sub.diffDays)} days` 
                          : sub.diffDays === 0 
                            ? "Due Today" 
                            : `Due in ${sub.diffDays} days (${sub.nextPayment})`
                        }
                      </span>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="secondary" size="sm" className="flex-1 sm:flex-none" onClick={() => handleSnooze(sub.name)}>Snooze</Button>
                      <Button size="sm" className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white border-transparent shadow-sm shadow-green-200" onClick={() => handlePay(sub.name)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Paid
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
