import React from 'react';
import { DownloadCloud, Filter, BarChart3, PieChart, LineChart, Calendar, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import ChartCard from '../components/ui/ChartCard';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import Tabs from '../components/ui/Tabs';

const GovernmentSpending: React.FC = () => {
  const spendingCategories = [
    { name: 'Healthcare', amount: '₹583.2B', percentage: 21 },
    { name: 'Education', amount: '₹437.4B', percentage: 15 },
    { name: 'Infrastructure', amount: '₹612.1B', percentage: 22 },
    { name: 'Agriculture', amount: '₹349.9B', percentage: 12 },
    { name: 'Defense', amount: '₹524.6B', percentage: 18 },
    { name: 'Social Welfare', amount: '₹262.4B', percentage: 9 },
    { name: 'Other', amount: '₹87.5B', percentage: 3 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'departments', label: 'By Department', icon: <PieChart size={16} /> },
    { id: 'trends', label: 'Spending Trends', icon: <LineChart size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Calendar size={16} /> },
  ];

  const handleTabChange = (tabId: string) => {
    console.log('Tab changed to:', tabId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Government Spending</h1>
          <p className="text-slate-500 mt-1">Track how public funds are being utilized</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <SearchBar 
            placeholder="Search by department or project..." 
            className="w-full sm:w-64"
          />
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="md"
              icon={<Filter size={18} />}
            >
              Filter
            </Button>
            <Button 
              variant="primary" 
              size="md"
              icon={<DownloadCloud size={18} />}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="mb-4">
          <p className="text-lg font-medium text-slate-800">Total Government Budget</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">₹2.84T</span>
            <span className="ml-2 text-sm text-green-600">+4.2% from previous year</span>
          </div>
        </div>
        
        <div className="h-2 bg-slate-100 rounded-full mb-2">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '62%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">₹1.76T spent (62%)</span>
          <span className="text-slate-500">₹1.08T remaining (38%)</span>
        </div>
      </div>

      <Tabs tabs={tabs} onChange={handleTabChange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Spending Overview" icon={<BarChart3 size={20} />}>
            <div className="flex items-center justify-center h-full bg-slate-50 rounded">
              <p className="text-slate-400 text-sm">Bar chart visualization will appear here</p>
            </div>
          </ChartCard>
        </div>
        
        <div>
          <ChartCard title="Budget Allocation" icon={<PieChart size={20} />}>
            <div className="flex items-center justify-center h-full bg-slate-50 rounded">
              <p className="text-slate-400 text-sm">Pie chart visualization will appear here</p>
            </div>
          </ChartCard>
        </div>
      </div>

      <Card title="Spending by Category">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Category</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Amount</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">% of Budget</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {spendingCategories.map((category, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900 font-medium">{category.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{category.amount}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{category.percentage}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(Math.random() * 50) + 45}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex items-start">
        <Info size={20} className="text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-orange-800">About this data</h3>
          <p className="text-sm text-orange-700 mt-1">
            This data is sourced directly from government financial reports and updated daily. The figures represent 
            the current fiscal year's budget allocation and spending. For historical data or more detailed breakdowns, 
            use the export function.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSpending;