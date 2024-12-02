import React from "react";
import MenuItem from "@/components/MenuItem";
import { navigationData } from "@/data/navigation";
import { Icon } from "@/components/shared/Icon";

export const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <aside
      className={`bg-[#111D36] h-screen transition-all duration-300 fixed left-0 top-0 z-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center h-12">
          <Icon name="command" className="w-6 h-6 text-white" />
          {!isCollapsed && (
            <span className="text-2xl font-bold text-white ml-3">
              Slippy<span className="font-extralight">Rhyno</span>
            </span>
          )}
        </div>
      </div>
      <nav className="mt-4 px-2 space-y-6">
        {navigationData.map((section) => (
          <div key={section.title} className="space-y-2">
            {!isCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <MenuItem
                  key={item.label}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
