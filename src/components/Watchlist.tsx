
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Plus, TrendingUp, TrendingDown, Star, ShoppingCart } from 'lucide-react';
import { TradingForm } from './TradingForm';

const watchlistData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.45, volume: '2.1B', positive: true },
  { symbol: 'ETH', name: 'Ethereum', price: 2680.50, change: 1.89, volume: '1.8B', positive: true },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.25, change: -0.75, volume: '45.2M', positive: false },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.90, change: 3.21, volume: '112.5M', positive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.50, change: 5.67, volume: '67.8M', positive: true },
  { symbol: 'AMD', name: 'AMD Inc.', price: 145.30, change: -2.15, volume: '34.9M', positive: false },
];

export function Watchlist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleQuickTrade = (item: any, action: 'buy' | 'sell') => {
    console.log(`Quick ${action} for ${item.symbol} at $${item.price}`);
    // Here you would typically open a quick trade modal or execute the trade
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Watchlist</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search symbols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Symbol
          </Button>
        </div>
      </div>

      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Your Watchlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {watchlistData
              .filter(item => 
                item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-yellow-500">
                      <Star className="h-4 w-4" />
                    </button>
                    <div onClick={() => setSelectedItem(item)}>
                      <div className="font-semibold text-lg">{item.symbol}</div>
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 text-right">
                    <div>
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="price-display">${item.price.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Change</div>
                      <div className={`price-display flex items-center gap-1 justify-end ${item.positive ? 'profit-text' : 'loss-text'}`}>
                        {item.positive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {item.positive ? '+' : ''}{item.change.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="price-display text-sm">{item.volume}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-profit hover:bg-profit/90"
                          onClick={() => setSelectedItem(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Trade
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Trade {item.symbol}</DialogTitle>
                        </DialogHeader>
                        <TradingForm 
                          symbol={item.symbol}
                          currentPrice={item.price}
                          isDemoAccount={true}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickTrade(item, 'buy')}
                    >
                      Quick Buy
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
