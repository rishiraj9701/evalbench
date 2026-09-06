import React from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Sparkles,
  ShieldCheck,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'queue' | 'workspace' | 'qa' | 'history' | 'analytics' | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  pendingQACount: number;
  inProgressTaskCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  pendingQACount,
  inProgressTaskCount
}) => {
  const mainNavItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'queue' as ActiveTab,
      label: 'Evaluation Queue',
      icon: ListTodo,
      badge: inProgressTaskCount > 0 ? `${inProgressTaskCount}` : undefined,
      badgeColor: 'bg-[#342707] text-[#F0A51A] border border-[#8A5A00]'
    },
    { id: 'workspace' as ActiveTab, label: 'Evaluation Workspace', icon: Sparkles, highlight: true },
    {
      id: 'qa' as ActiveTab,
      label: 'Quality Assurance',
      icon: ShieldCheck,
      badge: pendingQACount > 0 ? `${pendingQACount}` : undefined,
      badgeColor: 'bg-[#342707] text-[#F0A51A] border border-[#8A5A00]'
    },
    { id: 'history' as ActiveTab, label: 'Evaluation History', icon: History },
    { id: 'analytics' as ActiveTab, label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0A1514] border-r border-[#1B302D] flex flex-col justify-between transition-all duration-200 z-30 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#1B302D]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-[#342707] border border-[#8A5A00] flex items-center justify-center text-[#F0A51A] shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-[#F1F5F3] tracking-tight text-sm leading-tight">EvalBench</span>
                <span className="text-[10px] text-[#7F9691] font-mono uppercase tracking-wider">AI Quality OS</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[#7F9691] hover:text-[#F1F5F3] hover:bg-[#10211F] transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#332408] border border-[#8A5A00] text-[#F0A51A] font-semibold shadow-sm'
                    : item.highlight
                    ? 'text-[#F0A51A] hover:bg-[#10211F] hover:text-[#F1F5F3]'
                    : 'text-[#B7C7C3] hover:bg-[#10211F] hover:text-[#F1F5F3]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F0A51A]' : 'text-[#8FA5A0]'}`} />
                {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded font-semibold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings */}
      <div className="p-3 border-t border-[#1B302D]">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'settings'
              ? 'bg-[#332408] border border-[#8A5A00] text-[#F0A51A]'
              : 'text-[#B7C7C3] hover:bg-[#10211F] hover:text-[#F1F5F3]'
          }`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className={`w-4 h-4 shrink-0 ${activeTab === 'settings' ? 'text-[#F0A51A]' : 'text-[#8FA5A0]'}`} />
          {!collapsed && <span className="flex-1 text-left truncate">Settings</span>}
        </button>
      </div>
    </aside>
  );
};
