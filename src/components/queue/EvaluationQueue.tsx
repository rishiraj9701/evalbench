import React, { useState, useMemo } from 'react';
import type { Task, DomainType } from '../../types/eval';
import { DomainBadge, DifficultyBadge, StatusBadge, PriorityBadge } from '../common/Badge';
import { Search, Filter, Play, CheckCircle, ArrowUpDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface EvaluationQueueProps {
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const EvaluationQueue: React.FC<EvaluationQueueProps> = ({ tasks, onSelectTask }) => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'id' | 'priority' | 'date'>('priority');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const domains: DomainType[] = [
    'General Knowledge',
    'Technology',
    'Mathematics',
    'Science',
    'Business',
    'Customer Support',
    'Writing',
    'Reasoning'
  ];

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchesSearch =
          t.id.toLowerCase().includes(search.toLowerCase()) ||
          t.prompt.toLowerCase().includes(search.toLowerCase()) ||
          t.domain.toLowerCase().includes(search.toLowerCase());

        const matchesDomain = domainFilter === 'All' || t.domain === domainFilter;
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        const matchesDifficulty = difficultyFilter === 'All' || t.difficulty === difficultyFilter;

        return matchesSearch && matchesDomain && matchesStatus && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'id') return a.id.localeCompare(b.id);
        if (sortBy === 'date') return new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime();
        if (sortBy === 'priority') {
          const priorityRank = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return priorityRank[b.priority] - priorityRank[a.priority];
        }
        return 0;
      });
  }, [tasks, search, domainFilter, statusFilter, difficultyFilter, sortBy]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(start, start + itemsPerPage);
  }, [filteredTasks, currentPage]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Evaluation Task Queue
          </h1>
          <p className="text-xs text-slate-400">
            Work queue of AI model evaluation tasks across 8 domain categories.
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0f172a] border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
            <span className="text-slate-400">Total Tasks:</span>
            <span className="font-bold text-slate-100 font-mono">{tasks.length}</span>
          </div>
          <div className="bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs text-indigo-300">
            <span>In Progress:</span>
            <span className="font-bold font-mono">{tasks.filter((t) => t.status === 'In Progress').length}</span>
          </div>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search task ID, prompt, domain..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#090d16] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-[#090d16] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={domainFilter}
              onChange={(e) => {
                setDomainFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-[#0f172a]">All Domains</option>
              {domains.map((d) => (
                <option key={d} value={d} className="bg-[#0f172a]">{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d16] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-[#0f172a]">All Statuses</option>
              <option value="Not Started" className="bg-[#0f172a]">Not Started</option>
              <option value="In Progress" className="bg-[#0f172a]">In Progress</option>
              <option value="Completed" className="bg-[#0f172a]">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d16] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-[#0f172a]">All Difficulties</option>
              <option value="Easy" className="bg-[#0f172a]">Easy</option>
              <option value="Medium" className="bg-[#0f172a]">Medium</option>
              <option value="Hard" className="bg-[#0f172a]">Hard</option>
              <option value="Expert" className="bg-[#0f172a]">Expert</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d16] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="priority" className="bg-[#0f172a]">Priority</option>
              <option value="id" className="bg-[#0f172a]">Task ID</option>
              <option value="date" className="bg-[#0f172a]">Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Data Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#090d16] border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Task ID</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4 min-w-[280px]">Prompt Preview</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No evaluation tasks match the filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{t.id}</td>
                    <td className="py-3.5 px-4"><DomainBadge domain={t.domain} /></td>
                    <td className="py-3.5 px-4 text-slate-200 font-medium line-clamp-2">{t.prompt}</td>
                    <td className="py-3.5 px-4"><DifficultyBadge difficulty={t.difficulty} /></td>
                    <td className="py-3.5 px-4"><PriorityBadge priority={t.priority} /></td>
                    <td className="py-3.5 px-4"><StatusBadge status={t.status} /></td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{t.assignedDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectTask(t.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          t.status === 'Completed'
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        }`}
                      >
                        {t.status === 'Completed' ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>View Task</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Evaluate Task</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#090d16] px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{filteredTasks.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-slate-200">{Math.min(currentPage * itemsPerPage, filteredTasks.length)}</strong> of{' '}
            <strong className="text-slate-200">{filteredTasks.length}</strong> tasks
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
