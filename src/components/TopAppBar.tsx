import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ExternalLink,
  User,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { USER_AVATAR, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { NotificationItem, NavigationTab } from '../types';

interface TopAppBarProps {
  onToggleMobileMenu: () => void;
  onOpenSearch: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenUpgrade: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onToggleMobileMenu,
  onOpenSearch,
  onSelectTab,
  onOpenUpgrade
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header
      id="top-app-bar"
      className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-16 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#1A1A1A]/10 z-40 flex justify-between items-center px-4 sm:px-8 transition-all"
    >
      {/* Left side: Mobile Menu + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          id="mobile-menu-toggle-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle mobile menu"
          className="md:hidden p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F4F2EE] rounded-none transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching editorial aesthetic */}
        <div className="flex-1 relative group cursor-pointer" onClick={onOpenSearch}>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] transition-colors" />
          <input
            id="global-search-input"
            type="text"
            readOnly
            placeholder="Search telemetry, cohorts, accounts..."
            className="w-full bg-[#F4F2EE] border border-[#1A1A1A]/15 py-1.5 pl-10 pr-12 text-[13px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#1A1A1A] transition-all cursor-pointer hover:bg-[#EBE8E2]"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-[#1A1A1A]/60 bg-[#FDFCFB] px-1.5 py-0.5 border border-[#1A1A1A]/20">
            <span className="text-[9px]">⌘</span>K
          </div>
        </div>
      </div>

      {/* Right side Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        {/* Edition indicator badge */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A]/50 border-r border-[#1A1A1A]/15 pr-4">
          <span>Global Telemetry</span>
          <span className="w-1.5 h-1.5 bg-[#2D5A47] rounded-full" />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            id="topbar-notifications-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-[#1A1A1A]/70 hover:bg-[#F4F2EE] hover:text-[#1A1A1A] transition-all relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#9E2A2B] rounded-full ring-2 ring-[#FDFCFB]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 sm:w-96 glass-dropdown p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/10 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-[16px] text-[#1A1A1A]">Dispatches & Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-[#FDFCFB] px-2 py-0.5">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] uppercase tracking-wider text-[#1A1A1A] hover:underline font-bold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto flex flex-col gap-2">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 transition-colors text-left flex gap-3 border ${
                      item.read ? 'bg-[#F4F2EE]/50 border-transparent' : 'bg-[#FFFFFF] border-[#1A1A1A]/15 shadow-sm'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === 'alert' && (
                        <div className="w-6 h-6 border border-[#9E2A2B]/30 bg-[#FBECED] text-[#9E2A2B] flex items-center justify-center">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {item.type === 'success' && (
                        <div className="w-6 h-6 border border-[#2D5A47]/30 bg-[#EBF4EF] text-[#2D5A47] flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {item.type === 'info' && (
                        <div className="w-6 h-6 border border-[#1A1A1A]/20 bg-[#F4F2EE] text-[#1A1A1A] flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {item.type === 'billing' && (
                        <div className="w-6 h-6 border border-[#1A1A1A]/20 bg-[#F4F2EE] text-[#1A1A1A] flex items-center justify-center">
                          <Info className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] font-serif font-bold text-[#1A1A1A]">{item.title}</p>
                        <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-sans">{item.time}</span>
                      </div>
                      <p className="text-[12px] text-[#1A1A1A]/70 mt-0.5 leading-snug">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Button & Popover */}
        <div className="relative" ref={helpRef}>
          <button
            id="topbar-help-btn"
            onClick={() => setHelpOpen(!helpOpen)}
            className="p-2 text-[#1A1A1A]/70 hover:bg-[#F4F2EE] hover:text-[#1A1A1A] transition-all hidden sm:block"
            title="Help & Knowledge Base"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {helpOpen && (
            <div
              id="help-popover"
              className="absolute right-0 mt-2 w-72 glass-dropdown p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
            >
              <h4 className="font-serif font-bold text-[16px] text-[#1A1A1A] mb-1">Documentation</h4>
              <p className="text-[12px] text-[#1A1A1A]/70 mb-3 leading-relaxed">
                AstroAnalytics Enterprise documentation, telemetry guides, and REST API references.
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="#api-docs"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab('settings');
                    setHelpOpen(false);
                  }}
                  className="flex items-center justify-between p-2 hover:bg-[#F4F2EE] text-[12px] text-[#1A1A1A] font-medium transition-colors border-b border-[#1A1A1A]/10"
                >
                  <span className="uppercase tracking-wider text-[11px] font-bold">API Keys & Webhooks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#reports"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab('reports');
                    setHelpOpen(false);
                  }}
                  className="flex items-center justify-between p-2 hover:bg-[#F4F2EE] text-[12px] text-[#1A1A1A]/80 transition-colors"
                >
                  <span className="uppercase tracking-wider text-[11px]">Scheduled Exports</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Circular Monogram / Language Style Badge */}
        <div className="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center text-xs font-serif font-bold italic select-none">
          EN
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative" ref={profileRef}>
          <button
            id="topbar-user-profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity p-0.5"
          >
            <img
              src={USER_AVATAR}
              alt="Alex Vance Profile"
              className="w-8 h-8 object-cover border border-[#1A1A1A]/40 shadow-sm"
            />
          </button>

          {profileOpen && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-64 glass-dropdown p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1A1A1A]/10 mb-3">
                <img
                  src={USER_AVATAR}
                  alt="Alex Profile"
                  className="w-10 h-10 object-cover border border-[#1A1A1A]"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-[15px] text-[#1A1A1A] truncate">Alex Vance</h4>
                  <p className="text-[11px] text-[#1A1A1A]/60 truncate font-mono">alex@astroanalytics.io</p>
                  <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] bg-[#F4F2EE] border border-[#1A1A1A]/20 px-1.5 py-0.5 mt-1">
                    Enterprise Tier
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    onSelectTab('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors text-left"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Account & Roles</span>
                </button>
                <button
                  onClick={() => {
                    onOpenUpgrade();
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A47]" />
                  <span>Plan & Billing</span>
                </button>
                <div className="h-px bg-[#1A1A1A]/10 my-1" />
                <button
                  onClick={() => {
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] uppercase tracking-wider font-semibold text-[#9E2A2B] hover:bg-[#FBECED] transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
