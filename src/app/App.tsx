import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardOverview } from './components/DashboardOverview';
import { EmployeeManagement } from './components/EmployeeManagement';
import { AttendanceLeave } from './components/AttendanceLeave';
import { AIAssistant } from './components/AIAssistant';
import {
  DollarSign,
  UserPlus,
  TrendingUp,
  Award,
  Users,
  Clock,
  Calendar,
  BarChart3,
  FileText,
  Target,
  Star,
  Gift,
  MessageSquare,
  Settings,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Download,
  Upload,
  Edit,
  Trash2,
} from 'lucide-react';

// ── Shared Redwood card primitives ────────────────────────────────────────────

function RwCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-card border border-[#DDE1E6] dark:border-border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function RwCardHeader({
  title,
  subtitle,
  action,
}: {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#DDE1E6] dark:border-border">
      <div>
        <h2 className="text-[13px] font-semibold text-gray-900 dark:text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-[12px] text-gray-500 dark:text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function RwKpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <RwCard className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-foreground mt-1">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg} dark:bg-muted`}>
          <Icon className={`w-5 h-5 ${iconColor} dark:text-primary`} />
        </div>
      </div>
      {sub && <p className="text-[12px] text-gray-400 dark:text-muted-foreground mt-2">{sub}</p>}
    </RwCard>
  );
}

function PageHeader({
  title,
  description,
  primaryAction,
}: {
  title: string;
  description: string;
  primaryAction?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-foreground">{title}</h1>
        <p className="text-[13px] text-gray-500 dark:text-muted-foreground mt-0.5">{description}</p>
      </div>
      {primaryAction && <div>{primaryAction}</div>}
    </div>
  );
}

function StatusBadge({ label, variant }: { label: string; variant: 'success' | 'warning' | 'danger' | 'neutral' | 'blue' }) {
  const cls = {
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-muted dark:text-muted-foreground',
    blue: 'bg-[#EBF3FD] text-[#0572CE] dark:bg-primary/20 dark:text-primary',
  }[variant];
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${cls}`}>{label}</span>
  );
}

// ── Payroll ───────────────────────────────────────────────────────────────────

const payrollEmployees = [
  { id: 1, name: 'Sarah Johnson', dept: 'Engineering', position: 'Senior Developer', salary: 95000, netPay: 72450, status: 'Processed' },
  { id: 2, name: 'Mike Chen', dept: 'Product', position: 'Product Manager', salary: 110000, netPay: 83800, status: 'Processed' },
  { id: 3, name: 'Lisa Brown', dept: 'Design', position: 'UX Designer', salary: 85000, netPay: 64770, status: 'Pending' },
  { id: 4, name: 'David Wilson', dept: 'Sales', position: 'Sales Lead', salary: 92000, netPay: 70092, status: 'Processed' },
  { id: 5, name: 'Emma Davis', dept: 'Marketing', position: 'Marketing Manager', salary: 88000, netPay: 67056, status: 'Pending' },
];

function PayrollManagement() {
  const [search, setSearch] = useState('');
  const filtered = payrollEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <PageHeader
        title="Payroll Management"
        description="Manage employee compensation and process payroll runs"
        primaryAction={
          <button className="flex items-center gap-1.5 bg-[#0572CE] dark:bg-primary text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#0461B1] transition-colors">
            <DollarSign className="w-3.5 h-3.5" />
            Process Payroll
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <RwKpiCard label="Total Payroll" value="$1.24M" sub="January 2024" icon={DollarSign} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <RwKpiCard label="Employees Processed" value="244 / 247" sub="3 pending approval" icon={Users} iconColor="text-[#0572CE]" iconBg="bg-[#EBF3FD]" />
        <RwKpiCard label="Next Payroll Date" value="Jan 31" sub="7 days remaining" icon={Calendar} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Interactive Report */}
      <RwCard>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#DDE1E6] dark:border-border">
          <div className="flex items-center gap-2 border border-[#DDE1E6] dark:border-border rounded px-2.5 py-1.5 bg-white dark:bg-input flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees…"
              className="text-[13px] bg-transparent border-none outline-none flex-1 text-gray-900 dark:text-foreground placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-1 border border-[#DDE1E6] dark:border-border rounded px-3 py-1.5 text-[12px] text-gray-600 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="flex items-center gap-1 border border-[#DDE1E6] dark:border-border rounded px-3 py-1.5 text-[12px] text-gray-600 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted">
            <Download className="w-3 h-3" /> Export
          </button>
          <span className="ml-auto text-[12px] text-gray-400 dark:text-muted-foreground">{filtered.length} rows</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F5F7F8] dark:bg-muted border-b border-[#DDE1E6] dark:border-border">
                {['Employee', 'Department', 'Position', 'Gross Salary', 'Net Pay', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-muted-foreground ${h === 'Gross Salary' || h === 'Net Pay' ? 'text-right' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] dark:divide-border">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-foreground">{emp.name}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{emp.dept}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{emp.position}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900 dark:text-foreground">
                    ${emp.salary.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">
                    ${emp.netPay.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge
                      label={emp.status}
                      variant={emp.status === 'Processed' ? 'success' : 'warning'}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-muted">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#DDE1E6] dark:border-border">
          <p className="text-[12px] text-gray-400 dark:text-muted-foreground">
            1–{filtered.length} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 text-[12px] border border-[#DDE1E6] dark:border-border rounded hover:bg-gray-50 dark:hover:bg-muted text-gray-600 dark:text-foreground disabled:opacity-40">
              ‹ Prev
            </button>
            <button className="px-2.5 py-1 text-[12px] border border-[#DDE1E6] dark:border-border rounded hover:bg-gray-50 dark:hover:bg-muted text-gray-600 dark:text-foreground disabled:opacity-40">
              Next ›
            </button>
          </div>
        </div>
      </RwCard>
    </div>
  );
}

// ── Recruitment ───────────────────────────────────────────────────────────────

const applications = [
  { id: 1, name: 'Alex Chen', position: 'Senior Developer', dept: 'Engineering', applied: 'Jan 12, 2024', stage: 'Interview Scheduled', source: 'LinkedIn' },
  { id: 2, name: 'Maria Garcia', position: 'UX Designer', dept: 'Design', applied: 'Jan 10, 2024', stage: 'Under Review', source: 'Referral' },
  { id: 3, name: 'John Smith', position: 'Product Manager', dept: 'Product', applied: 'Jan 8, 2024', stage: 'Offer Extended', source: 'Indeed' },
  { id: 4, name: 'Priya Sharma', position: 'Data Analyst', dept: 'Analytics', applied: 'Jan 7, 2024', stage: 'Screening', source: 'LinkedIn' },
  { id: 5, name: 'Tyler Johnson', position: 'DevOps Engineer', dept: 'Engineering', applied: 'Jan 5, 2024', stage: 'Technical Test', source: 'Glassdoor' },
];

const stageVariant: Record<string, 'blue' | 'warning' | 'success' | 'neutral'> = {
  'Interview Scheduled': 'blue',
  'Under Review': 'warning',
  'Offer Extended': 'success',
  'Screening': 'neutral',
  'Technical Test': 'blue',
};

function RecruitmentManagement() {
  const [search, setSearch] = useState('');
  const filtered = applications.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <PageHeader
        title="Recruitment"
        description="Manage job openings and the candidate pipeline"
        primaryAction={
          <button className="flex items-center gap-1.5 bg-[#0572CE] dark:bg-primary text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#0461B1] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Post New Job
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        <RwKpiCard label="Open Positions" value="12" sub="Across 6 departments" icon={UserPlus} iconColor="text-[#0572CE]" iconBg="bg-[#EBF3FD]" />
        <RwKpiCard label="Applications" value="34" sub="+8 this week" icon={FileText} iconColor="text-violet-600" iconBg="bg-violet-50" />
        <RwKpiCard label="Interviews" value="8" sub="Scheduled this week" icon={Calendar} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <RwKpiCard label="Offers Extended" value="3" sub="2 accepted" icon={CheckCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
      </div>

      <RwCard>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#DDE1E6] dark:border-border">
          <div className="flex items-center gap-2 border border-[#DDE1E6] dark:border-border rounded px-2.5 py-1.5 bg-white dark:bg-input flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidates…"
              className="text-[13px] bg-transparent border-none outline-none flex-1 placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-1 border border-[#DDE1E6] dark:border-border rounded px-3 py-1.5 text-[12px] text-gray-600 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <span className="ml-auto text-[12px] text-gray-400 dark:text-muted-foreground">{filtered.length} rows</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F5F7F8] dark:bg-muted border-b border-[#DDE1E6] dark:border-border">
                {['Candidate', 'Position', 'Department', 'Applied', 'Stage', 'Source', ''].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] dark:divide-border">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-foreground">{app.name}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{app.position}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{app.dept}</td>
                  <td className="px-4 py-2.5 text-gray-500 dark:text-muted-foreground">{app.applied}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge label={app.stage} variant={stageVariant[app.stage] ?? 'neutral'} />
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 dark:text-muted-foreground">{app.source}</td>
                  <td className="px-4 py-2.5">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-muted">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#DDE1E6] dark:border-border">
          <p className="text-[12px] text-gray-400 dark:text-muted-foreground">
            1–{filtered.length} of {applications.length}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 text-[12px] border border-[#DDE1E6] dark:border-border rounded hover:bg-gray-50 dark:hover:bg-muted text-gray-600 dark:text-foreground">‹ Prev</button>
            <button className="px-2.5 py-1 text-[12px] border border-[#DDE1E6] dark:border-border rounded hover:bg-gray-50 dark:hover:bg-muted text-gray-600 dark:text-foreground">Next ›</button>
          </div>
        </div>
      </RwCard>
    </div>
  );
}

// ── Performance ───────────────────────────────────────────────────────────────

const performers = [
  { name: 'Sarah Johnson', dept: 'Engineering', manager: 'John Smith', score: 4.8, goals: 95, reviews: 'Completed', rating: 'Exceeds' },
  { name: 'Mike Chen', dept: 'Product', manager: 'Jane Doe', score: 4.7, goals: 92, reviews: 'Completed', rating: 'Exceeds' },
  { name: 'Lisa Brown', dept: 'Design', manager: 'Alex Wilson', score: 4.6, goals: 88, reviews: 'Pending', rating: 'Meets' },
  { name: 'David Wilson', dept: 'Sales', manager: 'Susan Lee', score: 4.2, goals: 85, reviews: 'Completed', rating: 'Meets' },
  { name: 'Emma Davis', dept: 'Marketing', manager: 'Chris Park', score: 3.8, goals: 78, reviews: 'Overdue', rating: 'Developing' },
];

const ratingVariant: Record<string, 'success' | 'blue' | 'warning' | 'neutral'> = {
  Exceeds: 'success',
  Meets: 'blue',
  Developing: 'warning',
};

function PerformanceManagement() {
  const [search, setSearch] = useState('');
  const filtered = performers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <PageHeader
        title="Performance Management"
        description="Track employee performance reviews and goal attainment"
        primaryAction={
          <button className="flex items-center gap-1.5 bg-[#0572CE] dark:bg-primary text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#0461B1] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Start Review Cycle
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        <RwKpiCard label="Avg Rating" value="4.2 / 5.0" sub="Q4 2023 cycle" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50" />
        <RwKpiCard label="Reviews Completed" value="234" sub="Of 247 total" icon={CheckCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <RwKpiCard label="Pending Reviews" value="13" sub="Due by Jan 31" icon={AlertTriangle} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <RwKpiCard label="Goal Completion" value="87%" sub="+4% vs last quarter" icon={Target} iconColor="text-[#0572CE]" iconBg="bg-[#EBF3FD]" />
      </div>

      <RwCard>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#DDE1E6] dark:border-border">
          <div className="flex items-center gap-2 border border-[#DDE1E6] dark:border-border rounded px-2.5 py-1.5 bg-white dark:bg-input flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees…"
              className="text-[13px] bg-transparent border-none outline-none flex-1 placeholder:text-gray-400"
            />
          </div>
          <span className="ml-auto text-[12px] text-gray-400 dark:text-muted-foreground">{filtered.length} rows</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F5F7F8] dark:bg-muted border-b border-[#DDE1E6] dark:border-border">
                {['Employee', 'Department', 'Manager', 'Score', 'Goal %', 'Review Status', 'Rating', ''].map((h) => (
                  <th key={h} className={`px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-muted-foreground ${h === 'Score' || h === 'Goal %' ? 'text-right' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] dark:divide-border">
              {filtered.map((p, i) => (
                <tr key={i} className="hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-foreground">{p.name}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{p.dept}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-muted-foreground">{p.manager}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-900 dark:text-foreground">{p.score}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700 dark:text-foreground">{p.goals}%</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge
                      label={p.reviews}
                      variant={p.reviews === 'Completed' ? 'success' : p.reviews === 'Pending' ? 'warning' : 'danger'}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge label={p.rating} variant={ratingVariant[p.rating] ?? 'neutral'} />
                  </td>
                  <td className="px-4 py-2.5">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-muted">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RwCard>
    </div>
  );
}

// ── Engagement ────────────────────────────────────────────────────────────────

const recognitions = [
  { giver: 'John Smith', receiver: 'Sarah Johnson', reason: 'Outstanding project delivery on the Q4 launch', type: 'Excellence', date: 'Jan 15' },
  { giver: 'Lisa Brown', receiver: 'Mike Chen', reason: 'Exceptional cross-team collaboration on the new feature', type: 'Teamwork', date: 'Jan 14' },
  { giver: 'David Wilson', receiver: 'Emma Davis', reason: 'Creative and innovative problem solving approach', type: 'Innovation', date: 'Jan 13' },
  { giver: 'Emma Davis', receiver: 'David Wilson', reason: 'Mentoring junior team members above and beyond', type: 'Leadership', date: 'Jan 12' },
];

const typeColor: Record<string, string> = {
  Excellence: 'bg-purple-50 text-purple-700',
  Teamwork: 'bg-blue-50 text-blue-700',
  Innovation: 'bg-amber-50 text-amber-700',
  Leadership: 'bg-emerald-50 text-emerald-700',
};

function EmployeeEngagement() {
  return (
    <div className="p-6">
      <PageHeader
        title="Employee Engagement"
        description="Foster recognition, surveys, and a positive workplace culture"
        primaryAction={
          <button className="flex items-center gap-1.5 bg-[#0572CE] dark:bg-primary text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-[#0461B1] transition-colors">
            <Gift className="w-3.5 h-3.5" />
            Give Recognition
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        <RwKpiCard label="Engagement Score" value="87%" sub="+2% vs last quarter" icon={TrendingUp} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <RwKpiCard label="Survey Responses" value="234" sub="94.7% response rate" icon={MessageSquare} iconColor="text-[#0572CE]" iconBg="bg-[#EBF3FD]" />
        <RwKpiCard label="Recognitions" value="45" sub="This month" icon={Award} iconColor="text-amber-500" iconBg="bg-amber-50" />
        <RwKpiCard label="Active Programs" value="8" sub="3 launching soon" icon={Gift} iconColor="text-violet-600" iconBg="bg-violet-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recognitions feed */}
        <div className="xl:col-span-2">
          <RwCard>
            <RwCardHeader title="Recognition Feed" subtitle="Peer-to-peer recognitions this month" />
            <div className="divide-y divide-[#F0F2F5] dark:divide-border">
              {recognitions.map((r, i) => (
                <div key={i} className="px-5 py-3.5 hover:bg-[#F5F7F8] dark:hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-900 dark:text-foreground">
                        <span className="font-semibold">{r.giver}</span>
                        <span className="text-gray-500 dark:text-muted-foreground"> recognized </span>
                        <span className="font-semibold">{r.receiver}</span>
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-muted-foreground mt-0.5 line-clamp-2">
                        {r.reason}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${typeColor[r.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {r.type}
                      </span>
                      <span className="text-[11px] text-gray-400 dark:text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RwCard>
        </div>

        {/* Quick survey */}
        <RwCard>
          <RwCardHeader title="Pulse Survey" subtitle="Week 3 — January 2024" />
          <div className="p-5 space-y-4">
            {[
              { label: 'Work-Life Balance', score: 82 },
              { label: 'Manager Support', score: 91 },
              { label: 'Career Growth', score: 74 },
              { label: 'Team Collaboration', score: 88 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-gray-600 dark:text-muted-foreground">{item.label}</span>
                  <span className="text-[12px] font-semibold text-gray-900 dark:text-foreground">{item.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0572CE] dark:bg-primary rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
            <button className="w-full mt-3 py-2 text-[12px] font-medium text-[#0572CE] dark:text-primary border border-[#0572CE] dark:border-primary rounded hover:bg-[#EBF3FD] dark:hover:bg-primary/10 transition-colors">
              View Full Report
            </button>
          </div>
        </RwCard>
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────

const settingsSections = [
  {
    title: 'Company Profile',
    description: 'Manage company name, address, logo, and business details.',
    action: 'Edit',
  },
  {
    title: 'User Roles & Permissions',
    description: 'Configure role-based access control for HR modules.',
    action: 'Manage',
  },
  {
    title: 'Leave Policies',
    description: 'Set leave types, accrual rules, and approval workflows.',
    action: 'Configure',
  },
  {
    title: 'Payroll Settings',
    description: 'Tax configuration, deduction templates, and pay schedules.',
    action: 'Configure',
  },
  {
    title: 'Notifications',
    description: 'Manage email and in-app notification preferences.',
    action: 'Edit',
  },
  {
    title: 'Integrations',
    description: 'Connect with accounting, payroll, or productivity tools.',
    action: 'Manage',
  },
];

function SettingsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Settings"
        description="Configure system-wide HR policies and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {settingsSections.map((s) => (
          <RwCard key={s.title}>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-foreground">{s.title}</h3>
                <p className="text-[12px] text-gray-500 dark:text-muted-foreground mt-0.5">{s.description}</p>
              </div>
              <button className="flex-shrink-0 px-3 py-1.5 text-[12px] font-medium border border-[#DDE1E6] dark:border-border rounded text-gray-600 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted transition-colors">
                {s.action}
              </button>
            </div>
          </RwCard>
        ))}
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'employees':
        return <EmployeeManagement />;
      case 'attendance':
        return <AttendanceLeave />;
      case 'payroll':
        return <PayrollManagement />;
      case 'recruitment':
        return <RecruitmentManagement />;
      case 'performance':
        return <PerformanceManagement />;
      case 'engagement':
        return <EmployeeEngagement />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isDarkMode={isDarkMode}
      toggleDarkMode={() => setIsDarkMode((d) => !d)}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
