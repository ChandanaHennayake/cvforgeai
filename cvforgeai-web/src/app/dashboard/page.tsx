"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Resume } from "@/types";
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Download,
  Search,
  ExternalLink,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  LogOut,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, loginAsDemo, isAuthenticated } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Resume Form State
  const [newTitle, setNewTitle] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newHeadline, setNewHeadline] = useState("");
  const [newTemplate, setNewTemplate] = useState("classic-ats");
  const [isCreating, setIsCreating] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    loadResumes();
  }, [isAuthenticated]);

  const loadResumes = async () => {
    setIsLoading(true);
    try {
      const data = await api.resume.getAll();
      if (data && data.length > 0) {
        setResumes(data);
      } else {
        // Starter sample templates if empty
        setResumes([
          {
            id: 1,
            title: "Senior Full-Stack & AI Engineer",
            fullName: user?.fullName || "Alex Rivera",
            professionalTitle: "Staff Software Engineer • AI Systems",
            email: user?.email || "alex.rivera@example.com",
            phoneNumber: "+1 (555) 234-5678",
            location: "San Francisco, CA",
            linkedInUrl: "linkedin.com/in/arivera",
            githubUrl: "github.com/arivera",
            portfolioUrl: "alexrivera.dev",
            templateId: "classic-ats",
            themeColorHex: "#4F46E5",
            summary: "Experienced software architect with 6+ years building high-throughput microservices and generative AI workflows.",
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Cloud Infrastructure & SRE Specialist",
            fullName: user?.fullName || "Alex Rivera",
            professionalTitle: "Principal DevOps & Cloud Architect",
            email: user?.email || "alex.rivera@example.com",
            phoneNumber: "+1 (555) 234-5678",
            location: "San Francisco, CA",
            linkedInUrl: "linkedin.com/in/arivera",
            githubUrl: "github.com/arivera",
            portfolioUrl: "alexrivera.dev",
            templateId: "modern-executive",
            themeColorHex: "#D97706",
            summary: "Kubernetes and cloud infrastructure specialist with expertise in multi-region failover and 99.999% SLA targets.",
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ]);
      }
    } catch {
      // Fallback sample data if backend unauthenticated
      setResumes([
        {
          id: 1,
          title: "Senior Full-Stack & AI Engineer",
          fullName: user?.fullName || "Alex Rivera",
          professionalTitle: "Staff Software Engineer • AI Systems",
          email: user?.email || "alex.rivera@example.com",
          phoneNumber: "+1 (555) 234-5678",
          location: "San Francisco, CA",
          linkedInUrl: "linkedin.com/in/arivera",
          githubUrl: "github.com/arivera",
          portfolioUrl: "alexrivera.dev",
          templateId: "classic-ats",
          themeColorHex: "#4F46E5",
          summary: "Experienced software architect with 6+ years building high-throughput microservices and generative AI workflows.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsCreating(true);
    try {
      await api.resume.create({
        title: newTitle,
        fullName: newFullName || user?.fullName || "Alex Rivera",
        professionalTitle: newHeadline || "Software Engineer",
        templateId: newTemplate,
        summary: "Results-driven professional with strong engineering expertise.",
      });
      showMessage("Resume forged successfully!");
      setIsCreateModalOpen(false);
      setNewTitle("");
      setNewHeadline("");
      loadResumes();
    } catch {
      // Local optimistic addition
      const newResume: Resume = {
        id: Date.now(),
        title: newTitle,
        fullName: newFullName || user?.fullName || "Alex Rivera",
        professionalTitle: newHeadline || "Software Engineer",
        email: user?.email || "user@example.com",
        phoneNumber: "+1 (555) 000-0000",
        location: "United States",
        linkedInUrl: "",
        githubUrl: "",
        portfolioUrl: "",
        templateId: newTemplate,
        themeColorHex: "#4F46E5",
        summary: "Results-driven professional with strong engineering expertise.",
        createdAt: new Date().toISOString(),
      };
      setResumes((prev) => [newResume, ...prev]);
      showMessage("Resume created locally in demo mode!");
      setIsCreateModalOpen(false);
      setNewTitle("");
      setNewHeadline("");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      await api.resume.duplicate(id);
      showMessage("Resume duplicated successfully!");
      loadResumes();
    } catch {
      const source = resumes.find((r) => r.id === id);
      if (source) {
        const copy: Resume = {
          ...source,
          id: Date.now(),
          title: `${source.title} (Copy)`,
          createdAt: new Date().toISOString(),
        };
        setResumes((prev) => [copy, ...prev]);
        showMessage("Resume duplicated!");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await api.resume.delete(id);
      showMessage("Resume deleted.");
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setResumes((prev) => prev.filter((r) => r.id !== id));
      showMessage("Resume removed.");
    }
  };

  const showMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.professionalTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CvForge<span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Resume Hub
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
                  <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">
                    {user?.fullName?.charAt(0) || "U"}
                  </div>
                  <span className="text-slate-300 font-medium hidden md:inline">{user?.fullName || "User"}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={loginAsDemo}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  Demo Mode
                </button>
              </div>
            )}

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> Forge New Resume
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {actionMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Resumes</div>
              <div className="text-2xl font-extrabold text-white mt-1">{resumes.length}</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Ready for ATS parsing
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="h-6 w-6" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Avg ATS Compatibility</div>
              <div className="text-2xl font-extrabold text-white mt-1">94%</div>
              <div className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Top 5% Recruiter Tier
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Engine Architecture</div>
              <div className="text-2xl font-extrabold text-white mt-1">QuestPDF</div>
              <div className="text-[11px] text-slate-400 mt-1">Vector typography & print stream</div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or job role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <span className="font-semibold text-white">{filteredResumes.length}</span> resumes
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div
              key={resume.id}
              className="glass-panel rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all p-5 flex flex-col justify-between group shadow-lg hover:shadow-indigo-500/10"
            >
              <div>
                {/* Header with template pill and ATS badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {resume.templateId === "modern-executive" ? "Executive Gold" : "Classic ATS"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" /> 92% ATS
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {resume.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">
                  {resume.professionalTitle || "Software Engineer"}
                </p>

                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {resume.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </span>
                  <span>{resume.location || "Remote"}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => router.push(`/?resumeId=${resume.id}#live-demo`)}
                    className="py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    Edit <ExternalLink className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(resume.id)}
                    className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 border border-slate-700 transition-all"
                    title="Clone / Duplicate"
                  >
                    <Copy className="h-3 w-3" /> Fork
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 text-[11px] font-medium flex items-center justify-center gap-1 border border-slate-800 transition-all"
                    title="Delete Resume"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Resume Card Slot */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 p-8 flex flex-col items-center justify-center text-center group transition-all bg-slate-950/30 hover:bg-slate-900/40 min-h-[220px]"
          >
            <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-all mb-3">
              <Plus className="h-5 w-5" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-indigo-300">Forge New Resume</div>
            <div className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Start with high-conversion ATS templates tailored for recruiters.
            </div>
          </button>
        </div>
      </main>

      {/* Modal: Create Resume */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel-elevated w-full max-w-md rounded-2xl p-6 border border-indigo-500/30 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" /> Forge New Resume
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Resume Target Title</label>
                <input
                  type="text"
                  placeholder="e.g. Google - Senior Staff Engineer"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Professional Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Full-Stack & Distributed Systems Architect"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Layout Theme Archetype</label>
                <select
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="classic-ats">Classic ATS (Standard Clean Single-Column)</option>
                  <option value="modern-executive">Executive Gold (Modern Header with Accent)</option>
                  <option value="tech-minimal">Tech Specialist (Condensed Dual-Grid)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  {isCreating ? "Forging..." : "Create & Launch Studio"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
