# Axiotic Website Development Process & Decisions

**Prepared for:** Laura Vergara  
**Date:** November 27, 2025  
**Objective:** To document the evolution of the Axiotic (formerly Synentropic) website, including design choices, copy iterations, and strategic pivots.

---

## 1. Initial Scope & Philosophy

### The Core Thesis
The project began with a clear directive: **"We've plateaued."**
- **Concept:** The current AI paradigm (scaling laws, massive transformers) is hitting diminishing returns.
- **Opportunity:** Success lies in "Smarter, Not Bigger."
- **Strategy:** A dual-arm model combining an **Open Research Lab** (the "Soul") and a **Strategic Consultancy** (the "Engine").

### The Original Name: "Synentropic"
- **Meaning:** The tendency towards order, complexity, and self-organization (opposite of entropy).
- **Pivot:** Later rebranded to **Axiotic** to move away from made-up jargon towards a cleaner, more "axiomatic" feel.

---

## 2. Design Evolution

We explored multiple visual themes before settling on the current direction.

### The "10 Designs" Experiment
We generated 10 distinct design variants to find the right aesthetic:
1.  **Design 01 (Glass Dark):** Heavy blur effects, two-column layout.
2.  **Design 02 (Split Hero):** Hero band with chips on the right.
3.  **Design 03 (Minimal Column):** "Research note" style.
4.  **Design 04 (Banner):** Pill tags and chip cloud.
5.  **Design 05 (Centered):** Classic centered hero.
6.  **Design 06 (Compact Strip):** Gradient strip + cards.
7.  **Design 07 (Card Stack):** Stacked cards with pill pillars.
8.  **Design 08 (Wide Layout):** Hero meta column.
9.  **Design 09 (Narrow):** Text-heavy.
10. **Design 10 (Tight Grid):** Tight two-column grid.

### The Winner: Design 11 (LeRobot-Inspired)
- **Inspiration:** The "LeRobot Edinburgh Hackathon" page.
- **Key Features:**
    - **Dark Slate Theme:** `bg-slate-900` text `slate-50` (brighter than pitch black).
    - **Card-Based Layout:** Rounded corners, borders, slight elevation (`rounded-2xl`, `border-slate-800`).
    - **Particle Effects:** A "brighter" particle background (amber/gold particles) to give life to the dark theme.
    - **Typography:** `Inter` font, clean hierarchy.
    - **"Gradient Text":** Amber-to-orange gradients for key phrases.

**User Feedback on Design:**
> "the new theme should be made the default... also the background cool effects are missing... make the main page more bright"
> "make them stand out more... learn from @lerobot-edinbugh"

---

## 3. Copywriting & Positioning: The Iteration Process

We went through rigorous rounds of "Option Generation -> Selection -> Refinement" for every major page.

### A. Home Page (Landing)

**The Pivot:** Move from generic "Efficiency" to specific "Dual-Arm Synergy."

**Options Presented (Hero Subtitle):**
1. "Synentropic.ai creates a tight synergy..." (Focus on white-glove + open research).
2. "We pair an open research lab..."
3. "Our lab develops efficient, multimodal..."
... (and 7 others)

**Selection (Option 1 modified):**
> "Axiotic.ai creates a tight synergy between a white‑glove consulting practice and an open research lab: we don’t believe in ever‑bigger models; we believe in better architectures, learning tasks, and training algorithms—and in shipping systems that actually ship."

**The "Philosophy" Line:**
**User Request:** "Beyond Scaling: Smarter Learning, Not Bigger Models"
**Result:** Added as the primary H1, with the specific pitch line:
> "We believe intelligence emerges from structure, interaction, and information — not from piling more parameters on a transformer."

**User Feedback on CTAs:**
> "make the Design a cost efficient etc be more clear so that customers know they need to click that to request our services"
**Result:** CTA changed to **"Request Consulting: Cost‑Efficient AI Strategy"**.

---

### B. Consulting Page

**The Pivot:** Move away from "Audit" (which sounds punitive) to "Opportunity & Strategy."

**Key Strategic Directive:**
> "Companies either want to learn if AI can be useful... or they know they want it but need experts... or they want to hire a team... or they have a team but lack skills."

**This shaped the "4 Jobs" Framework:**
1.  **Not sure where to start?** -> AI Opportunities & Strategy Plan.
2.  **Want systems, not headcount?** -> White-glove builds.
3.  **Want to build a team?** -> Hiring & Org Design.
4.  **Have a team, but not frontier?** -> Upskilling & Governance.

**The "Audit" Naming Issue:**
**User Feedback:** "The word Audit should only be used in the context of AI governance... it may confuse customers."
**Result:** Flagship product renamed to **"AI Opportunities & Strategy Plan"**. "Audit" is now strictly a sub-component for governance/risk.

**The "Fixed Price" Correction:**
**User Feedback:** "there is no fixed price 2-week whatever... we meet for a free consultation to assess needs and go from there"
**Result:** Removed "fixed-price 2-week" language. Flow is now: **Free Consultation -> Co-designed Plan -> Engagement.**

**Service Pillars:**
We structured the services into 4 clear cards (visually distinct):
1.  **Models, Data & Evaluation Loops** (The core technical work).
2.  **Education & Upskilling**.
3.  **Hiring & Org Design**.
4.  **AI Governance & Safety**.

---

### C. Research Lab Page

**The Pivot:** Kill the jargon ("Synentropic Research") and use real scientific terms.

**User Feedback:**
> "what the fuck does 'Open Synentropic Research' even mean... Use research appropriate words"

**Options Presented:**
1. "Open Research on Efficient AI Systems"
2. "The Physics of Efficient Learning"
... (and 8 others)

**Selection (Option 1):** **"Open Research on Efficient AI Systems"**

**Refining the "How Learning Works" nuance:**
**User Feedback:** "the structure, interaction and information isn't how the models learn, it's how learning works in general"
**Result:** Copy updated to:
> "Our research agenda focuses on compact (sub‑1B) models and how learning can be framed in terms of structure, interaction, and information across modalities..."

**The 7+1 Pillars:**
Defined and listed explicitly:
1.  Improved Learning Tasks
2.  Multimodal Alignment
3.  Memory & Conditional Recursion
4.  Hierarchical Attention
5.  Layer-Wide Attention
6.  AI-Assisted Data Loops
7.  Embodied Intelligence
8.  Evolution & Nature-Inspired Learning

---

### D. Team Page

**Structure:**
- **Hero:** "The Axiotic Core Team" - focusing on seniority and shipping experience.
- **"How We Work":** A breakdown of the flywheel in motion (Leads -> Scope -> Build -> Audit -> Train -> Lego Blocks).
- **Role Grid:** Specific "Flywheel Functions" for every member (Antreas, Sam, Fady, Patrick, Andreas, Pavlos, Laura, Thomas).

---

## 4. The Rebrand: Synentropic -> Axiotic

**User Directive:** "change the name to Axiotic"

**Actions Taken:**
1.  Global find-and-replace of "Synentropic" to "Axiotic".
2.  Renamed repo folder to `axiotic-website`.
3.  Updated titles, footers, and nav bars.
4.  Preserved the "Synentropic" references *only* where referring to the specific concept/name of the previous research philosophy, but rebranded the entity itself.

---

## 5. Current State

- **Default Theme:** "Design 11" (LeRobot inspired) is now the *only* theme.
- **Navigation:** Sticky top bar with "Home", "Research Lab", "Consulting & Flywheel", "Team".
- **Visuals:** Dark slate background, amber accents, particle effects, card-based grids.
- **Content:**
    - **Home:** Synergy focus + Philosophy.
    - **Consulting:** "Jobs to be done" framework + Free Consult form.
    - **Lab:** 8 Pillars + Open Science commitment.
    - **Team:** Roles & Flywheel mechanics.

---

## 6. Next Steps (For Laura / Team)

- **Content:** Review the "Free Consultation" form fields (currently just frontend).
- **Resources:** The "Resources" or "Blog" section is currently placeholder/omitted for v1.
- **Social Proof:** No client logos or case studies are currently implemented.

