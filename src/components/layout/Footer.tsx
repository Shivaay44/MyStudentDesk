import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../utils/toolsData';
import { ToolCategory } from '../../types/tools';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveToolId } = useApp();

  const handleCategory = (cat: ToolCategory) => {
    setSelectedCategory(cat);
    setActiveToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The premier all-in-one workspace for Indian school, college & competitive exam students. Fast, offline-first & 100% private.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Client-Side & Private</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tool Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {CATEGORIES.slice(0, 4).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCategory(c.id)}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Exam Predictors & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveToolId('jee-predictor')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  JEE Main Rank & Percentile
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('neet-calc')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  NEET UG Score & Seat Probability
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('cbse-percentage')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  CBSE Best 5 Percentage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('attendance-calc')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  College Bunk & 75% Attendance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Productivity */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Productivity & Documents
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveToolId('pomodoro')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Pomodoro & Study Sounds
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('pdf-tools')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Client-side PDF Merger & Tools
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('qr-gen')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Note & Wi-Fi QR Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveToolId('citation-gen')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  APA / MLA / IEEE Citation Generator
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MyStudentDesk. Crafted for students everywhere.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision & passion</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
