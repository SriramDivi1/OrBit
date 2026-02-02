import React from 'react';
import { DayPicker } from 'react-day-picker';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card } from '../ui/card';
import 'react-day-picker/dist/style.css';

// Mock subscription data for the calendar
const subscriptions = [
  { id: 1, name: 'Netflix', date: new Date(2025, 1, 15), amount: 15.99, color: 'bg-red-500' },
  { id: 2, name: 'Spotify', date: new Date(2025, 1, 20), amount: 9.99, color: 'bg-green-500' },
  { id: 3, name: 'Adobe', date: new Date(2025, 1, 25), amount: 52.99, color: 'bg-blue-600' },
  { id: 4, name: 'Figma', date: new Date(2025, 1, 28), amount: 12.00, color: 'bg-purple-500' },
];

export function CalendarView() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());
  
  // Find subscriptions for the selected date
  const selectedSubscriptions = subscriptions.filter(
    sub => selected && sub.date.toDateString() === selected.toDateString()
  );

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Subscription Calendar</h2>
          <p className="text-gray-500 dark:text-gray-400">Track your upcoming payments and renewal dates</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card p-6 border-0 shadow-xl">
             <style>{`
              .rdp {
                --rdp-cell-size: 50px;
                --rdp-accent-color: #FF971D;
                --rdp-background-color: #FFFAF5;
                margin: 0;
              }
              .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
                background-color: var(--rdp-accent-color);
                color: white;
              }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: rgba(255, 151, 29, 0.1);
              }
              .dark .rdp {
                --rdp-background-color: #1F2937;
                color: #e5e7eb;
              }
              .dark .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: rgba(255, 151, 29, 0.2);
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              className="mx-auto w-full flex justify-center"
              modifiers={{
                hasSubscription: subscriptions.map(sub => sub.date)
              }}
              modifiersStyles={{
                hasSubscription: {
                    fontWeight: 'bold',
                }
              }}
            />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selected ? format(selected, 'MMMM do, yyyy') : 'Select a date'}
          </h3>
          
          {selectedSubscriptions.length > 0 ? (
            <div className="space-y-3">
              {selectedSubscriptions.map(sub => (
                <Card key={sub.id} className="p-4 border-l-4 border-l-[#FF971D] glass-card">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${sub.color}`}></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{sub.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Subscription</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">${sub.amount}</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No subscriptions due on this date.</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
             <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Upcoming Renewals</h4>
             <div className="space-y-3">
                {subscriptions.slice(0, 3).map(sub => (
                   <div key={sub.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${sub.color}`} />
                         <span className="text-gray-700 dark:text-gray-300">{sub.name}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">{format(sub.date, 'MMM do')}</span>
                   </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
