
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { MarketOverview } from './MarketOverview';
import { LiveTradingChart } from './LiveTradingChart';
import { TradingForm } from './TradingForm';
import { QuickStats } from './QuickStats';

interface DashboardProps {
  isDemoAccount: boolean;
}

export function Dashboard({ isDemoAccount }: DashboardProps) {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USD');
  const [currentPrice, setCurrentPrice] = useState(43250);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Trading Dashboard
          {isDemoAccount && (
            <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </h2>
      </div>

      <QuickStats isDemoAccount={isDemoAccount} />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <LiveTradingChart 
            symbol={selectedSymbol} 
            onSymbolSelect={setSelectedSymbol}
          />
        </div>
        <div className="space-y-6">
          <TradingForm 
            symbol={selectedSymbol}
            currentPrice={currentPrice}
            isDemoAccount={isDemoAccount}
          />
          <MarketOverview />
        </div>
      </div>
    </div>
  );
}
