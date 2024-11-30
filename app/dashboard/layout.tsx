"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Analytics", href: "/analytics" },
  ];

  return (
    <div className=" h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* TopBar */}
          <TopBar
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Dashboard Card {i}
                  </h3>
                  <p className="text-gray-500">
                    This is a placeholder for dashboard content. Real data and
                    charts would go here.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
