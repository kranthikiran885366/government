import React from 'react';
import Card from './Card';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  legend?: React.ReactNode;
  actions?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  icon,
  className = '',
  footer,
  legend,
  actions,
}) => {
  return (
    <Card 
      title={title} 
      icon={icon} 
      className={className}
      actions={actions}
    >
      <div>
        {legend && <div className="flex flex-wrap items-center gap-4 mb-4">{legend}</div>}
        
        <div className="aspect-[16/9] w-full">
          {children}
        </div>
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            {footer}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartCard;