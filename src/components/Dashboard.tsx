
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { MarketOverview } from './MarketOverview';
import { TradingChart } from './TradingChart';
import { QuickStats } from './QuickStats';

interface DashboardProps {
  isDemoAccount: boolean;
}

export function Dashboard({ isDemoAccount }: DashboardProps) {
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingChart />
        </div>
        <div className="space-y-6">
          <MarketOverview />
        </div>
      </div>
    </div>
  );
}
