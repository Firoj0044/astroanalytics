import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';
import { INITIAL_REPORTS } from '../data/mockData';
import { ReportItem } from '../types';

export const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Financial' | 'User Behavior' | 'Performance' | 'Sales'>('Financial');
  const [newFormat, setNewFormat] = useState<'PDF' | 'CSV' | 'XLSX'>('PDF');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = (report: ReportItem) => {
    // Generate dummy file download
    const content = `AstroAnalytics Report: ${report.title}\nCategory: ${report.category}\nGenerated Date: ${report.generatedDate}\nFormat: ${report.format}\n\nConfidential Enterprise Data.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${report.format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r))
    );
    showToast(`Downloaded ${report.title}`);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newRep: ReportItem = {
        id: `rep-${Date.now()}`,
        title: newTitle,
        category: newCategory,
        generatedDate: 'Just now',
        format: newFormat,
        fileSize: '3.4 MB',
        status: 'Ready',
        downloadsCount: 0,
        description: `Automated ${newCategory.toLowerCase()} summary compiled across real-time AstroAnalytics cluster metrics.`
      };
      setReports([newRep, ...reports]);
      setIsGenerating(false);
      setShowNewModal(false);
      setNewTitle('');
      showToast('New report generated successfully!');
    }, 900);
  };

  const filteredReports = reports.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full pb-10">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FDFCFB] border border-[#1A1A1A]/30 text-[#1A1A1A] px-4 py-3 shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#2D5A47]" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#1A1A1A]/50 mb-1">
            Documents & Filings &mdash; Operational Archive
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
            Executive & Operational Reports
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-1 font-normal">
            Export scheduled compliance filings, revenue cohorts, and system SLA audit logs.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans text-[11px] uppercase tracking-[0.15em] font-bold flex items-center gap-2 transition-all shadow-sm shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Financial', 'User Behavior', 'Performance', 'Sales'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                  : 'text-[#1A1A1A]/60 hover:bg-[#F4F2EE] hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5654]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-full bg-[#FDFCFB] border border-[#1A1A1A]/20 py-1.5 pl-9 pr-3 text-[13px] text-[#1A1A1A] placeholder:text-[#5A5654]/60 focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="glass-panel p-6 flex flex-col justify-between hover:border-[#1A1A1A]/30 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2 border border-[#1A1A1A]/15 bg-[#F4F2EE] text-[#1A1A1A]">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F4F2EE] text-[#1A1A1A]/70 border border-[#1A1A1A]/15">
                    {report.format}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EBF4EF] text-[#2D5A47] border border-[#2D5A47]/25">
                    {report.status}
                  </span>
                </div>
              </div>

              <h3 className="text-[18px] font-serif font-semibold text-[#1A1A1A] group-hover:underline transition-colors leading-snug mb-1.5">
                {report.title}
              </h3>
              <p className="text-[13px] text-[#5A5654] leading-relaxed mb-4">
                {report.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[12px] text-[#5A5654]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {report.generatedDate}
                </span>
                <span>•</span>
                <span className="font-mono">{report.fileSize}</span>
              </div>

              <button
                onClick={() => handleDownload(report)}
                className="px-3 py-1.5 bg-[#F4F2EE] hover:bg-[#EAE7E1] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-sans font-bold flex items-center gap-1.5 border border-[#1A1A1A]/20 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dropdown w-full max-w-md p-6 relative">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-1">Generate New Report</h3>
            <p className="text-[13px] text-[#5A5654] mb-4">
              Compile telemetry data points and compute aggregate metrics.
            </p>

            <form onSubmit={handleCreateReport} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">
                  Report Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Growth & Revenue Analysis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3.5 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Financial">Financial</option>
                    <option value="User Behavior">User Behavior</option>
                    <option value="Performance">Performance</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">
                    Export Format
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as any)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="CSV">CSV Raw Data</option>
                    <option value="XLSX">Excel Spreadsheet</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] transition-all flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#FDFCFB] border-t-transparent rounded-full animate-spin" />
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
