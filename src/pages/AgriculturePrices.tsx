import React, { useState } from 'react';
import { Sprout, Filter, DownloadCloud, TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import Tabs from '../components/ui/Tabs';

interface CropPrice {
  id: number;
  name: string;
  category: string;
  government: number;
  market: number;
  unit: string;
  change: number;
  updated: string;
  trend: 'up' | 'down' | 'stable';
}

const AgriculturePrices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const crops: CropPrice[] = [
    {
      id: 1,
      name: 'Paddy (Common)',
      category: 'cereals',
      government: 2040,
      market: 2250,
      unit: 'quintal',
      change: 2.5,
      updated: '2 hours ago',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Wheat',
      category: 'cereals',
      government: 2125,
      market: 2350,
      unit: 'quintal',
      change: 1.2,
      updated: '4 hours ago',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Cotton (Medium)',
      category: 'fibers',
      government: 6080,
      market: 6700,
      unit: 'quintal',
      change: -0.8,
      updated: '1 day ago',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Soybean',
      category: 'oilseeds',
      government: 4300,
      market: 4550,
      unit: 'quintal',
      change: 3.2,
      updated: '6 hours ago',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Mustard',
      category: 'oilseeds',
      government: 5050,
      market: 5200,
      unit: 'quintal',
      change: 0,
      updated: '1 day ago',
      trend: 'stable'
    },
    {
      id: 6,
      name: 'Green Chili',
      category: 'vegetables',
      government: 0,
      market: 3500,
      unit: 'quintal',
      change: -4.3,
      updated: '3 hours ago',
      trend: 'down'
    },
    {
      id: 7,
      name: 'Tur/Arhar Dal',
      category: 'pulses',
      government: 6600,
      market: 7200,
      unit: 'quintal',
      change: 5.1,
      updated: '12 hours ago',
      trend: 'up'
    },
    {
      id: 8,
      name: 'Sugarcane',
      category: 'cash-crops',
      government: 315,
      market: 330,
      unit: 'quintal',
      change: 0.5,
      updated: '2 days ago',
      trend: 'stable'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Crops' },
    { id: 'cereals', label: 'Cereals' },
    { id: 'pulses', label: 'Pulses' },
    { id: 'oilseeds', label: 'Oilseeds' },
    { id: 'fibers', label: 'Fibers' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'cash-crops', label: 'Cash Crops' },
  ];

  const filteredCrops = activeCategory === 'all' 
    ? crops 
    : crops.filter(crop => crop.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Agriculture Prices</h1>
          <p className="text-slate-500 mt-1">Compare government and market prices for agricultural commodities</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <SearchBar 
            placeholder="Search crops..." 
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
              Export Prices
            </Button>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto py-2 -mx-4 px-4 scrollbar-hide">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-emerald-100 text-emerald-800 font-medium'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start">
        <Info size={20} className="text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-emerald-800">About MSP and Market Prices</h3>
          <p className="text-sm text-emerald-700 mt-1">
            The Minimum Support Price (MSP) is the rate at which the government buys crops from farmers. 
            Market prices represent the current trading value in local markets. Comparing these helps farmers 
            decide where to sell their produce for the best return.
          </p>
        </div>
      </div>

      <Card title="Current Crop Prices">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Crop</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">MSP (₹/Unit)</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Market Price (₹/Unit)</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Difference</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">24h Change</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-500">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCrops.map((crop) => (
                <tr key={crop.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{crop.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{crop.category}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {crop.government ? `₹${crop.government.toLocaleString()}/${crop.unit}` : 'Not set'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    ₹{crop.market.toLocaleString()}/{crop.unit}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {crop.government ? (
                      <span className={`font-medium ${crop.market > crop.government ? 'text-green-600' : 'text-red-600'}`}>
                        {crop.market > crop.government ? '+' : ''}
                        ₹{Math.abs(crop.market - crop.government).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-slate-500">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {crop.trend === 'up' ? (
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                      ) : crop.trend === 'down' ? (
                        <TrendingDown size={16} className="text-red-500 mr-1" />
                      ) : (
                        <span className="w-4 h-0.5 bg-slate-400 mr-1"></span>
                      )}
                      <span className={`text-sm ${
                        crop.trend === 'up' 
                          ? 'text-green-600' 
                          : crop.trend === 'down' 
                            ? 'text-red-600' 
                            : 'text-slate-500'
                      }`}>
                        {crop.trend === 'stable' ? 'No change' : `${crop.change > 0 ? '+' : ''}${crop.change}%`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {crop.updated}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Price Trends - Last 30 Days" icon={<TrendingUp size={20} />} />
        <Card title="Market vs. MSP Comparison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-slate-800 mb-2">Current Market Analysis</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 mt-0.5">+</span>
                  <span>Cotton prices increased by 15% since last harvest season</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 mt-0.5">-</span>
                  <span>Vegetable prices expected to decrease in coming weeks due to new harvest</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">i</span>
                  <span>Government considering revision of MSP for pulses in next announcement</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-slate-800 mb-2">Recommendations</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2 mt-0.5">!</span>
                  <span>Consider holding wheat stocks as prices likely to rise in next 2 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 mt-0.5">★</span>
                  <span>Sell mustard seeds at current market price, higher than expected MSP</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Register for government procurement of paddy at local centers</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Helper component for the charts section
const ChartCard = ({ title, icon }: { title: string, icon?: React.ReactNode }) => {
  return (
    <Card title={title} icon={icon}>
      <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded">
        <p className="text-slate-400 text-sm">Price trend chart will appear here</p>
      </div>
    </Card>
  );
};

export default AgriculturePrices;