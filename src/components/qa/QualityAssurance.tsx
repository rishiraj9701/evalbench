import React, { useState } from 'react';
import type { EvaluationSubmission, QAStatus } from '../../types/eval';
import { updateQAReviewStatus } from '../../services/storageService';
import { ShieldCheck, CheckCircle2, RotateCcw, Flag, MessageSquare, Sparkles } from 'lucide-react';

interface QualityAssuranceProps {
  submissions: EvaluationSubmission[];
  onSubmissionsUpdated: () => void;
}

export const QualityAssurance: React.FC<QualityAssuranceProps> = ({
  submissions,
  onSubmissionsUpdated
}) => {
  const [selectedSub, setSelectedSub] = useState<EvaluationSubmission | null>(
    submissions.find((s) => s.qaStatus === 'Pending') || submissions[0] || null
  );
  const [reviewerComment, setReviewerComment] = useState('');

  const pendingCount = submissions.filter((s) => s.qaStatus === 'Pending').length;
  const approvedCount = submissions.filter((s) => s.qaStatus === 'Approved').length;
  const reEvalCount = submissions.filter((s) => s.qaStatus === 'Re-evaluation Required').length;
  const flaggedCount = submissions.filter((s) => s.qaStatus === 'Flagged').length;

  const handleAction = (status: QAStatus) => {
    if (!selectedSub) return;

    updateQAReviewStatus(selectedSub.id, status, reviewerComment);
    setReviewerComment('');
    onSubmissionsUpdated();

    const remainingPending = submissions.filter(
      (s) => s.id !== selectedSub.id && s.qaStatus === 'Pending'
    );
    if (remainingPending.length > 0) {
      setSelectedSub(remainingPending[0]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#F1F5F3] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F0A51A]" />
            Quality Assurance & Audit Portal
          </h1>
          <p className="text-xs text-[#7F9691]">
            Senior review workflow for auditing evaluator scores, issue tags, and written feedback consistency.
          </p>
        </div>

        {/* QA Summary Metric Counters */}
        <div className="flex items-center gap-2">
          <div className="bg-[#342707] border border-[#8A5A00] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs text-[#F0A51A]">
            <span>Pending Review:</span>
            <span className="font-bold font-mono">{pendingCount}</span>
          </div>
          <div className="bg-[#0B302B] border border-[#0F766E] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs text-[#14B8A6]">
            <span>Approved:</span>
            <span className="font-bold font-mono">{approvedCount}</span>
          </div>
          <div className="bg-[#351516] border border-[#801B1B] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs text-[#EF4444]">
            <span>Re-eval Req:</span>
            <span className="font-bold font-mono">{reEvalCount}</span>
          </div>
          <div className="bg-[#201535] border border-[#4C2A80] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs text-[#8B5CF6]">
            <span>Flagged:</span>
            <span className="font-bold font-mono">{flaggedCount}</span>
          </div>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-12 text-center text-[#7F9691] space-y-2">
          <Sparkles className="w-8 h-8 text-[#536A65] mx-auto" />
          <p className="text-sm font-semibold text-[#F1F5F3]">No Submitted Evaluations Yet</p>
          <p className="text-xs">Complete an evaluation in the Workspace to initiate QA audit reviews.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submissions List Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 space-y-3 h-[75vh] flex flex-col">
            <h3 className="text-xs font-bold text-[#7F9691] uppercase tracking-wider px-1">
              Submitted Queue ({submissions.length})
            </h3>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {submissions.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-[#342707] border-[#8A5A00] text-[#F0A51A] shadow-md'
                        : 'bg-[#091513] border-[#1B302D] hover:bg-[#10211F]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#F0A51A]">{sub.id}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          sub.qaStatus === 'Approved'
                            ? 'bg-[#0B302B] text-[#14B8A6] border border-[#0F766E]'
                            : sub.qaStatus === 'Pending'
                            ? 'bg-[#342707] text-[#F0A51A] border border-[#8A5A00]'
                            : sub.qaStatus === 'Re-evaluation Required'
                            ? 'bg-[#351516] text-[#EF4444] border border-[#801B1B]'
                            : 'bg-[#201535] text-[#8B5CF6] border border-[#4C2A80]'
                        }`}
                      >
                        {sub.qaStatus}
                      </span>
                    </div>

                    <p className="text-xs text-[#F1F5F3] line-clamp-1 font-medium">{sub.taskPrompt}</p>

                    <div className="flex items-center justify-between text-[11px] text-[#7F9691] font-mono pt-1">
                      <span>Score: {sub.overallScore}★</span>
                      <span>{sub.taskDomain}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audit Inspector & Action Workspace (8 cols) */}
          {selectedSub && (
            <div className="lg:col-span-8 bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-6 flex flex-col gap-5 h-[75vh] overflow-y-auto">
              {/* Submission Info Bar */}
              <div className="flex items-center justify-between border-b border-[#1B302D] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#F0A51A]">{selectedSub.id}</span>
                    <span className="text-xs text-[#7F9691]">({selectedSub.taskId})</span>
                  </div>
                  <p className="text-xs text-[#7F9691]">
                    Evaluator: <strong className="text-[#F1F5F3]">{selectedSub.evaluatorName}</strong> • {new Date(selectedSub.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#091513] border border-[#1B302D] px-3.5 py-1.5 rounded-xl font-mono text-xs">
                  <span className="text-[#7F9691]">Overall Score:</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.overallScore} / 5.0</span>
                </div>
              </div>

              {/* Original Prompt */}
              <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Original Task Prompt</span>
                <p className="text-xs text-[#F1F5F3] leading-relaxed">{selectedSub.taskPrompt}</p>
              </div>

              {/* AI Response Preview */}
              <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] text-[#7F9691] font-semibold uppercase">
                  AI Response ({selectedSub.modelName})
                </span>
                <p className="text-xs text-[#B7C7C3] font-sans leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedSub.responseText}
                </p>
              </div>

              {/* Scores & Detected Issues Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Evaluator Scores */}
                <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-3.5 space-y-2">
                  <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Evaluator Dimension Scores</span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#B7C7C3]">
                      <span>Accuracy:</span> <span className="font-bold text-[#F0A51A]">{selectedSub.scores.accuracy.score}★</span>
                    </div>
                    <div className="flex justify-between text-[#B7C7C3]">
                      <span>Relevance:</span> <span className="font-bold text-[#F0A51A]">{selectedSub.scores.relevance.score}★</span>
                    </div>
                    <div className="flex justify-between text-[#B7C7C3]">
                      <span>Completeness:</span> <span className="font-bold text-[#F0A51A]">{selectedSub.scores.completeness.score}★</span>
                    </div>
                    <div className="flex justify-between text-[#B7C7C3]">
                      <span>Clarity:</span> <span className="font-bold text-[#F0A51A]">{selectedSub.scores.clarity.score}★</span>
                    </div>
                    <div className="flex justify-between text-[#B7C7C3]">
                      <span>Instruction Following:</span> <span className="font-bold text-[#F0A51A]">{selectedSub.scores.instructionFollowing.score}★</span>
                    </div>
                  </div>
                </div>

                {/* Annotated Issues */}
                <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-3.5 space-y-2">
                  <span className="text-[11px] text-[#7F9691] font-semibold uppercase">
                    Annotated Issues ({selectedSub.issues.length})
                  </span>
                  {selectedSub.issues.length === 0 ? (
                    <p className="text-xs text-[#14B8A6] italic">No issues detected by evaluator.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {selectedSub.issues.map((i, idx) => (
                        <div key={idx} className="bg-[#10211F] p-2 rounded border border-[#1B302D] text-[11px] space-y-0.5">
                          <div className="flex justify-between font-semibold text-[#EF4444]">
                            <span>{i.type}</span>
                            <span>{i.severity}</span>
                          </div>
                          {i.evidence && <p className="text-[#F0A51A] font-mono italic text-[10px]">"{i.evidence}"</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Written Feedback Summary */}
              <div className="bg-[#091513] border border-[#1B302D] rounded-xl p-3.5 space-y-2">
                <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Written Evaluator Summary</span>
                <div className="text-xs text-[#B7C7C3] space-y-1">
                  {selectedSub.feedback.wellDone && <p><strong>Well Done:</strong> {selectedSub.feedback.wellDone}</p>}
                  {selectedSub.feedback.couldImprove && <p><strong>Needs Improvement:</strong> {selectedSub.feedback.couldImprove}</p>}
                  {selectedSub.feedback.keyIssue && <p><strong>Key Issue:</strong> {selectedSub.feedback.keyIssue}</p>}
                </div>
              </div>

              {/* Reviewer Comment & Action Controls */}
              <div className="mt-auto pt-4 border-t border-[#1B302D] space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#F0A51A]" />
                  <span className="text-xs font-bold text-[#F1F5F3]">Senior QA Reviewer Notes</span>
                </div>

                <input
                  type="text"
                  placeholder="Add optional auditor feedback or justification..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full bg-[#091513] border border-[#1E3431] rounded-xl px-3 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
                />

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => handleAction('Flagged')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#201535] border border-[#4C2A80] text-[#8B5CF6] hover:bg-[#2D1D4A] text-xs font-semibold transition-colors"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Flag Evaluation</span>
                  </button>

                  <button
                    onClick={() => handleAction('Re-evaluation Required')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#351516] border border-[#801B1B] text-[#EF4444] hover:bg-[#4D1C1E] text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Request Re-evaluation</span>
                  </button>

                  <button
                    onClick={() => handleAction('Approved')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#07100F] font-bold text-xs transition-all shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Submission</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
