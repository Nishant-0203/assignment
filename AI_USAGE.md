# AI Usage Declaration 🤖✍️

This document outlines the usage of Artificial Intelligence (AI) assistants in the development, architecture design, coding, styling, and verification of **GemFinder Pro**.

---

## 🛠️ AI Tools Utilized

- **Primary Assistant**: Antigravity, an advanced agentic coding assistant powered by Gemini.
- **Contextual Scope**: Project-wide scaffolding, API routing, MongoDB data schema designs, state management logic, UI styling, and automated data seeding.

---

## 🤝 Human-AI Collaboration Model

The codebase represents a modern collaborative workflow. Tasks were distributed as follows:

### 1. Code Generation & Scaffolding (AI-Driven)
- Scaffolding of the Node.js / Express backend router mappings.
- Designing Mongoose database models ([User](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/models/User.js), [Gemstone](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/models/Gemstone.js), and [Recommendation](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/models/Recommendation.js)).
- Writing the recommendation engine logic ([backend/utils/engine.js](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/utils/engine.js)) to calculate matching scores.
- Scaffolding React page components ([RecommendForm](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/frontend/src/pages/RecommendForm.jsx), [AdminDashboard](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/frontend/src/pages/AdminDashboard.jsx), etc.).

### 2. UI/UX Design & Styling (AI & Human Directives)
- Implementation of a premium theme (glassmorphism dashboard cards, clean forms, responsive layout configurations).
- Configuration of Tailwind CSS presets and colors.
- Styling interactive components (navbar menus, buttons, modal forms).

### 3. Review, Debugging, & Quality Verification (Human & AI Collaboration)
- Testing of authentication states and local storage session tokens.
- Validation of JWT interceptor request injections ([frontend/src/services/api.js](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/frontend/src/services/api.js)).
- Inspection of Express endpoints for robust error handling.

---

## 📈 Codebase Contribution Estimates

Below is a breakdown of the estimated contribution distribution:

| Layer / Component | AI-Generated Code (%) | Human Review & Refinement (%) |
| :--- | :---: | :---: |
| **Backend API Routing & Controllers** | 90% | 10% |
| **Recommendation Engine Scorer** | 95% | 5% |
| **Mongoose Database Schemas** | 95% | 5% |
| **React Components & UI Layout** | 85% | 15% |
| **React Context & API Services** | 90% | 10% |
| **Documentation & Guides** | 100% | 0% |

---

## 🔍 Verification & Integrity Procedures

To ensure that AI-generated code meets strict security, readability, and functional standards, the following guidelines were applied:

1. **Secret Management Verification**: Assured that all credentials (JWT secrets, DB connection keys) are loaded strictly through system environment variables (`.env`) and never hardcoded in the codebase.
2. **Robust Password Hashing**: Verified that password hashing is handled securely inside mongoose pre-save hooks (`bcryptjs`) before persistence.
3. **Cross-Origin Access Control**: Validated that `cors` middleware configurations align with security practices between frontend and backend ports.
4. **No Placeholders**: Assured all seeded imagery links and user dashboards display complete datasets, avoiding dummy texts and incomplete layouts.
