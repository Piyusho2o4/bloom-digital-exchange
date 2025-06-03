
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from 'lucide-react';

interface OrdersProps {
  isDemoAccount: boolean;
}

const openOrders = [
  { id: '1', symbol: 'BTC', type: 'Buy Limit', quantity: '0.1', price: '$42,000', status: 'Open', time: '14:30:25' },
  { id: '2', symbol: 'ETH', type: 'Sell Stop', quantity: '1.0', price: '$2,650', status: 'Open', time: '13:45:12' },
  { id: '3', symbol: 'AAPL', type: 'Buy Market', quantity: '5', price: 'Market', status: 'Pending', time: '12:15:08' },
];

const orderHistory = [
  { id: '4', symbol: 'TSLA', type: 'Buy', quantity: '2', price: '$240.50', status: 'Filled', time: '11:30:15', pnl: '+$89.50' },
  { id: '5', symbol: 'MSFT', type: 'Sell', quantity: '10', price: '$375.25', status: 'Filled', time: '10:45:30', pnl: '+$245.60' },
  { id: '6', symbol: 'BTC', type: 'Buy', quantity: '0.05', price: '$41,800', status: 'Filled', time: '09:20:45', pnl: '+$72.50' },
];

export function Orders({ isDemoAccount }: OrdersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Orders
          {isDemoAccount && (
            <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Open Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {openOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <div className="font-semibold">{order.symbol}</div>
                    <div className="text-sm text-muted-foreground">{order.type}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm">Qty: {order.quantity}</div>
                    <div className="text-sm text-muted-foreground">@ {order.price}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm px-2 py-1 rounded ${
                      order.status === 'Open' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {order.status}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{order.time}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderHistory.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div>
                    <div className="font-semibold">{order.symbol}</div>
                    <div className="text-sm text-muted-foreground">{order.type}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm">Qty: {order.quantity}</div>
                    <div className="text-sm text-muted-foreground">@ {order.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">
                      {order.status}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{order.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm profit-text font-semibold">{order.pnl}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
