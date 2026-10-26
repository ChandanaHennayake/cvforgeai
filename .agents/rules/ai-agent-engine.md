# AI Agent & Intelligence System Rules

## 1. AI Integration Architecture
- Unify AI HTTP communication on a single, resilient `HttpClient` factory registered with `Polly` for retry policies and transient failure handling.
- OpenRouter API endpoints must use modern, reliable LLM models (e.g. `deepseek/deepseek-chat`, `anthropic/claude-3.5-sonnet`, `openai/gpt-4o-mini`). Avoid deprecated or low-capability models for complex reasoning.

## 2. Structured JSON Output Guidelines
- When querying the AI for structured data (e.g., ATS scoring, job match matrices, keyword suggestions):
  - Provide a strict JSON schema in the system prompt.
  - Set prompt directives instructing the model to output valid, raw JSON only.
  - Implement resilient JSON parsing that sanitizes markdown wrappers (````json ... ````) and handles trailing commas or minor syntax irregularities before deserialization.
  - Include fallback defaults so an AI parsing error does not break the user flow.

## 3. Resume Intelligence & ATS Scoring Criteria
CvForgeAI's scoring engine must evaluate:
1. **Completeness & Structure**: Contact info, summary, education, experience, projects, skills.
2. **Impact & Metrics**: Action verbs (e.g., "Led", "Architected", "Engineered") and quantifiable achievements (% improvement, revenue, latency reduction).
3. **Keyword Density**: Core domain skills matched against industry standards and job description requirements.
4. **Readability & ATS Format**: Standard section headers, bullet point clarity, and clean formatting without unparseable glyphs.

## 4. Multi-Agent Workflows in CvForgeAI
Future features should support dedicated AI agent workflows:
- **CV Writer Agent**: Transforms raw notes/bullet points into high-impact executive statements.
- **ATS Optimizer Agent**: Analyzes recruiter parsing bottlenecks and fixes keyword deficiencies.
- **Job Match Tailor Agent**: Compares a user's resume against a pasted job specification, providing tailored bullet points and missing skill alerts.
- **Career Interview Prep Agent**: Generates mock interview questions based on the generated resume and target role.
