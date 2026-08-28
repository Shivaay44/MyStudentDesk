import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { CopyButton } from '../../components/common/CopyButton';
import { useApp } from '../../context/AppContext';
import { Quote, BookOpen, Globe, Video, FileText, Sparkles } from 'lucide-react';

type CitationStyle = 'apa' | 'mla' | 'chicago' | 'harvard' | 'ieee';
type SourceType = 'book' | 'journal' | 'website' | 'youtube';

export const CitationGenerator: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [style, setStyle] = useState<CitationStyle>('apa');
  const [sourceType, setSourceType] = useState<SourceType>('book');

  // Fields
  const [authorLast, setAuthorLast] = useState('Verma');
  const [authorFirst, setAuthorFirst] = useState('H. C.');
  const [title, setTitle] = useState('Concepts of Physics');
  const [publisher, setPublisher] = useState('Bharati Bhawan Publishers');
  const [year, setYear] = useState('2021');
  const [journalName, setJournalName] = useState('Indian Journal of Physics');
  const [volume, setVolume] = useState('95');
  const [pages, setPages] = useState('112-125');
  const [url, setUrl] = useState('https://www.physics.org/concepts');
  const [channel, setChannel] = useState('Physics Wallah');

  // Format Citation
  const generateCitation = (): string => {
    const authorAPA = authorLast ? `${authorLast}, ${authorFirst ? authorFirst.charAt(0) + '.' : ''}` : 'Anon.';
    const authorMLA = authorLast ? `${authorLast}, ${authorFirst}.` : 'Anon.';
    const authorIEEE = authorLast ? `${authorFirst} ${authorLast}` : 'Anon.';

    if (sourceType === 'book') {
      if (style === 'apa') return `${authorAPA} (${year}). ${title}. ${publisher}.`;
      if (style === 'mla') return `${authorMLA} ${title}. ${publisher}, ${year}.`;
      if (style === 'chicago') return `${authorMLA} ${title}. ${publisher}, ${year}.`;
      if (style === 'harvard') return `${authorLast}, ${authorFirst.charAt(0)}. (${year}) '${title}', ${publisher}.`;
      if (style === 'ieee') return `${authorIEEE}, ${title}. ${publisher}, ${year}.`;
    }

    if (sourceType === 'journal') {
      if (style === 'apa') return `${authorAPA} (${year}). ${title}. ${journalName}, ${volume}, ${pages}.`;
      if (style === 'mla') return `${authorMLA} "${title}." ${journalName}, vol. ${volume}, ${year}, pp. ${pages}.`;
      if (style === 'chicago') return `${authorMLA} "${title}." ${journalName} ${volume} (${year}): ${pages}.`;
      if (style === 'harvard') return `${authorLast}, ${authorFirst.charAt(0)}. (${year}) '${title}', ${journalName}, vol. ${volume}, pp. ${pages}.`;
      if (style === 'ieee') return `${authorIEEE}, "${title}," ${journalName}, vol. ${volume}, pp. ${pages}, ${year}.`;
    }

    if (sourceType === 'website') {
      const accessDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      if (style === 'apa') return `${authorAPA} (${year}). ${title}. Retrieved ${accessDate}, from ${url}`;
      if (style === 'mla') return `${authorMLA} "${title}." Web. ${accessDate}. <${url}>.`;
      if (style === 'chicago') return `${authorMLA} "${title}." Accessed ${accessDate}. ${url}.`;
      if (style === 'harvard') return `${authorLast}, ${authorFirst.charAt(0)}. (${year}) ${title}. Available at: ${url} (Accessed: ${accessDate}).`;
      if (style === 'ieee') return `${authorIEEE}, "${title}." [Online]. Available: ${url}. [Accessed: ${accessDate}].`;
    }

    if (sourceType === 'youtube') {
      if (style === 'apa') return `${channel}. (${year}). ${title} [Video]. YouTube. ${url}`;
      if (style === 'mla') return `"${title}." YouTube, uploaded by ${channel}, ${year}, ${url}.`;
      if (style === 'chicago') return `${channel}. "${title}." YouTube video, ${year}. ${url}.`;
      if (style === 'harvard') return `${channel} (${year}) ${title}. Available at: ${url}.`;
      if (style === 'ieee') return `${channel}, "${title}," YouTube, ${year}. [Video]. Available: ${url}.`;
    }

    return `${authorAPA} (${year}). ${title}.`;
  };

  const citationResult = generateCitation();

  const handleSave = () => {
    addHistoryItem({
      toolId: 'citation-gen',
      toolName: 'Citation Generator',
      inputSummary: `${sourceType.toUpperCase()} - ${title} (${style.toUpperCase()})`,
      resultSummary: citationResult,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Citation Style Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'apa', label: 'APA 7th Edition' },
          { id: 'mla', label: 'MLA 9th Edition' },
          { id: 'ieee', label: 'IEEE (Engineering)' },
          { id: 'chicago', label: 'Chicago 17th' },
          { id: 'harvard', label: 'Harvard Style' },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => setStyle(s.id as CitationStyle)}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              style === s.id
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Source Type Selector */}
      <div className="flex gap-2 max-w-md">
        {[
          { id: 'book', label: 'Book', icon: BookOpen },
          { id: 'journal', label: 'Journal Article', icon: FileText },
          { id: 'website', label: 'Website', icon: Globe },
          { id: 'youtube', label: 'YouTube Video', icon: Video },
        ].map(src => {
          const Icon = src.icon;
          return (
            <button
              key={src.id}
              onClick={() => setSourceType(src.id as SourceType)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                sourceType === src.id
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{src.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Input Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Author Last Name
            </label>
            <input
              type="text"
              value={authorLast}
              onChange={e => setAuthorLast(e.target.value)}
              placeholder="e.g. Verma"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Author First Name / Initials
            </label>
            <input
              type="text"
              value={authorFirst}
              onChange={e => setAuthorFirst(e.target.value)}
              placeholder="e.g. H. C."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Year of Publication
            </label>
            <input
              type="text"
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="e.g. 2021"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Title of Work
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Concepts of Physics Vol 1"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>

          {sourceType === 'book' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Publisher
              </label>
              <input
                type="text"
                value={publisher}
                onChange={e => setPublisher(e.target.value)}
                placeholder="e.g. Bharati Bhawan"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
              />
            </div>
          )}

          {sourceType === 'journal' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Journal Name
                </label>
                <input
                  type="text"
                  value={journalName}
                  onChange={e => setJournalName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Volume / Issue
                </label>
                <input
                  type="text"
                  value={volume}
                  onChange={e => setVolume(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>
            </>
          )}

          {(sourceType === 'website' || sourceType === 'youtube') && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Website / Video URL
              </label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
          >
            Save Citation
          </button>
        </div>
      </div>

      {/* Generated Citation Result Card */}
      <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Formatted {style.toUpperCase()} Citation
          </span>
          <CopyButton text={citationResult} label="Copy Citation" />
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium leading-relaxed font-mono">
          {citationResult}
        </div>
      </div>
    </div>
  );
};
