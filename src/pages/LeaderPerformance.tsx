import React, { useState } from 'react';
import { Users, Filter, Search, MapPin, ExternalLink, Award, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import Tabs from '../components/ui/Tabs';

interface Leader {
  id: number;
  name: string;
  position: string;
  constituency: string;
  party: string;
  image: string;
  rating: number;
  attendanceRate: number;
  billsProposed: number;
  promises: {
    kept: number;
    total: number;
  };
}

const LeaderPerformance: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  const leaders: Leader[] = [
    {
      id: 1,
      name: 'Amita Patel',
      position: 'Member of Parliament',
      constituency: 'Central Delhi',
      party: 'National Democratic Party',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.2,
      attendanceRate: 87,
      billsProposed: 12,
      promises: {
        kept: 8,
        total: 15
      }
    },
    {
      id: 2,
      name: 'Raj Kumar Singh',
      position: 'Member of Legislative Assembly',
      constituency: 'Jaipur East',
      party: 'Progressive Alliance',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 3.8,
      attendanceRate: 92,
      billsProposed: 8,
      promises: {
        kept: 6,
        total: 12
      }
    },
    {
      id: 3,
      name: 'Vikram Reddy',
      position: 'Member of Parliament',
      constituency: 'Bangalore South',
      party: "People\'s Union",
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.5,
      attendanceRate: 95,
      billsProposed: 15,
      promises: {
        kept: 11,
        total: 14
      }
    },
    {
      id: 4,
      name: 'Priya Sharma',
      position: 'Member of Legislative Assembly',
      constituency: 'Ahmadabad North',
      party: 'National Democratic Party',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 3.6,
      attendanceRate: 78,
      billsProposed: 6,
      promises: {
        kept: 5,
        total: 10
      }
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Leaders', icon: <Users size={16} /> },
    { id: 'mp', label: 'Parliament Members', icon: null },
    { id: 'mla', label: 'Assembly Members', icon: null },
    { id: 'local', label: 'Local Officials', icon: null },
  ];

  const Rating = ({ value }: { value: number }) => {
    const getColor = (rating: number) => {
      if (rating >= 4) return 'text-green-500';
      if (rating >= 3) return 'text-yellow-500';
      return 'text-red-500';
    };

    return (
      <div className="flex items-center">
        <span className={`text-lg font-bold ${getColor(value)}`}>{value.toFixed(1)}</span>
        <div className="flex ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg 
              key={star}
              className={`w-4 h-4 ${star <= Math.round(value) ? getColor(value) : 'text-gray-300'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  const LeaderGridCard = ({ leader }: { leader: Leader }) => {
    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col items-center text-center p-2">
          <div className="relative mb-3 w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={leader.image} 
              alt={leader.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="font-semibold text-slate-800">{leader.name}</h3>
          <p className="text-sm text-slate-500">{leader.position}</p>
          <div className="flex items-center mt-1 text-xs text-slate-500">
            <MapPin size={12} className="mr-1" />
            {leader.constituency}
          </div>
          <div className="my-3">
            <Rating value={leader.rating} />
          </div>
          <div className="w-full grid grid-cols-3 gap-2 text-center mt-2">
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-xs text-slate-500">Attendance</p>
              <p className="font-semibold text-slate-800">{leader.attendanceRate}%</p>
            </div>
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-xs text-slate-500">Bills</p>
              <p className="font-semibold text-slate-800">{leader.billsProposed}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-xs text-slate-500">Promises</p>
              <p className="font-semibold text-slate-800">{leader.promises.kept}/{leader.promises.total}</p>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const LeaderListItem = ({ leader }: { leader: Leader }) => {
    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <div className="flex items-center p-2">
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={leader.image} 
                alt={leader.name}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-slate-800">{leader.name}</h3>
                <p className="text-sm text-slate-500">{leader.position}</p>
                <div className="flex items-center mt-1 text-xs text-slate-500">
                  <MapPin size={12} className="mr-1" />
                  {leader.constituency} · {leader.party}
                </div>
              </div>
              <div>
                <Rating value={leader.rating} />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="flex items-center">
                <Award size={16} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-xs text-slate-500">Attendance</p>
                  <p className="font-semibold text-slate-800">{leader.attendanceRate}%</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="text-green-500 mr-2" />
                <div>
                  <p className="text-xs text-slate-500">Bills Proposed</p>
                  <p className="font-semibold text-slate-800">{leader.billsProposed}</p>
                </div>
              </div>
              <div className="flex items-center">
                <ThumbsUp size={16} className="text-orange-500 mr-2" />
                <div>
                  <p className="text-xs text-slate-500">Promises Kept</p>
                  <p className="font-semibold text-slate-800">{leader.promises.kept}/{leader.promises.total}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ml-4">
            <Button variant="outline" size="sm" icon={<ExternalLink size={14} />}>
              View Profile
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leader Performance</h1>
          <p className="text-slate-500 mt-1">Monitor and evaluate elected representatives</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <SearchBar 
            placeholder="Search by name or constituency..." 
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
            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-2 ${viewType === 'grid' ? 'bg-slate-100' : 'bg-white'}`}
                onClick={() => setViewType('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`px-3 py-2 ${viewType === 'list' ? 'bg-slate-100' : 'bg-white'}`}
                onClick={() => setViewType('list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} />

      <div className={viewType === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
        : "space-y-4"
      }>
        {leaders.map((leader) => (
          viewType === 'grid' 
            ? <LeaderGridCard key={leader.id} leader={leader} />
            : <LeaderListItem key={leader.id} leader={leader} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">
          Load More Leaders
        </Button>
      </div>
    </div>
  );
};

export default LeaderPerformance;