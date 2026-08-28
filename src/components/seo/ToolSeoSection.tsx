import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { TOOL_SEO_DATA } from '../../utils/toolSeoData';
import { TOOLS } from '../../utils/toolsData';
import { ToolMetadata } from '../../types/tools';
import { useApp } from '../../context/AppContext';

interface ToolSeoSectionProps {
  tool: ToolMetadata;
}

export const ToolSeoSection: React.FC<ToolSeoSectionProps> = ({ tool }) => {
  const { setActiveToolId } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const seoData = TOOL_SEO_DATA[tool.id];
  const relatedTools = TOOLS.filter(
    t => t.category === tool.category && t.id !== tool.id
  ).slice(0, 3);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  if (!seoData) {
    return null;
  }

  return (
    <section aria-label={`${tool.name} Guide and FAQs`} className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6">
      {/* SEO & Guide Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Section Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Guide & Calculation Rules</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {seoData.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client-Side Private</span>
            </div>
          </div>
        </div>

        {/* Overview Paragraphs */}
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          <p>{seoData.overview}</p>
        </div>

        {/* Formula Box */}
        {seoData.formula && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Calculator className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Calculation Formula & Method</span>
            </div>
            <pre className="font-mono text-xs text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {seoData.formula}
            </pre>
          </div>
        )}

        {/* Step-by-Step Guide */}
        {seoData.stepByStep && seoData.stepByStep.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>How It Works: Step-by-Step</span>
            </h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
              {seoData.stepByStep.map((step, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex gap-2.5 items-start"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Worked Example */}
        {seoData.example && (
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/40 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Real-World Worked Example</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Scenario:</strong> {seoData.example.scenario}
            </p>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-brand-100 dark:border-brand-900">
              {seoData.example.calculation}
            </div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <strong>Result:</strong> {seoData.example.result}
            </p>
          </div>
        )}

        {/* Tool FAQs Accordion */}
        {seoData.faqs && seoData.faqs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-2">
              {seoData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3 sm:p-4 flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                      <p className="pt-2">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="pt-2 flex items-center gap-1.5 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {tool.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Category Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            More {tool.category.replace('-', ' ')} Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map(rTool => (
              <button
                key={rTool.id}
                onClick={() => {
                  setActiveToolId(rTool.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-all group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 flex items-center justify-between">
                    <span>{rTool.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {rTool.shortDesc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
