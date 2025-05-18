import React from 'react';
import { AlertCircle } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <AlertCircle className="h-8 w-8 text-emerald-500" />
      <div className="ml-2">
        <h1 className="text-xl font-bold text-white">GovWatch</h1>
        <p className="text-xs text-slate-400">Transparency & Accountability</p>
      </div>
    </div>
  );
};

export default Logo;