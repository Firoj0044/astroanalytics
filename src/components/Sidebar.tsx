import React from 'react';
import {
  BarChart3,
  LayoutDashboard,
  LineChart,
  FileText,
  Users,
  Settings,
  Rocket,
  X
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenUpgrade: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpgrade,
  mobileOpen,
  onCloseMobile
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 h-screen w-[280px] bg-[#F4F2EE] border-r border-[#1A1A1A]/10 py-6 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="px-6 mb-8 flex items-center justify-between border-b border-[#1A1A1A]/10 pb-5">
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => {
              onSelectTab('dashboard');
              onCloseMobile();
            }}
          >
            <div className="w-10 h-10 border border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center shrink-0">
              <span className="font-serif font-bold italic text-base">A</span>
            </div>
            <div>
              <h1 className="text-[20px] font-serif font-bold tracking-tight text-[#1A1A1A] leading-none">
                ASTROANALYTICS
              </h1>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-sans font-bold mt-1">
                Enterprise &mdash; Ed. 04
              </p>
            </div>
          </div>

          <button
            id="close-mobile-nav-btn"
            onClick={onCloseMobile}
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EBE8E2] md:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
          <div className="px-3 py-1 mb-1">
            <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-[#1A1A1A]/40">
              Navigation
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-[13px] font-sans tracking-wide transition-all group relative text-left ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#FDFCFB] font-semibold shadow-sm'
                    : 'text-[#1A1A1A]/75 hover:bg-[#EBE8E2] hover:text-[#1A1A1A]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-[#FDFCFB]' : 'text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]'
                  }`}
                />
                <span className="uppercase text-[11px] tracking-[0.12em] font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-1 bg-[#FDFCFB]" />
                )}
              </button>
            );
          })}

          {/* Settings Nav Item pinned at bottom before CTA */}
          <div className="mt-auto pt-4 border-t border-[#1A1A1A]/10">
            <button
              id="nav-link-settings"
              onClick={() => {
                onSelectTab('settings');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-[13px] font-sans tracking-wide transition-all group text-left ${
                currentTab === 'settings'
                  ? 'bg-[#1A1A1A] text-[#FDFCFB] font-semibold'
                  : 'text-[#1A1A1A]/75 hover:bg-[#EBE8E2] hover:text-[#1A1A1A]'
              }`}
            >
              <Settings
                className={`w-4 h-4 transition-transform group-hover:rotate-45 ${
                  currentTab === 'settings'
                    ? 'text-[#FDFCFB]'
                    : 'text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]'
                }`}
              />
              <span className="uppercase text-[11px] tracking-[0.12em] font-medium">Settings</span>
            </button>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="px-4 mt-4 pt-4 border-t border-[#1A1A1A]/10">
          <button
            id="sidebar-upgrade-plan-btn"
            onClick={onOpenUpgrade}
            className="w-full py-2.5 px-3 bg-[#FDFCFB] border border-[#1A1A1A] text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:text-[#FDFCFB] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Rocket className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Upgrade Tier</span>
          </button>
        </div>
      </aside>
    </>
  );
};
