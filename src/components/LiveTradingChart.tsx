
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

interface LiveTradingChartProps {
  symbol: string;
  onSymbolSelect?: (symbol: string) => void;
}

export function LiveTradingChart({ symbol, onSymbolSelect }: LiveTradingChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(43250);
  const [priceChange, setPriceChange] = useState(2.45);
  const [isLive, setIsLive] = useState(true);
  const [timeframe, setTimeframe] = useState('1H');

  // Generate initial data
  useEffect(() => {
    const generateInitialData = () => {
      const data = [];
      const now = new Date();
      let basePrice = 43000;
      
      for (let i = 30; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
        const variation = (Math.random() - 0.5) * 200;
        basePrice += variation;
        
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: basePrice,
          volume: Math.floor(Math.random() * 1000000) + 500000
        });
      }
      return data;
    };

    setChartData(generateInitialData());
  }, [symbol]);

  // Simulate live price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 100;
      const newPrice = currentPrice + variation;
      const change = ((newPrice - 43000) / 43000) * 100;
      
      setCurrentPrice(newPrice);
      setPriceChange(change);

      const now = new Date();
      const newDataPoint = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: newPrice,
        volume: Math.floor(Math.random() * 1000000) + 500000
      };

      setChartData(prev => [...prev.slice(1), newDataPoint]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive, currentPrice]);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D'];
  const symbols = ['BTC/USD', 'ETH/USD', 'AAPL', 'TSLA', 'NVDA'];

  return (
    <Card className="trading-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {symbol} - Live Chart
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-profit animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-sm text-muted-foreground">{isLive ? 'Live' : 'Paused'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isLive ? "destructive" : "default"}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="price-display text-2xl text-foreground">
              ${currentPrice.toFixed(2)}
            </span>
            <span className={`flex items-center gap-1 font-semibold ${priceChange >= 0 ? 'profit-text' : 'loss-text'}`}>
              {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% 
              ({priceChange >= 0 ? '+' : ''}${(currentPrice - 43000).toFixed(2)})
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                onClick={() => setTimeframe(tf)}
                className="text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Symbol:</span>
            <div className="flex gap-1">
              {symbols.map((sym) => (
                <Button
                  key={sym}
                  size="sm"
                  variant={symbol === sym ? "default" : "outline"}
                  onClick={() => onSymbolSelect?.(sym)}
                  className="text-xs"
                >
                  {sym}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={['dataMin - 50', 'dataMax + 50']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                dot={false}
                strokeDasharray={isLive ? "0" : "5 5"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
          <div>
            <div className="text-muted-foreground">24h High</div>
            <div className="font-semibold">${(currentPrice + 500).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h Low</div>
            <div className="font-semibold">${(currentPrice - 800).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Volume</div>
            <div className="font-semibold">2.1B</div>
          </div>
          <div>
            <div className="text-muted-foreground">Market Cap</div>
            <div className="font-semibold">$851.2B</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
