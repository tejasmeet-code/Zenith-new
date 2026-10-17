import React, { useState } from 'react';
import { BOT_MODULES } from '../data/modulesData.ts';
import type { BotModule, ModuleCategory } from '../types/index.ts';
import { renderWithCustomEmojis } from './DiscordEmbedRenderer.tsx';
import {
  ShieldAlert,
  Music,
  Award,
  Gavel,
  Ticket,
  BarChart3,
  FileCheck,
  Flag,
  TrendingUp,
  Trophy,
  Mail,
  Cake,
  Eye,
  Lock,
  Coins,
  FolderPlus,
  CheckCircle,
  Gift,
  UserPlus,
  Link,
  FileText,
  Gamepad2,
  MessageSquareShare,
  Clock,
  Sparkles,
  Terminal,
  Cpu,
  Search,
  Check,
  Settings2,
  ExternalLink
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Music,
  Award,
  Gavel,
  Ticket,
  BarChart3,
  FileCheck,
  Flag,
  TrendingUp,
  Trophy,
  Mail,
  Cake,
  Eye,
  Lock,
  Coins,
  FolderPlus,
  CheckCircle,
  Gift,
  UserPlus,
  Link,
  FileText,
  Gamepad2,
  MessageSquareShare,
  Clock,
  Sparkles,
  Terminal,
  Cpu
};

const CATEGORIES: { id: ModuleCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Modules (32+)' },
  { id: 'core', label: 'Core & Antinuke' },
  { id: 'moderation', label: 'Moderation & Cases' },
  { id: 'music', label: '24/7 Music' },
  { id: 'staff', label: 'Staff Governance' },
  { id: 'tickets', label: 'Tickets & Modmail' },
  { id: 'automod', label: 'Automod Rules' },
  { id: 'analytics', label: 'StatBot Analytics' },
  { id: 'engagement', label: 'Leveling & Giveaways' },
  { id: 'economy', label: 'Economy & Vault' },
  { id: 'utility', label: 'Utility & Logging' }
];

interface ModulesDashboardProps {
  onRunCommandInChat?: (cmd: string) => void;
}

export const ModulesDashboard: React.FC<ModulesDashboardProps> = ({ onRunCommandInChat }) => {
  const [modules, setModules] = useState<BotModule[]>([...BOT_MODULES]);
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModule, setActiveModule] = useState<BotModule | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  const toggleModule = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
    showToast();
  };

  const showToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const filteredModules = modules.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.commands.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#248046] text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <Check className="w-4 h-4" />
          <span>Module configuration saved to HeavenCloud database!</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="bg-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#5865F2]" />
              Zenith 32+ Production Modules Control Suite
            </h2>
            <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
              Configure 24/7 Music, Antinuke thresholds, Staff Quotas, Automod rules, and ticket settings.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#949ba4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search module or command..."
              className="w-full bg-[#1e1f22] text-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#35373c] focus:border-[#5865F2] outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#35373c]/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#5865F2] text-white shadow'
                  : 'bg-[#1e1f22] text-[#949ba4] hover:text-white hover:bg-[#35373c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module) => {
          const Icon = ICON_MAP[module.iconName] || ShieldAlert;
          return (
            <div
              key={module.id}
              onClick={() => setActiveModule(module)}
              className={`bg-[#2b2d31] hover:bg-[#313338] border p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md ${
                module.enabled ? 'border-[#35373c] hover:border-[#5865F2]/60' : 'border-[#35373c]/40 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1e1f22] flex items-center justify-center text-[#5865F2] group-hover:scale-110 transition-transform shrink-0 border border-[#35373c]">
                    <Icon className="w-5 h-5 text-[#5865F2]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      module.enabled ? 'bg-[#57f287]/20 text-[#57f287] border border-[#57f287]/30' : 'bg-[#f23f43]/20 text-[#f23f43] border border-[#f23f43]/30'
                    }`}>
                      {module.enabled ? 'Enabled' : 'Disabled'}
                    </span>

                    {/* Toggle switch */}
                    <button
                      onClick={(e) => toggleModule(module.id, e)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        module.enabled ? 'bg-[#57f287]' : 'bg-[#4e5058]'
                      }`}
                      title={module.enabled ? 'Disable module' : 'Enable module'}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          module.enabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-[#5865F2] transition-colors mb-1.5 flex items-center justify-between">
                  <span>{module.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#949ba4] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[#949ba4] line-clamp-2 leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Features Pill */}
                <div className="space-y-1 mb-4">
                  {module.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="text-[11px] text-[#dbdee1] flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-[#5865F2]" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commands count & footer */}
              <div className="pt-3 border-t border-[#35373c]/50 flex items-center justify-between text-xs text-[#949ba4]">
                <span className="font-mono text-[11px] bg-[#1e1f22] px-2 py-0.5 rounded text-[#dbdee1]">
                  {module.commands.length} Commands
                </span>
                <span className="text-[11px] text-[#5865F2] font-semibold">
                  Configure Settings →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      {activeModule && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#2b2d31] max-w-2xl w-full rounded-2xl border border-[#35373c] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#35373c] flex items-center justify-between bg-[#232428]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e1f22] flex items-center justify-center border border-[#35373c]">
                  {React.createElement(ICON_MAP[activeModule.iconName] || ShieldAlert, {
                    className: 'w-5 h-5 text-[#5865F2]'
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {activeModule.name}
                  </h3>
                  <p className="text-xs text-[#949ba4] font-medium capitalize">
                    Category: {activeModule.category}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModule(null)}
                className="w-8 h-8 rounded-lg bg-[#35373c] hover:bg-[#404249] text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#dbdee1]">
              <div>
                <h4 className="text-xs font-bold text-[#949ba4] uppercase tracking-wider mb-2">
                  Module Description &amp; Scope
                </h4>
                <p className="text-white text-xs sm:text-sm leading-relaxed bg-[#1e1f22] p-3.5 rounded-xl border border-[#35373c]">
                  {activeModule.description}
                </p>
              </div>

              {/* Active Features */}
              <div>
                <h4 className="text-xs font-bold text-[#949ba4] uppercase tracking-wider mb-2">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModule.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1e1f22] p-2.5 rounded-lg border border-[#35373c] flex items-center gap-2 text-xs text-white"
                    >
                      <Check className="w-4 h-4 text-[#57f287] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commands List */}
              <div>
                <h4 className="text-xs font-bold text-[#949ba4] uppercase tracking-wider mb-2">
                  Registered Commands ({activeModule.commands.length})
                </h4>
                <div className="space-y-2">
                  {activeModule.commands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-[#5865F2] font-mono font-bold text-xs bg-[#5865F2]/10 px-2 py-0.5 rounded">
                            {cmd.usage}
                          </code>
                          <span className="text-[10px] bg-[#35373c] text-[#dbdee1] px-1.5 py-0.5 rounded font-semibold">
                            {cmd.permission}
                          </span>
                        </div>
                        <p className="text-xs text-[#949ba4] mt-1">
                          {cmd.description}
                        </p>
                      </div>

                      {onRunCommandInChat && (
                        <button
                          onClick={() => {
                            onRunCommandInChat(cmd.name.startsWith('.') ? cmd.name : `.${cmd.name}`);
                            setActiveModule(null);
                          }}
                          className="bg-[#35373c] hover:bg-[#5865F2] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                        >
                          Run in Chat
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Settings Inspector */}
              <div>
                <h4 className="text-xs font-bold text-[#949ba4] uppercase tracking-wider mb-2">
                  Active Configuration Parameters
                </h4>
                <div className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c] font-mono text-xs text-[#57f287] overflow-x-auto">
                  <pre>{JSON.stringify(activeModule.settings, null, 2)}</pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#35373c] bg-[#232428] flex items-center justify-between">
              <span className="text-xs text-[#949ba4]">
                Changes sync automatically to HeavenCloud runtime.
              </span>
              <button
                onClick={() => {
                  showToast();
                  setActiveModule(null);
                }}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
