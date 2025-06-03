
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { time: '09:00', price: 42800 },
  { time: '10:00', price: 43100 },
  { time: '11:00', price: 42950 },
  { time: '12:00', price: 43300 },
  { time: '13:00', price: 43150 },
  { time: '14:00', price: 43450 },
  { time: '15:00', price: 43250 },
  { time: '16:00', price: 43600 },
];

export function TradingChart() {
  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle>BTC/USD - Live Chart</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Last: $43,250.00</span>
          <span className="profit-text">+2.45% (+$1,025.50)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
                domain={['dataMin - 200', 'dataMax + 200']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#22c55e" 
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
