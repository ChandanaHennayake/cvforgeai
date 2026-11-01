"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  Target,
  Download,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  Sliders,
  Layers,
  Award,
  ChevronRight,
  UserCheck
} from "lucide-react";

export default function HomePage() {
  // Live Demo State
  const [activeTemplate, setActiveTemplate] = useState("classic-ats");
  const [candidateName, setCandidateName] = useState("Alex Rivera");
  const [headline, setHeadline] = useState("Senior Full-Stack & AI Systems Engineer");
  const [summary, setSummary] = useState(
    "High-impact Software Engineer with 6+ years architecting scalable cloud services and generative AI integrations. Spearheaded high-throughput microservices handling 2M+ daily requests with 99.98% uptime."
  );
  const [jobDescription, setJobDescription] = useState(
    "Seeking a Senior Engineer experienced in .NET 10, React, Distributed Caching, System Design, and LLM orchestration."
  );
  const [isPolishing, setIsPolishing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(92);

  const [skills, setSkills] = useState([
    { name: ".NET 10 / C#", matched: true },
    { name: "React 19 / Next.js", matched: true },
    { name: "Distributed Systems", matched: true },
    { name: "OpenRouter LLMs", matched: true },
    { name: "QuestPDF Engine", matched: true },
    { name: "Kubernetes & Docker", matched: false },
  ]);

  const [bulletPoint, setBulletPoint] = useState(
    "Built backend services and added AI features to make the application faster."
  );
  const [polishedBullet, setPolishedBullet] = useState<string | null>(null);

  const handlePolishBullet = () => {
    setIsPolishing(true);
    setTimeout(() => {
      setPolishedBullet(
        "Architected asynchronous .NET 10 microservice pipeline integrating DeepSeek LLM, reducing latency by 44% and scaling throughput to 10k req/sec."
      );
      setIsPolishing(false);
    }, 900);
  };

  const handleRunJobMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setMatchScore(94);
      setIsMatching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <header className="relative z-20 border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-md sticky top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">CvForge<span className="text-indigo-400">AI</span></span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Career Copilot
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#live-demo" className="hover:text-white transition-colors">Live Split-Pane</a>
            <a href="#ats-engine" className="hover:text-white transition-colors">ATS Scoring</a>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              .NET 10 API Ready
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-700"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <Layers className="h-3.5 w-3.5 text-indigo-400" /> Resume Hub
            </Link>
            <Link
              href="/builder"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              Live Studio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Next-Gen AI Resume Engineering — Not a Generic Template Filler
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Transform Your Career Story into a <span className="gradient-text">Top 1% ATS Pass Rate</span> Resume
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          CvForgeAI autonomously polishes your bullet points, benchmarks against real job postings, scores your ATS readiness, and compiles high-precision QuestPDF documents.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#live-demo"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Cpu className="h-4 w-4" /> Try Live Interactive Studio
          </a>
          <button
            onClick={() => {
              const el = document.getElementById("job-tailor");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all flex items-center gap-2"
          >
            <Target className="h-4 w-4 text-pink-400" /> Test Semantic Job Matcher
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: ShieldCheck, label: "ATS Guard", desc: "98%+ Parser Compliance" },
            { icon: Sparkles, label: "AI Bullet Enhancer", desc: "Quantifiable Impact Rewrites" },
            { icon: Target, label: "Job Tailoring", desc: "Semantic Keyword Alignment" },
            { icon: Download, label: "QuestPDF Engine", desc: "Vector-Clean Exports" },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl text-left border border-slate-800/80">
              <item.icon className="h-5 w-5 text-indigo-400 mb-2" />
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Feature: Live Interactive Split-Pane Studio */}
      <section id="live-demo" className="relative z-10 py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="h-6 w-6 text-indigo-400" /> Live Split-Pane Resume Forge
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Edit on the left, watch your ATS-optimized resume adapt in real-time on the right.
            </p>
          </div>

          {/* Template Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium">Theme:</span>
            {[
              { id: "classic-ats", label: "Classic ATS" },
              { id: "modern-executive", label: "Executive Gold" },
              { id: "tech-minimal", label: "Tech Specialist" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplate(t.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTemplate === t.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Two-Pane Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Editor Pane (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Candidate Identity Card */}
            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5" /> Personal Information
                </span>
                <span className="text-[11px] text-slate-400">Auto-saved</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full mt-1 bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-300">Professional Title</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full mt-1 bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-300">Professional Summary</label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full mt-1 bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* AI Bullet Point Enhancer Studio */}
            <div className="glass-panel-elevated p-5 rounded-xl border border-indigo-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> AI Bullet Polisher
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  OpenRouter DeepSeek
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Transform casual descriptions into executive, metric-driven achievements:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-400 font-mono">
                  {bulletPoint}
                </div>

                <button
                  onClick={handlePolishBullet}
                  disabled={isPolishing}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
                >
                  {isPolishing ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Polishing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" /> Inject Quantifiable Impact
                    </>
                  )}
                </button>

                {polishedBullet && (
                  <div className="mt-3 p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/40 animate-fade-in">
                    <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="h-3 w-3" /> AI Enhanced Recommendation:
                    </div>
                    <div className="text-xs text-white leading-relaxed">{polishedBullet}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Semantic Job Tailoring Panel */}
            <div id="job-tailor" className="glass-panel p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" /> Semantic Job Tailoring
                </span>
                <span className="text-[10px] text-slate-400">Match Engine</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Paste job description requirements to benchmark and discover keyword gaps:
              </p>

              <textarea
                rows={2}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              />

              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        s.matched
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/10 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRunJobMatch}
                disabled={isMatching}
                className="mt-3 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                {isMatching ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Target className="h-3.5 w-3.5 text-pink-400" />}
                Analyze Job Description Match
              </button>
            </div>
          </div>

          {/* Right Live Canvas Pane (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Canvas Bar with ATS Gauge and Export */}
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center font-bold text-sm text-indigo-400">
                  {matchScore}%
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    ATS Pass Potential <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded">Optimal</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Calculated via Action Verbs, Skill Density & Structure
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <Download className="h-3.5 w-3.5 text-indigo-400" /> Export PDF
                </button>
              </div>
            </div>

            {/* A4 Document Preview Canvas */}
            <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 shadow-2xl flex justify-center">
              <div className="resume-paper w-full max-w-[560px] rounded-lg p-8 text-slate-800 text-xs shadow-2xl relative">
                {/* Visual Header */}
                <div className="border-b pb-4 mb-4" style={{ borderColor: activeTemplate === "modern-executive" ? "#d97706" : "#e2e8f0" }}>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">{candidateName}</h3>
                  <div className="text-xs font-semibold text-indigo-600 mt-0.5">{headline}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 mt-2">
                    <span>alex.rivera@example.com</span>
                    <span>+1 (555) 234-5678</span>
                    <span>San Francisco, CA</span>
                    <span>github.com/arivera</span>
                    <span>linkedin.com/in/arivera</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                    Professional Summary
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{summary}</p>
                </div>

                {/* Core Competencies */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                    Core Technical Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {skills.map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                    Professional Experience
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-800 text-[11px]">Senior Software Engineer</span>
                        <span className="text-[10px] text-slate-500">2023 - Present</span>
                      </div>
                      <div className="text-[10px] text-indigo-600 font-medium">Nexus Cloud Systems</div>
                      <ul className="list-disc list-inside text-[10px] text-slate-600 mt-1 space-y-1 leading-normal">
                        <li>
                          {polishedBullet || "Built backend services and added AI features to make the application faster."}
                        </li>
                        <li>
                          Engineered resilient event-driven microservices handling 2M+ daily requests with 99.98% SLA.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-800 text-[11px]">Full Stack Engineer</span>
                        <span className="text-[10px] text-slate-500">2020 - 2023</span>
                      </div>
                      <div className="text-[10px] text-indigo-600 font-medium">Vertex Logic Labs</div>
                      <ul className="list-disc list-inside text-[10px] text-slate-600 mt-1 space-y-1 leading-normal">
                        <li>
                          Developed high-performance React user interfaces reducing load times by 35%.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                    Education & Credentials
                  </div>
                  <div className="flex justify-between items-baseline text-[10px]">
                    <span className="font-bold text-slate-800">B.S. in Computer Science</span>
                    <span className="text-slate-500">UC Berkeley</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#05080f] py-8 px-6 mt-auto text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">CvForgeAI</span>
            <span>— Intelligent CV Forge & Career Copilot</span>
          </div>
          <div>.NET 10 Clean Architecture • Next.js App Router • QuestPDF • OpenRouter AI</div>
        </div>
      </footer>
    </div>
  );
}
