import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  Globe,
  Layers,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { TimeRange } from '../types';

interface AnalyticsViewProps {
  timeRange: TimeRange;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ timeRange }) => {
  const [metricTab, setMetricTab] = useState<'funnel' | 'traffic' | 'retention'>('funnel');

  const funnelData = [
    { stage: '1. Impressions', count: 184000, dropoff: '0%', fill: '#1A1A1A' },
    { stage: '2. Landing Page', count: 96500, dropoff: '47.5%', fill: '#3E3B39' },
    { stage: '3. Sign Up', count: 38200, dropoff: '60.4%', fill: '#66615E' },
    { stage: '4. Active Trial', count: 18400, dropoff: '51.8%', fill: '#948D88' },
    { stage: '5. Enterprise Tier', count: 5280, dropoff: '71.3%', fill: '#2D5A47' }
  ];

  const trafficSources = [
    { name: 'Organic Search', value: 42, color: '#1A1A1A' },
    { name: 'Direct Traffic', value: 28, color: '#4A4744' },
    { name: 'Referral & Partner', value: 16, color: '#7A7571' },
    { name: 'Paid Campaigns', value: 10, color: '#B86B53' },
    { name: 'Developer Community', value: 4, color: '#2D5A47' }
  ];

  const cohortData = [
    { week: 'Week 1', cohort: '100%', w1: '94%', w2: '88%', w3: '82%', w4: '78%' },
    { week: 'Week 2', cohort: '100%', w1: '92%', w2: '85%', w3: '79%', w4: '74%' },
    { week: 'Week 3', cohort: '100%', w1: '96%', w2: '90%', w3: '86%', w4: '81%' },
    { week: 'Week 4', cohort: '100%', w1: '95%', w2: '89%', w3: '84%', w4: '80%' }
  ];

  const regionalData = [
    { region: 'North America', share: '54%', traffic: '68.4k', growth: '+14%' },
    { region: 'Europe (EU/UK)', share: '26%', traffic: '32.8k', growth: '+9%' },
    { region: 'Asia Pacific', share: '14%', traffic: '17.6k', growth: '+28%' },
    { region: 'Latin America', share: '6%', traffic: '7.5k', growth: '+19%' }
  ];

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#1A1A1A]/50 mb-1">
            Telemetry & Funnels &mdash; Telemetry View
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
            Telemetry & Conversion Analytics
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-1 font-normal">
            End-to-end user journeys, cohort retention velocity, and regional traffic distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 bg-[#FDFCFB] hover:bg-[#F4F2EE] text-[#1A1A1A] border border-[#1A1A1A]/20 text-[11px] uppercase tracking-[0.15em] font-sans font-bold flex items-center gap-2 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Audit</span>
          </button>
          <button className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans text-[11px] uppercase tracking-[0.15em] font-bold flex items-center gap-2 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export View</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setMetricTab('funnel')}
          className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all ${
            metricTab === 'funnel'
              ? 'bg-[#1A1A1A] text-[#FDFCFB]'
              : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE]'
          }`}
        >
          Conversion Funnel
        </button>
        <button
          onClick={() => setMetricTab('traffic')}
          className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all ${
            metricTab === 'traffic'
              ? 'bg-[#1A1A1A] text-[#FDFCFB]'
              : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE]'
          }`}
        >
          Traffic & Acquisition
        </button>
        <button
          onClick={() => setMetricTab('retention')}
          className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all ${
            metricTab === 'retention'
              ? 'bg-[#1A1A1A] text-[#FDFCFB]'
              : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE]'
          }`}
        >
          Cohort Retention
        </button>
      </div>

      {/* Funnel View */}
      {metricTab === 'funnel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1A1A1A]/10">
              <div>
                <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A]">Enterprise Funnel Telemetry</h3>
                <p className="text-[12px] text-[#5A5654]">Overall conversion efficiency: 2.87%</p>
              </div>
              <span className="text-[11px] font-bold text-[#2D5A47] bg-[#EBF4EF] px-2.5 py-0.5 border border-[#2D5A47]/25 uppercase tracking-wider font-sans">
                +18% QoQ Improvement
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="rgba(26,26,26,0.08)" />
                  <XAxis type="number" tick={{ fill: '#5A5654', fontSize: 11 }} />
                  <YAxis type="category" dataKey="stage" tick={{ fill: '#1A1A1A', fontSize: 12 }} width={130} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#FDFCFB] border border-[#1A1A1A]/30 p-3 shadow-xl text-left">
                            <p className="text-[11px] font-serif font-bold text-[#1A1A1A]">{data.stage}</p>
                            <p className="text-[16px] font-mono font-bold text-[#1A1A1A] mt-0.5">{data.count.toLocaleString()} users</p>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-[#5A5654] mt-1">Dropoff rate: {data.dropoff}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 0, 0, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-4 pb-3 border-b border-[#1A1A1A]/10">Funnel Insights</h3>
              <div className="flex flex-col gap-4">
                <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                  <div className="flex items-center gap-2 text-[#2D5A47] text-[11px] font-sans font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Trial-to-Paid Win Rate</span>
                  </div>
                  <p className="text-[12px] text-[#5A5654] leading-relaxed">
                    Users who interact with custom Webhooks within 48h convert at a 4.2x higher rate.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                  <div className="flex items-center gap-2 text-[#1A1A1A] text-[11px] font-sans font-bold uppercase tracking-wider mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Seat Expansion</span>
                  </div>
                  <p className="text-[12px] text-[#5A5654] leading-relaxed">
                    Average Enterprise account expands by 6.4 additional developer seats within 90 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#5A5654]">Trial Velocity</span>
                <span className="text-[#1A1A1A] font-mono font-bold">11.4 Days Avg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traffic View */}
      {metricTab === 'traffic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 flex flex-col items-center">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-2 self-start pb-2 border-b border-[#1A1A1A]/10 w-full">Acquisition Breakdown</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#FDFCFB] border border-[#1A1A1A]/30 p-2.5 shadow-xl text-center">
                            <p className="text-[10px] uppercase font-bold text-[#5A5654]">{data.name}</p>
                            <p className="text-[16px] font-serif font-bold text-[#1A1A1A]">{data.value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mt-2">
              {trafficSources.map((src) => (
                <div key={src.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-2.5 h-2.5" style={{ backgroundColor: src.color }} />
                  <span className="text-[#5A5654] truncate">{src.name}</span>
                  <span className="font-mono font-bold text-[#1A1A1A] ml-auto">{src.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 glass-panel p-6">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-4 pb-3 border-b border-[#1A1A1A]/10">Regional Telemetry Distribution</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#1A1A1A]/10 text-[10px] text-[#1A1A1A]/70 uppercase tracking-[0.2em] bg-[#F4F2EE]">
                    <th className="py-3 px-3">Region</th>
                    <th className="py-3 px-3">Traffic Share</th>
                    <th className="py-3 px-3">Monthly Sessions</th>
                    <th className="py-3 px-3 text-right">QoQ Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/10 text-[13px]">
                  {regionalData.map((reg) => (
                    <tr key={reg.region} className="hover:bg-[#F4F2EE]/50 transition-colors">
                      <td className="py-3.5 px-3 font-medium text-[#1A1A1A] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#1A1A1A]/60" />
                        {reg.region}
                      </td>
                      <td className="py-3.5 px-3 text-[#5A5654] font-mono">{reg.share}</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#1A1A1A]">{reg.traffic}</td>
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-[#2D5A47]">{reg.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Retention View */}
      {metricTab === 'retention' && (
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1A1A1A]/10">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A]">Cohort Retention Heatmap</h3>
              <p className="text-[12px] text-[#5A5654]">User persistence following initial project onboarding</p>
            </div>
            <span className="text-[11px] font-sans font-bold bg-[#EAE7E1] text-[#1A1A1A] px-3 py-1 border border-[#1A1A1A]/20 uppercase tracking-wider">
              30-Day Retention: 78.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10 text-[10px] text-[#1A1A1A]/70 uppercase tracking-[0.2em] bg-[#F4F2EE]">
                  <th className="text-left py-3 px-4 font-bold">Cohort Group</th>
                  <th className="py-3 px-4">Day 0</th>
                  <th className="py-3 px-4">Week 1</th>
                  <th className="py-3 px-4">Week 2</th>
                  <th className="py-3 px-4">Week 3</th>
                  <th className="py-3 px-4">Week 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/10 text-[12px] font-mono">
                {cohortData.map((row) => (
                  <tr key={row.week}>
                    <td className="text-left py-3.5 px-4 font-serif font-semibold text-[#1A1A1A]">{row.week}</td>
                    <td className="py-3.5 px-4 bg-[#1A1A1A]/20 text-[#1A1A1A] font-bold">{row.cohort}</td>
                    <td className="py-3.5 px-4 bg-[#1A1A1A]/15 text-[#1A1A1A]">{row.w1}</td>
                    <td className="py-3.5 px-4 bg-[#1A1A1A]/10 text-[#1A1A1A]">{row.w2}</td>
                    <td className="py-3.5 px-4 bg-[#1A1A1A]/5 text-[#5A5654]">{row.w3}</td>
                    <td className="py-3.5 px-4 bg-[#1A1A1A]/5 text-[#5A5654]">{row.w4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
