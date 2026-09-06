import { useState, useEffect } from 'react';
import type { Task, EvaluationSubmission, EvaluatorProfile } from './types/eval';
import {
  getTasksFromStorage,
  getSubmissionsFromStorage,
  getSettingsFromStorage,
  resetAllStorage
} from './services/storageService';
import { Sidebar, type ActiveTab } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { EvaluationWorkspace } from './components/workspace/EvaluationWorkspace';
import { EvaluationQueue } from './components/queue/EvaluationQueue';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { QualityAssurance } from './components/qa/QualityAssurance';
import { EvaluationHistory } from './components/history/EvaluationHistory';
import { SettingsPage } from './components/settings/SettingsPage';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('workspace');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<EvaluationSubmission[]>([]);
  const [profile, setProfile] = useState<EvaluatorProfile>(getSettingsFromStorage());
  const [activeTaskId, setActiveTaskId] = useState<string>('EVAL-1048');

  // Load initial data on mount
  useEffect(() => {
    const loadedTasks = getTasksFromStorage();
    const loadedSubmissions = getSubmissionsFromStorage();
    const loadedSettings = getSettingsFromStorage();

    setTasks(loadedTasks);
    setSubmissions(loadedSubmissions);
    setProfile(loadedSettings);

    if (loadedTasks.length > 0) {
      setActiveTaskId(loadedTasks[0].id);
    }
  }, []);

  const refreshData = () => {
    setTasks(getTasksFromStorage());
    setSubmissions(getSubmissionsFromStorage());
  };

  const handleResetData = () => {
    const res = resetAllStorage();
    setTasks(res.tasks);
    setSubmissions(res.submissions);
    setProfile(res.settings);
    if (res.tasks.length > 0) {
      setActiveTaskId(res.tasks[0].id);
    }
  };

  const handleSelectTaskFromQueueOrSearch = (taskId: string) => {
    setActiveTaskId(taskId);
    setActiveTab('workspace');
  };

  const currentTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];

  const pendingQACount = submissions.filter((s) => s.qaStatus === 'Pending').length;
  const inProgressTaskCount = tasks.filter((t) => t.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-[#07100F] text-[#F1F5F3] flex flex-col font-sans selection:bg-[#4A350D] selection:text-[#F1F5F3]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        pendingQACount={pendingQACount}
        inProgressTaskCount={inProgressTaskCount}
      />

      {/* Top Navbar */}
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        tasks={tasks}
        activeTaskId={activeTaskId}
        onSelectTask={handleSelectTaskFromQueueOrSearch}
        onResetData={handleResetData}
      />

      {/* Main Workspace View Container */}
      <main
        className={`flex-1 pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'pl-18' : 'pl-64'
        }`}
      >
        {activeTab === 'workspace' && currentTask && (
          <EvaluationWorkspace
            task={currentTask}
            onEvaluationSubmitted={refreshData}
            onGoToQueue={() => setActiveTab('queue')}
          />
        )}

        {activeTab === 'queue' && (
          <EvaluationQueue
            tasks={tasks}
            onSelectTask={handleSelectTaskFromQueueOrSearch}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            tasks={tasks}
            submissions={submissions}
          />
        )}

        {activeTab === 'dashboard' && (
          <AnalyticsDashboard
            tasks={tasks}
            submissions={submissions}
          />
        )}

        {activeTab === 'qa' && (
          <QualityAssurance
            submissions={submissions}
            onSubmissionsUpdated={refreshData}
          />
        )}

        {activeTab === 'history' && (
          <EvaluationHistory
            submissions={submissions}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            onResetData={handleResetData}
          />
        )}
      </main>
    </div>
  );
}

export default App;
