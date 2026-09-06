# EvalBench — Quality Assurance & Data Annotation Platform

EvalBench is an enterprise-grade AI model evaluation and data annotation workbench built with **React, TypeScript, Vite, Tailwind CSS, and Recharts**. It simulates internal RLHF evaluation and data quality assurance workflows used by AI research and data operations teams.

---

## 🌟 Key Features

- **Interactive Evaluation Workspace**:
  - **Task Context**: Prompts, system constraints, domain metadata, and collapsible evaluation directives.
  - **AI Response Reader**: 16–18px typography, token count estimations, word count, and model metadata.
  - **Interactive Text Selection Annotator**: Select text inside the AI response to immediately tag issues (`Factual Error`, `Logical Error`, `Hallucination`, `Instruction Violation`, `Missing Info`, `Irrelevant`, `Language`).
  - **Compact Scoring Matrix**: 1–5 dimension ratings for Accuracy, Relevance, Completeness, Clarity, and Instruction Following with anchor level descriptions.
  - **Analytical Score Meter**: Real-time quality calculation (`4.6 / 5.0`) with confidence indicators.
  - **Segmented Decision Control**: `Accept`, `Accept with Minor Issues`, `Needs Revision`, `Reject`.
  - **Sticky Bottom Action Bar**: Live progress tracking (`90%`), auto-save indicators, and submit confirmation modal with confetti feedback.

- **15+ Realistic Benchmark Evaluation Tasks**:
  - Covers 8 specialized domains: *General Knowledge, Technology, Mathematics, Science, Business, Customer Support, Writing, Reasoning*.
  - Features realistic prompts, flawless model outputs, and responses with subtle factual, logical, or constraint violations.

- **Quality Assurance (QA) Portal**:
  - Senior audit review workflow to inspect submitted evaluations, approve, request re-evaluations, or flag with auditor notes.

- **Analytics Dashboard**:
  - 6 KPI summary cards and 4 Recharts visualisations tracking evaluation volume, score distributions, issue breakdown, and domain volume.

- **Evaluation History & Data Export**:
  - Complete history log with modal inspector and **JSON/CSV Export** for offline dataset analysis.

- **LocalStorage Data Persistence**:
  - All tasks, evaluations, QA updates, and settings persist across browser sessions with a one-click **Reset Data** control.

---

## 🎨 Color Palette & Aesthetic

Built using a dark charcoal, warm amber, and teal design system:
- **Root Background**: `#07100F`
- **Secondary Surfaces**: `#0A1514` / `#0D1A18` / `#10211F`
- **Active Navigation & Accent**: `#332408` background, `#8A5A00` border, `#F0A51A` text
- **Primary Action Buttons**: `#D98A00` (Hover: `#F0A51A`)
- **Secondary Accent**: `#14B8A6`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/evalbench.git
   cd evalbench
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Project Structure

```
src/
├── components/
│   ├── analytics/     # Recharts dashboard & KPI metrics
│   ├── common/        # Badges, tags, and status pills
│   ├── history/       # Evaluation history & JSON/CSV export
│   ├── layout/        # Navbar & Sidebar navigation
│   ├── qa/            # Senior Quality Assurance audit portal
│   ├── queue/         # Task queue with search & filters
│   ├── settings/      # Profile & LocalStorage preferences
│   └── workspace/     # Evaluation workspace, response reader & annotator
├── data/              # 15+ realistic mock evaluation tasks
├── services/          # LocalStorage persistence & analytics engine
├── types/             # TypeScript type definitions
├── App.tsx            # Main application layout & router state
├── index.css          # Tailwind CSS v4 & custom design tokens
└── main.tsx           # React entrypoint
```

---

## 📄 License

MIT License. Designed for AI Data Annotation & AI Generalist portfolio demonstration.
