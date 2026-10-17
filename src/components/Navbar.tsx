import React from 'react';
import { Shield, Sparkles, Terminal, Cpu, Download, CheckCircle2, Server, HelpCircle, Layers, Palette } from 'lucide-react';
import { BOT_OWNER_ID } from '../data/defaultConfig.ts';
import { renderWithCustomEmojis } from './DiscordEmbedRenderer.tsx';

interface NavbarProps {
  activeTab: 'sapphire' | 'simulator' | 'emojis' | 'quality' | 'deploy';
  setActiveTab: (tab: 'sapphire' | 'simulator' | 'emojis' | 'quality' | 'deploy') => void;
  onDownloadCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onDownloadCode }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#1e1f22] border-b border-[#2b2d31] shadow-lg">
      {/* Top Banner / Status */}
      <div className="bg-[#111214] px-4 py-1.5 flex flex-wrap items-center justify-between text-xs text-[#949ba4] border-b border-[#232428]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#57f287] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#57f287] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#57f287] -ml-3" />
            24/7 Lavalink v4 Audio &amp; Antinuke Shield Active
          </span>
          <span className="hidden sm:inline text-[#4e5058]">|</span>
          <span className="hidden sm:flex items-center gap-1 text-[#dbdee1]">
            <Server className="w-3.5 h-3.5 text-[#5865F2]" />
            Hosted on: <strong className="text-white">HeavenCloud</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#2b2d31] px-2.5 py-0.5 rounded-full text-[11px] text-[#dbdee1]">
            {renderWithCustomEmojis('<a:zenith_badge_owner:129841800300000002>')}
            <span>Owner ID:</span>
            <code className="text-[#f23f43] font-mono font-bold">{BOT_OWNER_ID}</code>
          </div>
          <span className="bg-[#5865f2]/20 text-[#5865f2] border border-[#5865f2]/40 px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#eb459e]" />
            Diamond Tier
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5865F2] via-[#7289da] to-[#eb459e] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#1e1f22] rounded-[14px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#5865F2]" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#23a55a] rounded-full border-2 border-[#1e1f22]" title="Zenith Online" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-white text-lg tracking-tight">Zenith</h1>
              <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                BOT
              </span>
              <span className="text-[#5865F2] text-xs">✓</span>
            </div>
            <p className="text-[11px] text-[#949ba4] font-medium truncate max-w-[240px] sm:max-w-xs">
              Sapphire Dashboard • 24/7 Music • Antinuke • Staff Quotas
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#2b2d31] p-1 rounded-xl overflow-x-auto max-w-full no-scrollbar">
          <button
            onClick={() => setActiveTab('sapphire')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'sapphire'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949ba4] hover:text-white hover:bg-[#35373c]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#eb459e]" />
            <span>Sapphire Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949ba4] hover:text-white hover:bg-[#35373c]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Live Bot Chat</span>
          </button>


          <button
            onClick={() => setActiveTab('emojis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'emojis'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949ba4] hover:text-white hover:bg-[#35373c]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Custom Emojis</span>
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'quality'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949ba4] hover:text-white hover:bg-[#35373c]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>45-Check Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'deploy'
                ? 'bg-[#5865F2] text-white shadow'
                : 'text-[#949ba4] hover:text-white hover:bg-[#35373c]'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>HeavenCloud</span>
          </button>
        </nav>

        {/* Quick Download CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onDownloadCode}
            className="bg-[#248046] hover:bg-[#1a6334] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow cursor-pointer active:scale-95"
            title="Download complete Discord.js v14 bot repository as a ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Bot Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
