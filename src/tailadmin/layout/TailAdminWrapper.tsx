"use client";

import { useSidebar } from "@/tailadmin/context/SidebarContext";
import AppHeader from "@/tailadmin/layout/AppHeader";
import AppSidebar from "@/tailadmin/layout/AppSidebar";
import Backdrop from "@/tailadmin/layout/Backdrop";
import { usePathname } from 'next/navigation';

export default function TailAdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-outfit text-gray-800 dark:text-white/90">{children}</div>;
  }

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-900 font-outfit text-gray-800 dark:text-white/90">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
  );
}
