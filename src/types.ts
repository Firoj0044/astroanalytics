export type NavigationTab = 'dashboard' | 'analytics' | 'reports' | 'customers' | 'settings';

export type TimeRange = '7D' | '30D' | '90D';

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  accentColor: string;
  glowColor: string;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  users: number;
  previousRevenue: number;
}

export interface TopProduct {
  id: string;
  name: string;
  salesCount: number;
  revenue: number;
  percentage: number;
  colorClass: string;
  barColor: string;
}

export type TransactionStatus = 'Success' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  customerInitials?: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  product: string;
  invoiceId: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
  initials?: string;
  tier: 'Enterprise' | 'Pro' | 'Starter';
  totalSpent: number;
  transactionsCount: number;
  status: 'Active' | 'Churn Risk' | 'Inactive';
  joinedDate: string;
  lastActive: string;
  location: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Financial' | 'User Behavior' | 'Performance' | 'Sales';
  generatedDate: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  fileSize: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  downloadsCount: number;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info' | 'billing';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Analyst' | 'Viewer';
  avatar: string;
  status: 'Active' | 'Pending Invite';
}
