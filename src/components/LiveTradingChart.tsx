
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LiveTradingChartProps {
  symbol: string;
  onSymbolSelect: (symbol: string) => void;
}

const symbols = ['BTC/USD', 'ETH/USD', 'AAPL', 'TSLA', 'MSFT', 'GOOGL'];

const generatePriceData = (basePrice: number) => {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * (basePrice * 0.02);
    price += change;
    data.push({
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000)
    });
  }
  return data;
};

export function LiveTradingChart({ symbol, onSymbolSelect }: LiveTradingChartProps) {
  const [chartData, setChartData] = useState(() => generatePriceData(43250));
  const [currentPrice, setCurrentPrice] = useState(43250);
  const [priceChange, setPriceChange] = useState(125.50);

  useEffect(() => {
    const basePrice = symbol === 'BTC/USD' ? 43250 : 
                     symbol === 'ETH/USD' ? 2680 :
                     symbol === 'AAPL' ? 175.25 : 248.90;
    
    setChartData(generatePriceData(basePrice));
    setCurrentPrice(basePrice);
    
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * (basePrice * 0.001);
      const newPrice = basePrice + change;
      setCurrentPrice(parseFloat(newPrice.toFixed(2)));
      
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString(),
          price: parseFloat(newPrice.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000)
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <Card className="trading-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={symbol} onValueChange={onSymbolSelect}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {symbols.map((sym) => (
                  <SelectItem key={sym} value={sym}>{sym}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <div className="text-2xl font-bold price-display">${currentPrice}</div>
              <div className={`text-sm flex items-center gap-1 ${priceChange >= 0 ? 'profit-text' : 'loss-text'}`}>
                {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} (
                {((priceChange / currentPrice) * 100).toFixed(2)}%)
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">1D</Button>
            <Button variant="outline" size="sm">1W</Button>
            <Button variant="outline" size="sm">1M</Button>
            <Button variant="outline" size="sm">1Y</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
