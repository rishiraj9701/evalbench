import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import type { Task } from '../../types/eval';

interface NavbarProps {
  sidebarCollapsed: boolean;
  tasks: Task[];
  activeTaskId: string;
  onSelectTask: (taskId: string) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sidebarCollapsed,
  tasks,
  activeTaskId,
  onSelectTask,
  onResetData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];

  const filteredTasks = searchQuery.trim()
    ? tasks.filter(
        (t) =>
          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-[#0A1514] border-b border-[#1B302D] z-20 flex items-center justify-between px-6 transition-all duration-200 ${
        sidebarCollapsed ? 'left-18' : 'left-64'
      }`}
    >
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F9691]" />
          <input
            type="text"
            placeholder="Search task ID, domain, prompt..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            className="w-full bg-[#091513] border border-[#1E3431] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00] transition-colors placeholder:text-[#667E79]"
          />
        </div>

        {/* Dropdown Search Results */}
        {showSearchResults && filteredTasks.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#132522] border border-[#1B302D] rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto z-50 animate-fade-in">
            {filteredTasks.map((task) => (
              <button
                key={task.id}
                onMouseDown={() => {
                  onSelectTask(task.id);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="w-full p-2.5 text-left border-b border-[#1B302D] hover:bg-[#10211F] transition-colors flex items-start gap-2.5"
              >
                <span className="font-mono text-xs text-[#F0A51A] font-semibold">{task.id}</span>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs text-[#F1F5F3] font-medium truncate">{task.prompt}</p>
                  <p className="text-[10px] text-[#7F9691]">{task.domain} • {task.difficulty}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Task Selector */}
        {activeTask && (
          <div className="hidden sm:flex items-center gap-2 bg-[#091513] border border-[#1E3431] rounded-lg px-3 py-1.5">
            <span className="text-[11px] text-[#B7C7C3] font-medium">Active Task:</span>
            <select
              value={activeTaskId}
              onChange={(e) => onSelectTask(e.target.value)}
              className="bg-transparent text-xs font-mono font-bold text-[#F0A51A] focus:outline-none cursor-pointer"
            >
              {tasks.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0A1514] text-[#F1F5F3]">
                  {t.id} ({t.domain})
                </option>
              ))}
            </select>
            <span className="text-[10px] bg-[#342707] text-[#F0A51A] border border-[#8A5A00] px-2 py-0.5 rounded font-medium ml-1">
              {activeTask.status}
            </span>
          </div>
        )}

        {/* Reset Mock Data Action */}
        <button
          onClick={onResetData}
          className="flex items-center gap-1.5 text-xs text-[#B7C7C3] hover:text-[#F1F5F3] px-2.5 py-1.5 rounded-lg border border-[#2A403C] bg-[#10211F] hover:bg-[#172B28] transition-colors"
          title="Reset LocalStorage mock data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset Data</span>
        </button>

        {/* Evaluator Profile Badge */}
        <div className="flex items-center gap-2 bg-[#10211F] border border-[#2A403C] px-3 py-1 rounded-full">
          <div className="w-6 h-6 rounded-full bg-[#342707] border border-[#8A5A00] flex items-center justify-center text-[10px] font-bold text-[#F0A51A]">
            RG
          </div>
          <span className="text-xs font-semibold text-[#F1F5F3] hidden lg:inline">Raghav</span>
        </div>
      </div>
    </header>
  );
};
