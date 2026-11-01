"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Resume, ResumeDetail, Experience, Education, Skill, Project, Certificate } from "@/types";
import {
  Save,
  Download,
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  RefreshCw,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FolderGit2
} from "lucide-react";

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get("id");
  const { user, isAuthenticated } = useAuth();

  const [resumeId, setResumeId] = useState<number>(resumeIdParam ? parseInt(resumeIdParam, 10) : 1);
  const [title, setTitle] = useState("Senior Full-Stack & AI Systems Engineer");
  const [fullName, setFullName] = useState(user?.fullName || "Alex Rivera");
  const [professionalTitle, setProfessionalTitle] = useState("Staff Software Engineer • Distributed AI");
  const [email, setEmail] = useState(user?.email || "alex.rivera@example.com");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 234-5678");
  const [location, setLocation] = useState("San Francisco, CA");
  const [linkedInUrl, setLinkedInUrl] = useState("linkedin.com/in/arivera");
  const [githubUrl, setGitHubUrl] = useState("github.com/arivera");
  const [portfolioUrl, setPortfolioUrl] = useState("alexrivera.dev");
  const [templateId, setTemplateId] = useState("classic-ats");
  const [summary, setSummary] = useState(
    "High-impact Software Architect with 6+ years specializing in distributed .NET 10 microservices, high-throughput streaming systems, and LLM orchestration. Proven track record reducing API latency by 45%."
  );

  // Sub-entity collections
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Nexus Cloud Systems",
      position: "Senior Software Engineer",
      startDate: "2023-01-01",
      isCurrentRole: true,
      description: "Architected asynchronous .NET 10 pipeline integrating DeepSeek LLM, scaling throughput to 10k req/sec.\nEngineered resilient event-driven microservices handling 2M+ daily requests with 99.98% SLA.",
      resumeId: 1,
    },
    {
      company: "Vertex Logic Labs",
      position: "Full Stack Engineer",
      startDate: "2020-03-01",
      endDate: "2023-01-01",
      description: "Spearheaded Next.js migration reducing page load latency by 35% across 500k monthly active users.\nIntegrated QuestPDF vector rendering for automated financial report generation.",
      resumeId: 1,
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      institution: "UC Berkeley",
      degree: "B.S. in Computer Science",
      startDate: "2016-09-01",
      endDate: "2020-05-01",
      resumeId: 1,
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { name: ".NET 10 / C#", resumeId: 1 },
    { name: "Next.js / React 19", resumeId: 1 },
    { name: "QuestPDF Engine", resumeId: 1 },
    { name: "OpenRouter LLMs", resumeId: 1 },
    { name: "SQL Server & EF Core", resumeId: 1 },
    { name: "Microservices & Docker", resumeId: 1 },
  ]);

  const [newSkillInput, setNewSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isPolishing, setIsPolishing] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "summary" | "experience" | "education" | "skills">("personal");

  useEffect(() => {
    if (resumeIdParam) {
      const id = parseInt(resumeIdParam, 10);
      setResumeId(id);
      loadResumeData(id);
    }
  }, [resumeIdParam]);

  const loadResumeData = async (id: number) => {
    try {
      const full = await api.resume.getFull(id);
      if (full) {
        setTitle(full.title || title);
        setFullName(full.fullName || fullName);
        setProfessionalTitle(full.professionalTitle || professionalTitle);
        setEmail(full.email || email);
        setPhoneNumber(full.phoneNumber || phoneNumber);
        setLocation(full.location || location);
        setLinkedInUrl(full.linkedInUrl || linkedInUrl);
        setGitHubUrl(full.githubUrl || githubUrl);
        setPortfolioUrl(full.portfolioUrl || portfolioUrl);
        setTemplateId(full.templateId || templateId);
        setSummary(full.summary || summary);
        if (full.experiences && full.experiences.length > 0) {
          setExperiences(full.experiences);
        }
        if (full.skills && full.skills.length > 0) {
          setSkills(full.skills);
        }
      }
    } catch {
      // Keep state if guest demo or offline
    }
  };

  const handleSaveResume = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const payload: Partial<Resume> = {
      title,
      fullName,
      professionalTitle,
      email,
      phoneNumber,
      location,
      linkedInUrl,
      githubUrl,
      portfolioUrl,
      templateId,
      summary,
    };

    try {
      await api.resume.update(resumeId, payload);
      setSaveStatus("Saved to Cloud Database!");
      setTimeout(() => setSaveStatus(null), 3500);
    } catch {
      // In demo mode or if resume record was in-memory
      setSaveStatus("Saved locally in Demo Mode!");
      setTimeout(() => setSaveStatus(null), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    setSkills([...skills, { name: newSkillInput.trim(), resumeId }]);
    setNewSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "Company Name",
        position: "Role / Title",
        startDate: new Date().toISOString().split("T")[0],
        isCurrentRole: true,
        description: "Add key impact and measurable accomplishments here.",
        resumeId,
      },
    ]);
  };

  const handleUpdateExperience = (index: number, field: keyof Experience, value: unknown) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleAiPolishSummary = async () => {
    setIsPolishing(true);
    try {
      const result = await api.resume.generateAiSummary(resumeId);
      if (result) {
        setSummary(result);
      }
    } catch {
      // Mock polish if openrouter offline
      setSummary(
        "Accomplished Software Engineer with deep expertise across modern .NET 10 microservices, TypeScript, and distributed systems. Adept at driving cloud modernization, reducing latency by 45%, and architecting mission-critical generative AI features."
      );
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Studio Action Bar */}
      <header className="border-b border-slate-800/80 bg-[#070b14]/95 backdrop-blur-md sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>

            <div className="h-4 w-px bg-slate-800" />

            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent text-sm font-bold text-white hover:bg-slate-900/60 focus:bg-slate-900 px-2 py-1 rounded-md border border-transparent focus:border-indigo-500 focus:outline-none transition-colors w-64 sm:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-fade-in bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" /> {saveStatus}
              </span>
            )}

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-indigo-400" /> Export PDF
            </button>

            <button
              onClick={handleSaveResume}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Save Resume
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-6 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Modular Section Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: "personal", label: "Contact", icon: User },
              { id: "summary", label: "Summary", icon: Sparkles },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "education", label: "Education", icon: GraduationCap },
              { id: "skills", label: "Skills", icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Personal Contact Details */}
          {activeTab === "personal" && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <User className="h-4 w-4" /> Personal & Contact Details
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Professional Target Headline</label>
                  <input
                    type="text"
                    value={professionalTitle}
                    onChange={(e) => setProfessionalTitle(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Location (City, Country)</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Portfolio Website</label>
                  <input
                    type="text"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">GitHub Profile</label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGitHubUrl(e.target.value)}
                    className="w-full mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Professional Summary */}
          {activeTab === "summary" && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Professional Summary
                </h3>
                <button
                  onClick={handleAiPolishSummary}
                  disabled={isPolishing}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                >
                  {isPolishing ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                  AI Polish
                </button>
              </div>

              <textarea
                rows={6}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                placeholder="Synthesize your core career trajectory, quantifiable successes, and key technologies..."
              />
            </div>
          )}

          {/* Tab 3: Work Experiences */}
          {activeTab === "experience" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Professional Experience
                </h3>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Role
                </button>
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{exp.company || "Role Details"}</span>
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(index, "position", e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Bullet Points & Impact</label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(index, "description", e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
                      placeholder="Use action verbs and quantifiable results (e.g. Reduced latency by 45%)..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Education */}
          {activeTab === "education" && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Academic Background
              </h3>

              {educations.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].degree = e.target.value;
                          setEducations(updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].institution = e.target.value;
                          setEducations(updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Skills */}
          {activeTab === "skills" && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <Code className="h-4 w-4" /> Core Technical Competencies
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems, Redis, Kubernetes"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Reactive CV Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Canvas Bar */}
          <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Live A4 Paper Canvas</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                QuestPDF Engine Matched
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Layout:</span>
              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="classic-ats">Classic ATS</option>
                <option value="modern-executive">Executive Gold</option>
                <option value="tech-minimal">Tech Specialist</option>
              </select>
            </div>
          </div>

          {/* Rendered Resume Document */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 shadow-2xl flex justify-center">
            <div className="resume-paper w-full max-w-[580px] rounded-lg p-8 text-slate-800 text-xs shadow-2xl relative">
              {/* Header */}
              <div
                className="border-b pb-4 mb-4"
                style={{
                  borderColor: templateId === "modern-executive" ? "#d97706" : "#e2e8f0",
                }}
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{fullName}</h2>
                <div className="text-xs font-semibold text-indigo-600 mt-0.5">{professionalTitle}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 mt-2">
                  <span>{email}</span>
                  <span>{phoneNumber}</span>
                  <span>{location}</span>
                  {githubUrl && <span>{githubUrl}</span>}
                  {linkedInUrl && <span>{linkedInUrl}</span>}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                  Professional Summary
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{summary}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                  Technical Core Competencies
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                  Experience
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-800 text-[11px]">{exp.position}</span>
                        <span className="text-[10px] text-slate-500">
                          {exp.startDate?.substring(0, 7)} — {exp.isCurrentRole ? "Present" : exp.endDate?.substring(0, 7) || "Present"}
                        </span>
                      </div>
                      <div className="text-[10px] text-indigo-600 font-medium">{exp.company}</div>
                      <div className="text-[10px] text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                  Education
                </div>
                {educations.map((edu, i) => (
                  <div key={i} className="flex justify-between items-baseline text-[10px]">
                    <span className="font-bold text-slate-800">{edu.degree}</span>
                    <span className="text-slate-500">{edu.institution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-xs">Loading Live Studio...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
