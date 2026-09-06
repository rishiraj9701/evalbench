import React, { useState } from 'react';
import type { Task, EvaluationSubmission } from '../../types/eval';
import { calculateAnalyticsSummary } from '../../services/storageService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Award,
  ShieldCheck,
  Eye,
  X
} from 'lucide-react';

interface AnalyticsDashboardProps {
  tasks: Task[];
  submissions: EvaluationSubmission[];
}

const COLORS = ['#D98A00', '#14B8A6', '#D97706', '#E0527A', '#65A30D', '#0EA5A4', '#8B5CF6'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ tasks, submissions }) => {
  const [inspectSubmission, setInspectSubmission] = useState<EvaluationSubmission | null>(null);

  const analytics = calculateAnalyticsSummary(tasks, submissions);

  // Chart Data 1: Score by Criterion
  const criteriaData = [
    { name: 'Accuracy', score: analytics.criteriaAverages.accuracy },
    { name: 'Relevance', score: analytics.criteriaAverages.relevance },
    { name: 'Completeness', score: analytics.criteriaAverages.completeness },
    { name: 'Clarity', score: analytics.criteriaAverages.clarity },
    { name: 'Instruction', score: analytics.criteriaAverages.instructionFollowing }
  ];

  // Chart Data 2: Issue Distribution
  const issuePieData = Object.entries(analytics.issueDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Chart Data 3: Domain Distribution
  const domainBarData = Object.entries(analytics.domainDistribution).map(([domain, count]) => ({
    domain: domain.replace('Knowledge', 'Knowl.'),
    count
  }));

  // Chart Data 4: Daily Volume Trend
  const timeVolumeData = [
    { date: 'Sep 1', count: 2 },
    { date: 'Sep 2', count: 4 },
    { date: 'Sep 3', count: 3 },
    { date: 'Sep 4', count: 5 },
    { date: 'Sep 5', count: 8 },
    { date: 'Sep 6', count: submissions.length }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#F1F5F3] flex items-center gap-2.5">
          <Award className="w-5 h-5 text-[#F0A51A]" />
          Evaluation Analytics & Operational Insights
        </h1>
        <p className="text-xs text-[#7F9691]">
          Real-time metrics, criterion score distributions, and quality assurance audit tracking.
        </p>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Evaluations */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Total Evaluated</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#F1F5F3] font-mono">{analytics.totalEvaluations}</span>
            <span className="text-[10px] text-[#14B8A6] font-semibold">+100% active</span>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Completed Tasks</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#F0A51A] font-mono">{analytics.completedTasks}</span>
            <span className="text-[10px] text-[#7F9691] font-mono">/ {tasks.length} total</span>
          </div>
        </div>

        {/* Avg Quality Score */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Avg Quality Score</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#F0A51A] font-mono">{analytics.avgQualityScore}</span>
            <span className="text-[10px] text-[#7F9691] font-mono">/ 5.0</span>
          </div>
        </div>

        {/* Issues Detected */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Issues Flagged</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#EF4444] font-mono">{analytics.totalIssuesDetected}</span>
            <span className="text-[10px] text-[#EF4444] font-semibold">Annotated</span>
          </div>
        </div>

        {/* Accuracy Rate */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">Accuracy Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#14B8A6] font-mono">{analytics.accuracyRate}%</span>
            <span className="text-[10px] text-[#14B8A6] font-semibold">Benchmark</span>
          </div>
        </div>

        {/* Needs Review */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] text-[#7F9691] font-semibold uppercase">QA Pending</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#F0A51A] font-mono">{analytics.needsReviewCount}</span>
            <span className="text-[10px] text-[#F0A51A] font-semibold font-mono">In Queue</span>
          </div>
        </div>
      </div>

      {/* 4 Main Recharts Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Evaluation Volume over Time */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
            Evaluation Volume Trend
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeVolumeData}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D98A00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D98A00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#7F9691" fontSize={11} />
                <YAxis stroke="#7F9691" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#091513', borderColor: '#1B302D', borderRadius: '8px', fontSize: '12px', color: '#F1F5F3' }}
                />
                <Area type="monotone" dataKey="count" stroke="#D98A00" fillOpacity={1} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average Score by Criterion */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
            Average Score by Quality Criterion
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={criteriaData}>
                <XAxis dataKey="name" stroke="#7F9691" fontSize={11} />
                <YAxis domain={[0, 5]} stroke="#7F9691" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#091513', borderColor: '#1B302D', borderRadius: '8px', fontSize: '12px', color: '#F1F5F3' }}
                />
                <Bar dataKey="score" fill="#F0A51A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Issue Distribution */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
            Detected Issue Distribution
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            {issuePieData.length === 0 ? (
              <p className="text-xs text-[#7F9691] italic">No issues annotated yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  >
                    {issuePieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#091513', borderColor: '#1B302D', borderRadius: '8px', fontSize: '12px', color: '#F1F5F3' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 4: Evaluations by Domain */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
            Evaluations by Domain
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainBarData}>
                <XAxis dataKey="domain" stroke="#7F9691" fontSize={11} />
                <YAxis stroke="#7F9691" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#091513', borderColor: '#1B302D', borderRadius: '8px', fontSize: '12px', color: '#F1F5F3' }}
                />
                <Bar dataKey="count" fill="#14B8A6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Submissions Log Table */}
      <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider">
          Recent Evaluations Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#091513] border-b border-[#1B302D] text-[11px] text-[#7F9691] font-bold uppercase">
                <th className="p-3">Eval ID</th>
                <th className="p-3">Task ID</th>
                <th className="p-3">Domain</th>
                <th className="p-3">Overall Score</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Issues</th>
                <th className="p-3">QA Status</th>
                <th className="p-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B302D]">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#132522] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#F0A51A]">{sub.id}</td>
                  <td className="p-3 font-mono text-[#B7C7C3]">{sub.taskId}</td>
                  <td className="p-3 text-[#B7C7C3]">{sub.taskDomain}</td>
                  <td className="p-3 font-mono font-bold text-[#F0A51A]">{sub.overallScore} / 5.0</td>
                  <td className="p-3">
                    <span className="font-semibold text-[#F1F5F3]">{sub.feedback.finalClassification}</span>
                  </td>
                  <td className="p-3 font-mono text-[#B7C7C3]">{sub.issues.length}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.qaStatus === 'Approved'
                          ? 'bg-[#0B302B] text-[#14B8A6] border border-[#0F766E]'
                          : 'bg-[#342707] text-[#F0A51A] border border-[#8A5A00]'
                      }`}
                    >
                      {sub.qaStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setInspectSubmission(sub)}
                      className="p-1.5 rounded bg-[#10211F] hover:bg-[#172B28] text-[#B7C7C3] border border-[#2A403C] transition-colors"
                      title="Inspect Submission"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspector Modal */}
      {inspectSubmission && (
        <div className="fixed inset-0 z-50 bg-[#07100F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setInspectSubmission(null)}
              className="absolute top-4 right-4 text-[#7F9691] hover:text-[#F1F5F3]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#F1F5F3] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#F0A51A]" />
              Submission Details — {inspectSubmission.id}
            </h3>

            <div className="bg-[#091513] p-4 rounded-xl border border-[#1B302D] text-xs space-y-2">
              <p className="text-[#7F9691] font-semibold">Prompt:</p>
              <p className="text-[#F1F5F3]">{inspectSubmission.taskPrompt}</p>
            </div>

            <div className="bg-[#091513] p-4 rounded-xl border border-[#1B302D] text-xs space-y-2">
              <p className="text-[#7F9691] font-semibold">AI Response ({inspectSubmission.modelName}):</p>
              <p className="text-[#F1F5F3] whitespace-pre-wrap font-sans">{inspectSubmission.responseText}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#091513] p-4 rounded-xl border border-[#1B302D] text-xs">
              <div>
                <p className="text-[#7F9691] font-semibold">Overall Quality Score:</p>
                <p className="text-xl font-bold text-[#F0A51A] font-mono">{inspectSubmission.overallScore} / 5.0</p>
              </div>
              <div>
                <p className="text-[#7F9691] font-semibold">Final Classification:</p>
                <p className="font-bold text-[#F0A51A]">{inspectSubmission.feedback.finalClassification}</p>
              </div>
            </div>

            {inspectSubmission.issues.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#F1F5F3]">Annotated Issues:</p>
                {inspectSubmission.issues.map((i, idx) => (
                  <div key={idx} className="bg-[#091513] p-3 rounded-xl border border-[#1B302D] text-xs space-y-1">
                    <span className="font-bold text-[#EF4444]">{i.type} ({i.severity})</span>
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
