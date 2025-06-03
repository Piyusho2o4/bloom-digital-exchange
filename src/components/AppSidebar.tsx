
import { Home, TrendingUp, Eye, FileText, CreditCard, BarChart3 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ActiveTab } from './TradingLayout';

interface AppSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: 'home' as ActiveTab,
  },
  {
    title: "Portfolio",
    icon: BarChart3,
    id: 'portfolio' as ActiveTab,
  },
  {
    title: "Watchlist",
    icon: Eye,
    id: 'watchlist' as ActiveTab,
  },
  {
    title: "Orders",
    icon: FileText,
    id: 'orders' as ActiveTab,
  },
  {
    title: "Deposit/Withdraw",
    icon: CreditCard,
    id: 'deposit' as ActiveTab,
  },
];

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full ${activeTab === item.id ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
