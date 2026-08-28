import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';
import { QrCode, Download, Link, Wifi, FileText, User, Sparkles } from 'lucide-react';

type QrType = 'url' | 'wifi' | 'text' | 'contact';

export const QrGenerator: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [type, setType] = useState<QrType>('url');
  const [urlVal, setUrlVal] = useState('https://mystudentdesk.app/notes');
  const [textVal, setTextVal] = useState('Newton Third Law: For every action, there is an equal and opposite reaction.');

  // WiFi
  const [ssid, setSsid] = useState('Campus-Hostel-5G');
  const [password, setPassword] = useState('StudyHard@2025');
  const [encryption, setEncryption] = useState('WPA');

  // Colors
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  const getPayload = (): string => {
    if (type === 'url') return urlVal.trim();
    if (type === 'text') return textVal.trim();
    if (type === 'wifi') return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    return urlVal;
  };

  useEffect(() => {
    const payload = getPayload();
    if (!payload || !canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      payload,
      {
        width: 280,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      err => {
        if (!err && canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL('image/png'));
        }
      }
    );
  }, [type, urlVal, textVal, ssid, password, encryption, fgColor, bgColor]);

  const downloadQr = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `MyStudentDesk-QR-${type}.png`;
    a.click();
    triggerConfetti();

    addHistoryItem({
      toolId: 'qr-gen',
      toolName: 'QR Code Generator',
      inputSummary: `${type.toUpperCase()} QR (${type === 'url' ? urlVal : type === 'wifi' ? ssid : 'Text'})`,
      resultSummary: 'QR Code Downloaded',
    });
  };

  return (
    <div className="space-y-6">
      {/* Type Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg">
        {[
          { id: 'url', label: 'Website / Note Link', icon: Link },
          { id: 'wifi', label: 'Hostel Wi-Fi', icon: Wifi },
          { id: 'text', label: 'Plain Text / Notes', icon: FileText },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setType(item.id as QrType)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                type === item.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
            QR Data & Styling
          </h3>

          {type === 'url' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enter Target URL (Notes, Google Drive, Project Link)
              </label>
              <input
                type="url"
                value={urlVal}
                onChange={e => setUrlVal(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Wi-Fi Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={ssid}
                  onChange={e => setSsid(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Wi-Fi Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Plain Text / Formula
              </label>
              <textarea
                rows={4}
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          )}

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                QR Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={e => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                QR Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview & Download Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live QR Preview</span>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md">
            <canvas ref={canvasRef} className="rounded-lg max-w-full" />
          </div>

          <button
            onClick={downloadQr}
            className="w-full max-w-xs py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
