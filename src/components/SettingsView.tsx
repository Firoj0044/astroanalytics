import React, { useState } from 'react';
import {
  Key,
  Users,
  Shield,
  Copy,
  Check,
  Plus,
  Trash2,
  BellRing,
  CreditCard,
  Rocket,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';
import { TeamMember } from '../types';

interface SettingsViewProps {
  onOpenUpgrade: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenUpgrade }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'api' | 'billing'>('general');
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [apiKeys, setApiKeys] = useState<{ id: string; name: string; key: string; created: string; lastUsed: string }[]>([
    {
      id: 'key-1',
      name: 'Production Ingest Agent',
      key: 'ast_live_99f83a82910baec847291a',
      created: 'Jan 10, 2023',
      lastUsed: '2 mins ago'
    },
    {
      id: 'key-2',
      name: 'CI/CD Automated Telemetry',
      key: 'ast_live_38bf801ba6110fec18294a',
      created: 'Aug 04, 2023',
      lastUsed: 'Yesterday'
    }
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Invite member state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Analyst' | 'Viewer'>('Analyst');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    showToast('API Key copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `ast_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`,
      created: 'Just now',
      lastUsed: 'Never'
    };

    setApiKeys([newKey, ...apiKeys]);
    setShowNewKeyModal(false);
    setNewKeyName('');
    showToast('New API key generated');
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
    showToast('API key revoked');
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuViJJlmUD8ZTK_s0snEA7ja_OK0DqtMOQAnfQDsbMRb5Hhnr3Lsx_n1lnBg5VlTwLvP53yCWQkAxoUnWLnNG_iUYoK336a6UKws4nOcahva9FQdQPSkusTX8FDxPBAoFqGETLDamFIIPpexbR53ZinTH-rmHPDAnuU3t_Y_7ojxU476bcou08y9DH4CRC52db3-wbcoDqBLn4CwZ4E7dY4_ZoY2VmOcpH3Vw0F7df3ET9yJbuqHrs3QA',
      status: 'Pending Invite'
    };

    setTeam([...team, newMember]);
    setInviteEmail('');
    showToast(`Invitation sent to ${inviteEmail}`);
  };

  return (
    <div className="w-full pb-10">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FDFCFB] border border-[#1A1A1A]/30 text-[#1A1A1A] px-4 py-3 shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#2D5A47]" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 border-b border-[#1A1A1A]/10 pb-6">
        <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#1A1A1A]/50 mb-1">
          Preferences & Governance &mdash; Enterprise Admin
        </div>
        <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
          Settings & Configuration
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-1 font-normal">
          Manage workspace profile access, credentials, webhooks, and billing limits.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#1A1A1A]/10 mb-6 pb-2 overflow-x-auto">
        {[
          { id: 'general', label: 'Workspace Profile', icon: Shield },
          { id: 'team', label: 'Team & RBAC', icon: Users },
          { id: 'api', label: 'API Keys & Webhooks', icon: Key },
          { id: 'billing', label: 'Subscription & Billing', icon: CreditCard }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F4F2EE]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: General */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-4">Enterprise Workspace Details</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Organization Name</label>
                <input
                  type="text"
                  defaultValue="AstroAnalytics Enterprise"
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-4 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Primary Routing Domain</label>
                <input
                  type="text"
                  defaultValue="telemetry.astroanalytics.io"
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-4 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Primary Region</label>
                  <select className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-4 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]">
                    <option>asia-east1 (Taiwan)</option>
                    <option>us-central1 (Iowa)</option>
                    <option>europe-west3 (Frankfurt)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Data Retention SLA</label>
                  <select className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-4 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]">
                    <option>365 Days (Enterprise Standard)</option>
                    <option>730 Days (Extended)</option>
                    <option>Indefinite Cold Storage</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 flex justify-end">
                <button
                  onClick={() => showToast('Workspace settings saved')}
                  className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-3">Security & Compliance</h3>
              <p className="text-[13px] text-[#5A5654] leading-relaxed mb-4">
                Your enterprise tier includes SOC-2 Type II audit reports, HIPAA readiness, and automated secret rotation.
              </p>

              <div className="flex flex-col gap-3">
                <div className="p-3 bg-[#F4F2EE] border border-[#1A1A1A]/15 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#1A1A1A]">2FA Enforced</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A47] bg-[#EBF4EF] border border-[#2D5A47]/20 px-2 py-0.5">Active</span>
                </div>
                <div className="p-3 bg-[#F4F2EE] border border-[#1A1A1A]/15 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#1A1A1A]">SSO (SAML/Okta)</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A47] bg-[#EBF4EF] border border-[#2D5A47]/20 px-2 py-0.5">Connected</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 text-[12px] text-[#5A5654]">
              Last security audit: <span className="text-[#1A1A1A] font-medium">3 days ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team */}
      {activeTab === 'team' && (
        <div className="glass-panel p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A]">Team Members & Access Control</h3>
              <p className="text-[13px] text-[#5A5654]">Role-based access limits for analytics dashboards and raw data exports.</p>
            </div>
          </div>

          <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-[#F4F2EE] border border-[#1A1A1A]/15">
            <input
              type="email"
              required
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 bg-[#FDFCFB] border border-[#1A1A1A]/20 px-4 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="bg-[#FDFCFB] border border-[#1A1A1A]/20 px-4 py-2 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Send Invite</span>
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10 text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-[0.2em] bg-[#F4F2EE]">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/10 text-[13px]">
                {team.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F4F2EE]/50 transition-colors">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 object-cover border border-[#1A1A1A]/20" />
                      <div>
                        <p className="font-medium text-[#1A1A1A] font-serif">{member.name}</p>
                        <p className="text-[11px] text-[#5A5654] font-mono">{member.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F4F2EE] text-[#1A1A1A] border border-[#1A1A1A]/15">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${member.status === 'Active' ? 'text-[#2D5A47]' : 'text-[#94631D]'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {member.role !== 'Owner' && (
                        <button
                          onClick={() => {
                            setTeam(team.filter((t) => t.id !== member.id));
                            showToast(`Removed ${member.name}`);
                          }}
                          className="p-1.5 text-[#5A5654] hover:text-[#9E2A2B] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: API Keys */}
      {activeTab === 'api' && (
        <div className="glass-panel p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A]">API Credentials & Authentication</h3>
              <p className="text-[13px] text-[#5A5654]">Bearer tokens for ingesting event pipelines and running automated query exports.</p>
            </div>
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all shadow-sm shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Key</span>
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            {apiKeys.map((k) => (
              <div key={k.id} className="p-4 bg-[#F4F2EE] border border-[#1A1A1A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-[15px] text-[#1A1A1A]">{k.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A5654] bg-[#FDFCFB] px-2 py-0.5 border border-[#1A1A1A]/10">
                      Created: {k.created}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 font-mono text-[13px] text-[#1A1A1A]">
                    <span>{k.key}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => copyToClipboard(k.key, k.id)}
                    className="px-3 py-1.5 bg-[#FDFCFB] hover:bg-[#EAE7E1] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-sans font-bold flex items-center gap-1.5 border border-[#1A1A1A]/20 transition-colors"
                  >
                    {copiedKey === k.id ? <Check className="w-3.5 h-3.5 text-[#2D5A47]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === k.id ? 'Copied' : 'Copy Key'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteKey(k.id)}
                    className="p-1.5 text-[#5A5654] hover:text-[#9E2A2B] transition-colors"
                    title="Revoke Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Billing */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#FDFCFB] px-2.5 py-0.5">
                  Current Tier
                </span>
                <h3 className="text-[24px] font-serif font-semibold text-[#1A1A1A] mt-2">AstroAnalytics Enterprise</h3>
              </div>
              <button
                onClick={onOpenUpgrade}
                className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] flex items-center gap-2 transition-all shadow-sm"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Change Plan</span>
              </button>
            </div>

            <p className="text-[13px] text-[#5A5654] leading-relaxed mb-6">
              Unlimited team seats, dedicated multi-tenant telemetry cluster, 99.99% uptime SLA guarantee, and 24/7 dedicated solutions engineering.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                <span className="text-[10px] uppercase font-bold text-[#5A5654] block mb-1">Monthly Billing</span>
                <span className="text-[18px] font-serif font-bold text-[#1A1A1A]">$4,990 / mo</span>
              </div>
              <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                <span className="text-[10px] uppercase font-bold text-[#5A5654] block mb-1">Next Renewal</span>
                <span className="text-[14px] font-mono font-bold text-[#2D5A47]">Nov 01, 2026</span>
              </div>
              <div className="p-3.5 bg-[#F4F2EE] border border-[#1A1A1A]/15">
                <span className="text-[10px] uppercase font-bold text-[#5A5654] block mb-1">Ingest Quota</span>
                <span className="text-[14px] font-serif font-bold text-[#1A1A1A]">Unlimited</span>
              </div>
            </div>

            <div className="p-4 bg-[#F4F2EE] border border-[#1A1A1A]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FDFCFB] text-[#1A1A1A] border border-[#1A1A1A]/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[14px] font-medium font-serif text-[#1A1A1A]">Mastercard ending in 4242</p>
                  <p className="text-[11px] text-[#5A5654]">Expires 12/2028 &bull; Default payment method</p>
                </div>
              </div>
              <button
                onClick={() => showToast('Payment modal opened')}
                className="text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#1A1A1A] hover:underline"
              >
                Update Card
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-3">Enterprise Invoices</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { id: 'INV-2023-010', date: 'Oct 01, 2023', amount: '$4,990.00' },
                  { id: 'INV-2023-009', date: 'Sep 01, 2023', amount: '$4,990.00' },
                  { id: 'INV-2023-008', date: 'Aug 01, 2023', amount: '$4,990.00' }
                ].map((inv) => (
                  <div key={inv.id} className="p-3 bg-[#F4F2EE] border border-[#1A1A1A]/15 flex justify-between items-center text-[13px]">
                    <div>
                      <p className="font-mono font-bold text-[#1A1A1A]">{inv.id}</p>
                      <p className="text-[11px] text-[#5A5654]">{inv.date}</p>
                    </div>
                    <span className="font-mono font-bold text-[#2D5A47]">{inv.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => showToast('Statements downloaded')}
              className="mt-6 w-full py-2.5 bg-[#F4F2EE] hover:bg-[#EAE7E1] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-sans font-bold border border-[#1A1A1A]/20 transition-colors"
            >
              Download All Invoices
            </button>
          </div>
        </div>
      )}

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dropdown w-full max-w-md p-6">
            <h3 className="text-[20px] font-serif font-semibold text-[#1A1A1A] mb-1">Create API Key</h3>
            <p className="text-[13px] text-[#5A5654] mb-4">Provide a descriptive label for your application client.</p>

            <form onSubmit={handleGenerateKey} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 block mb-1">Key Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Pipeline Worker"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/20 px-3.5 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setShowNewKeyModal(false)}
                  className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-[0.15em] transition-all shadow-sm"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
