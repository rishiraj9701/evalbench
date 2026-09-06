import React from 'react';
import type { DomainType, DifficultyLevel, PriorityLevel, TaskStatus, QAStatus } from '../../types/eval';

export const DomainBadge: React.FC<{ domain: DomainType }> = ({ domain }) => {
  const colors: Record<DomainType, string> = {
    'General Knowledge': 'bg-[#342707] text-[#D98A00] border-[#8A5A00]',
    'Technology': 'bg-[#0B302B] text-[#14B8A6] border-[#0F766E]',
    'Mathematics': 'bg-[#201535] text-[#8B5CF6] border-[#4C2A80]',
    'Science': 'bg-[#102C2A] text-[#65A30D] border-[#1F4A14]',
    'Business': 'bg-[#342707] text-[#D97706] border-[#8A5A00]',
    'Customer Support': 'bg-[#0B302B] text-[#38A3A5] border-[#0F766E]',
    'Writing': 'bg-[#351516] text-[#E0527A] border-[#801B1B]',
    'Reasoning': 'bg-[#0B302B] text-[#0EA5A4] border-[#0F766E]'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${colors[domain]}`}>
      {domain}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: DifficultyLevel }> = ({ difficulty }) => {
  const colors: Record<DifficultyLevel, string> = {
    Easy: 'bg-[#0B302B] text-[#14B8A6] border-[#0F766E]',
    Medium: 'bg-[#342707] text-[#D98A00] border-[#8A5A00]',
    Hard: 'bg-[#341B07] text-[#D45D35] border-[#8A3A00]',
    Expert: 'bg-[#351516] text-[#D94670] border-[#801B1B]'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const colors: Record<TaskStatus, string> = {
    'Not Started': 'bg-[#10211F] text-[#7F9691] border-[#1B302D]',
    'In Progress': 'bg-[#342707] text-[#F0A51A] border-[#8A5A00]',
    'Completed': 'bg-[#0B302B] text-[#14B8A6] border-[#0F766E]',
    'Needs Review': 'bg-[#201535] text-[#8B5CF6] border-[#4C2A80]'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
      {status}
    </span>
  );
};

export const QABadge: React.FC<{ status: QAStatus }> = ({ status }) => {
  const colors: Record<QAStatus, string> = {
    Pending: 'bg-[#342707] text-[#F0A51A] border-[#8A5A00]',
    Approved: 'bg-[#0B302B] text-[#14B8A6] border-[#0F766E]',
    'Re-evaluation Required': 'bg-[#351516] text-[#EF4444] border-[#801B1B]',
    Flagged: 'bg-[#201535] text-[#8B5CF6] border-[#4C2A80]'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: PriorityLevel }> = ({ priority }) => {
  const colors: Record<PriorityLevel, string> = {
    Low: 'text-[#14B8A6]',
    Medium: 'text-[#14B8A6]',
    High: 'text-[#F0A51A] font-semibold',
    Urgent: 'text-[#EF4444] font-bold'
  };

  return <span className={`text-xs ${colors[priority]}`}>{priority}</span>;
};
