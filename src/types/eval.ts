export type DomainType = 
  | 'General Knowledge'
  | 'Technology'
  | 'Mathematics'
  | 'Science'
  | 'Business'
  | 'Customer Support'
  | 'Writing'
  | 'Reasoning';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Needs Review';

export type IssueType =
  | 'Factual Error'
  | 'Logical Error'
  | 'Missing Information'
  | 'Irrelevant Information'
  | 'Instruction Violation'
  | 'Ambiguous Statement'
  | 'Poor Reasoning'
  | 'Grammatical/Language Issue'
  | 'Hallucination'
  | 'No Issue';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type FinalClassification =
  | 'Accept'
  | 'Accept with Minor Issues'
  | 'Needs Revision'
  | 'Reject';

export type QAStatus = 'Pending' | 'Approved' | 'Re-evaluation Required' | 'Flagged';

export interface AIResponse {
  id: string;
  modelName: string;
  timestamp: string;
  wordCount: number;
  text: string;
}

export interface Task {
  id: string;
  domain: DomainType;
  difficulty: DifficultyLevel;
  priority: PriorityLevel;
  prompt: string;
  systemPrompt?: string;
  status: TaskStatus;
  assignedDate: string;
  guidelines: string[];
  response: AIResponse;
}

export interface CriterionScore {
  score: number; // 1 to 5
  comment: string;
}

export interface CriteriaScores {
  accuracy: CriterionScore;
  relevance: CriterionScore;
  completeness: CriterionScore;
  clarity: CriterionScore;
  instructionFollowing: CriterionScore;
}

export interface AnnotatedIssue {
  id: string;
  type: IssueType;
  severity: SeverityLevel;
  explanation: string;
  evidence: string;
}

export interface EvaluatorFeedback {
  wellDone: string;
  couldImprove: string;
  keyIssue: string;
  finalClassification: FinalClassification;
}

export interface EvaluationSubmission {
  id: string;
  taskId: string;
  taskPrompt: string;
  taskDomain: DomainType;
  taskDifficulty: DifficultyLevel;
  modelName: string;
  responseId: string;
  responseText: string;
  scores: CriteriaScores;
  overallScore: number;
  issues: AnnotatedIssue[];
  feedback: EvaluatorFeedback;
  submittedAt: string;
  evaluatorName: string;
  qaStatus: QAStatus;
  qaReviewerComment?: string;
  qaReviewedAt?: string;
}

export interface EvaluatorProfile {
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
  scoringScale: string;
  theme: 'dark' | 'light' | 'system';
  emailNotifications: boolean;
  autoSaveDraft: boolean;
}

export interface AnalyticsSummary {
  totalEvaluations: number;
  completedTasks: number;
  avgQualityScore: number;
  totalIssuesDetected: number;
  accuracyRate: number;
  needsReviewCount: number;
  criteriaAverages: {
    accuracy: number;
    relevance: number;
    completeness: number;
    clarity: number;
    instructionFollowing: number;
  };
  issueDistribution: { [key in IssueType]?: number };
  domainDistribution: { [key in DomainType]?: number };
}
