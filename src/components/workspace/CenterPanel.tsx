import React, { useState, useRef } from 'react';
import type { AIResponse, IssueType, SeverityLevel, AnnotatedIssue } from '../../types/eval';
import { Copy, Check, Maximize2, Flag, Sparkles, Clock, FileText, Cpu, X, Plus } from 'lucide-react';

interface CenterPanelProps {
  response: AIResponse;
  issues?: AnnotatedIssue[];
  onAddIssue: (issue: AnnotatedIssue) => void;
  onQuickReportIssue?: () => void;
}

const QUICK_ISSUE_TYPES: IssueType[] = [
  'Factual Error',
  'Logical Error',
  'Missing Information',
  'Hallucination',
  'Instruction Violation',
  'Irrelevant Information',
  'Grammatical/Language Issue'
];

const SEVERITY_LEVELS: SeverityLevel[] = ['Low', 'Medium', 'High', 'Critical'];

export const CenterPanel: React.FC<CenterPanelProps> = ({
  response,
  onAddIssue,
  onQuickReportIssue
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Selection floating toolbar state
  const [selectionRange, setSelectionRange] = useState<{ text: string; x: number; y: number } | null>(null);
  
  // Annotation popover state
  const [annotationForm, setAnnotationForm] = useState<{
    isOpen: boolean;
    type: IssueType;
    severity: SeverityLevel;
    evidence: string;
    note: string;
  }>({
    isOpen: false,
    type: 'Factual Error',
    severity: 'Medium',
    evidence: '',
    note: ''
  });

  const responseCardRef = useRef<HTMLDivElement>(null);

  const handleCopyText = () => {
    navigator.clipboard.writeText(response.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionRange(null);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length >= 3) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = responseCardRef.current?.getBoundingClientRect();

      if (containerRect) {
        setSelectionRange({
          text: selectedText,
          x: Math.max(80, rect.left - containerRect.left + rect.width / 2),
          y: Math.max(30, rect.top - containerRect.top - 45)
        });
      }
    } else {
      setSelectionRange(null);
    }
  };

  const handleSelectQuickTag = (issueType: IssueType) => {
    if (!selectionRange) return;
    setAnnotationForm({
      isOpen: true,
      type: issueType,
      severity: 'Medium',
      evidence: selectionRange.text,
      note: ''
    });
    setSelectionRange(null);
  };

  const handleSaveAnnotation = () => {
    if (!annotationForm.evidence) return;

    const newIssue: AnnotatedIssue = {
      id: `iss-${Date.now()}`,
      type: annotationForm.type,
      severity: annotationForm.severity,
      explanation: annotationForm.note || `Annotated ${annotationForm.type} on response snippet.`,
      evidence: annotationForm.evidence
    };

    onAddIssue(newIssue);

    setAnnotationForm({
      isOpen: false,
      type: 'Factual Error',
      severity: 'Medium',
      evidence: '',
      note: ''
    });

    window.getSelection()?.removeAllRanges();
  };

  const formattedTimestamp = new Date(response.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const estimatedTokens = Math.round(response.wordCount * 1.35);

  return (
    <div
      ref={responseCardRef}
      className="relative bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-6 flex flex-col gap-4 shadow-xl transition-all"
    >
      {/* Response Header & Metadata */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1B302D] flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#10211F] border border-[#233B37] px-3 py-1 rounded-lg">
            <Cpu className="w-3.5 h-3.5 text-[#D98A00]" />
            <span className="font-semibold text-xs text-[#F1F5F3]">{response.modelName}</span>
          </div>
          <span className="font-mono text-xs text-[#7F9691] bg-[#091513] px-2 py-0.5 rounded border border-[#1B302D]">
            {response.id}
          </span>
        </div>

        {/* Reading Metrics & Quick Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#7F9691] font-mono">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#536A65]" />
              {response.wordCount} words
            </span>
            <span>•</span>
            <span>~{estimatedTokens} tokens</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#536A65]" />
              {formattedTimestamp}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-[#1B302D]">
            <button
              onClick={handleCopyText}
              className="p-1.5 rounded-lg text-[#7F9691] hover:text-[#F0A51A] hover:bg-[#10211F] transition-colors"
              title="Copy text"
            >
              {copied ? <Check className="w-4 h-4 text-[#14B8A6]" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-lg text-[#7F9691] hover:text-[#F0A51A] hover:bg-[#10211F] transition-colors"
              title="Expand focus reader"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            {onQuickReportIssue && (
              <button
                onClick={onQuickReportIssue}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#351516] border border-[#801B1B] text-[#EF4444] hover:bg-[#4D1C1E] text-xs transition-colors font-medium"
              >
                <Flag className="w-3 h-3 text-[#EF4444]" />
                <span>Report Issue</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Text Selection Annotation Toolbar */}
      {selectionRange && (
        <div
          style={{
            left: `${selectionRange.x}px`,
            top: `${selectionRange.y}px`,
            transform: 'translateX(-50%)'
          }}
          className="absolute z-30 bg-[#132522] border border-[#8A5A00] text-[#F1F5F3] text-xs p-1.5 rounded-xl shadow-2xl flex items-center gap-1 animate-fade-in"
        >
          <span className="text-[10px] text-[#F0A51A] font-bold uppercase px-2 font-mono border-r border-[#1B302D]">
            Annotate:
          </span>
          {QUICK_ISSUE_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => handleSelectQuickTag(t)}
              className="px-2 py-1 rounded hover:bg-[#342707] text-[11px] text-[#F1F5F3] transition-colors whitespace-nowrap"
            >
              {t.replace(' Information', '').replace('Grammatical/', '')}
            </button>
          ))}
        </div>
      )}

      {/* Main AI Response Reading Interface */}
      <div
        onMouseUp={handleMouseUp}
        className="bg-[#081311] border border-[#1B302D] rounded-xl p-6 text-[#F1F5F3] text-[16px] leading-[1.75] whitespace-pre-wrap select-text selection:bg-[#4A350D] min-h-[300px] max-h-[550px] overflow-y-auto font-sans shadow-inner"
      >
        {response.text}
      </div>

      {/* Annotation Popover Modal */}
      {annotationForm.isOpen && (
        <div className="bg-[#132522] border border-[#8A5A00] rounded-xl p-4 space-y-3 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F0A51A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F0A51A]" />
              Attach Annotated Issue
            </span>
            <button
              onClick={() => setAnnotationForm({ ...annotationForm, isOpen: false })}
              className="text-[#7F9691] hover:text-[#F1F5F3] text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#091513] p-2.5 rounded-lg border border-[#1B302D] text-xs text-[#F0A51A] font-mono italic line-clamp-2">
            "{annotationForm.evidence}"
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#B7C7C3] font-medium mb-1 block">Issue Type</label>
              <select
                value={annotationForm.type}
                onChange={(e) => setAnnotationForm({ ...annotationForm, type: e.target.value as IssueType })}
                className="w-full bg-[#091513] border border-[#1E3431] rounded-lg px-2.5 py-1.5 text-xs text-[#F1F5F3] focus:outline-none"
              >
                {QUICK_ISSUE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#B7C7C3] font-medium mb-1 block">Severity</label>
              <div className="grid grid-cols-4 gap-1">
                {SEVERITY_LEVELS.map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setAnnotationForm({ ...annotationForm, severity: sev })}
                    className={`py-1 rounded text-[11px] font-medium border transition-colors ${
                      annotationForm.severity === sev
                        ? 'bg-[#342707] text-[#F0A51A] border-[#8A5A00]'
                        : 'bg-[#091513] border-[#1B302D] text-[#7F9691] hover:bg-[#10211F]'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-[#B7C7C3] font-medium mb-1 block">Evaluator Explanation</label>
            <input
              type="text"
              placeholder="Explain why this snippet constitutes an issue..."
              value={annotationForm.note}
              onChange={(e) => setAnnotationForm({ ...annotationForm, note: e.target.value })}
              className="w-full bg-[#091513] border border-[#1E3431] rounded-lg px-3 py-1.5 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
            />
          </div>

          <button
            onClick={handleSaveAnnotation}
            className="w-full bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save Issue Annotation</span>
          </button>
        </div>
      )}

      {/* Fullscreen Reading Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#07100F]/90 backdrop-blur-md p-6 sm:p-12 flex flex-col justify-center items-center animate-fade-in">
          <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl max-w-4xl w-full h-[85vh] p-6 flex flex-col gap-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#1B302D] pb-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#F1F5F3] text-base">{response.modelName}</span>
                <span className="text-xs text-[#7F9691] font-mono">({response.id})</span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg text-[#7F9691] hover:text-[#F1F5F3] hover:bg-[#10211F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto text-[#F1F5F3] text-lg leading-relaxed whitespace-pre-wrap p-6 bg-[#081311] rounded-xl border border-[#1B302D]">
              {response.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
