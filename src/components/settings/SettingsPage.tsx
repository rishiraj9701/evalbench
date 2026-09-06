import React, { useState } from 'react';
import type { EvaluatorProfile } from '../../types/eval';
import { saveSettingsToStorage } from '../../services/storageService';
import { Settings, Save, RotateCcw, User, Sliders } from 'lucide-react';

interface SettingsPageProps {
  profile: EvaluatorProfile;
  onUpdateProfile: (updated: EvaluatorProfile) => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  profile,
  onUpdateProfile,
  onResetData
}) => {
  const [formState, setFormState] = useState<EvaluatorProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsToStorage(formState);
    onUpdateProfile(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-[#F1F5F3] flex items-center gap-2.5">
          <Settings className="w-5 h-5 text-[#F0A51A]" />
          Evaluator Profile & System Settings
        </h1>
        <p className="text-xs text-[#7F9691]">
          Configure evaluator metadata, scoring scales, notification alerts, and data persistence options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#F0A51A]" />
            Evaluator Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#B7C7C3] font-medium block mb-1">Evaluator Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-[#091513] border border-[#1E3431] rounded-xl px-3 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
              />
            </div>

            <div>
              <label className="text-xs text-[#B7C7C3] font-medium block mb-1">Role Title</label>
              <input
                type="text"
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                className="w-full bg-[#091513] border border-[#1E3431] rounded-xl px-3 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
              />
            </div>

            <div>
              <label className="text-xs text-[#B7C7C3] font-medium block mb-1">Internal Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-[#091513] border border-[#1E3431] rounded-xl px-3 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
              />
            </div>

            <div>
              <label className="text-xs text-[#B7C7C3] font-medium block mb-1">Default Scoring Scale</label>
              <select
                value={formState.scoringScale}
                onChange={(e) => setFormState({ ...formState, scoringScale: e.target.value })}
                className="w-full bg-[#091513] border border-[#1E3431] rounded-xl px-3 py-2 text-xs text-[#F1F5F3] focus:outline-none focus:border-[#D98A00]"
              >
                <option value="1-5 Star Likert Scale" className="bg-[#0A1514]">1-5 Star Likert Scale</option>
                <option value="1-7 Detailed Granular Scale" className="bg-[#0A1514]">1-7 Detailed Granular Scale</option>
                <option value="Binary Pass/Fail Scale" className="bg-[#0A1514]">Binary Pass/Fail Scale</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-[#0D1A18] border border-[#1B302D] rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-[#F1F5F3] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#F0A51A]" />
            Evaluation Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#091513] border border-[#1B302D] cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-[#F1F5F3]">Auto-Save Draft Evaluations</p>
                <p className="text-[11px] text-[#7F9691]">Persist active scoring progress automatically every 30 seconds</p>
              </div>
              <input
                type="checkbox"
                checked={formState.autoSaveDraft}
                onChange={(e) => setFormState({ ...formState, autoSaveDraft: e.target.checked })}
                className="rounded bg-[#091513] border-[#1B302D] text-[#D98A00] focus:ring-[#D98A00]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#091513] border border-[#1B302D] cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-[#F1F5F3]">QA Status Change Email Digest</p>
                <p className="text-[11px] text-[#7F9691]">Receive notifications when QA leads audit your submitted evaluations</p>
              </div>
              <input
                type="checkbox"
                checked={formState.emailNotifications}
                onChange={(e) => setFormState({ ...formState, emailNotifications: e.target.checked })}
                className="rounded bg-[#091513] border-[#1B302D] text-[#D98A00] focus:ring-[#D98A00]"
              />
            </label>
          </div>
        </div>

        {/* Save & Reset Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onResetData}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#801B1B] bg-[#351516] hover:bg-[#4D1C1E] text-[#EF4444] text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset LocalStorage Mock Data</span>
          </button>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-semibold text-[#14B8A6] animate-fade-in">
                ✓ Preferences Saved!
              </span>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D98A00] hover:bg-[#F0A51A] text-[#08100F] border border-[#B87300] text-xs font-bold transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
