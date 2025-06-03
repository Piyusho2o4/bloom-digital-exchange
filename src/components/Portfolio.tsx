
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, BarChart3, Plus, Minus } from 'lucide-react';
import { TradingForm } from './TradingForm';

interface PortfolioProps {
  isDemoAccount: boolean;
}

const portfolioData = [
  { symbol: 'BTC', name: 'Bitcoin', quantity: '0.5', avgPrice: '$41,200', currentPrice: '$43,250', pnl: '+$1,025', pnlPercent: '+2.49%', positive: true, numericPrice: 43250 },
  { symbol: 'ETH', name: 'Ethereum', quantity: '2.5', avgPrice: '$2,650', currentPrice: '$2,680', pnl: '+$75', pnlPercent: '+1.13%', positive: true, numericPrice: 2680 },
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: '10', avgPrice: '$178.50', currentPrice: '$175.25', pnl: '-$32.50', pnlPercent: '-1.82%', positive: false, numericPrice: 175.25 },
  { symbol: 'TSLA', name: 'Tesla Inc.', quantity: '5', avgPrice: '$240.00', currentPrice: '$248.90', pnl: '+$44.50', pnlPercent: '+3.71%', positive: true, numericPrice: 248.90 },
];

export function Portfolio({ isDemoAccount }: PortfolioProps) {
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const totalValue = isDemoAccount ? '$50,000' : '$12,345';
  const totalPnl = isDemoAccount ? '+$1,250' : '+$302';

  const handleQuickBuy = (stock: any) => {
    console.log(`Quick buy for ${stock.symbol} at ${stock.currentPrice}`);
  };

  const handleQuickSell = (stock: any) => {
    console.log(`Quick sell for ${stock.symbol} at ${stock.currentPrice}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Portfolio
          {isDemoAccount && (
            <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-2xl font-bold price-display">{totalValue}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total P&L</div>
            <div className="text-2xl font-bold profit-text">{totalPnl}</div>
          </div>
        </div>
      </div>

      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold text-lg">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Qty: {holding.quantity}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 text-right">
                  <div>
                    <div className="text-xs text-muted-foreground">Avg Price</div>
                    <div className="price-display">{holding.avgPrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Current Price</div>
                    <div className="price-display">{holding.currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">P&L</div>
                    <div className={`price-display ${holding.positive ? 'profit-text' : 'loss-text'}`}>
                      {holding.pnl}
                    </div>
                    <div className={`text-xs ${holding.positive ? 'profit-text' : 'loss-text'}`}>
                      {holding.pnlPercent}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickBuy(holding);
                    }}
                    className="bg-profit hover:bg-profit/90 text-white"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickSell(holding);
                    }}
                    className="bg-loss hover:bg-loss/90 text-white"
                  >
                    <Minus className="h-3 w-3 mr-1" />
                    Sell
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStock(holding);
                        }}
                      >
                        Trade
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Trade {holding.symbol}</DialogTitle>
                      </DialogHeader>
                      <TradingForm 
                        symbol={holding.symbol}
                        currentPrice={holding.numericPrice}
                        isDemoAccount={isDemoAccount}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
