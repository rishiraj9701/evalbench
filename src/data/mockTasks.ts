import type { Task } from '../types/eval';

export const INITIAL_MOCK_TASKS: Task[] = [
  {
    id: 'EVAL-1048',
    domain: 'General Knowledge',
    difficulty: 'Medium',
    priority: 'High',
    status: 'In Progress',
    assignedDate: '2026-09-05',
    prompt: 'Explain why maintaining a consistent sleep schedule can improve daily cognitive productivity and focus.',
    systemPrompt: 'Provide a science-backed, clear, and structured explanation suitable for a professional audience.',
    guidelines: [
      'Check if circadian rhythm mechanisms (melatonin, SCN) are explained accurately.',
      'Verify that claims regarding REM and Deep Sleep consolidation are non-exaggerated.',
      'Ensure tone is authoritative yet accessible.',
      'Check for structured sectioning and concise concluding takeaway.'
    ],
    response: {
      id: 'RESP-8891',
      modelName: 'Llama-3.3-70B-Instruct',
      timestamp: '2026-09-05T14:32:10Z',
      wordCount: 312,
      text: `Maintaining a consistent sleep schedule—going to bed and waking up at the same time every day, including weekends—is one of the most effective levers for cognitive performance.

1. Circadian Alignment & Hormonal Balance
Your body relies on a biological clock regulated by the suprachiasmatic nucleus (SCN) in the hypothalamus. Consistent sleep timing anchors your circadian rhythm, optimizing the predictable release of cortisol in the morning for alertness and melatonin at night for sleep onset. Irregular schedules cause "social jetlag," forcing your brain to operate out of phase with its intrinsic hormonal cycles.

2. Enhanced Memory Consolidation
During non-REM (deep sleep) and REM phases, the brain reorganizes and consolidates short-term memories into long-term storage in the hippocampus and neocortex. Interrupting or shifting sleep windows disrupts cycle completion, leading to brain fog and impaired recall the following day.

3. Adenosine Clearance & Sustained Executive Focus
Throughout waking hours, adenosine accumulates in the brain, creating sleep pressure. Deep sleep flushes out neural waste products via the glymphatic system. Consistent sleep durations ensure total clearance of metabolic waste, resulting in sharper decision-making, emotional regulation, and extended attention span.

Conclusion:
Consistency optimizes neurochemical timing, allowing individuals to experience higher focus peaks and lower afternoon fatigue without relying on excessive caffeine.`
    }
  },
  {
    id: 'EVAL-1049',
    domain: 'Technology',
    difficulty: 'Hard',
    priority: 'Urgent',
    status: 'Not Started',
    assignedDate: '2026-09-05',
    prompt: 'Explain Quantum Key Distribution (QKD) to a high school student. Constraint: Do NOT use complex mathematical equations or advanced linear algebra notation.',
    systemPrompt: 'Target audience: 10th-grade high school student. Explain conceptually using everyday analogies.',
    guidelines: [
      'Verify adherence to negative constraint: No quantum physics equations or vector matrices.',
      'Check whether the Heisenberg Uncertainty Principle or No-Cloning Theorem is accurately simplified.',
      'Check if the Alice, Bob, and Eve security concept is clearly explained.'
    ],
    response: {
      id: 'RESP-8892',
      modelName: 'GPT-4o-Mini',
      timestamp: '2026-09-05T15:10:00Z',
      wordCount: 285,
      text: `Imagine you want to send a secret lock code to your friend Bob across a crowded room. Usually, if an eavesdropper named Eve intercepts your letter, she reads it, copies it, and passes it along without anyone noticing.

Quantum Key Distribution (QKD) solves this using light particles called photons!

Here is how it works:
1. Polarization: Alice sends photons tilted at different angles (like sending light through polarized sunglasses).
2. The Catch: In quantum mechanics, measuring a particle changes its state permanently!
3. Detection: If Eve tries to spy on the photons halfway through, her measurement alters the light's angle.
4. Verification: When Bob gets the light, he checks a small random sample with Alice. If the states don't match, they immediately know Eve intercepted it and scrap the key!

Furthermore, according to quantum mechanics state vectors |Ψ⟩ = α|0⟩ + β|1⟩, state collapse guarantees undetectable eavesdropping is physically impossible under standard Hermitian operators.`
    }
  },
  {
    id: 'EVAL-1050',
    domain: 'Mathematics',
    difficulty: 'Hard',
    priority: 'Medium',
    status: 'Not Started',
    assignedDate: '2026-09-04',
    prompt: 'A box contains 5 red balls, 4 blue balls, and 3 green balls. Two balls are drawn sequentially without replacement. What is the exact probability that both balls are of the same color? Show step-by-step arithmetic.',
    systemPrompt: 'Provide exact fractional probability and simplified calculation steps.',
    guidelines: [
      'Check step 1 total count: 5 + 4 + 3 = 12 total balls.',
      'Verify probability calculation for Red-Red, Blue-Blue, and Green-Green.',
      'Check for arithmetic accuracy: P(RR) = (5/12)*(4/11) = 20/132.',
      'P(BB) = (4/12)*(3/11) = 12/132.',
      'P(GG) = (3/12)*(2/11) = 6/132.',
      'Total = (20+12+6)/132 = 38/132 = 19/66. Verify if AI made any math error!'
    ],
    response: {
      id: 'RESP-8893',
      modelName: 'Claude-3.5-Sonnet',
      timestamp: '2026-09-04T18:22:15Z',
      wordCount: 198,
      text: `To find the probability that both drawn balls are of the same color without replacement, we calculate the individual probabilities for each color and sum them up.

Total number of balls initially = 5 (red) + 4 (blue) + 3 (green) = 12 balls.

Step 1: Probability of drawing 2 Red balls:
- 1st Red: 5/12
- 2nd Red: 4/11
P(Red & Red) = (5/12) × (4/11) = 20/132

Step 2: Probability of drawing 2 Blue balls:
- 1st Blue: 4/12
- 2nd Blue: 3/11
P(Blue & Blue) = (4/12) × (3/11) = 12/132

Step 3: Probability of drawing 2 Green balls:
- 1st Green: 3/12
- 2nd Green: 2/11
P(Green & Green) = (3/12) × (2/11) = 8/132  <-- Note: 3 * 2 = 6, but written as 8!

Step 4: Summing the probabilities:
Total P = 20/132 + 12/132 + 8/132 = 40/132 = 10/33.

Final Answer: The probability is 10/33.`
    }
  },
  {
    id: 'EVAL-1051',
    domain: 'Science',
    difficulty: 'Medium',
    priority: 'Low',
    status: 'Completed',
    assignedDate: '2026-09-03',
    prompt: 'Summarize the primary biological differences between the Light-Dependent Reactions and the Calvin Cycle in plant photosynthesis.',
    systemPrompt: 'Provide accurate biochemical distinctions regarding cellular location, inputs, outputs, and dependence on light.',
    guidelines: [
      'Check cellular location accuracy: Thylakoid membrane vs Stroma.',
      'Check energy carrier usage: ATP and NADPH produced in light reactions used in Calvin cycle.',
      'Verify factual accuracy regarding electron transport chain and electron carriers (NADPH in plants vs NADH in cellular respiration).'
    ],
    response: {
      id: 'RESP-8894',
      modelName: 'Custom-RLHF-V4',
      timestamp: '2026-09-03T11:45:00Z',
      wordCount: 240,
      text: `Photosynthesis takes place in two sequential biochemical stages:

1. Light-Dependent Reactions:
- Location: Takes place inside the thylakoid membranes of chloroplasts.
- Requirement: Direct sunlight is required to excite chlorophyll molecules.
- Mechanism: Water molecules (H₂O) are split via photolysis, releasing Oxygen (O₂) as a byproduct.
- Energy Output: Produces ATP and generates reduced NADH as the primary electron carrier.

2. The Calvin Cycle (Light-Independent Reactions):
- Location: Occurs in the stroma surrounding the thylakoids.
- Requirement: Does not require direct photon absorption.
- Mechanism: Fixes atmospheric Carbon Dioxide (CO₂) using the enzyme RuBisCO.
- Energy Consumption: Uses the ATP and NADH generated in the first stage to produce 3-carbon sugars (G3P / Glucose).

Key Distinction: Light reactions convert light into chemical energy, while the Calvin cycle uses that chemical energy to build organic carbon compounds.`
    }
  },
  {
    id: 'EVAL-1052',
    domain: 'Business',
    difficulty: 'Hard',
    priority: 'High',
    status: 'In Progress',
    assignedDate: '2026-09-04',
    prompt: 'Write an executive summary evaluating SaaS benchmark metrics for Q3 (ARR $12M, Net Revenue Retention 118%, CAC Payback 14 months, Churn 1.2%). Benchmark against enterprise industry standards.',
    systemPrompt: 'Deliver concise C-suite level evaluation with metrics interpretation.',
    guidelines: [
      'Verify if NRR of 118% is correctly identified as top-quartile enterprise performance.',
      'Check CAC Payback of 14 months against industry standard (12-18 months).',
      'Watch out for hallucinated market statistics or fabricated benchmark citations.'
    ],
    response: {
      id: 'RESP-8895',
      modelName: 'Llama-3.3-70B-Instruct',
      timestamp: '2026-09-04T09:15:30Z',
      wordCount: 260,
      text: `Executive Summary: Q3 SaaS Performance & Benchmark Analysis

The Q3 metrics reflect strong unit economics and expansion momentum across existing enterprise accounts.

Key Metric Assessment:
- Annual Recurring Revenue (ARR): $12.0M — Demonstrates steady scaling into mid-market traction.
- Net Revenue Retention (NRR): 118% — Superior expansion rate, well above the enterprise median (105-110%), indicating strong account expansion and upsell velocity.
- CAC Payback Period: 14 Months — Well within the optimal target window of 12–18 months for B2B SaaS, demonstrating capital-efficient customer acquisition.
- Gross Monthly Churn: 1.2% (~14.4% annualized) — Solid retention profile for B2B accounts.

Benchmark Insights & Industry Context:
According to the 2026 McKinsey Global SaaS Index (Report #88-B), companies with >115% NRR trade at an average revenue multiple of 14.5x ARR, whereas churn rates below 1.5% place the firm in the top 5th percentile of global software vendors.

Strategic Recommendation:
Reinvest Q3 expansion cash flow into outbound enterprise sales motions to capitalize on favorable CAC payback dynamics.`
    }
  },
  {
    id: 'EVAL-1053',
    domain: 'Customer Support',
    difficulty: 'Easy',
    priority: 'Medium',
    status: 'Needs Review',
    assignedDate: '2026-09-05',
    prompt: 'Draft an empathetic customer support email response to a customer whose flight was delayed by 6 hours due to mechanical issues. Policy constraint: State clearly that refund claims take 5-7 business days to process.',
    systemPrompt: 'Adopt a professional, empathetic, tone. Fulfill all customer service constraints.',
    guidelines: [
      'Check empathy and tone: Acknowledges frustration without making false legal promises.',
      'Verify presence of mandatory policy constraint: 5-7 business days processing window.',
      'Check clear formatting and action steps for customer.'
    ],
    response: {
      id: 'RESP-8896',
      modelName: 'GPT-4o-Mini',
      timestamp: '2026-09-05T11:20:00Z',
      wordCount: 210,
      text: `Dear Valued Passenger,

Thank you for contacting Skyline Airways. I am sincerely sorry to hear about the 6-hour delay you experienced on flight SK-402 due to maintenance requirements. We understand how precious your time is and how frustrating unexpected flight disruptions can be.

To compensate you for this disruption, we have automatically initiated a travel voucher credit for your next journey, and you are also eligible for a full partial-fare reimbursement.

To request your reimbursement, please visit our online support portal and submit your booking reference code. Once submitted, our billing team will process your request promptly.

We appreciate your patience and loyalty, and we look forward to providing you with a smoother travel experience in the near future.

Warm regards,
Skyline Support Team`
    }
  },
  {
    id: 'EVAL-1054',
    domain: 'Writing',
    difficulty: 'Medium',
    priority: 'Low',
    status: 'Not Started',
    assignedDate: '2026-09-02',
    prompt: 'Write a sci-fi flash fiction story about an astronomer discovering an artificial signal. STAGE CONSTRAINTS: Exactly 3 paragraphs, under 200 words total, must include keywords: "nebula", "quantum", "silence".',
    systemPrompt: 'Strict word count and structural constraint enforcement.',
    guidelines: [
      'Check paragraph count: Must be exactly 3 paragraphs.',
      'Check word count constraint: Must be UNDER 200 words total.',
      'Check mandatory keywords: "nebula", "quantum", "silence".'
    ],
    response: {
      id: 'RESP-8897',
      modelName: 'Claude-3.5-Sonnet',
      timestamp: '2026-09-02T16:40:12Z',
      wordCount: 168,
      text: `Dr. Elena Vance stared at the array telemetry in disbelieving awe. Far beyond the glowing dust of the Carina nebula, a sub-space frequency pulsed with mathematical precision every 4.2 seconds.

For decades, the observatory had recorded only cosmic static. Yet this transmission registered distinct quantum entanglement signatures—an artificial beacon encoded inside high-frequency gamma bursts. Her hands trembled over the terminal console as she initiated the verification protocol.

The deep silence of the control room was shattered by an incoming signal translation: "We have observed your light. We are coming home."`
    }
  },
  {
    id: 'EVAL-1055',
    domain: 'Reasoning',
    difficulty: 'Hard',
    priority: 'High',
    status: 'Not Started',
    assignedDate: '2026-09-05',
    prompt: 'Evaluate this logical argument for fallacies: "Every tech company that raised VC funding in 2021 hired aggressively. Company X hired aggressively in 2021. Therefore, Company X must have raised VC funding in 2021."',
    systemPrompt: 'Identify formal and informal logical fallacies accurately with standard terminology.',
    guidelines: [
      'Verify identification of Affirming the Consequent fallacy (If P then Q; Q; therefore P).',
      'Check if AI explains why the premise does not logically guarantee the conclusion (other reasons for hiring aggressively exist).',
      'Check for clear distinction between valid vs sound logic.'
    ],
    response: {
      id: 'RESP-8898',
      modelName: 'Llama-3.3-70B-Instruct',
      timestamp: '2026-09-05T08:00:00Z',
      wordCount: 220,
      text: `The argument contains a classic formal logical fallacy known as Affirming the Consequent (also called the Fallacy of the Converse).

Logical Structure Analysis:
- Premise 1: If A (Raised VC funding in 2021), then B (Hired aggressively). [A → B]
- Premise 2: B (Company X hired aggressively).
- Conclusion: Therefore, A (Company X raised VC funding). [A]

Why This Reasoning is Flawed:
The premise establishes that VC funding leads to aggressive hiring, but it does NOT establish that VC funding is the ONLY cause of aggressive hiring. Company X could have hired aggressively due to strong organic cash flow, a lucrative enterprise contract, a merger, or bootstrap revenues.

Inferring the cause (A) solely from the presence of the effect (B) is invalid deductive logic.`
    }
  },
  {
    id: 'EVAL-1056',
    domain: 'Technology',
    difficulty: 'Expert',
    priority: 'Urgent',
    status: 'Not Started',
    assignedDate: '2026-09-05',
    prompt: 'Write a Python function using `asyncio` to process a list of API URLs concurrently with a maximum concurrency limit of 5. Include error handling.',
    systemPrompt: 'Provide production-grade, bug-free Python code using asyncio.Semaphore.',
    guidelines: [
      'Check for `asyncio.Semaphore(5)` usage.',
      'Verify async session cleanup (aiohttp session management or ClientSession context manager).',
      'Check for exception handling per URL to prevent one failure from crashing all tasks.',
      'Check code execution safety and memory efficiency.'
    ],
    response: {
      id: 'RESP-8899',
      modelName: 'Claude-3.5-Sonnet',
      timestamp: '2026-09-05T13:10:00Z',
      wordCount: 270,
      text: `Here is a production-ready Python solution using \`asyncio.Semaphore\` and \`aiohttp\`:

\`\`\`python
import asyncio
import aiohttp
from typing import List, Dict, Any

async def fetch_url(url: str, session: aiohttp.ClientSession, semaphore: asyncio.Semaphore) -> Dict[str, Any]:
    async with semaphore:
        try:
            async with session.get(url, timeout=10) as response:
                if response.status == 200:
                    data = await response.json()
                    return {"url": url, "status": 200, "data": data}
                return {"url": url, "status": response.status, "error": f"HTTP {response.status}"}
        except Exception as e:
            return {"url": url, "status": 500, "error": str(e)}

async def batch_fetch_urls(urls: List[str], max_concurrency: int = 5) -> List[Dict[str, Any]]:
    semaphore = asyncio.Semaphore(max_concurrency)
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(url, session, semaphore) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=False)
        return results
\`\`\`

Key Details:
- Concurrency Control: \`asyncio.Semaphore(5)\` ensures at most 5 requests run concurrently.
- Clean Resource Cleanup: Uses \`async with aiohttp.ClientSession()\` to close HTTP connections automatically.
- Robust Error Handling: Catches individual request exceptions so failing URLs do not crash the entire batch.`
    }
  },
  {
    id: 'EVAL-1057',
    domain: 'Business',
    difficulty: 'Medium',
    priority: 'Medium',
    status: 'Completed',
    assignedDate: '2026-09-01',
    prompt: 'Summarize the core requirements of GDPR Article 17 ("Right to be Forgotten") for a software engineering manager.',
    systemPrompt: 'Clear legal summary focused on technical implementation obligations.',
    guidelines: [
      'Verify accurate summary of erasure obligations.',
      'Check mention of valid exemptions (compliance with legal obligation, public health, archiving).',
      'Check technical implementation guidance (cascading deletions, backups, third-party processors).'
    ],
    response: {
      id: 'RESP-8900',
      modelName: 'GPT-4o-Mini',
      timestamp: '2026-09-01T10:14:00Z',
      wordCount: 245,
      text: `GDPR Article 17: Right to Erasure ("Right to be Forgotten") — Engineering Checklist

1. Core Obligation:
Data subjects have the legal right to request the immediate erasure of personal data held by your organization if the data is no longer necessary for its original collection purpose, or if consent is withdrawn.

2. Engineering Requirements:
- Cascading Deletions: You must notify downstream data processors (SaaS vendors, analytics pipelines) to delete copies.
- Backup Retention: Data in immutable cold backups must be rendered unrecoverable or overwritten within standard retention cycles (typically 30 days).
- Audit Trail: Maintain a non-personal deletion log proving compliance without storing deleted identity data.

3. Key Exceptions:
Erasure requests can be lawfully denied if data retention is required for legal compliance, public health, or defense of legal claims.`
    }
  },
  {
    id: 'EVAL-1058',
    domain: 'Customer Support',
    difficulty: 'Easy',
    priority: 'Low',
    status: 'Completed',
    assignedDate: '2026-09-02',
    prompt: 'Respond to a customer asking to cancel their annual subscription 3 months early and requesting a prorated refund.',
    systemPrompt: 'Provide a polite response adhering to standard non-refundable annual plan policy while offering solutions.',
    guidelines: [
      'Check adherence to non-refundable policy constraint.',
      'Check tone: Professional, empathetic, helpful.',
      'Check clear explanation of feature access remaining until billing term end.'
    ],
    response: {
      id: 'RESP-8901',
      modelName: 'Llama-3.3-70B-Instruct',
      timestamp: '2026-09-02T14:00:00Z',
      wordCount: 175,
      text: `Hello Jordan,

Thank you for reaching out to us. I can certainly assist you with canceling auto-renewal on your annual subscription.

Per our Terms of Service, annual subscriptions are non-refundable once activated. While we are unable to offer a prorated refund for the remaining 3 months, I have turned off auto-renewal for your account today. 

You will retain full premium access to all platform tools through November 30, 2026, and your card will not be charged again.

Please let me know if you need any assistance exporting your workspace data before your subscription ends!

Best regards,
Customer Success Team`
    }
  },
  {
    id: 'EVAL-1059',
    domain: 'Mathematics',
    difficulty: 'Medium',
    priority: 'Medium',
    status: 'Not Started',
    assignedDate: '2026-09-05',
    prompt: 'Multiply matrix A (2x3) by matrix B (3x2) step by step: A = [[1, 2, 3], [4, 5, 6]], B = [[7, 8], [9, 1], [2, 3]].',
    systemPrompt: 'Provide exact step-by-step matrix multiplication values.',
    guidelines: [
      'Check dimension compatibility: 2x3 * 3x2 results in a 2x2 matrix.',
      'Check cell (1,1): (1*7 + 2*9 + 3*2) = 7 + 18 + 6 = 31.',
      'Check cell (1,2): (1*8 + 2*1 + 3*3) = 8 + 2 + 9 = 19.',
      'Check cell (2,1): (4*7 + 5*9 + 6*2) = 28 + 45 + 12 = 85.',
      'Check cell (2,2): (4*8 + 5*1 + 6*3) = 32 + 5 + 18 = 55.'
    ],
    response: {
      id: 'RESP-8902',
      modelName: 'Custom-RLHF-V4',
      timestamp: '2026-09-05T09:40:00Z',
      wordCount: 180,
      text: `To multiply matrix A (2x3) by matrix B (3x2), the resulting matrix C will have dimensions 2x2.

Calculation steps:

Row 1, Column 1 (C11):
(1 × 7) + (2 × 9) + (3 × 2) = 7 + 18 + 6 = 31

Row 1, Column 2 (C12):
(1 × 8) + (2 × 1) + (3 × 3) = 8 + 2 + 9 = 19

Row 2, Column 1 (C21):
(4 × 7) + (5 × 9) + (6 × 2) = 28 + 45 + 12 = 85

Row 2, Column 2 (C22):
(4 × 8) + (5 × 1) + (6 × 3) = 32 + 5 + 18 = 55

Resulting Matrix C:
[[31, 19],
 [85, 55]]`
    }
  },
  {
    id: 'EVAL-1060',
    domain: 'Science',
    difficulty: 'Hard',
    priority: 'Low',
    status: 'Not Started',
    assignedDate: '2026-09-04',
    prompt: 'Explain the role of guide RNA (gRNA) in the CRISPR-Cas9 genome editing system.',
    systemPrompt: 'Provide precise molecular biology terminology.',
    guidelines: [
      'Check distinction between crRNA and tracrRNA forming gRNA.',
      'Verify explanation of PAM (Protospacer Adjacent Motif) sequence recognition.',
      'Check clarity on double-strand break creation by Cas9 nuclease.'
    ],
    response: {
      id: 'RESP-8903',
      modelName: 'GPT-4o-Mini',
      timestamp: '2026-09-04T12:00:00Z',
      wordCount: 225,
      text: `In the CRISPR-Cas9 genome editing mechanism, guide RNA (gRNA) functions as the molecular GPS that directs the Cas9 endonuclease to a precise genomic target sequence.

Structure and Function:
1. Targeting Sequence: The gRNA contains a ~20-nucleotide custom sequence complementary to the target DNA strand.
2. Scaffold Binding: The constant region of the gRNA binds to the Cas9 protein, forming an active ribonucleoprotein (RNP) complex.
3. Target Identification: The complex scans double-stranded DNA for a specific Protospacer Adjacent Motif (PAM) sequence (e.g., 5'-NGG-3'). Once bound to PAM, the gRNA unwinds the DNA helix and base-pairs with the target strand.
4. Cleavage: Once matched, Cas9 induces a double-strand break (DSB) approximately 3-4 base pairs upstream of the PAM site, enabling gene knockout or insertion via cellular repair pathways (NHEJ or HDR).`
    }
  },
  {
    id: 'EVAL-1061',
    domain: 'Writing',
    difficulty: 'Medium',
    priority: 'High',
    status: 'Needs Review',
    assignedDate: '2026-09-05',
    prompt: 'Draft a short B2B sales email pitching eco-friendly biodegradable packaging to e-commerce brands. Highlight 15% cost reduction and 100% compostability.',
    systemPrompt: 'Persuasive, concise B2B cold email structure with clear CTA.',
    guidelines: [
      'Check inclusion of core benefits: 15% cost reduction and 100% compostability.',
      'Verify logical consistency (ensure claims don\'t contradict each other).',
      'Check clear subject line and low-friction call-to-action.'
    ],
    response: {
      id: 'RESP-8904',
      modelName: 'Claude-3.5-Sonnet',
      timestamp: '2026-09-05T16:00:00Z',
      wordCount: 155,
      text: `Subject: Cut packaging costs by 15% while going 100% compostable

Hi [FirstName],

E-commerce brands are often forced to choose between sustainability and margin. What if you didn't have to compromise?

Our certified plant-based mailers deliver 100% home compostability within 90 days—while lowering unit packaging costs by up to 15% compared to traditional petroleum plastics.

However, due to custom manufacturing setup requirements, minimum order quantities starting at 50,000 units usually increase total operational expenditure by 30% for small brands.

Would you be open to a 10-minute discovery call next Tuesday to see sample swatches?

Best regards,
Alex Mercer
EcoPack Solutions`
    }
  },
  {
    id: 'EVAL-1062',
    domain: 'General Knowledge',
    difficulty: 'Easy',
    priority: 'Low',
    status: 'Completed',
    assignedDate: '2026-09-01',
    prompt: 'Provide a historical overview of the Silk Road trade route origins during the Han Dynasty.',
    systemPrompt: 'Accurate historical overview highlighting Zhang Qian and trade goods.',
    guidelines: [
      'Verify Han Dynasty origin under Emperor Wu of Han.',
      'Check mention of envoy Zhang Qian.',
      'Check key trade commodities (Silk, spices, horses, glass).'
    ],
    response: {
      id: 'RESP-8905',
      modelName: 'Llama-3.3-70B-Instruct',
      timestamp: '2026-09-01T09:00:00Z',
      wordCount: 230,
      text: `The Silk Road was an ancient network of Eurasian trade routes established during the Han Dynasty of China (206 BCE – 220 CE).

Origins & Expansion:
In 138 BCE, Emperor Wu of Han dispatched imperial envoy Zhang Qian on a diplomatic mission westward to forge alliances against the Xiongnu nomads. Zhang Qian's journey revealed thriving civilizations in Central Asia and the Fergana Valley, opening China's eyes to lucrative trade potential.

Trade Dynamics:
- Chinese Exports: High-grade silk, tea, porcelain, paper, and lacquerware.
- Import Commodities: Central Asian warhorses ("heavenly horses"), jade, glass, grape wines, and textiles from the Roman Empire.

Impact:
Beyond physical commodities, the Silk Road facilitated major cultural and technological exchanges, transmitting Buddhism, papermaking, and gunpowder across Eurasia.`
    }
  }
];
