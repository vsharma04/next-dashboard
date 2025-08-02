import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';

export default function SidebarWidget() {
  const { isExpanded } = useSidebar();

  return (
    <div
      className={`
        mx-auto mb-[20px] w-full max-w-60 rounded-2xl text-center 
        dark:bg-white/[0.03] transition-all duration-300
      `}
    >
      <button
        className={`menu-item flex items-center gap-2 mb-[30px] text-white transition-all duration-300
          ${isExpanded ? 'justify-start px-4' : 'justify-center'}
        `}
      >
        <img
          src="/assets/icons/setting.svg"
          alt="Settings Icon"
        />

        {isExpanded && <span>Settings</span>}
      </button>

      <Link
        href="/"
        className="flex items-center justify-center gap-2 p-3 font-medium text-white rounded-lg transition-all bg-[#3FC3AC] text-theme-sm hover:bg-[#3FC3AC]/80"
      >
        <img
          src="/assets/icons/logout.svg"
          alt="Log out Icon"
        />
        {isExpanded && 'Logout'}
      </Link>
    </div>
  );
}
