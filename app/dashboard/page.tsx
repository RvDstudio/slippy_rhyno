import { Breadcrumbs } from "@/components/Breadcrumbs";
import React from "react";

function DashboardPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-8 ">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white cursor-pointer rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Dashboard Card {i}
            </h3>
            <p className="text-gray-500">
              This is a placeholder for dashboard content. Real data and charts
              would go here.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
