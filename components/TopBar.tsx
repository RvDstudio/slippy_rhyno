import React from "react";
import {
  Bell,
  Globe,
  Phone,
  ShoppingCart,
  Maximize,
  Search,
  Menu,
} from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

export const TopBar = ({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) => {
  return (
    <header className="bg-white h-16 px-6 flex items-center justify-between border-b sticky top-0 w-full z-10 shadow-sm">
      <div className="flex items-center flex-1 max-w-xl gap-4">
        <MobileSidebar
          isOpen={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <button
          className="p-1 hidden lg:block text-gray-500"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <div className="relative flex-1 ml-4 lg:ml-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-navy-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Maximize className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">Rhyno</span>
        </button>
      </div>
    </header>
  );
};
