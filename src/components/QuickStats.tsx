
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface QuickStatsProps {
  isDemoAccount: boolean;
}

export function QuickStats({ isDemoAccount }: QuickStatsProps) {
  const stats = [
    {
      title: "Portfolio Value",
      value: isDemoAccount ? "$50,000.00" : "$12,345.67",
      change: "+2.5%",
      changeValue: isDemoAccount ? "+$1,250" : "+$302.15",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "Today's P&L",
      value: isDemoAccount ? "+$375.00" : "+$89.50",
      change: "+0.75%",
      changeValue: "vs yesterday",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Open Positions",
      value: "7",
      change: "3 winning",
      changeValue: "4 losing",
      icon: BarChart3,
      positive: true,
    },
    {
      title: "Available Cash",
      value: isDemoAccount ? "$25,000.00" : "$3,456.78",
      change: "Ready to trade",
      changeValue: "",
      icon: DollarSign,
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold price-display">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              <span className={stat.positive ? "profit-text" : "loss-text"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.changeValue}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
