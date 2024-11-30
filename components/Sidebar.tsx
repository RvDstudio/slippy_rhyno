import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navigationData } from "@/data/navigation";
import type { MenuItem } from "@/types/navigation";
import { Icon } from "@/components/shared/Icon";
import { Tooltip } from "@/components/shared/Tooltip";

interface MenuItemProps {
  item: {
    label: string;
    icon: string;
    href?: string;
    submenu?: MenuItemProps["item"][];
  };
  isCollapsed: boolean;
}

const MenuItem = ({ item, isCollapsed }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const pathname = usePathname(); // Get current route

  // Active state for both parent and submenu items
  const isActive =
    (item.href && pathname === item.href) ||
    (item.submenu &&
      item.submenu.some((sub) => sub.href && pathname === sub.href));

  const button = (
    <button
      onClick={() => hasSubmenu && setIsOpen(!isOpen)}
      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-[#18294A] text-white" // Active styles
          : "text-gray-300 hover:bg-[#18294A]/90"
      }`}
    >
      <Icon name={item.icon} className="w-5 h-5" />
      {!isCollapsed && (
        <>
          <span className="ml-3 flex-1 text-left">{item.label}</span>
          {hasSubmenu && (
            <span className="ml-auto">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </>
      )}
    </button>
  );

  return (
    <div className="relative">
      {isCollapsed ? (
        <Tooltip content={item.label} side="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
      {hasSubmenu && isOpen && !isCollapsed && (
        <div className="ml-4 mt-1 space-y-1">
          {item.submenu &&
            item.submenu.map((subItem) => (
              <MenuItem
                key={subItem.label}
                item={subItem}
                isCollapsed={isCollapsed}
              />
            ))}
        </div>
      )}
    </div>
  );
};

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
