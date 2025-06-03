
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

interface DepositWithdrawProps {
  isDemoAccount: boolean;
}

export function DepositWithdraw({ isDemoAccount }: DepositWithdrawProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Funds
          {isDemoAccount && (
            <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </h2>
      </div>

      {isDemoAccount && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400 text-sm">
            🎯 Demo Account: All transactions are simulated and use virtual funds.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-3xl font-bold price-display">
                {isDemoAccount ? '$25,000.00' : '$3,456.78'}
              </div>
              <div className="text-muted-foreground">Available Cash</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-lg font-semibold">
                  {isDemoAccount ? '$50,000' : '$12,345'}
                </div>
                <div className="text-sm text-muted-foreground">Total Portfolio</div>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-lg font-semibold">
                  {isDemoAccount ? '$25,000' : '$8,888'}
                </div>
                <div className="text-sm text-muted-foreground">Invested</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Fund Management</CardTitle>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={activeTab === 'deposit' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('deposit')}
                  className="flex items-center gap-2"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Deposit
                </Button>
                <Button
                  size="sm"
                  variant={activeTab === 'withdraw' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('withdraw')}
                  className="flex items-center gap-2"
                >
                  <ArrowUpFromLine className="h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
              />
            </div>

            {activeTab === 'deposit' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {['$100', '$500', '$1000'].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.slice(1))}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>

                <Button className="w-full">
                  {isDemoAccount ? 'Add Demo Funds' : 'Deposit Funds'}
                </Button>
              </div>
            )}

            {activeTab === 'withdraw' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Withdraw To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select withdrawal method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account (...1234)</SelectItem>
                      <SelectItem value="card">Card (...5678)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                  <div className="text-sm">1-3 business days</div>
                </div>

                <Button className="w-full" variant="outline">
                  {isDemoAccount ? 'Remove Demo Funds' : 'Withdraw Funds'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="trading-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'Deposit', amount: '+$1,000', method: 'Bank Transfer', date: '2024-01-15', status: 'Completed' },
              { type: 'Withdraw', amount: '-$500', method: 'Bank Account', date: '2024-01-10', status: 'Completed' },
              { type: 'Deposit', amount: '+$2,000', method: 'Credit Card', date: '2024-01-05', status: 'Completed' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  {transaction.type === 'Deposit' ? (
                    <ArrowDownToLine className="h-4 w-4 text-green-400" />
                  ) : (
                    <ArrowUpFromLine className="h-4 w-4 text-blue-400" />
                  )}
                  <div>
                    <div className="font-semibold">{transaction.type}</div>
                    <div className="text-sm text-muted-foreground">{transaction.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${transaction.type === 'Deposit' ? 'profit-text' : ''}`}>
                    {transaction.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
                <div className="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">
                  {transaction.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
