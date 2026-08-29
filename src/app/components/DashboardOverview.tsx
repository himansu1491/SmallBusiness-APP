import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  UserCheck,
  CalendarDays,
  Award,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';

const attendanceTrend = [
  { month: 'Aug', present: 228, leave: 19, rate: 92.3 },
  { month: 'Sep', present: 232, leave: 15, rate: 93.9 },
  { month: 'Oct', present: 225, leave: 22, rate: 91.1 },
  { month: 'Nov', present: 235, leave: 12, rate: 95.1 },
  { month: 'Dec', present: 230, leave: 17, rate: 93.1 },
  { month: 'Jan', present: 233, leave: 14, rate: 94.3 },
];

const recentActivities = [
  { id: 1, user: 'Sarah Johnson', dept: 'Engineering', action: 'Leave request submitted', time: '2h ago', type: 'leave', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d3?w=32&h=32&fit=crop&crop=face' },
  { id: 2, user: 'Mike Chen', dept: 'Product', action: 'Performance review completed', time: '4h ago', type: 'performance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
  { id: 3, user: 'Lisa Brown', dept: 'Design', action: 'Profile information updated', time: '6h ago', type: 'profile', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
  { id: 4, user: 'David Wilson', dept: 'Sales', action: 'Clocked in — Office', time: '8h ago', type: 'attendance', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: 5, user: 'Emma Davis', dept: 'Marketing', action: 'New hire onboarding started', time: '1d ago', type: 'onboarding', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
];

const pendingApprovals = [
  { id: 1, type: 'Leave Request', employee: 'Sarah Johnson', dept: 'Engineering', submitted: 'Today 9:14 AM' },
  { id: 2, type: 'Expense Report', employee: 'Mike Chen', dept: 'Product', submitted: 'Yesterday' },
  { id: 3, type: 'Time-off Request', employee: 'Lisa Brown', dept: 'Design', submitted: 'Yesterday' },
];

const topPerformers = [
  { name: 'Alex Rodriguez', role: 'Senior Developer', score: 98, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
  { name: 'Emma Davis', role: 'Product Manager', score: 96, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
  { name: 'James Wilson', role: 'UX Designer', score: 94, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
];

const kpis = [
  {
    label: 'Total Employees',
    value: '247',
    sub: '+8 new this month',
    trend: 'up',
    icon: Users,
    iconColor: 'text-[#0572CE]',
    iconBg: 'bg-[#EBF3FD]',
  },
  {
    label: 'Present Today',
    value: '233',
    sub: '94.3% attendance rate',
    trend: 'up',
    icon: UserCheck,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    label: 'On Leave',
    value: '14',
    sub: '3 pending approvals',
    trend: 'neutral',
    icon: CalendarDays,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    label: 'Monthly Payroll',
    value: '$1.24M',
    sub: '+3.2% from last month',
    trend: 'up',
    icon: DollarSign,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
  },
];

const typeColors: Record<string, string> = {
  leave: 'bg-blue-100 text-blue-700',
  performance: 'bg-purple-100 text-purple-700',
  profile: 'bg-gray-100 text-gray-600',
  attendance: 'bg-emerald-100 text-emerald-700',
  onboarding: 'bg-amber-100 text-amber-700',
};

export function DashboardOverview() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 space-y-5">
      {/* Page title region */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-foreground">
            Good morning, Alvi
          </h1>
          <p className="text-[13px] text-gray-500 dark:text-muted-foreground mt-0.5">{today}</p>
        </div>
        <button className="flex items-center gap-1.5 bg-[#0572CE] dark:bg-primary text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#0461B1] transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Employee
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-gray-500 dark:text-muted-foreground uppercase tracking-wide">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-foreground mt-1">
                    {kpi.value}
                  </p>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.iconBg} dark:bg-muted`}>
                  <Icon className={`w-5 h-5 ${kpi.iconColor} dark:text-primary`} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {kpi.trend === 'up' && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                )}
                {kpi.trend === 'down' && (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                )}
                <p className="text-[12px] text-gray-500 dark:text-muted-foreground">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Attendance chart */}
        <div className="xl:col-span-2 bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#DDE1E6] dark:border-border">
            <div>
              <h2 className="text-[13px] font-semibold text-gray-900 dark:text-foreground">
                Attendance Trend
              </h2>
              <p className="text-[12px] text-gray-500 dark:text-muted-foreground">Aug – Jan headcount</p>
            </div>
            <button className="text-[12px] text-[#0572CE] dark:text-primary hover:underline flex items-center gap-0.5">
              View report <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceTrend} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[200, 250]}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #DDE1E6',
                    borderRadius: 6,
                    fontSize: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                  cursor={{ fill: '#F5F7F8' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="present" name="Present" fill="#0572CE" radius={[3, 3, 0, 0]} />
                <Bar dataKey="leave" name="On Leave" fill="#EBF3FD" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top performers */}
        <div className="bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#DDE1E6] dark:border-border">
            <h2 className="text-[13px] font-semibold text-gray-900 dark:text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0572CE] dark:text-primary" />
              Top Performers
            </h2>
            <span className="text-[11px] text-gray-400 dark:text-muted-foreground">Jan 2024</span>
          </div>
          <div className="p-4 space-y-3">
            {topPerformers.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={p.avatar} alt={p.name} />
                    <AvatarFallback className="bg-[#EBF3FD] text-[#0572CE] text-xs">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0572CE] text-white rounded-full text-[10px] flex items-center justify-center font-semibold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 dark:text-foreground truncate">
                    {p.name}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-muted-foreground truncate">{p.role}</p>
                </div>
                <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-muted dark:text-emerald-400 px-2 py-0.5 rounded">
                  {p.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Recent activities — Interactive Report style */}
        <div className="bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg shadow-sm">
          {/* Table toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#DDE1E6] dark:border-border">
            <h2 className="text-[13px] font-semibold text-gray-900 dark:text-foreground">
              Recent Activities
            </h2>
            <span className="text-[11px] text-gray-400 dark:text-muted-foreground">
              {recentActivities.length} rows
            </span>
          </div>
          <div className="divide-y divide-[#F0F2F5] dark:divide-border">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors"
              >
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarImage src={act.avatar} alt={act.user} />
                  <AvatarFallback className="bg-[#EBF3FD] text-[#0572CE] text-[10px]">
                    {act.user.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 dark:text-foreground truncate">
                    {act.user}
                    <span className="font-normal text-gray-500 dark:text-muted-foreground"> · {act.dept}</span>
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-muted-foreground truncate">{act.action}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${typeColors[act.type] ?? 'bg-gray-100 text-gray-600'}`}
                  >
                    {act.type}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-muted-foreground whitespace-nowrap">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending approvals */}
        <div className="bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#DDE1E6] dark:border-border">
            <h2 className="text-[13px] font-semibold text-gray-900 dark:text-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Pending Approvals
            </h2>
            <span className="text-[11px] bg-amber-50 text-amber-600 font-semibold px-2 py-0.5 rounded-full">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="divide-y divide-[#F0F2F5] dark:divide-border">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 dark:text-foreground">
                    {item.type}
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-muted-foreground">
                    {item.employee} · {item.dept}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-muted-foreground mt-0.5">
                    {item.submitted}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="px-3 py-1.5 text-[12px] border border-[#DDE1E6] dark:border-border rounded text-gray-600 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted font-medium transition-colors">
                    Reject
                  </button>
                  <button className="px-3 py-1.5 text-[12px] bg-[#0572CE] dark:bg-primary text-white rounded hover:bg-[#0461B1] font-medium transition-colors">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
