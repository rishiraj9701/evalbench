import type { Task, EvaluationSubmission, EvaluatorProfile, AnalyticsSummary, IssueType, DomainType } from '../types/eval';
import { INITIAL_MOCK_TASKS } from '../data/mockTasks';

const TASKS_KEY = 'evalbench_tasks_v1';
const SUBMISSIONS_KEY = 'evalbench_submissions_v1';
const SETTINGS_KEY = 'evalbench_settings_v1';

// Seed sample completed submissions for immediate analytics presentation
const SAMPLE_INITIAL_SUBMISSIONS: EvaluationSubmission[] = [
  {
    id: 'SUB-2026-9041',
    taskId: 'EVAL-1051',
    taskPrompt: 'Summarize the primary biological differences between the Light-Dependent Reactions and the Calvin Cycle in plant photosynthesis.',
    taskDomain: 'Science',
    taskDifficulty: 'Medium',
    modelName: 'Custom-RLHF-V4',
    responseId: 'RESP-8894',
    responseText: `Photosynthesis takes place in two sequential biochemical stages... Output: Produces ATP and generates reduced NADH as the primary electron carrier.`,
    scores: {
      accuracy: { score: 2, comment: 'Factually inaccurate: claims light reaction produces NADH instead of NADPH.' },
      relevance: { score: 5, comment: 'Fully relevant to the requested topic.' },
      completeness: { score: 4, comment: 'Covers main differences.' },
      clarity: { score: 5, comment: 'Clear structure and bullet points.' },
      instructionFollowing: { score: 4, comment: 'Followed formatting prompt.' }
    },
    overallScore: 4.0,
    issues: [
      {
        id: 'iss-1',
        type: 'Factual Error',
        severity: 'High',
        explanation: 'Falsely states that Light Reactions produce NADH. Plants use NADPH for photosynthesis; NADH is used in cellular respiration.',
        evidence: 'generates reduced NADH as the primary electron carrier'
      }
    ],
    feedback: {
      wellDone: 'The sectioning and formatting were clean and readable.',
      couldImprove: 'Ensure precise biochemical nomenclature for electron carriers in plant biology.',
      keyIssue: 'Confused NADH with NADPH.',
      finalClassification: 'Accept with Minor Issues'
    },
    submittedAt: '2026-09-03T12:00:00Z',
    evaluatorName: 'Raghav (AI Data Specialist)',
    qaStatus: 'Approved',
    qaReviewerComment: 'Spot on factual catch regarding NADPH vs NADH.',
    qaReviewedAt: '2026-09-03T15:30:00Z'
  },
  {
    id: 'SUB-2026-9042',
    taskId: 'EVAL-1057',
    taskPrompt: 'Summarize the core requirements of GDPR Article 17 ("Right to be Forgotten") for a software engineering manager.',
    taskDomain: 'Business',
    taskDifficulty: 'Medium',
    modelName: 'GPT-4o-Mini',
    responseId: 'RESP-8900',
    responseText: `GDPR Article 17: Right to Erasure ("Right to be Forgotten") — Engineering Checklist...`,
    scores: {
      accuracy: { score: 5, comment: 'Factually precise and accurate.' },
      relevance: { score: 5, comment: 'Targeted directly to engineering leadership.' },
      completeness: { score: 5, comment: 'Includes obligations, exceptions, and backup handling.' },
      clarity: { score: 5, comment: 'Exceptional visual hierarchy and clarity.' },
      instructionFollowing: { score: 5, comment: 'Adhered strictly to persona and technical tone.' }
    },
    overallScore: 5.0,
    issues: [],
    feedback: {
      wellDone: 'High-quality breakdown of technical compliance steps.',
      couldImprove: 'None, excellent answer.',
      keyIssue: 'No issues found.',
      finalClassification: 'Accept'
    },
    submittedAt: '2026-09-01T11:00:00Z',
    evaluatorName: 'Raghav (AI Data Specialist)',
    qaStatus: 'Approved',
    qaReviewerComment: 'Verified accurate legal and engineering guidance.',
    qaReviewedAt: '2026-09-01T14:00:00Z'
  },
  {
    id: 'SUB-2026-9043',
    taskId: 'EVAL-1062',
    taskPrompt: 'Provide a historical overview of the Silk Road trade route origins during the Han Dynasty.',
    taskDomain: 'General Knowledge',
    taskDifficulty: 'Easy',
    modelName: 'Llama-3.3-70B-Instruct',
    responseId: 'RESP-8905',
    responseText: `The Silk Road was an ancient network of Eurasian trade routes established during the Han Dynasty...`,
    scores: {
      accuracy: { score: 5, comment: 'Accurate dates and key historical figures.' },
      relevance: { score: 5, comment: 'Directly addresses the prompt.' },
      completeness: { score: 4, comment: 'Good coverage of Han Dynasty origins.' },
      clarity: { score: 4, comment: 'Well structured.' },
      instructionFollowing: { score: 5, comment: 'Followed tone guidelines.' }
    },
    overallScore: 4.6,
    issues: [],
    feedback: {
      wellDone: 'Accurately highlighted Zhang Qian and trade commodities.',
      couldImprove: 'Could mention maritime silk routes briefly.',
      keyIssue: 'No major issues.',
      finalClassification: 'Accept'
    },
    submittedAt: '2026-09-01T10:00:00Z',
    evaluatorName: 'Raghav (AI Data Specialist)',
    qaStatus: 'Approved',
    qaReviewerComment: 'Good evaluation.',
    qaReviewedAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'SUB-2026-9044',
    taskId: 'EVAL-1053',
    taskPrompt: 'Draft an empathetic customer support email response to a customer whose flight was delayed by 6 hours due to mechanical issues. Policy constraint: State clearly that refund claims take 5-7 business days to process.',
    taskDomain: 'Customer Support',
    taskDifficulty: 'Easy',
    modelName: 'GPT-4o-Mini',
    responseId: 'RESP-8896',
    responseText: `Dear Valued Passenger... To compensate you for this disruption, we have automatically initiated a travel voucher...`,
    scores: {
      accuracy: { score: 4, comment: 'Tone is good but policy constraint missed.' },
      relevance: { score: 4, comment: 'Relevant tone.' },
      completeness: { score: 3, comment: 'Missed explicit 5-7 business days processing statement.' },
      clarity: { score: 5, comment: 'Polite and clear language.' },
      instructionFollowing: { score: 1, comment: 'FAILED NEGATIVE CONSTRAINT: Completely omitted 5-7 business days policy rule.' }
    },
    overallScore: 3.4,
    issues: [
      {
        id: 'iss-2',
        type: 'Instruction Violation',
        severity: 'Critical',
        explanation: 'Prompt required explicitly stating that refund claims take 5-7 business days to process. Model omitted this crucial policy detail.',
        evidence: 'Once submitted, our billing team will process your request promptly.'
      }
    ],
    feedback: {
      wellDone: 'Empathetic customer service tone.',
      couldImprove: 'Must comply with mandatory policy statements in prompt constraints.',
      keyIssue: 'Omitted 5-7 business days refund timeline.',
      finalClassification: 'Needs Revision'
    },
    submittedAt: '2026-09-05T12:00:00Z',
    evaluatorName: 'Raghav (AI Data Specialist)',
    qaStatus: 'Pending',
    qaReviewerComment: undefined,
    qaReviewedAt: undefined
  },
  {
    id: 'SUB-2026-9045',
    taskId: 'EVAL-1061',
    taskPrompt: 'Draft a short B2B sales email pitching eco-friendly biodegradable packaging to e-commerce brands. Highlight 15% cost reduction and 100% compostability.',
    taskDomain: 'Writing',
    taskDifficulty: 'Medium',
    modelName: 'Claude-3.5-Sonnet',
    responseId: 'RESP-8904',
    responseText: `Subject: Cut packaging costs by 15% while going 100% compostable... However, due to custom manufacturing setup requirements... increases total expenditure by 30%...`,
    scores: {
      accuracy: { score: 3, comment: 'Introduced contradictory cost logic.' },
      relevance: { score: 4, comment: 'Good sales pitch framing.' },
      completeness: { score: 4, comment: 'Mentions 15% cost drop and compostability.' },
      clarity: { score: 4, comment: 'Good tone.' },
      instructionFollowing: { score: 2, comment: 'Defeated sales pitch by stating expenditure increases 30%.' }
    },
    overallScore: 3.4,
    issues: [
      {
        id: 'iss-3',
        type: 'Logical Error',
        severity: 'High',
        explanation: 'Claims a 15% cost reduction in header but then contradicts itself by stating it increases total operational expenditure by 30%.',
        evidence: 'increases total operational expenditure by 30% for small brands.'
      }
    ],
    feedback: {
      wellDone: 'Well structured cold email pitch.',
      couldImprove: 'Eliminate logical contradiction in pricing arguments.',
      keyIssue: 'Self-contradictory pricing claim.',
      finalClassification: 'Needs Revision'
    },
    submittedAt: '2026-09-05T17:00:00Z',
    evaluatorName: 'Raghav (AI Data Specialist)',
    qaStatus: 'Pending',
    qaReviewerComment: undefined,
    qaReviewedAt: undefined
  }
];

export const DEFAULT_PROFILE: EvaluatorProfile = {
  name: 'Raghav',
  role: 'AI Data Specialist / Response Evaluator',
  email: 'raghav@evalbench.internal',
  scoringScale: '1-5 Star Likert Scale',
  theme: 'dark',
  emailNotifications: true,
  autoSaveDraft: true
};

export const getTasksFromStorage = (): Task[] => {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_MOCK_TASKS));
      return INITIAL_MOCK_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_TASKS;
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks to LocalStorage', e);
  }
};

export const getSubmissionsFromStorage = (): EvaluationSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SAMPLE_INITIAL_SUBMISSIONS));
      return SAMPLE_INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_INITIAL_SUBMISSIONS;
  }
};

export const saveSubmissionsToStorage = (submissions: EvaluationSubmission[]): void => {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.error('Failed to save submissions to LocalStorage', e);
  }
};

export const getSettingsFromStorage = (): EvaluatorProfile => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveSettingsToStorage = (profile: EvaluatorProfile): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save settings to LocalStorage', e);
  }
};

export const submitEvaluation = (
  taskId: string,
  submissionData: Omit<EvaluationSubmission, 'id' | 'submittedAt' | 'qaStatus'>
): EvaluationSubmission => {
  const tasks = getTasksFromStorage();
  const submissions = getSubmissionsFromStorage();

  const newSubmission: EvaluationSubmission = {
    ...submissionData,
    id: `SUB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: new Date().toISOString(),
    qaStatus: 'Pending'
  };

  // Update task status to Completed
  const updatedTasks = tasks.map(t => {
    if (t.id === taskId) {
      return { ...t, status: 'Completed' as const };
    }
    return t;
  });

  const updatedSubmissions = [newSubmission, ...submissions];

  saveTasksToStorage(updatedTasks);
  saveSubmissionsToStorage(updatedSubmissions);

  return newSubmission;
};

export const updateQAReviewStatus = (
  submissionId: string,
  qaStatus: EvaluationSubmission['qaStatus'],
  qaReviewerComment?: string
): EvaluationSubmission[] => {
  const submissions = getSubmissionsFromStorage();
  const updated = submissions.map(sub => {
    if (sub.id === submissionId) {
      return {
        ...sub,
        qaStatus,
        qaReviewerComment: qaReviewerComment || sub.qaReviewerComment,
        qaReviewedAt: new Date().toISOString()
      };
    }
    return sub;
  });

  saveSubmissionsToStorage(updated);
  return updated;
};

export const resetAllStorage = (): { tasks: Task[]; submissions: EvaluationSubmission[]; settings: EvaluatorProfile } => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_MOCK_TASKS));
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SAMPLE_INITIAL_SUBMISSIONS));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_PROFILE));

  return {
    tasks: INITIAL_MOCK_TASKS,
    submissions: SAMPLE_INITIAL_SUBMISSIONS,
    settings: DEFAULT_PROFILE
  };
};

export const calculateAnalyticsSummary = (
  tasks: Task[],
  submissions: EvaluationSubmission[]
): AnalyticsSummary => {
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalEvaluations = submissions.length;

  let totalScoreSum = 0;
  let totalIssues = 0;
  let accuracyScoreSum = 0;
  let relevanceScoreSum = 0;
  let completenessScoreSum = 0;
  let clarityScoreSum = 0;
  let instructionFollowingScoreSum = 0;

  const issueDist: { [key in IssueType]?: number } = {};
  const domainDist: { [key in DomainType]?: number } = {};

  submissions.forEach(sub => {
    totalScoreSum += sub.overallScore;
    totalIssues += sub.issues.length;

    accuracyScoreSum += sub.scores.accuracy.score;
    relevanceScoreSum += sub.scores.relevance.score;
    completenessScoreSum += sub.scores.completeness.score;
    clarityScoreSum += sub.scores.clarity.score;
    instructionFollowingScoreSum += sub.scores.instructionFollowing.score;

    sub.issues.forEach(iss => {
      issueDist[iss.type] = (issueDist[iss.type] || 0) + 1;
    });

    domainDist[sub.taskDomain] = (domainDist[sub.taskDomain] || 0) + 1;
  });

  const count = totalEvaluations || 1;
  const avgQualityScore = Number((totalScoreSum / count).toFixed(2));
  const accuracyRate = Number(((accuracyScoreSum / (count * 5)) * 100).toFixed(1));
  const needsReviewCount = submissions.filter(s => s.qaStatus === 'Pending' || s.qaStatus === 'Re-evaluation Required').length;

  return {
    totalEvaluations,
    completedTasks,
    avgQualityScore,
    totalIssuesDetected: totalIssues,
    accuracyRate,
    needsReviewCount,
    criteriaAverages: {
      accuracy: Number((accuracyScoreSum / count).toFixed(2)),
      relevance: Number((relevanceScoreSum / count).toFixed(2)),
      completeness: Number((completenessScoreSum / count).toFixed(2)),
      clarity: Number((clarityScoreSum / count).toFixed(2)),
      instructionFollowing: Number((instructionFollowingScoreSum / count).toFixed(2))
    },
    issueDistribution: issueDist,
    domainDistribution: domainDist
  };
};
