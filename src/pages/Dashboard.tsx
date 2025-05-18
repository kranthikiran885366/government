import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Sprout, AlertTriangle, FileText, MessageSquareText, TrendingUp, Wallet, ArrowRight, DivideIcon as LucideIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import DataCard from '../components/ui/DataCard';
import SearchBar from '../components/ui/SearchBar';
import ChartCard from '../components/ui/ChartCard';
import Button from '../components/ui/Button';

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, description, icon, to, color }) => (
  <Link to={to} className="block">
    <Card className="transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${color} text-white mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="transparent"
          size="sm"
          icon={<ArrowRight size={16} />}
        >
          View
        </Button>
      </div>
    </Card>
  </Link>
);

const Dashboard: React.FC = () => {
  const quickLinks = [
    {
      title: 'Government Spending',
      description: 'Track real-time spending data and budget allocation',
      icon: <BarChart3 size={24} />,
      to: '/spending',
      color: 'bg-blue-600',
    },
    {
      title: 'Leader Performance',
      description: 'Monitor elected officials and their activities',
      icon: <Users size={24} />,
      to: '/leaders',
      color: 'bg-indigo-600',
    },
    {
      title: 'Agriculture Prices',
      description: 'Compare MSP with market prices for crops',
      icon: <Sprout size={24} />,
      to: '/agriculture',
      color: 'bg-emerald-600',
    },
    {
      title: 'Report Issues',
      description: 'Report corruption or accountability issues anonymously',
      icon: <AlertTriangle size={24} />,
      to: '/report',
      color: 'bg-orange-600',
    },
    {
      title: 'Scheme Details',
      description: 'Find information about government schemes and benefits',
      icon: <FileText size={24} />,
      to: '/schemes',
      color: 'bg-purple-600',
    },
    {
      title: 'Community Feedback',
      description: 'Share your feedback and join public discussions',
      icon: <MessageSquareText size={24} />,
      to: '/community',
      color: 'bg-rose-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome to GovWatch - Your platform for government transparency</p>
        </div>
        <SearchBar 
          placeholder="Search schemes, leaders, or reports..." 
          className="w-full md:w-64"
          onSearch={(query) => console.log('Search:', query)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard
          title="Government Spending"
          value="₹2.84T"
          description="Current fiscal year"
          icon={<Wallet size={20} />}
          change={4.2}
          changeLabel="vs last year"
        />
        <DataCard
          title="Schemes Active"
          value="187"
          description="Active government schemes"
          icon={<FileText size={20} />}
          change={2.8}
          changeLabel="this month"
        />
        <DataCard
          title="Issues Reported"
          value="1,284"
          description="In the last 30 days"
          icon={<AlertTriangle size={20} />}
          change={-8.5}
          changeLabel="vs last month"
        />
        <DataCard
          title="Community Activity"
          value="24.7K"
          description="Citizen engagements"
          icon={<MessageSquareText size={20} />}
          change={12.3}
          changeLabel="this month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Monthly Government Spending Overview"
          icon={<TrendingUp size={20} />}
        >
          <div className="flex items-center justify-center h-full bg-slate-50 rounded">
            <p className="text-slate-400 text-sm">Chart visualization will appear here</p>
          </div>
        </ChartCard>
        
        <ChartCard
          title="Recent Price Trends for Major Crops"
          icon={<Sprout size={20} />}
        >
          <div className="flex items-center justify-center h-full bg-slate-50 rounded">
            <p className="text-slate-400 text-sm">Chart visualization will appear here</p>
          </div>
        </ChartCard>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <QuickLink key={index} {...link} />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Get Involved</h2>
        <p className="text-blue-700 mb-4">
          Your participation is crucial for better governance. Report issues, track spending, and hold your representatives accountable.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            icon={<AlertTriangle size={16} />}
          >
            Report an Issue
          </Button>
          <Button
            variant="outline"
            icon={<MessageSquareText size={16} />}
          >
            Join Community Discussions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;