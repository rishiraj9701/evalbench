import React, { useState } from 'react';
import type { Task } from '../../types/eval';
import { DomainBadge, DifficultyBadge, StatusBadge, PriorityBadge } from '../common/Badge';
import { Copy, Check, ChevronDown, ChevronUp, BookOpen, AlertCircle, Sparkles, Layers } from 'lucide-react';

interface LeftPanelProps {
  task: Task;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ task }) => {
  const [copied, setCopied] = useState(false);
  const [guidelinesOpen, setGuidelinesOpen] = useState(true);
  const [constraintsOpen, setConstraintsOpen] = useState(false);
  const [metadataOpen, setMetadataOpen] = useState(false);
  const [checkedDirectives, setCheckedDirectives] = useState<{ [key: number]: boolean }>({});

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(task.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDirective = (idx: number) => {
    setCheckedDirectives((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const verifiedCount = Object.values(checkedDirectives).filter(Boolean).length;

  return (
    <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
      {/* Task Header Information */}
      <div className="flex flex-col gap-2 pb-3 border-b border-[#1B302D]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#F0A51A]">{task.id}</span>
            <PriorityBadge priority={task.priority} />
          </div>
          <StatusBadge status={task.status} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          <DomainBadge domain={task.domain} />
          <DifficultyBadge difficulty={task.difficulty} />
        </div>
      </div>

      {/* Main Task Prompt Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#7F9691] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#F0A51A]" />
            Evaluation Prompt
          </span>
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1 text-[11px] text-[#B7C7C3] hover:text-[#F1F5F3] transition-colors bg-[#10211F] px-2 py-0.5 rounded border border-[#2A403C]"
          >
            {copied ? <Check className="w-3 h-3 text-[#14B8A6]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-4 text-sm text-[#F1F5F3] font-medium leading-relaxed shadow-inner">
          {task.prompt}
        </div>
      </div>

      {/* Progressive Disclosure Collapsible Sections */}
      <div className="space-y-2 pt-1">
        {/* Collapsible 1: Evaluation Directives */}
        <div className="bg-[#091513] border border-[#1B302D] rounded-xl overflow-hidden">
          <button
            onClick={() => setGuidelinesOpen(!guidelinesOpen)}
            className="w-full p-3 flex items-center justify-between bg-[#10211F] hover:bg-[#132522] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#F0A51A]" />
              <span className="text-xs font-bold text-[#F1F5F3]">Evaluation Directives</span>
              <span className="text-[10px] bg-[#091513] text-[#7F9691] px-1.5 py-0.2 rounded font-mono border border-[#1B302D]">
                {verifiedCount}/{task.guidelines.length}
              </span>
            </div>
            {guidelinesOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#7F9691]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#7F9691]" />}
          </button>

          {guidelinesOpen && (
            <div className="p-3 space-y-1.5 border-t border-[#1B302D]">
              {task.guidelines.map((guide, idx) => {
                const isChecked = !!checkedDirectives[idx];
                return (
                  <label
                    key={idx}
                    onClick={() => toggleDirective(idx)}
                    className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      isChecked ? 'bg-[#342707] border border-[#8A5A00] text-[#F0A51A]' : 'hover:bg-[#10211F] text-[#B7C7C3]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded bg-[#091513] border-[#1B302D] text-[#D98A00] focus:ring-[#D98A00]"
                    />
                    <span className={`text-xs leading-snug ${isChecked ? 'line-through opacity-70' : ''}`}>
                      {guide}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Collapsible 2: System Constraints */}
        {task.systemPrompt && (
          <div className="bg-[#091513] border border-[#1B302D] rounded-xl overflow-hidden">
            <button
              onClick={() => setConstraintsOpen(!constraintsOpen)}
              className="w-full p-3 flex items-center justify-between bg-[#10211F] hover:bg-[#132522] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F0A51A]" />
                <span className="text-xs font-bold text-[#F1F5F3]">System Constraints</span>
              </div>
              {constraintsOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#7F9691]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#7F9691]" />}
            </button>

            {constraintsOpen && (
              <div className="p-3 border-t border-[#1B302D] text-xs text-[#B7C7C3] italic leading-relaxed">
                "{task.systemPrompt}"
              </div>
            )}
          </div>
        )}

        {/* Collapsible 3: Task Metadata */}
        <div className="bg-[#091513] border border-[#1B302D] rounded-xl overflow-hidden">
          <button
            onClick={() => setMetadataOpen(!metadataOpen)}
            className="w-full p-3 flex items-center justify-between bg-[#10211F] hover:bg-[#132522] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#7F9691]" />
              <span className="text-xs font-bold text-[#F1F5F3]">Task Metadata</span>
            </div>
            {metadataOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#7F9691]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#7F9691]" />}
          </button>

          {metadataOpen && (
            <div className="p-3 border-t border-[#1B302D] text-xs text-[#7F9691] space-y-1 font-mono">
              <p>Assigned Date: <span className="text-[#F1F5F3]">{task.assignedDate}</span></p>
              <p>Target Domain: <span className="text-[#F1F5F3]">{task.domain}</span></p>
              <p>Difficulty Score: <span className="text-[#F1F5F3]">{task.difficulty}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
