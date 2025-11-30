---
title: Axiotic.ai Website Codebase
created_date: "2025-11-27"
last_updated_date: "2025-11-27"
finished_date: "YYYY-MM-DD"
---

## Axiotic.ai — Research Lab Website

This codebase contains the static website for **Axiotic.ai**, the research lab evolving from the Alba Labs concept.

### Mission (Draft)

We pursue a simple but radical premise: **intelligence emerges from structure, interaction, and information — not from piling more parameters on a transformer.**

Our goal with this site is to clearly communicate:

- The **research thesis** (beyond the plateau; smarter, not bigger).
- The **pillars** of the Axiotic research agenda.
- The **lab’s operating model**, culture, and opportunities.

### Layout

- `public/` — Static assets served as-is (HTML, CSS, JS).
- `public/index.html` — Main landing page (hero, mission, pillars).
- `public/styles.css` — Simple, modern styling for the landing page.
- `demo_validate_homepage.py` — Small demo script to validate that the homepage contains the core mission statement.

### Getting Started

No build step is required. You can open `public/index.html` directly in a browser, or serve the folder with any static file server.

Example (Python 3):

```bash
cd 15_codebases/axiotic-website
python -m http.server 8000 --directory public
```


