"use client";

import { useState } from "react";
import { ChevronDown, User, Settings, LogOut, HelpCircle } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-sm" />
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && (
        <div 
          className="absolute right-0 top-full pt-2 w-56 animate-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="bg-black/95 border border-white/10 p-2 shadow-2xl rounded-sm">
            <div className="px-4 py-3 border-b border-white/10 mb-2">
              <p className="text-sm font-semibold text-white">User Name</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
            
            <DropdownItem icon={<User size={16}/>} label="Account" />
            <DropdownItem icon={<Settings size={16}/>} label="Settings" />
            <DropdownItem icon={<HelpCircle size={16}/>} label="Help Center" />
            
            <div className="mt-2 pt-2 border-t border-white/10">
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-white/5 transition-colors">
                <LogOut size={16} /> Sign out of YatriPlay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
      {icon} {label}
    </div>
  );
}