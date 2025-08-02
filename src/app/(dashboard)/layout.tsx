'use client';

import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isMobileOpen } = useSidebar();

  const sidebarWidth = isMobileOpen || isExpanded ? '240px' : '90px';

  return (
    <div className="min-h-screen p-[20px] grid grid-rows-[80px_1fr] bg-[#f6f7f8] max-w-[1600px] mx-auto">
      <AppHeader />

      <div className="grid grid-cols-[auto_1fr] h-full relative gap-[20px]">
        <div
          className="transition-all duration-300 ease-in-out pb-[20px] h-full"
          style={{ width: sidebarWidth }}
        >
          <AppSidebar />
        </div>

        <main className="pt-5 max-h-full">
          <div className="mx-auto max-w-[var(--breakpoint-2xl)] h-full">
            {children}
          </div>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
