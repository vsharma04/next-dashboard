'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../context/SidebarContext';
// import DashboardIcon from '@/assets/icons/dashboard.svg';
// import AccountsIcon from '@/assets/icons/accounts.svg';
// import BatchesIcon from '@/assets/icons/batches.svg';
// import ResolutionIcon from '@/assets/icons/resolution.svg';
// import AssessmentIcon from '@/assets/icons/assessment.svg';
// import AppealLetterIcon from '@/assets/icons/appeal.svg';
// import SummaryIcon from '@/assets/icons/summary.svg';
// import ArrowCircleRight from '@/assets/icons/arrowCircleRight.svg';
import SidebarWidget from './SidebarWidget';

type NavItem = {
  name: string;
  icon: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: '/assets/icons/dashboard.svg', name: 'Dashboard', path: '/' },
  { icon: '/assets/icons/accounts.svg', name: 'Calender', path: '/calender' },
  // { icon: BatchesIcon, name: 'Batches', path: '/batches' },
  // { icon: ResolutionIcon, name: 'Resolution', path: '/resolution' },
  // { icon: AssessmentIcon, name: 'Assessments', path: '/assessment' },
  // { icon: AppealLetterIcon, name: 'Appeal Letter', path: '/appeal' },
  // { icon: SummaryIcon, name: 'Summary', path: '/summary' },
];

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    toggleMobileSidebar,
    toggleSidebar
  } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <aside
      className={`flex flex-col lg:mt-[20px] px-5 bg-[#2C4E6C] dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 rounded-lg shadow-lg justify-between
        ${isExpanded || isMobileOpen ? 'w-[240px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
    >
      <div className="absolute -right-[15px] top-[5px]">
        <button
          onClick={() => {
            if (window.innerWidth >= 1024) {
              toggleSidebar();
            } else {
              toggleMobileSidebar();
            }
          }}
          className="text-white rounded"
          aria-label="Toggle Sidebar"
        >
          <img
            src="/assets/icons/arrowCircleRight.svg"
            alt="Arrow circle right"
            className={`transition-transform duration-300 ${
              !isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/* Menu */}
      <nav className="mb-6 mt-6">
        <ul className="flex flex-col gap-4">
          {navItems.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  <img src={nav.icon} alt="icon" />
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SidebarWidget />
    </aside>
  );
};

export default AppSidebar;
