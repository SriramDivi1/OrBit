import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/design-system';
import { Subscription } from '../dashboard/SubscriptionTable';

interface ChartsSectionProps {
  subscriptions: Subscription[];
}

export function ChartsSection({ subscriptions }: ChartsSectionProps) {
  
  // Calculate Top Subscriptions for Bar Chart
  const topSubscriptions = useMemo(() => {
    return [...subscriptions]
      .map(sub => ({
        name: sub.name,
        value: parseFloat(sub.amount.replace(/[^0-9.]/g, '')),
        fill: '#FF971D' // Default Orange
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        fill: [
          '#CC7400', // Darkest Orange
          '#E68200',
          '#FF971D',
          '#FFAD4D',
          '#FFC27D'  // Lightest Orange
        ][index] || '#FFD8AD'
      }));
  }, [subscriptions]);

  // Calculate Usage Trend (Mocked based on current total)
  const usageData = useMemo(() => {
    const currentTotal = subscriptions.reduce(
      (acc, sub) => acc + parseFloat(sub.amount.replace(/[^0-9.]/g, '') || '0'), 
      0
    );
    
    // Generate somewhat random previous months centered around the current total
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => {
      const isCurrentMonth = i === months.length - 1;
      return {
        name: month,
        current: isCurrentMonth ? currentTotal : currentTotal * (0.8 + Math.random() * 0.4),
        previous: currentTotal * (0.7 + Math.random() * 0.4)
      };
    });
  }, [subscriptions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Horizontal Bar Chart - Top Subscriptions */}
      <Card className="min-w-0 shadow-sm border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Top Subscriptions</CardTitle>
          <span className="text-sm text-gray-500">Highest costs</span>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full min-w-0">
            {topSubscriptions.length > 0 ? (
              <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                <BarChart
                  layout="vertical"
                  data={topSubscriptions}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#4b5563' }} 
                    width={100}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No subscription data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Area Chart - Usage Trend */}
      <Card className="min-w-0 shadow-sm border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Spending Trend</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF971D]"></span>
              <span className="text-xs text-gray-500">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-200"></span>
              <span className="text-xs text-gray-500">Previous</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="99%" height="100%" minWidth={0}>
              <AreaChart
                data={usageData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF971D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF971D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#FF971D" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCurrent)" 
                  animationDuration={1500}
                />
                 <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#FDBA74" 
                  strokeWidth={2}
                  fill="transparent" 
                  strokeDasharray="5 5"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
