
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react';

interface TradingFormProps {
  symbol: string;
  currentPrice: number;
  isDemoAccount: boolean;
}

export function TradingForm({ symbol, currentPrice, isDemoAccount }: TradingFormProps) {
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;
    return (qty * prc).toFixed(2);
  };

  const handleOrder = (side: 'buy' | 'sell') => {
    const orderData = {
      symbol,
      side,
      quantity: parseFloat(quantity),
      price: orderType === 'market' ? currentPrice : parseFloat(price),
      orderType,
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      isDemoAccount
    };
    
    console.log(`${side.toUpperCase()} Order:`, orderData);
    
    // Reset form
    setQuantity('');
    setStopLoss('');
    setTakeProfit('');
  };

  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Trade {symbol}</span>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className="price-display">${currentPrice.toFixed(2)}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="order-type">Order Type</Label>
          <Select value={orderType} onValueChange={setOrderType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Order</SelectItem>
              <SelectItem value="limit">Limit Order</SelectItem>
              <SelectItem value="stop">Stop Order</SelectItem>
              <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="0.00"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              step="0.01"
            />
          </div>
          
          {orderType !== 'market' && (
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stop-loss">Stop Loss (Optional)</Label>
            <Input
              id="stop-loss"
              type="number"
              placeholder="0.00"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="take-profit">Take Profit (Optional)</Label>
            <Input
              id="take-profit"
              type="number"
              placeholder="0.00"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              step="0.01"
            />
          </div>
        </div>

        {quantity && (
          <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
            <Calculator className="h-4 w-4" />
            <span className="text-sm">
              Total: <span className="font-semibold">${calculateTotal()}</span>
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleOrder('buy')}
            className="bg-profit hover:bg-profit/90 text-white"
            disabled={!quantity}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Buy {symbol}
          </Button>
          
          <Button
            onClick={() => handleOrder('sell')}
            className="bg-loss hover:bg-loss/90 text-white"
            disabled={!quantity}
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            Sell {symbol}
          </Button>
        </div>

        {isDemoAccount && (
          <div className="text-center text-sm text-green-400 bg-green-500/10 p-2 rounded">
            Demo Mode - No real money will be used
          </div>
        )}
      </CardContent>
    </Card>
  );
}
