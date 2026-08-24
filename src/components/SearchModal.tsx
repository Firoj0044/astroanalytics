import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  CreditCard,
  Users,
  FileText,
  LineChart,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavigationTab, Transaction, Customer } from '../types';
import { INITIAL_TRANSACTIONS, INITIAL_CUSTOMERS, INITIAL_REPORTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectTransaction
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTx = INITIAL_TRANSACTIONS.filter(
    (t) =>
      t.customerName.toLowerCase().includes(query.toLowerCase()) ||
      t.product.toLowerCase().includes(query.toLowerCase()) ||
      t.invoiceId.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCust = INITIAL_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  const filteredReports = INITIAL_REPORTS.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
      <div className="glass-dropdown w-full max-w-2xl p-4 animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-[#1A1A1A]/10 pb-3">
          <Search className="w-5 h-5 text-[#1A1A1A]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers, transactions, reports, views..."
            className="w-full bg-transparent text-[16px] font-serif text-[#1A1A1A] placeholder:text-[#5A5654]/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto mt-3 flex flex-col gap-4 p-1">
          {/* Quick Navigation Views */}
          <div>
            <span className="text-[10px] font-bold text-[#5A5654] uppercase tracking-[0.2em] px-2 block mb-1.5">
              Quick Views
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LineChart },
                { id: 'analytics', label: 'Analytics', icon: Sparkles },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'customers', label: 'Customers', icon: Users }
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => {
                      onSelectTab(view.id as any);
                      onClose();
                    }}
                    className="p-2.5 bg-[#F4F2EE] hover:bg-[#EAE7E1] text-left flex items-center gap-2 border border-[#1A1A1A]/15 text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#1A1A1A] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{view.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Transactions */}
          {filteredTx.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-[#5A5654] uppercase tracking-[0.2em] px-2 block mb-1.5">
                Transactions
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredTx.slice(0, 3).map((tx) => (
                  <button
                    key={tx.id}
                    onClick={() => {
                      onSelectTransaction(tx);
                      onClose();
                    }}
                    className="w-full p-2.5 hover:bg-[#F4F2EE] text-left flex items-center justify-between text-[13px] border border-transparent hover:border-[#1A1A1A]/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F4F2EE] border border-[#1A1A1A]/20 text-[#1A1A1A] flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-[#1A1A1A] group-hover:underline">
                          {tx.customerName}
                        </p>
                        <p className="text-[11px] text-[#5A5654]">{tx.product} &bull; {tx.date}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1A1A1A]">${tx.amount.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Customers */}
          {filteredCust.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-[#5A5654] uppercase tracking-[0.2em] px-2 block mb-1.5">
                Customers & Accounts
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredCust.slice(0, 3).map((cust) => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      onSelectTab('customers');
                      onClose();
                    }}
                    className="w-full p-2.5 hover:bg-[#F4F2EE] text-left flex items-center justify-between text-[13px] border border-transparent hover:border-[#1A1A1A]/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif font-bold text-[11px]">
                        {cust.initials || cust.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-serif font-medium text-[#1A1A1A] group-hover:underline">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-[#5A5654]">{cust.company} &bull; {cust.tier}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5A5654] group-hover:text-[#1A1A1A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Reports */}
          {filteredReports.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-[#5A5654] uppercase tracking-[0.2em] px-2 block mb-1.5">
                Reports
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredReports.slice(0, 2).map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => {
                      onSelectTab('reports');
                      onClose();
                    }}
                    className="w-full p-2.5 hover:bg-[#F4F2EE] text-left flex items-center justify-between text-[13px] border border-transparent hover:border-[#1A1A1A]/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F4F2EE] border border-[#1A1A1A]/20 text-[#1A1A1A] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-[#1A1A1A] group-hover:underline">
                          {rep.title}
                        </p>
                        <p className="text-[11px] text-[#5A5654]">{rep.category} &bull; {rep.format}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5A5654] group-hover:text-[#1A1A1A]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
