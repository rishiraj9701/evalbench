import React, { useState, useEffect } from 'react';
import type { Task, CriteriaScores, AnnotatedIssue, EvaluatorFeedback } from '../../types/eval';
import { LeftPanel } from './LeftPanel';
import { CenterPanel } from './CenterPanel';
import { RightPanel } from './RightPanel';
import { SubmissionModal } from './SubmissionModal';
import { submitEvaluation } from '../../services/storageService';
import { CheckCircle2, Send, Save, Check } from 'lucide-react';

interface EvaluationWorkspaceProps {
  task: Task;
  onEvaluationSubmitted: () => void;
  onGoToQueue: () => void;
}

const DEFAULT_SCORES: CriteriaScores = {
  accuracy: { score: 4, comment: '' },
  relevance: { score: 5, comment: '' },
  completeness: { score: 4, comment: '' },
  clarity: { score: 5, comment: '' },
  instructionFollowing: { score: 4, comment: '' }
};

const DEFAULT_FEEDBACK: EvaluatorFeedback = {
  wellDone: '',
  couldImprove: '',
  keyIssue: '',
  finalClassification: 'Accept with Minor Issues'
};

export const EvaluationWorkspace: React.FC<EvaluationWorkspaceProps> = ({
  task,
  onEvaluationSubmitted,
  onGoToQueue
}) => {
  const [scores, setScores] = useState<CriteriaScores>(DEFAULT_SCORES);
  const [issues, setIssues] = useState<AnnotatedIssue[]>([]);
  const [feedback, setFeedback] = useState<EvaluatorFeedback>(DEFAULT_FEEDBACK);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isSuccessState, setIsSuccessState] = useState<boolean>(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Reset form state when task changes
  useEffect(() => {
    setScores(DEFAULT_SCORES);
    setIssues([]);
    setFeedback(DEFAULT_FEEDBACK);
    setIsSuccessState(false);
  }, [task.id]);

  const handleAddIssue = (newIssue: AnnotatedIssue) => {
    setIssues((prev) => [...prev, newIssue]);
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleConfirmSubmit = () => {
    const scoreKeys = Object.keys(scores) as (keyof CriteriaScores)[];
    const overallScore = Number(
      (scoreKeys.reduce((acc, k) => acc + scores[k].score, 0) / scoreKeys.length).toFixed(1)
    );

    submitEvaluation(task.id, {
      taskId: task.id,
      taskPrompt: task.prompt,
      taskDomain: task.domain,
      taskDifficulty: task.difficulty,
      modelName: task.response.modelName,
      responseId: task.response.id,
      responseText: task.response.text,
      scores,
      overallScore,
      issues,
      feedback,
      evaluatorName: 'Raghav (AI Data Specialist)'
    });

    setIsSubmitModalOpen(false);
    setIsSuccessState(true);
    onEvaluationSubmitted();
  };

  // Calculate completion percentage
  const completedSections =
    (scores.accuracy.score ? 1 : 0) +
    (scores.relevance.score ? 1 : 0) +
    (scores.completeness.score ? 1 : 0) +
    (scores.clarity.score ? 1 : 0) +
    (scores.instructionFollowing.score ? 1 : 0) +
    (feedback.finalClassification ? 1 : 0);
  const completionPercentage = Math.round((completedSections / 6) * 100);

  if (isSuccessState) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-3xl p-8 max-w-lg w-full shadow-2xl flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B302B] border border-[#0F766E] flex items-center justify-center text-[#14B8A6] shadow-xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-[#F1F5F3]">Evaluation Submission Completed</h2>
          <p className="text-xs text-[#B7C7C3] leading-relaxed max-w-md">
            Evaluation for <span className="font-mono text-[#F0A51A] font-semibold">{task.id}</span> has been logged to LocalStorage, analytics metrics updated, and routed to Quality Assurance.
          </p>

          <div className="flex items-center gap-3 mt-3 w-full">
            <button
              onClick={() => setIsSuccessState(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#2A403C] bg-[#10211F] text-xs font-semibold text-[#B7C7C3] hover:bg-[#172B28] transition-colors"
            >
              Review Task
            </button>
            <button
              onClick={onGoToQueue}
              className="flex-1 py-2.5 rounded-xl bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] text-xs font-bold transition-all shadow-md"
            >
              Queue Next Task
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 p-4 md:p-6 flex flex-col gap-6">
      {/* 3-Column Layout Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column - Task Context & Directives (3 cols) */}
        <div className="lg:col-span-3">
          <LeftPanel task={task} />
        </div>

        {/* Center Column - Hero AI Response & Text Annotator (5 cols) */}
        <div className="lg:col-span-5">
          <CenterPanel
            response={task.response}
            issues={issues}
            onAddIssue={handleAddIssue}
            onQuickReportIssue={() =>
              handleAddIssue({
                id: `iss-${Date.now()}`,
                type: 'Factual Error',
                severity: 'Medium',
                explanation: 'Reported issue on response content.',
                evidence: task.response.text.slice(0, 80)
              })
            }
          />
        </div>

        {/* Right Column - Scoring Matrix & Decision (4 cols) */}
        <div className="lg:col-span-4">
          <RightPanel
            scores={scores}
            setScores={setScores}
            issues={issues}
            setIssues={setIssues}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </div>
      </div>

      {/* Sticky Bottom Submission Bar */}
      <div className="fixed bottom-0 right-0 left-0 bg-[#0A1514] border-t border-[#1B302D] z-20 px-6 py-3 flex items-center justify-between shadow-2xl">
        {/* Left: Progress & Auto-Save Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#B7C7C3] gap-2">
              <span>Evaluation Progress</span>
              <span className="font-bold text-[#F0A51A]">{completionPercentage}%</span>
            </div>
            <div className="w-36 h-1.5 bg-[#091513] border border-[#1B302D] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#D98A00] rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-[#7F9691] font-mono hidden sm:inline">
            Saved just now
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#2A403C] bg-[#10211F] hover:bg-[#172B28] text-[#B7C7C3] text-xs font-semibold transition-colors"
          >
            {draftSaved ? <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> : <Save className="w-3.5 h-3.5 text-[#7F9691]" />}
            <span>{draftSaved ? 'Draft Saved' : 'Save Draft'}</span>
          </button>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] font-bold text-xs shadow-md transition-all active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Evaluation</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <SubmissionModal
        task={task}
        scores={scores}
        issues={issues}
        feedback={feedback}
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
      />
    </div>
  );
};
