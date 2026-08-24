import {
  ChartDataPoint,
  Customer,
  MetricCardData,
  NotificationItem,
  ReportItem,
  TeamMember,
  TopProduct,
  Transaction
} from '../types';

export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBViJJlmUD8ZTK_s0snEA7ja_OK0DqtMOQAnfQDsbMRb5Hhnr3Lsx_n1lnBg5VlTwLvP53yCWQkAxoUnWLnNG_iUYoK336a6UKws4nOcahva9FQdQPSkusTX8FDxPBAoFqGETLDamFIIPpexbR53ZinTH-rmHPDAnuU3t_Y_7ojxU476bcou08y9DH4CRC52db3-wbcoDqBLn4CwZ4E7dY4_ZoY2VmOcpH3Vw0F7df3ET9yJbuqHrs3QA';
export const ACME_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE_kaMZdsg_qKO-RAvoc69lCs94Ot7oJqVFroUHLGGqkfmkAuZrgHdd_qJGSEUE2DWynSH0egB8bJnfQgmdTHCYStEaPJJ_biH0sp2ONnQ6_0N3oYtHh9wmAS8w6_cEiPDMkN-Y30eDs8WIoqBOt5RIND8pN7TuAHuXqLyowVPgqDkXR4uK0MfrEh3DU4mDOuQxIvxNR730jnqHk2tPOXuItmJJp7trKH70URf9Q3MUU70h8FYMyNKeQ';
export const STARK_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8fA77yokTXg5mpaqPPyKMNKgk1r_BOlN5xikjbMX8DoPZvXwpa0F33bBYGvf62bu79mXQFt9qyIiwIikrzff9wWOBiZ7fJvZz6V0ymtIJIxzSoUP6b9EVCNtTdJfQGtsTWr1K3UNmZeDZbB0JliigLgbznAD3hFhbwIWUJ2hdgyqeNXrAuqRTJOm6oz6BcCYrjoBf7mLiRfok2UIl5QsKmSJAD0YY604X0by2EbieNPi63wM0bqHfCg';

export const METRIC_STATS: Record<string, MetricCardData[]> = {
  '30D': [
    {
      id: 'rev',
      title: 'TOTAL REVENUE',
      value: '$128,430',
      change: '+12.5%',
      isPositive: true,
      icon: 'payments',
      accentColor: 'text-[#d0bcff]',
      glowColor: 'bg-[#d0bcff]/5'
    },
    {
      id: 'users',
      title: 'ACTIVE USERS',
      value: '45.2k',
      change: '+5.2%',
      isPositive: true,
      icon: 'group',
      accentColor: 'text-[#c0c1ff]',
      glowColor: 'bg-[#c0c1ff]/5'
    },
    {
      id: 'conv',
      title: 'CONVERSION RATE',
      value: '3.2%',
      change: '-0.4%',
      isPositive: false,
      icon: 'swap_calls',
      accentColor: 'text-[#ffafd3]',
      glowColor: 'bg-[#ffb4ab]/5'
    },
    {
      id: 'session',
      title: 'AVG. SESSION',
      value: '4m 32s',
      change: '+8.0%',
      isPositive: true,
      icon: 'timer',
      accentColor: 'text-[#a078ff]',
      glowColor: 'bg-[#a078ff]/5'
    }
  ],
  '7D': [
    {
      id: 'rev',
      title: 'TOTAL REVENUE',
      value: '$34,920',
      change: '+18.4%',
      isPositive: true,
      icon: 'payments',
      accentColor: 'text-[#d0bcff]',
      glowColor: 'bg-[#d0bcff]/5'
    },
    {
      id: 'users',
      title: 'ACTIVE USERS',
      value: '14.8k',
      change: '+9.1%',
      isPositive: true,
      icon: 'group',
      accentColor: 'text-[#c0c1ff]',
      glowColor: 'bg-[#c0c1ff]/5'
    },
    {
      id: 'conv',
      title: 'CONVERSION RATE',
      value: '3.5%',
      change: '+0.3%',
      isPositive: true,
      icon: 'swap_calls',
      accentColor: 'text-[#ffafd3]',
      glowColor: 'bg-[#ffb4ab]/5'
    },
    {
      id: 'session',
      title: 'AVG. SESSION',
      value: '4m 45s',
      change: '+11.2%',
      isPositive: true,
      icon: 'timer',
      accentColor: 'text-[#a078ff]',
      glowColor: 'bg-[#a078ff]/5'
    }
  ],
  '90D': [
    {
      id: 'rev',
      title: 'TOTAL REVENUE',
      value: '$384,150',
      change: '+24.8%',
      isPositive: true,
      icon: 'payments',
      accentColor: 'text-[#d0bcff]',
      glowColor: 'bg-[#d0bcff]/5'
    },
    {
      id: 'users',
      title: 'ACTIVE USERS',
      value: '112.4k',
      change: '+14.6%',
      isPositive: true,
      icon: 'group',
      accentColor: 'text-[#c0c1ff]',
      glowColor: 'bg-[#c0c1ff]/5'
    },
    {
      id: 'conv',
      title: 'CONVERSION RATE',
      value: '3.1%',
      change: '-0.2%',
      isPositive: false,
      icon: 'swap_calls',
      accentColor: 'text-[#ffafd3]',
      glowColor: 'bg-[#ffb4ab]/5'
    },
    {
      id: 'session',
      title: 'AVG. SESSION',
      value: '4m 20s',
      change: '+5.4%',
      isPositive: true,
      icon: 'timer',
      accentColor: 'text-[#a078ff]',
      glowColor: 'bg-[#a078ff]/5'
    }
  ]
};

export const REVENUE_CHART_DATA: Record<string, ChartDataPoint[]> = {
  '30D': [
    { date: 'Jan', revenue: 32000, users: 11000, previousRevenue: 28000 },
    { date: 'Feb', revenue: 45000, users: 15400, previousRevenue: 34000 },
    { date: 'Mar', revenue: 38000, users: 18200, previousRevenue: 37000 },
    { date: 'Apr', revenue: 68000, users: 24500, previousRevenue: 48000 },
    { date: 'May', revenue: 54000, users: 29000, previousRevenue: 51000 },
    { date: 'Jun', revenue: 92000, users: 38400, previousRevenue: 62000 },
    { date: 'Jul', revenue: 76000, users: 34200, previousRevenue: 65000 },
    { date: 'Aug', revenue: 114000, users: 42100, previousRevenue: 81000 },
    { date: 'Sep', revenue: 88000, users: 39500, previousRevenue: 78000 },
    { date: 'Oct', revenue: 135000, users: 45200, previousRevenue: 98000 },
    { date: 'Nov', revenue: 120000, users: 44000, previousRevenue: 105000 }
  ],
  '7D': [
    { date: 'Mon', revenue: 4200, users: 5100, previousRevenue: 3800 },
    { date: 'Tue', revenue: 5800, users: 6200, previousRevenue: 4900 },
    { date: 'Wed', revenue: 4900, users: 5800, previousRevenue: 4600 },
    { date: 'Thu', revenue: 6400, users: 7100, previousRevenue: 5200 },
    { date: 'Fri', revenue: 7900, users: 8400, previousRevenue: 6300 },
    { date: 'Sat', revenue: 3100, users: 4200, previousRevenue: 2800 },
    { date: 'Sun', revenue: 4620, users: 5400, previousRevenue: 3900 }
  ],
  '90D': [
    { date: 'W1', revenue: 22000, users: 12000, previousRevenue: 19000 },
    { date: 'W3', revenue: 29000, users: 15000, previousRevenue: 23000 },
    { date: 'W5', revenue: 34000, users: 19000, previousRevenue: 27000 },
    { date: 'W7', revenue: 41000, users: 24000, previousRevenue: 32000 },
    { date: 'W9', revenue: 52000, users: 31000, previousRevenue: 39000 },
    { date: 'W11', revenue: 64000, users: 38000, previousRevenue: 48000 },
    { date: 'W12', revenue: 78000, users: 45200, previousRevenue: 56000 }
  ]
};

export const TOP_PRODUCTS: TopProduct[] = [
  {
    id: 'prod-1',
    name: 'Enterprise License',
    salesCount: 425,
    revenue: 45200,
    percentage: 85,
    colorClass: 'text-[#d0bcff]',
    barColor: '#d0bcff'
  },
  {
    id: 'prod-2',
    name: 'Pro Subscription',
    salesCount: 1240,
    revenue: 32100,
    percentage: 65,
    colorClass: 'text-[#c0c1ff]',
    barColor: '#c0c1ff'
  },
  {
    id: 'prod-3',
    name: 'API Add-on',
    salesCount: 856,
    revenue: 18400,
    percentage: 45,
    colorClass: 'text-[#ffafd3]',
    barColor: '#ffafd3'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    customerName: 'Acme Corp',
    customerEmail: 'john@acmecorp.com',
    customerAvatar: ACME_AVATAR,
    date: 'Oct 24, 2023',
    amount: 1250.00,
    status: 'Success',
    product: 'Enterprise License (Annual)',
    invoiceId: 'INV-2023-8841',
    paymentMethod: 'Mastercard •••• 4242'
  },
  {
    id: 'tx-2',
    customerName: 'Global Logistics',
    customerEmail: 'billing@globallog.net',
    customerInitials: 'GL',
    date: 'Oct 23, 2023',
    amount: 3400.00,
    status: 'Pending',
    product: 'Pro Dedicated Cluster',
    invoiceId: 'INV-2023-8840',
    paymentMethod: 'Wire Transfer / ACH'
  },
  {
    id: 'tx-3',
    customerName: 'Stark Industries',
    customerEmail: 'finance@stark.com',
    customerAvatar: STARK_AVATAR,
    date: 'Oct 21, 2023',
    amount: 850.00,
    status: 'Failed',
    product: 'API Overages & Add-on',
    invoiceId: 'INV-2023-8839',
    paymentMethod: 'Visa •••• 9012'
  },
  {
    id: 'tx-4',
    customerName: 'Nexus Cybernetics',
    customerEmail: 'accounts@nexuscyber.io',
    customerInitials: 'NC',
    date: 'Oct 20, 2023',
    amount: 4900.00,
    status: 'Success',
    product: 'Enterprise Fleet License',
    invoiceId: 'INV-2023-8838',
    paymentMethod: 'Corporate Amex •••• 1004'
  },
  {
    id: 'tx-5',
    customerName: 'AeroDynamics Lab',
    customerEmail: 'ops@aerolab.tech',
    customerInitials: 'AD',
    date: 'Oct 19, 2023',
    amount: 2150.00,
    status: 'Success',
    product: 'Pro High-Throughput Tier',
    invoiceId: 'INV-2023-8837',
    paymentMethod: 'Visa •••• 3341'
  },
  {
    id: 'tx-6',
    customerName: 'Hyperion BioTech',
    customerEmail: 'finance@hyperionbio.com',
    customerInitials: 'HB',
    date: 'Oct 18, 2023',
    amount: 980.00,
    status: 'Pending',
    product: 'Data Exporter Plugin',
    invoiceId: 'INV-2023-8836',
    paymentMethod: 'Mastercard •••• 5590'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Johnathan Miller',
    email: 'john@acmecorp.com',
    company: 'Acme Corp',
    role: 'VP of Engineering',
    avatar: ACME_AVATAR,
    tier: 'Enterprise',
    totalSpent: 48500,
    transactionsCount: 14,
    status: 'Active',
    joinedDate: 'Jan 15, 2022',
    lastActive: '2 hours ago',
    location: 'San Francisco, CA'
  },
  {
    id: 'cust-2',
    name: 'Elena Rostova',
    email: 'billing@globallog.net',
    company: 'Global Logistics',
    role: 'Director of Operations',
    initials: 'GL',
    tier: 'Enterprise',
    totalSpent: 34200,
    transactionsCount: 9,
    status: 'Active',
    joinedDate: 'Mar 10, 2022',
    lastActive: '15 mins ago',
    location: 'Frankfurt, Germany'
  },
  {
    id: 'cust-3',
    name: 'Pepper Potts',
    email: 'finance@stark.com',
    company: 'Stark Industries',
    role: 'Chief Financial Officer',
    avatar: STARK_AVATAR,
    tier: 'Enterprise',
    totalSpent: 92400,
    transactionsCount: 28,
    status: 'Churn Risk',
    joinedDate: 'Aug 04, 2021',
    lastActive: '3 days ago',
    location: 'New York, NY'
  },
  {
    id: 'cust-4',
    name: 'Marcus Vance',
    email: 'accounts@nexuscyber.io',
    company: 'Nexus Cybernetics',
    role: 'Lead Architect',
    initials: 'NC',
    tier: 'Pro',
    totalSpent: 18900,
    transactionsCount: 6,
    status: 'Active',
    joinedDate: 'Jun 22, 2023',
    lastActive: '4 hours ago',
    location: 'Austin, TX'
  },
  {
    id: 'cust-5',
    name: 'Sophia Lindqvist',
    email: 'ops@aerolab.tech',
    company: 'AeroDynamics Lab',
    role: 'Head of Infrastructure',
    initials: 'AD',
    tier: 'Pro',
    totalSpent: 12400,
    transactionsCount: 5,
    status: 'Active',
    joinedDate: 'Nov 12, 2022',
    lastActive: 'Yesterday',
    location: 'Stockholm, Sweden'
  },
  {
    id: 'cust-6',
    name: 'David Chen',
    email: 'david@solargrid.ai',
    company: 'SolarGrid Systems',
    role: 'CTO',
    initials: 'SG',
    tier: 'Starter',
    totalSpent: 3200,
    transactionsCount: 3,
    status: 'Active',
    joinedDate: 'Feb 01, 2024',
    lastActive: 'Just now',
    location: 'Seattle, WA'
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Q3 Enterprise Revenue & Cohort Retention',
    category: 'Financial',
    generatedDate: 'Oct 24, 2023',
    format: 'PDF',
    fileSize: '4.2 MB',
    status: 'Ready',
    downloadsCount: 42,
    description: 'Comprehensive analysis of quarterly recurring revenue, gross margins, and customer expansion ARR.'
  },
  {
    id: 'rep-2',
    title: 'Monthly Active User Telemetry & Funnel Conversion',
    category: 'User Behavior',
    generatedDate: 'Oct 20, 2023',
    format: 'CSV',
    fileSize: '18.4 MB',
    status: 'Ready',
    downloadsCount: 128,
    description: 'Raw event stream breakdown, session duration percentiles, and feature adoption matrices.'
  },
  {
    id: 'rep-3',
    title: 'API Gateway Latency & Throughput SLA Audit',
    category: 'Performance',
    generatedDate: 'Oct 15, 2023',
    format: 'PDF',
    fileSize: '2.8 MB',
    status: 'Ready',
    downloadsCount: 19,
    description: 'P99 latencies, edge cache hit rates, error budget consumption, and regional endpoint uptimes.'
  },
  {
    id: 'rep-4',
    title: 'Q4 Predictive Sales Pipeline & Upsell Targets',
    category: 'Sales',
    generatedDate: 'Oct 10, 2023',
    format: 'XLSX',
    fileSize: '6.1 MB',
    status: 'Ready',
    downloadsCount: 67,
    description: 'Machine-learning projected leads, deal velocity by industry tier, and projected commission payouts.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'API Add-on Surge',
    message: 'API Add-on sales are up 24% this week. Consider promoting to Pro users.',
    time: '10m ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    title: 'High Value Transaction',
    message: 'Acme Corp completed annual Enterprise License renewal of $1,250.00.',
    time: '1h ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-3',
    title: 'Failed Payment Detected',
    message: 'Stark Industries $850.00 charge failed due to card expiration.',
    time: '3h ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'notif-4',
    title: 'Cluster Autoscaling Triggered',
    message: 'Asia-East region scaled +4 nodes to handle 45.2k concurrent sessions.',
    time: '6h ago',
    read: true,
    type: 'billing'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alex Vance',
    email: 'alex@astroanalytics.io',
    role: 'Owner',
    avatar: USER_AVATAR,
    status: 'Active'
  },
  {
    id: 'team-2',
    name: 'Sarah Chen',
    email: 'sarah.c@astroanalytics.io',
    role: 'Admin',
    avatar: STARK_AVATAR,
    status: 'Active'
  },
  {
    id: 'team-3',
    name: 'Liam O\'Connor',
    email: 'liam.o@astroanalytics.io',
    role: 'Analyst',
    avatar: ACME_AVATAR,
    status: 'Active'
  }
];
