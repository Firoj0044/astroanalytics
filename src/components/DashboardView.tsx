import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  Percent,
  Clock,
  MoreVertical,
  Filter,
  Download,
  Lightbulb,
  MoreHorizontal,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  METRIC_STATS,
  REVENUE_CHART_DATA,
  TOP_PRODUCTS,
  INITIAL_TRANSACTIONS
} from '../data/mockData';
import { TimeRange, Transaction, NavigationTab } from '../types';

interface DashboardViewProps {
  timeRange: TimeRange;
  onChangeTimeRange: (range: TimeRange) => void;
  onSelectTransaction: (tx: Transaction) => void;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenUpgrade: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  timeRange,
  onChangeTimeRange,
  onSelectTransaction,
  onSelectTab,
  onOpenUpgrade
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [activeTxMenu, setActiveTxMenu] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = METRIC_STATS[timeRange] || METRIC_STATS['30D'];
  const chartData = REVENUE_CHART_DATA[timeRange] || REVENUE_CHART_DATA['30D'];

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'payments':
        return <CreditCard className="w-5 h-5" />;
      case 'group':
        return <Users className="w-5 h-5" />;
      case 'swap_calls':
        return <Percent className="w-5 h-5" />;
      case 'timer':
        return <Clock className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (statusFilter === 'All') return true;
    return tx.status === statusFilter;
  });

  const displayedTransactions = showAllTransactions
    ? filteredTransactions
    : filteredTransactions.slice(0, 3);

  const exportCSV = () => {
    const headers = ['ID', 'Customer', 'Email', 'Date', 'Amount', 'Status', 'Product'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.customerName}"`,
      t.customerEmail,
      t.date,
      t.amount,
      t.status,
      `"${t.product}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `astroanalytics_transactions_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Transactions CSV exported successfully');
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FDFCFB] border border-[#1A1A1A]/30 text-[#1A1A1A] px-4 py-3 shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2D5A47]" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#1A1A1A]/50 mb-1">
            Dispatch & Overview &mdash; {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
            Good morning, Alex Vance
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-1 font-normal">
            Real-time telemetry and revenue ledger across enterprise clusters.
          </p>
        </div>

        {/* 7D / 30D / 90D Range Selector */}
        <div
          id="time-range-toggle-group"
          className="flex items-center gap-1 bg-[#F4F2EE] p-1 border border-[#1A1A1A]/15 shrink-0 self-start sm:self-auto"
        >
          {(['7D', '30D', '90D'] as TimeRange[]).map((range) => {
            const isActive = timeRange === range;
            return (
              <button
                key={range}
                id={`time-range-btn-${range}`}
                onClick={() => onChangeTimeRange(range)}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#FDFCFB] shadow-sm'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EBE8E2]'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            id={`metric-card-${stat.id}`}
            className="glass-panel p-6 relative flex flex-col justify-between hover:border-[#1A1A1A]/30 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 border border-[#1A1A1A]/15 bg-[#F4F2EE] text-[#1A1A1A]">
                {getMetricIcon(stat.icon)}
              </div>

              <span
                className={`inline-flex items-center text-[11px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider ${
                  stat.isPositive
                    ? 'text-[#2D5A47] bg-[#EBF4EF] border border-[#2D5A47]/20'
                    : 'text-[#9E2A2B] bg-[#FBECED] border border-[#9E2A2B]/20'
                }`}
              >
                {stat.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 stroke-[2.5]" />
                )}
                {stat.change}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1">
                {stat.title}
              </p>
              <h3 className="text-[30px] sm:text-[34px] font-serif font-medium text-[#1A1A1A] tracking-tight leading-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bento Layout for Charts and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Area Chart (Spans 2 columns on lg) */}
        <div
          id="revenue-overview-card"
          className="lg:col-span-2 glass-panel p-6 flex flex-col min-h-[420px] relative"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1A1A1A]/10">
            <div>
              <h3 className="text-[20px] sm:text-[22px] font-serif font-semibold text-[#1A1A1A] tracking-tight">
                Revenue Trajectory
              </h3>
              <p className="text-[12px] text-[#5A5654] mt-0.5">
                Financial performance telemetry across {timeRange} interval
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectTab('analytics')}
                className="text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:opacity-70 flex items-center gap-1 transition-opacity"
              >
                <span>Full Ledger</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Interactive Recharts Area Chart */}
          <div className="flex-1 w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="editorialAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 2"
                  vertical={false}
                  stroke="rgba(26, 26, 26, 0.08)"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(26, 26, 26, 0.15)' }}
                  tick={{ fill: '#5A5654', fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#5A5654', fontSize: 11 }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const currentVal = payload[0].value as number;
                      return (
                        <div className="bg-[#FDFCFB] border border-[#1A1A1A]/30 p-3 shadow-xl text-left">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-0.5">{label}</p>
                          <p className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                            ${currentVal.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider font-bold text-[#2D5A47]">
                            <TrendingUp className="w-3 h-3" />
                            <span>+14.2% vs previous</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1A1A1A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#editorialAreaGradient)"
                  activeDot={{
                    r: 5,
                    fill: '#1A1A1A',
                    stroke: '#FDFCFB',
                    strokeWidth: 2
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Products (Right Col) */}
        <div
          id="top-products-card"
          className="glass-panel p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1A1A1A]/10">
              <h3 className="text-[20px] sm:text-[22px] font-serif font-semibold text-[#1A1A1A] tracking-tight">
                Top Products
              </h3>
              <button
                onClick={() => onSelectTab('analytics')}
                className="text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:underline"
              >
                Index
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {TOP_PRODUCTS.map((prod) => (
                <div key={prod.id} className="group">
                  <div className="flex justify-between items-end mb-1.5">
                    <div>
                      <p className="text-[14px] text-[#1A1A1A] font-serif font-medium group-hover:underline transition-colors">
                        {prod.name}
                      </p>
                      <p className="text-[11px] text-[#5A5654] font-sans">
                        {prod.salesCount.toLocaleString()} subscriptions
                      </p>
                    </div>
                    <span className="text-[13px] font-mono font-bold text-[#1A1A1A]">
                      ${prod.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#EAE7E1] h-1 overflow-hidden">
                    <div
                      className="h-1 bg-[#1A1A1A] transition-all duration-1000 ease-out"
                      style={{
                        width: `${prod.percentage}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Box with Lightbulb */}
          <div className="mt-6 pt-5 border-t border-[#1A1A1A]/10">
            <div className="flex items-start gap-3 p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
              <div className="p-1 border border-[#1A1A1A]/20 bg-[#FFFFFF] text-[#1A1A1A] shrink-0 mt-0.5">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] block mb-0.5 font-sans">
                  Editorial Dispatch
                </span>
                <p className="text-[12px] text-[#5A5654] leading-relaxed">
                  API Add-on subscriptions increased by <span className="text-[#2D5A47] font-semibold">24%</span> this week across enterprise users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div
        id="recent-transactions-card"
        className="glass-panel p-0 overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-[#1A1A1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[20px] sm:text-[22px] font-serif font-semibold text-[#1A1A1A] tracking-tight">
              Transaction Registry
            </h3>
            <p className="text-[12px] text-[#5A5654] mt-0.5">
              Real-time checkout records & invoice settlement audits
            </p>
          </div>

          <div className="flex items-center gap-2.5 relative">
            {/* Filter Button */}
            <div className="relative">
              <button
                id="tx-filter-btn"
                onClick={() => setFilterOpen(!filterOpen)}
                className={`px-3 py-1.5 border border-[#1A1A1A]/20 transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold ${
                  statusFilter !== 'All'
                    ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                    : 'text-[#1A1A1A] hover:bg-[#F4F2EE]'
                }`}
                title="Filter by status"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{statusFilter}</span>
              </button>

              {filterOpen && (
                <div
                  id="tx-filter-menu"
                  className="absolute right-0 mt-2 w-44 glass-dropdown p-2 z-30"
                >
                  <div className="text-[9px] font-bold text-[#1A1A1A]/60 px-2 py-1 uppercase tracking-[0.2em]">
                    Filter Status
                  </div>
                  {['All', 'Success', 'Pending', 'Failed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setStatusFilter(st);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-[12px] uppercase tracking-wider font-semibold transition-colors ${
                        statusFilter === st
                          ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                          : 'text-[#1A1A1A] hover:bg-[#F4F2EE]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download / Export Button */}
            <button
              id="tx-download-btn"
              onClick={exportCSV}
              className="px-3 py-1.5 text-[#1A1A1A] hover:bg-[#F4F2EE] transition-all border border-[#1A1A1A]/20 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F2EE] border-b border-[#1A1A1A]/10">
                <th className="px-6 py-3.5 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em]">
                  Account / Lead
                </th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em]">
                  Date
                </th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em]">
                  Amount
                </th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em] text-right">
                  Inspect
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10">
              {displayedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  id={`tx-row-${tx.id}`}
                  onClick={() => onSelectTransaction(tx)}
                  className="hover:bg-[#F4F2EE]/50 transition-colors cursor-pointer group"
                >
                  {/* Customer Column with Avatar or Initials */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {tx.customerAvatar ? (
                        <img
                          src={tx.customerAvatar}
                          alt={tx.customerName}
                          className="w-9 h-9 object-cover border border-[#1A1A1A]/30 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 border border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif font-bold text-[12px] shrink-0">
                          {tx.customerInitials || tx.customerName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-[14px] font-serif font-medium text-[#1A1A1A] group-hover:underline transition-colors">
                          {tx.customerName}
                        </p>
                        <p className="text-[11px] text-[#5A5654] font-mono">{tx.customerEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] text-[#5A5654] font-sans">
                    {tx.date}
                  </td>

                  {/* Amount Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-mono font-bold text-[#1A1A1A]">
                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tx.status === 'Success' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-bold uppercase tracking-wider bg-[#EBF4EF] text-[#2D5A47] border border-[#2D5A47]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47]" />
                        Success
                      </span>
                    )}
                    {tx.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-bold uppercase tracking-wider bg-[#FBF4EB] text-[#94631D] border border-[#94631D]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94631D]" />
                        Pending
                      </span>
                    )}
                    {tx.status === 'Failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-bold uppercase tracking-wider bg-[#FBECED] text-[#9E2A2B] border border-[#9E2A2B]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
                        Failed
                      </span>
                    )}
                  </td>

                  {/* Action Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction(tx);
                      }}
                      className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors inline-flex items-center border border-transparent hover:border-[#1A1A1A]/20"
                      title="Inspect Transaction"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3.5 border-t border-[#1A1A1A]/10 text-center bg-[#F4F2EE]">
          <button
            id="view-all-transactions-btn"
            onClick={() => setShowAllTransactions(!showAllTransactions)}
            className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A] hover:underline transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>
              {showAllTransactions
                ? 'Collapse Ledger'
                : `View Complete Ledger (${filteredTransactions.length})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
