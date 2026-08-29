import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent } from './ui/sheet';
import alviProfile from 'figma:asset/651002f6876413a3b201123bf1660ae20713e019.png';
import {
  Home,
  Users,
  Clock,
  DollarSign,
  UserPlus,
  TrendingUp,
  Settings,
  MessageCircle,
  Award,
  ChevronRight,
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  Zap,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';

interface DashboardLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  children: React.ReactNode;
}

const navGroups = [
  {
    label: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: Home }],
  },
  {
    label: 'People',
    items: [
      { id: 'employees', label: 'Employees', icon: Users },
      { id: 'attendance', label: 'Attendance & Leave', icon: Clock },
    ],
  },
  {
    label: 'Finance',
    items: [{ id: 'payroll', label: 'Payroll', icon: DollarSign }],
  },
  {
    label: 'Talent',
    items: [
      { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
      { id: 'performance', label: 'Performance', icon: TrendingUp },
    ],
  },
  {
    label: 'Culture',
    items: [{ id: 'engagement', label: 'Engagement', icon: Award }],
  },
  {
    label: 'Tools',
    items: [
      { id: 'ai-assistant', label: 'AI Assistant', icon: MessageCircle },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

const pageLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  employees: 'Employees',
  attendance: 'Attendance & Leave',
  payroll: 'Payroll',
  recruitment: 'Recruitment',
  performance: 'Performance',
  engagement: 'Employee Engagement',
  'ai-assistant': 'AI Assistant',
  settings: 'Settings',
};

function NavContent({
  activeTab,
  setActiveTab,
  collapsed = false,
  mobile = false,
  onClose,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed?: boolean;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const narrow = collapsed && !mobile;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-sidebar">
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 h-12 border-b border-[#DDE1E6] dark:border-sidebar-border flex-shrink-0 ${
          narrow ? 'justify-center px-0' : ''
        }`}
      >
        <div className="w-7 h-7 rounded-md bg-[#0572CE] dark:bg-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!narrow && (
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-sidebar-foreground leading-tight">
              AHE HRFlow
            </div>
            <div className="text-xs text-gray-400 dark:text-sidebar-foreground/60 leading-tight">
              HR Management
            </div>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!narrow && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-sidebar-foreground/40">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  title={narrow ? item.label : undefined}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center gap-2.5 py-2 text-[13px] rounded-r transition-colors relative mb-0.5 ${
                    narrow ? 'justify-center px-2' : 'px-3'
                  } ${
                    isActive
                      ? 'bg-[#EBF3FD] dark:bg-sidebar-accent text-[#0572CE] dark:text-sidebar-primary font-medium border-l-[3px] border-[#0572CE] dark:border-sidebar-primary rounded-l-none'
                      : 'text-gray-600 dark:text-sidebar-foreground/70 hover:bg-gray-100 dark:hover:bg-sidebar-accent/50 hover:text-gray-900 dark:hover:text-sidebar-foreground border-l-[3px] border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-[#0572CE] dark:text-sidebar-primary' : 'text-gray-500 dark:text-sidebar-foreground/50'
                    }`}
                  />
                  {!narrow && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User footer */}
      {!narrow && (
        <div className="border-t border-[#DDE1E6] dark:border-sidebar-border p-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-7 h-7 flex-shrink-0">
              <AvatarImage src={alviProfile} alt="Alvi" />
              <AvatarFallback className="bg-[#0572CE] text-white text-xs">AL</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-sidebar-foreground truncate leading-tight">
                Alvi
              </p>
              <p className="text-xs text-gray-400 dark:text-sidebar-foreground/50 truncate leading-tight">
                HR Administrator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DashboardLayout({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  children,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 border-r border-[#DDE1E6] dark:border-sidebar-border transition-all duration-200 ${
          collapsed ? 'w-14' : 'w-60'
        }`}
      >
        <NavContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={collapsed}
        />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-60 p-0 border-r border-[#DDE1E6]">
          <NavContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mobile
            onClose={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Right panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F5F7F8] dark:bg-background">
        {/* Top header */}
        <header className="h-12 bg-white dark:bg-card border-b border-[#DDE1E6] dark:border-border flex items-center px-3 gap-3 flex-shrink-0 z-20">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted"
          >
            <Menu className="w-4 h-4 text-gray-600 dark:text-muted-foreground" />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-muted-foreground" />
            )}
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-[13px] text-gray-500 dark:text-muted-foreground min-w-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-[#0572CE] dark:hover:text-primary whitespace-nowrap"
            >
              Home
            </button>
            {activeTab !== 'dashboard' && (
              <>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="text-gray-900 dark:text-foreground font-medium truncate">
                  {pageLabels[activeTab] ?? activeTab}
                </span>
              </>
            )}
          </nav>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted">
              <Search className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted relative">
              <Bell className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <div className="w-px h-5 bg-gray-200 dark:bg-border mx-1" />

            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
              )}
            </button>

            <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-muted">
              <Avatar className="w-6 h-6">
                <AvatarImage src={alviProfile} alt="Alvi" />
                <AvatarFallback className="bg-[#0572CE] text-white text-[10px]">AL</AvatarFallback>
              </Avatar>
              <span className="text-[13px] text-gray-700 dark:text-foreground hidden sm:block font-medium">
                Alvi
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
