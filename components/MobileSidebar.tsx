import React from "react";
import { Sidebar } from "./Sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader>
            <h2 className="text-lg font-bold px-4 py-2">Menu</h2>
          </SheetHeader>
          <Sidebar isCollapsed={false} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
