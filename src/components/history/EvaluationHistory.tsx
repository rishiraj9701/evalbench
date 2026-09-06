import React, { useState, useMemo } from 'react';
import type { EvaluationSubmission } from '../../types/eval';
import { DomainBadge, QABadge } from '../common/Badge';
import { Search, History, Download, Eye, X, FileText, Sparkles } from 'lucide-react';

interface EvaluationHistoryProps {
  submissions: EvaluationSubmission[];
}

export const EvaluationHistory: React.FC<EvaluationHistoryProps> = ({ submissions }) => {
  const [search, setSearch] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('All');
  const [selectedSub, setSelectedSub] = useState<EvaluationSubmission | null>(null);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesSearch =
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.taskId.toLowerCase().includes(search.toLowerCase()) ||
        s.taskPrompt.toLowerCase().includes(search.toLowerCase()) ||
        s.taskDomain.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        classificationFilter === 'All' || s.feedback.finalClassification === classificationFilter;

      return matchesSearch && matchesClass;
    });
  }, [submissions, search, classificationFilter]);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `evalbench_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const headers = ['Submission ID', 'Task ID', 'Domain', 'Model', 'Overall Score', 'Classification', 'Issues Count', 'Submitted Date'];
    const rows = submissions.map(s => [
      s.id,
      s.taskId,
      s.taskDomain,
      s.modelName,
      s.overallScore,
      `"${s.feedback.finalClassification}"`,
      s.issues.length,
      s.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `evalbench_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#F1F5F3] flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#F0A51A]" />
            Evaluation History & Data Export
          </h1>
          <p className="text-xs text-[#7F9691]">
            Audit history log of all past AI evaluations with full criterion inspector and export features.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2A403C] bg-[#10211F] hover:bg-[#172B28] text-xs font-semibold text-[#B7C7C3] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#7F9691]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] text-xs font-bold transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F9691]" />
          <input
            type="text"
            placeholder="Search evaluation ID, prompt, domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#091513] border border-[#1E3431] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#091513] border border-[#1B302D] px-3 py-1.5 rounded-xl text-xs text-[#B7C7C3]">
          <span className="text-[#7F9691]">Classification:</span>
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-[#0A1514]">All Classifications</option>
            <option value="Accept" className="bg-[#0A1514]">Accept</option>
            <option value="Accept with Minor Issues" className="bg-[#0A1514]">Accept with Minor Issues</option>
            <option value="Needs Revision" className="bg-[#0A1514]">Needs Revision</option>
            <option value="Reject" className="bg-[#0A1514]">Reject</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#091513] border-b border-[#1B302D] text-[11px] font-bold text-[#7F9691] uppercase tracking-wider">
                <th className="py-3.5 px-4">Eval ID</th>
                <th className="py-3.5 px-4">Task ID</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4 min-w-[260px]">Prompt Preview</th>
                <th className="py-3.5 px-4">Overall Score</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">QA Audit</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B302D]">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#7F9691]">
                    No completed evaluations match the search filter.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#132522] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#F0A51A]">{sub.id}</td>
                    <td className="py-3.5 px-4 font-mono text-[#B7C7C3]">{sub.taskId}</td>
                    <td className="py-3.5 px-4"><DomainBadge domain={sub.taskDomain} /></td>
                    <td className="py-3.5 px-4 text-[#F1F5F3] font-medium line-clamp-2">{sub.taskPrompt}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#F0A51A]">{sub.overallScore} / 5.0</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#F1F5F3]">{sub.feedback.finalClassification}</span>
                    </td>
                    <td className="py-3.5 px-4"><QABadge status={sub.qaStatus} /></td>
                    <td className="py-3.5 px-4 text-[#7F9691] font-mono text-[11px]">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10211F] hover:bg-[#172B28] text-[#F1F5F3] border border-[#2A403C] font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspector Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-[#07100F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#7F9691] hover:text-[#F1F5F3] hover:bg-[#10211F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#1B302D] pb-3">
              <Sparkles className="w-5 h-5 text-[#F0A51A]" />
              <div>
                <h3 className="text-base font-bold text-[#F1F5F3]">Evaluation Inspector — {selectedSub.id}</h3>
                <p className="text-xs text-[#7F9691]">Task {selectedSub.taskId} • Evaluator: {selectedSub.evaluatorName}</p>
              </div>
            </div>

            {/* Prompt */}
            <div className="bg-[#091513] p-4 rounded-xl border border-[#1B302D] space-y-1">
              <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Prompt</span>
              <p className="text-xs text-[#F1F5F3]">{selectedSub.taskPrompt}</p>
            </div>

            {/* AI Response */}
            <div className="bg-[#091513] p-4 rounded-xl border border-[#1B302D] space-y-1">
              <span className="text-[11px] text-[#7F9691] font-semibold uppercase">AI Response ({selectedSub.modelName})</span>
              <p className="text-xs text-[#B7C7C3] font-sans leading-relaxed whitespace-pre-wrap">{selectedSub.responseText}</p>
            </div>

            {/* Dimension Breakdown */}
            <div className="bg-[#091513] p-4 rounded-xl border border-[#1B302D] space-y-2">
              <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Individual Criterion Scores</span>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-[#10211F] p-2 rounded border border-[#1B302D]">
                  <span className="text-[10px] text-[#7F9691] block">Accuracy</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.scores.accuracy.score}★</span>
                </div>
                <div className="bg-[#10211F] p-2 rounded border border-[#1B302D]">
                  <span className="text-[10px] text-[#7F9691] block">Relevance</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.scores.relevance.score}★</span>
                </div>
                <div className="bg-[#10211F] p-2 rounded border border-[#1B302D]">
                  <span className="text-[10px] text-[#7F9691] block">Completeness</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.scores.completeness.score}★</span>
                </div>
                <div className="bg-[#10211F] p-2 rounded border border-[#1B302D]">
                  <span className="text-[10px] text-[#7F9691] block">Clarity</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.scores.clarity.score}★</span>
                </div>
                <div className="bg-[#10211F] p-2 rounded border border-[#1B302D]">
                  <span className="text-[10px] text-[#7F9691] block">Instruction</span>
                  <span className="font-bold text-[#F0A51A]">{selectedSub.scores.instructionFollowing.score}★</span>
                </div>
              </div>
            </div>

            {/* Annotated Issues with Evidence */}
            {selectedSub.issues.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#F1F5F3]">Annotated Response Issues ({selectedSub.issues.length})</span>
                {selectedSub.issues.map((i, idx) => (
                  <div key={idx} className="bg-[#091513] p-3 rounded-xl border border-[#1B302D] text-xs space-y-1">
                    <div className="flex justify-between font-semibold text-[#EF4444]">
                      <span>{i.type}</span>
                      <span>{i.severity} Severity</span>
                    </div>
                    {i.evidence && <p className="text-[#F0A51A] font-mono italic">"{i.evidence}"</p>}
                    <p className="text-[#B7C7C3]">{i.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
