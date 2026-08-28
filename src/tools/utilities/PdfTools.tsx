import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import jsPDF from 'jspdf';
import { useApp } from '../../context/AppContext';
import { FileText, Upload, Download, Trash2, ShieldCheck, Image as ImageIcon } from 'lucide-react';

type PdfToolMode = 'merge' | 'split' | 'imageToPdf';

interface UploadedPdf {
  id: string;
  name: string;
  size: string;
  pageCount: number;
  arrayBuffer: ArrayBuffer;
}

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
}

export const PdfTools: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [mode, setMode] = useState<PdfToolMode>('merge');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Merge state
  const [pdfFiles, setPdfFiles] = useState<UploadedPdf[]>([]);

  // Split state
  const [splitPdf, setSplitPdf] = useState<UploadedPdf | null>(null);
  const [pageRange, setPageRange] = useState<string>('1-2');

  // Image to PDF state
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Handle PDF file uploads for Merge
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const count = doc.getPageCount();

        setPdfFiles(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            pageCount: count,
            arrayBuffer: buffer,
          }
        ]);
      } catch (err) {
        alert(`Error loading ${file.name}. It might be password protected or corrupt.`);
      }
    }
    e.target.value = '';
  };

  // Perform Merge
  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      alert('Please upload at least 2 PDF files to merge.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMsg('Merging PDF documents in memory...');

      const mergedDoc = await PDFDocument.create();

      for (const item of pdfFiles) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const copiedPages = await mergedDoc.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach(p => mergedDoc.addPage(p));
      }

      const mergedBytes = await mergedDoc.save();
      const blob = new Blob([mergedBytes.buffer as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Merged-Document-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setStatusMsg('');
      setIsProcessing(false);
      triggerConfetti();

      addHistoryItem({
        toolId: 'pdf-tools',
        toolName: 'PDF Merge Tool',
        inputSummary: `Merged ${pdfFiles.length} PDF files (${pdfFiles.reduce((a, b) => a + b.pageCount, 0)} pages)`,
        resultSummary: 'Downloaded Merged PDF',
      });
    } catch (err) {
      alert('Failed to merge PDFs.');
      setIsProcessing(false);
      setStatusMsg('');
    }
  };

  // Split Single PDF Upload
  const handleSinglePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();

      setSplitPdf({
        id: 'split-1',
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        pageCount: count,
        arrayBuffer: buffer,
      });
      setPageRange(`1-${Math.min(count, 3)}`);
    } catch (err) {
      alert('Could not read PDF.');
    }
    e.target.value = '';
  };

  // Perform Split
  const handleSplitPdf = async () => {
    if (!splitPdf) return;

    try {
      setIsProcessing(true);
      setStatusMsg('Extracting specified pages...');

      const srcDoc = await PDFDocument.load(splitPdf.arrayBuffer);
      const newDoc = await PDFDocument.create();

      // Parse range string (e.g. "1-3, 5")
      const pagesToExtract: number[] = [];
      const parts = pageRange.split(',');

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(Number);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= splitPdf.pageCount && !pagesToExtract.includes(i - 1)) {
                pagesToExtract.push(i - 1);
              }
            }
          }
        } else {
          const p = Number(trimmed);
          if (!isNaN(p) && p >= 1 && p <= splitPdf.pageCount && !pagesToExtract.includes(p - 1)) {
            pagesToExtract.push(p - 1);
          }
        }
      }

      if (pagesToExtract.length === 0) {
        alert('Please specify valid page numbers within range.');
        setIsProcessing(false);
        return;
      }

      const copied = await newDoc.copyPages(srcDoc, pagesToExtract);
      copied.forEach(p => newDoc.addPage(p));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes.buffer as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Extracted-${splitPdf.name}`;
      a.click();
      URL.revokeObjectURL(url);

      setIsProcessing(false);
      setStatusMsg('');
      triggerConfetti();

      addHistoryItem({
        toolId: 'pdf-tools',
        toolName: 'PDF Split Tool',
        inputSummary: `${splitPdf.name} (Pages: ${pageRange})`,
        resultSummary: `Extracted ${pagesToExtract.length} pages`,
      });
    } catch (err) {
      alert('Failed to extract pages.');
      setIsProcessing(false);
      setStatusMsg('');
    }
  };

  // Handle Images Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages(prev => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: file.name,
              dataUrl: reader.result as string,
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // Convert Images to PDF using jsPDF
  const handleImagesToPdf = async () => {
    if (images.length === 0) {
      alert('Please upload at least 1 image.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMsg('Creating PDF assignment document...');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        const img = images[i];
        pdf.addImage(img.dataUrl, 'JPEG', 10, 10, pageWidth - 20, pageHeight - 20, undefined, 'FAST');
      }

      pdf.save(`Assignment-Notes-${Date.now()}.pdf`);

      setIsProcessing(false);
      setStatusMsg('');
      triggerConfetti();

      addHistoryItem({
        toolId: 'pdf-tools',
        toolName: 'Image to PDF Converter',
        inputSummary: `${images.length} Images / Pages`,
        resultSummary: 'Generated PDF Document',
      });
    } catch (err) {
      alert('Failed to generate PDF from images.');
      setIsProcessing(false);
      setStatusMsg('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tool Mode Switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md">
        <button
          onClick={() => setMode('merge')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'merge'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Merge PDFs
        </button>
        <button
          onClick={() => setMode('split')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'split'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Split Pages
        </button>
        <button
          onClick={() => setMode('imageToPdf')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'imageToPdf'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Images to PDF
        </button>
      </div>

      {/* Privacy Guarantee Pill */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
        <span>
          <strong>100% Client-Side & Private:</strong> Your files and documents are processed locally in your browser memory and never uploaded to any cloud server.
        </span>
      </div>

      {/* Mode 1: Merge PDFs */}
      {mode === 'merge' && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Merge Multiple PDF Documents
            </h3>
            <span className="text-xs text-slate-400">{pdfFiles.length} Documents Added</span>
          </div>

          {/* Drag & drop upload box */}
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:border-cyan-500 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer transition-colors">
            <Upload className="w-8 h-8 text-cyan-500 mb-2" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Click to Select PDF Files</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Select assignment sheets or notes to combine</span>
            <input type="file" multiple accept=".pdf" onChange={handlePdfUpload} className="hidden" />
          </label>

          {/* Files List */}
          {pdfFiles.length > 0 && (
            <div className="space-y-2">
              {pdfFiles.map((pdf, idx) => (
                <div
                  key={pdf.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                        {pdf.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {pdf.pageCount} Pages · {pdf.size}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPdfFiles(prev => prev.filter(p => p.id !== pdf.id))}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleMergePdfs}
              disabled={pdfFiles.length < 2 || isProcessing}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? (statusMsg || 'Merging...') : 'Merge & Download PDF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Split PDF */}
      {mode === 'split' && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Extract / Split Specific PDF Pages
            </h3>
          </div>

          {!splitPdf ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:border-cyan-500 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-cyan-500 mb-2" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Upload PDF to Split</span>
              <input type="file" accept=".pdf" onChange={handleSinglePdfUpload} className="hidden" />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{splitPdf.name}</span>
                    <span className="text-[11px] text-slate-400">Total Pages: {splitPdf.pageCount}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSplitPdf(null)}
                  className="text-xs text-rose-500 hover:underline font-semibold"
                >
                  Change File
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pages to Extract (e.g. "1-3, 5" or "2, 4, 6")
                </label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={e => setPageRange(e.target.value)}
                  placeholder="e.g. 1-2"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm font-bold"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSplitPdf}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isProcessing ? (statusMsg || 'Extracting...') : 'Extract & Download Pages'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Image to PDF */}
      {mode === 'imageToPdf' && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Assignment Photos / Notes to PDF
            </h3>
            <span className="text-xs text-slate-400">{images.length} Images Added</span>
          </div>

          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:border-cyan-500 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer transition-colors">
            <ImageIcon className="w-8 h-8 text-cyan-500 mb-2" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Upload JPG / PNG Photos</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Turn snapshots of handwritten assignments into a clean PDF</span>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div key={img.id} className="relative group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[3/4]">
                  <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => setImages(prev => prev.filter(i => i.id !== img.id))}
                      className="p-2 rounded-full bg-rose-600 text-white shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white">
                    Page {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleImagesToPdf}
              disabled={images.length === 0 || isProcessing}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? (statusMsg || 'Generating PDF...') : 'Convert to PDF'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
