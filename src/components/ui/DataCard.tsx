import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from './Card';

interface DataCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  changeLabel,
  className = '',
}) => {
  const renderTrend = () => {
    if (change === undefined) return null;
    
    const isPositive = change > 0;
    const isNeutral = change === 0;
    
    return (
      <div className={`flex items-center text-sm ${
        isPositive ? 'text-green-600' : isNeutral ? 'text-slate-500' : 'text-red-600'
      }`}>
        {isPositive ? (
          <TrendingUp size={16} className="mr-1" />
        ) : isNeutral ? (
          <Minus size={16} className="mr-1" />
        ) : (
          <TrendingDown size={16} className="mr-1" />
        )}
        <span>{Math.abs(change)}%</span>
        {changeLabel && <span className="ml-1 text-slate-500">{changeLabel}</span>}
      </div>
    );
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          {change !== undefined && <div className="mt-2">{renderTrend()}</div>}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-slate-100 text-slate-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DataCard;