
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$43,250.00', change: '+2.45%', positive: true },
  { symbol: 'ETH', name: 'Ethereum', price: '$2,680.50', change: '+1.89%', positive: true },
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.25', change: '-0.75%', positive: false },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.90', change: '+3.21%', positive: true },
  { symbol: 'MSFT', name: 'Microsoft', price: '$378.45', change: '+0.95%', positive: true },
  { symbol: 'GOOGL', name: 'Alphabet', price: '$142.80', change: '-1.25%', positive: false },
];

export function MarketOverview() {
  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {marketData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
            <div>
              <div className="font-semibold">{item.symbol}</div>
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="price-display text-sm">{item.price}</div>
              <div className={`text-xs flex items-center gap-1 ${item.positive ? 'profit-text' : 'loss-text'}`}>
                {item.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
