import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Building,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  MoreVertical,
  X
} from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../data/mockData';
import { Customer } from '../types';

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New customer form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newTier, setNewTier] = useState<'Enterprise' | 'Pro' | 'Starter'>('Enterprise');
  const [newLocation, setNewLocation] = useState('San Francisco, CA');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: newName,
      email: newEmail,
      company: newCompany || 'Independent',
      role: newRole || 'Developer Lead',
      tier: newTier,
      totalSpent: 0,
      transactionsCount: 0,
      status: 'Active',
      joinedDate: 'Just now',
      lastActive: 'Just now',
      location: newLocation,
      initials: newName.slice(0, 2).toUpperCase()
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewCompany('');
    setNewRole('');
    showToast(`Added ${newCust.name} to customer registry`);
  };

  const filteredCustomers = customers.filter((cust) => {
    const matchesTier = tierFilter === 'All' || cust.tier === tierFilter;
    const matchesSearch =
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
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
            Accounts & Contacts &mdash; Customer Index
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
            Customer Directory
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-1 font-normal">
            Manage enterprise accounts, contracts, spend volume, and contact telemetry.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans text-[11px] uppercase tracking-[0.15em] font-bold flex items-center gap-2 transition-all shadow-sm shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="glass-panel p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Enterprise', 'Pro', 'Starter'].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-colors shrink-0 ${
                tierFilter === t
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                  : 'text-[#1A1A1A]/60 hover:bg-[#F4F2EE] hover:text-[#1A1A1A]'
              }`}
            >
              {t} Tier
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5654]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, email..."
            className="w-full bg-[#FDFCFB] border border-[#1A1A1A]/20 py-1.5 pl-9 pr-3 text-[13px] text-[#1A1A1A] placeholder:text-[#5A5654]/60 focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="glass-panel p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F2EE] border-b border-[#1A1A1A]/10 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Account / Lead</th>
                <th className="px-6 py-4">Company & Role</th>
                <th className="px-6 py-4">Tier</th>
                <th className="px-6 py-4">Total LTV</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-[#F4F2EE]/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {cust.avatar ? (
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-9 h-9 object-cover border border-[#1A1A1A]/30"
                        />
                      ) : (
                        <div className="w-9 h-9 border border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif font-bold text-[12px]">
                          {cust.initials || cust.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-[14px] font-serif font-medium text-[#1A1A1A] group-hover:underline transition-colors">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-[#5A5654] font-mono">{cust.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-[14px] font-serif font-medium text-[#1A1A1A]">{cust.company}</p>
                    <p className="text-[11px] text-[#5A5654]">{cust.role}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        cust.tier === 'Enterprise'
                          ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                          : cust.tier === 'Pro'
                          ? 'bg-[#F4F2EE] text-[#1A1A1A] border border-[#1A1A1A]/20'
                          : 'bg-[#F4F2EE] text-[#5A5654] border border-[#1A1A1A]/10'
                      }`}
                    >
                      {cust.tier}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-[14px] font-mono font-bold text-[#1A1A1A]">
                      ${cust.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-[#5A5654]">{cust.transactionsCount} orders</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {cust.status === 'Active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#EBF4EF] text-[#2D5A47] border border-[#2D5A47]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A47]" />
                        Active
                      </span>
                    )}
                    {cust.status === 'Churn Risk' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FBF4EB] text-[#94631D] border border-[#94631D]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94631D]" />
                        Churn Risk
                      </span>
                    )}
                    {cust.status === 'Inactive' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FBECED] text-[#9E2A2B] border border-[#9E2A2B]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(cust);
                      }}
                      className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors border border-transparent hover:border-[#1A1A1A]/20"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dropdown w-full max-w-lg p-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute right-4 top-4 p-1.5 text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#1A1A1A]/10">
              {selectedCustomer.avatar ? (
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-14 h-14 object-cover border border-[#1A1A1A]"
                />
              ) : (
                <div className="w-14 h-14 border border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif font-bold text-[18px]">
                  {selectedCustomer.initials || selectedCustomer.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-[22px] font-serif font-semibold text-[#1A1A1A]">{selectedCustomer.name}</h3>
                <p className="text-[13px] text-[#5A5654]">{selectedCustomer.role} at {selectedCustomer.company}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB]">
                    {selectedCustomer.tier} Plan
                  </span>
                  <span className="text-[12px] text-[#5A5654] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedCustomer.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                <span className="text-[10px] uppercase font-bold text-[#5A5654] block mb-1">Lifetime Value</span>
                <span className="text-[20px] font-serif font-bold text-[#1A1A1A]">
                  ${selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                <span className="text-[10px] uppercase font-bold text-[#5A5654] block mb-1">Last Active</span>
                <span className="text-[13px] font-mono font-bold text-[#2D5A47]">{selectedCustomer.lastActive}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-[13px] text-[#5A5654] mb-6">
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span>Account Email</span>
                <span className="text-[#1A1A1A] font-mono">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span>Contract Joined</span>
                <span className="text-[#1A1A1A]">{selectedCustomer.joinedDate}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Account Health</span>
                <span className="text-[#2D5A47] font-bold">{selectedCustomer.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#1A1A1A]/10">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#F4F2EE] hover:bg-[#EAE7E1] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-sans font-bold border border-[#1A1A1A]/20 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Invoice reminder sent to ${selectedCustomer.email}`);
                  setSelectedCustomer(null);
                }}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-colors"
              >
                Send Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dropdown w-full max-w-md p-6">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-1">Add Enterprise Account</h3>
            <p className="text-[13px] text-[#5A5654] mb-4">Register a new customer account into the billing stream.</p>

            <form onSubmit={handleAddCustomer} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3.5 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="maya@company.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3.5 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="CyberCorp"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Role</label>
                  <input
                    type="text"
                    placeholder="Lead Architect"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Tier</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Pro">Pro</option>
                    <option value="Starter">Starter</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] transition-all shadow-sm"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
