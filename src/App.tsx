import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { DashboardView } from './components/DashboardView';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportsView } from './components/ReportsView';
import { CustomersView } from './components/CustomersView';
import { SettingsView } from './components/SettingsView';
import { UpgradeModal } from './components/UpgradeModal';
import { SearchModal } from './components/SearchModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { NavigationTab, TimeRange, Transaction } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [inspectedTransaction, setInspectedTransaction] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex font-sans selection:bg-[#1A1A1A] selection:text-[#FDFCFB]">
      {/* Side Navigation Bar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenUpgrade={() => setUpgradeModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen relative w-full">
        {/* Fixed Top App Bar */}
        <TopAppBar
          onToggleMobileMenu={() => setMobileSidebarOpen((prev) => !prev)}
          onOpenSearch={() => setSearchModalOpen(true)}
          onSelectTab={setCurrentTab}
          onOpenUpgrade={() => setUpgradeModalOpen(true)}
        />

        {/* Main Canvas with Responsive Container */}
        <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12 max-w-[1600px] mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              timeRange={timeRange}
              onChangeTimeRange={setTimeRange}
              onSelectTransaction={(tx) => setInspectedTransaction(tx)}
              onSelectTab={setCurrentTab}
              onOpenUpgrade={() => setUpgradeModalOpen(true)}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView timeRange={timeRange} />
          )}

          {currentTab === 'reports' && (
            <ReportsView />
          )}

          {currentTab === 'customers' && (
            <CustomersView />
          )}

          {currentTab === 'settings' && (
            <SettingsView onOpenUpgrade={() => setUpgradeModalOpen(true)} />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTab={setCurrentTab}
        onSelectTransaction={(tx) => setInspectedTransaction(tx)}
      />

      <TransactionDetailModal
        transaction={inspectedTransaction}
        onClose={() => setInspectedTransaction(null)}
      />
    </div>
  );
}
