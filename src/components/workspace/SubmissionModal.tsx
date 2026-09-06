import React from 'react';
import type {
  Task,
  CriteriaScores,
  AnnotatedIssue,
  EvaluatorFeedback
} from '../../types/eval';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionModalProps {
  task: Task;
  scores: CriteriaScores;
  issues: AnnotatedIssue[];
  feedback: EvaluatorFeedback;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  task,
  scores,
  issues,
  feedback,
  isOpen,
  onClose,
  onConfirmSubmit
}) => {
  if (!isOpen) return null;

  const scoreKeys = Object.keys(scores) as (keyof CriteriaScores)[];
  const overallScore = Number(
    (scoreKeys.reduce((acc, k) => acc + scores[k].score, 0) / scoreKeys.length).toFixed(1)
  );

  const handleConfirm = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onConfirmSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07100F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#7F9691] hover:text-[#F1F5F3] hover:bg-[#10211F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#1B302D] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#342707] border border-[#8A5A00] flex items-center justify-center text-[#F0A51A]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F1F5F3]">Confirm Evaluation Submission</h3>
            <p className="text-xs text-[#7F9691]">Task {task.id} • {task.domain}</p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-3 bg-[#091513] p-4 rounded-xl border border-[#1B302D]">
          <div className="flex flex-col justify-center">
            <span className="text-xs text-[#7F9691] font-semibold uppercase">Overall Calculated Score</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-extrabold text-[#F0A51A] font-mono">{overallScore}</span>
              <span className="text-xs text-[#7F9691] font-medium">/ 5.0</span>
            </div>
          </div>

          <div className="flex flex-col justify-center border-l border-[#1B302D] pl-4">
            <span className="text-xs text-[#7F9691] font-semibold uppercase">Final Classification</span>
            <span
              className={`inline-block mt-1 font-bold text-xs px-3 py-1 rounded-lg w-fit border ${
                feedback.finalClassification === 'Accept'
                  ? 'bg-[#0B302B] text-[#14B8A6] border-[#0F766E]'
                  : feedback.finalClassification === 'Accept with Minor Issues'
                  ? 'bg-[#342707] text-[#F0A51A] border-[#8A5A00]'
                  : feedback.finalClassification === 'Needs Revision'
                  ? 'bg-[#341B07] text-[#D45D35] border-[#8A3A00]'
                  : 'bg-[#351516] text-[#EF4444] border-[#801B1B]'
              }`}
            >
              {feedback.finalClassification}
            </span>
          </div>
        </div>

        {/* Individual Scores Pill Grid */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#B7C7C3]">Dimension Scores</span>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {scoreKeys.map((key) => (
              <div key={key} className="bg-[#091513] p-2 rounded-lg border border-[#1B302D]">
                <span className="text-[10px] text-[#7F9691] block capitalize">{key}</span>
                <span className="font-bold text-[#F0A51A] font-mono mt-0.5 block">
                  {scores[key].score}★
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Issues */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#B7C7C3] flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F0A51A]" />
            Detected Issues ({issues.length})
          </span>
          {issues.length === 0 ? (
            <p className="text-xs text-[#14B8A6] bg-[#0B302B] p-2.5 rounded-lg border border-[#0F766E]">
              ✓ No issues reported for this response.
            </p>
          ) : (
            <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
              {issues.map((i, idx) => (
                <div key={idx} className="bg-[#091513] p-2 rounded-lg border border-[#1B302D] text-xs flex items-center justify-between">
                  <span className="font-semibold text-[#EF4444]">{i.type}</span>
                  <span className="text-[10px] text-[#7F9691]">{i.severity} severity</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Preview */}
        {feedback.keyIssue && (
          <div className="bg-[#091513] p-3 rounded-xl border border-[#1B302D] space-y-1">
            <span className="text-[11px] text-[#7F9691] font-semibold block">Primary Issue Summary</span>
            <p className="text-xs text-[#F1F5F3] italic leading-snug">"{feedback.keyIssue}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1B302D]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#B7C7C3] hover:text-[#F1F5F3] hover:bg-[#10211F] transition-colors"
          >
            Go Back & Edit
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] shadow-md flex items-center gap-1.5 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Confirm & Record Submission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
