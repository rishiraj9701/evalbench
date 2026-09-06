import React, { useState } from 'react';
import type {
  CriteriaScores,
  AnnotatedIssue,
  EvaluatorFeedback,
  FinalClassification
} from '../../types/eval';
import {
  Trash2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  FileCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface RightPanelProps {
  scores: CriteriaScores;
  setScores: React.Dispatch<React.SetStateAction<CriteriaScores>>;
  issues: AnnotatedIssue[];
  setIssues: React.Dispatch<React.SetStateAction<AnnotatedIssue[]>>;
  feedback: EvaluatorFeedback;
  setFeedback: React.Dispatch<React.SetStateAction<EvaluatorFeedback>>;
  annotatedEvidence?: string;
  setAnnotatedEvidence?: (ev: string) => void;
  onSubmitClick?: () => void;
}

const CRITERIA_DEFINITIONS = [
  {
    key: 'accuracy' as keyof CriteriaScores,
    title: 'Accuracy',
    descriptions: {
      1: 'Contains severe factual errors or hallucinations.',
      2: 'Multiple misleading claims or minor factual errors.',
      3: 'Mostly accurate; contains minor ambiguous details.',
      4: 'Factually sound with minor technical imprecision.',
      5: 'Factually flawless and completely trustworthy.'
    }
  },
  {
    key: 'relevance' as keyof CriteriaScores,
    title: 'Relevance',
    descriptions: {
      1: 'Completely off-topic or nonsensical.',
      2: 'Contains substantial filler or off-target paragraphs.',
      3: 'Mostly addresses prompt with minor tangents.',
      4: 'Directly addresses prompt with high focus.',
      5: 'Laser-focused on user intent without filler.'
    }
  },
  {
    key: 'completeness' as keyof CriteriaScores,
    title: 'Completeness',
    descriptions: {
      1: 'Omits almost all required details.',
      2: 'Leaves major sub-questions unanswered.',
      3: 'Answers core prompt but misses subtle sub-parts.',
      4: 'Thorough answer covering almost all requirements.',
      5: 'Exhaustive and complete coverage.'
    }
  },
  {
    key: 'clarity' as keyof CriteriaScores,
    title: 'Clarity',
    descriptions: {
      1: 'Incoherent, poorly structured, or confusing.',
      2: 'Awkward phrasing and poor readability.',
      3: 'Readable with minor stylistic awkwardness.',
      4: 'Clean typography, concise, and structured.',
      5: 'Exceptional articulation and effortless reading.'
    }
  },
  {
    key: 'instructionFollowing' as keyof CriteriaScores,
    title: 'Instruction Following',
    descriptions: {
      1: 'Violates core format or negative constraints.',
      2: 'Misses multiple explicit formatting directives.',
      3: 'Followed most constraints; missed 1 minor instruction.',
      4: 'Adhered to almost all prompt requirements.',
      5: 'Flawlessly satisfied every constraint and rule.'
    }
  }
];

const FINAL_CLASSIFICATIONS: FinalClassification[] = [
  'Accept',
  'Accept with Minor Issues',
  'Needs Revision',
  'Reject'
];

export const RightPanel: React.FC<RightPanelProps> = ({
  scores,
  setScores,
  issues,
  setIssues,
  feedback,
  setFeedback
}) => {
  const [activeCommentKey, setActiveCommentKey] = useState<keyof CriteriaScores | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<{ [key: string]: boolean }>({});

  const scoreKeys = Object.keys(scores) as (keyof CriteriaScores)[];
  const totalScoreSum = scoreKeys.reduce((acc, k) => acc + scores[k].score, 0);
  const overallScore = Number((totalScoreSum / scoreKeys.length).toFixed(1));

  const handleRatingChange = (key: keyof CriteriaScores, rating: number) => {
    setScores((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        score: rating
      }
    }));
  };

  const handleCommentChange = (key: keyof CriteriaScores, comment: string) => {
    setScores((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        comment
      }
    }));
  };

  const handleRemoveIssue = (id: string) => {
    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleIssueExpand = (id: string) => {
    setExpandedIssues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      {/* Response Quality Header & Analytical Score Meter */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1B302D]">
        <div>
          <h2 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F0A51A]" />
            Response Quality Matrix
          </h2>
          <p className="text-[11px] text-[#7F9691]">Rate dimensions on 1-5 scale</p>
        </div>

        {/* Analytical Overall Score Badge */}
        <div className="bg-[#091513] border border-[#1B302D] px-3.5 py-1.5 rounded-xl flex items-center gap-3 shadow-inner">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#7F9691] font-mono uppercase font-bold">Overall Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#F0A51A] font-mono leading-none">{overallScore}</span>
              <span className="text-[10px] text-[#7F9691] font-mono">/ 5.0</span>
            </div>
          </div>
          <span className="text-[10px] bg-[#0B302B] text-[#14B8A6] border border-[#0F766E] px-2 py-0.5 rounded font-mono font-semibold">
            High Confidence
          </span>
        </div>
      </div>

      {/* Compact Quality Scoring Matrix */}
      <div className="space-y-3">
        {CRITERIA_DEFINITIONS.map((c) => {
          const currentScore = scores[c.key].score;
          const currentDesc = c.descriptions[currentScore as keyof typeof c.descriptions];
          const hasComment = activeCommentKey === c.key || !!scores[c.key].comment;

          return (
            <div
              key={c.key}
              className="bg-[#091513] border border-[#1B302D] rounded-xl p-3 space-y-2 transition-all hover:border-[#233B37]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F1F5F3]">{c.title}</span>

                {/* Rating 1-5 Pills */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(c.key, star)}
                      className={`w-6 h-6 rounded-md text-xs font-mono font-bold transition-all ${
                        star <= currentScore
                          ? 'bg-[#342707] text-[#F0A51A] border border-[#8A5A00]'
                          : 'bg-[#10211F] text-[#536A65] hover:text-[#B7C7C3] border border-[#1B302D]'
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scoring Explanation */}
              <p className="text-[11px] text-[#7F9691] italic bg-[#0D1A18] p-2 rounded border border-[#1B302D]">
                "{currentDesc}"
              </p>

              {/* Optional Comment Toggle & Input */}
              {hasComment ? (
                <input
                  type="text"
                  placeholder={`Comment on ${c.title.toLowerCase()}...`}
                  value={scores[c.key].comment}
                  onChange={(e) => handleCommentChange(c.key, e.target.value)}
                  className="w-full bg-[#10211F] border border-[#1B302D] rounded-lg px-2.5 py-1 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveCommentKey(c.key)}
                  className="text-[10px] text-[#D98A00] hover:underline"
                >
                  + Add comment
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Issues Detected Summary Section */}
      <div className="pt-2 border-t border-[#1B302D] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F0A51A]" />
            <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
              Issues Detected ({issues.length})
            </h3>
          </div>
        </div>

        {issues.length === 0 ? (
          <p className="text-xs text-[#7F9691] italic bg-[#091513] p-3 rounded-xl border border-[#1B302D]">
            No issues flagged yet. Select text in the AI response to annotate specific errors.
          </p>
        ) : (
          <div className="space-y-2">
            {issues.map((iss) => {
              const isExpanded = !!expandedIssues[iss.id];
              return (
                <div
                  key={iss.id}
                  className="bg-[#091513] border border-[#1B302D] rounded-xl p-3 space-y-1.5 transition-all"
                >
                  <div
                    onClick={() => toggleIssueExpand(iss.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#EF4444]">{iss.type}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          iss.severity === 'Critical'
                            ? 'bg-[#351516] text-[#EF4444] border border-[#801B1B]'
                            : iss.severity === 'High'
                            ? 'bg-[#341B07] text-[#D45D35] border border-[#8A3A00]'
                            : 'bg-[#10211F] text-[#B7C7C3]'
                        }`}
                      >
                        {iss.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveIssue(iss.id);
                        }}
                        className="text-[#7F9691] hover:text-[#EF4444] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#7F9691]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#7F9691]" />}
                    </div>
                  </div>

                  {iss.evidence && (
                    <p className="text-[11px] text-[#F0A51A] font-mono bg-[#10211F] p-1.5 rounded border border-[#8A5A00]/40 line-clamp-1">
                      "{iss.evidence}"
                    </p>
                  )}

                  {isExpanded && (
                    <p className="text-xs text-[#B7C7C3] pt-1 leading-snug">{iss.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Evaluator Written Feedback Section */}
      <div className="pt-2 border-t border-[#1B302D] space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#F0A51A]" />
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
            Evaluator Feedback & Decision
          </h3>
        </div>

        {/* Well Done */}
        <div>
          <label className="text-[11px] text-[#B7C7C3] font-medium mb-1 flex items-center justify-between">
            <span>What was done well?</span>
            <span className="text-[10px] text-[#7F9691]">{feedback.wellDone.length} chars</span>
          </label>
          <textarea
            rows={2}
            placeholder="Highlight positive aspects..."
            value={feedback.wellDone}
            onChange={(e) => setFeedback((prev) => ({ ...prev, wellDone: e.target.value }))}
            className="w-full bg-[#091513] border border-[#1E3431] rounded-xl p-2.5 text-xs text-[#F1F5F3] placeholder:text-[#667E79] focus:outline-none focus:border-[#D98A00]"
          />
        </div>

        {/* Could Improve */}
        <div>
          <label className="text-[11px] text-[#B7C7C3] font-medium mb-1 flex items-center justify-between">
            <span>What could be improved?</span>
            <span className="text-[10px] text-[#7F9691]">{feedback.couldImprove.length} chars</span>
          </label>
          <textarea
            rows={2}
            placeholder="Constructive improvements needed..."
            value={feedback.couldImprove}
            onChange={(e) => setFeedback((prev) => ({ ...prev, couldImprove: e.target.value }))}
            className="w-full bg-[#091513] border border-[#1E3431] rounded-xl p-2.5 text-xs text-[#F1F5F3] placeholder:text-[#667E79] focus:outline-none focus:border-[#D98A00]"
          />
        </div>

        {/* Segmented Final Classification Control */}
        <div>
          <label className="text-[11px] text-[#F1F5F3] font-bold mb-1.5 block">
            Final Classification
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FINAL_CLASSIFICATIONS.map((cls) => {
              const isSelected = feedback.finalClassification === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setFeedback((prev) => ({ ...prev, finalClassification: cls }))}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? cls === 'Accept'
                        ? 'bg-[#0B302B] border-[#0F766E] text-[#14B8A6]'
                        : cls === 'Accept with Minor Issues'
                        ? 'bg-[#342707] border-[#8A5A00] text-[#F0A51A]'
                        : cls === 'Needs Revision'
                        ? 'bg-[#341B07] border-[#8A3A00] text-[#D45D35]'
                        : 'bg-[#351516] border-[#801B1B] text-[#EF4444]'
                      : 'bg-[#091513] border-[#1B302D] text-[#B7C7C3] hover:bg-[#10211F]'
                  }`}
                >
                  <span className="truncate">{cls}</span>
                  {isSelected && <FileCheck className="w-3.5 h-3.5 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
