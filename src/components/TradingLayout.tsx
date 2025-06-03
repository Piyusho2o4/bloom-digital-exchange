
import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { Dashboard } from './Dashboard';
import { Portfolio } from './Portfolio';
import { Watchlist } from './Watchlist';
import { Orders } from './Orders';
import { DepositWithdraw } from './DepositWithdraw';
import { AccountToggle } from './AccountToggle';

export type ActiveTab = 'home' | 'portfolio' | 'watchlist' | 'orders' | 'deposit';

const TradingLayout = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDemoAccount, setIsDemoAccount] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard isDemoAccount={isDemoAccount} />;
      case 'portfolio':
        return <Portfolio isDemoAccount={isDemoAccount} />;
      case 'watchlist':
        return <Watchlist />;
      case 'orders':
        return <Orders isDemoAccount={isDemoAccount} />;
      case 'deposit':
        return <DepositWithdraw isDemoAccount={isDemoAccount} />;
      default:
        return <Dashboard isDemoAccount={isDemoAccount} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  TradePro
                </h1>
              </div>
              <AccountToggle isDemoAccount={isDemoAccount} setIsDemoAccount={setIsDemoAccount} />
            </div>
          </header>
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TradingLayout;
