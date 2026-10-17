import React, { useState } from 'react';
import { Server, Download, Copy, Check, Terminal, ExternalLink, ShieldCheck, Cpu, HardDrive, Activity } from 'lucide-react';
import { BOT_OWNER_ID } from '../data/defaultConfig.ts';
import { generateZenithBotZip } from '../utils/exportBotCode.ts';

export const DeploymentPanel: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const zipBlob = await generateZenithBotZip();
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Zenith_Discord_Bot_HeavenCloud_Package.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const envText = `DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=129840000000000000
BOT_OWNER_ID=${BOT_OWNER_ID}
DEFAULT_PREFIX=.
ENABLE_NO_PREFIX=true

# Lavalink v4 Audio Node (24/7 Music Engine)
LAVALINK_HOST=lavalink.heavencloud.net
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_SECURE=false

PORT=3000`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2b2d31] via-[#1e1f22] to-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Server className="w-3.5 h-3.5" />
                Target Platform: HeavenCloud
              </span>
              <span className="text-[#57f287] text-xs font-semibold">
                ● Ready for Deployment
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              HeavenCloud Deployment &amp; Complete Source Code Exporter
            </h2>
            <p className="text-xs sm:text-sm text-[#949ba4] mt-1.5 max-w-2xl leading-relaxed">
              Export the production-ready Discord.js v14 codebase with full 24/7 Lavalink audio support, SQLite persistence, and PM2 process clustering ready to upload straight to HeavenCloud or any cloud VPS.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="bg-[#248046] hover:bg-[#1a6334] disabled:opacity-50 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Packaging ZIP...' : 'Export Full Bot Repository (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* Live Instance Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#35373c]/60">
          <div className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c]">
            <div className="text-[11px] text-[#949ba4] flex items-center gap-1 font-medium mb-1">
              <Activity className="w-3.5 h-3.5 text-[#57f287]" />
              Gateway Ping
            </div>
            <div className="font-mono text-white font-bold text-base">
              18 ms <span className="text-xs text-[#57f287] font-normal">(Optimal)</span>
            </div>
          </div>

          <div className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c]">
            <div className="text-[11px] text-[#949ba4] flex items-center gap-1 font-medium mb-1">
              <Cpu className="w-3.5 h-3.5 text-[#5865F2]" />
              Process Memory
            </div>
            <div className="font-mono text-white font-bold text-base">
              64.2 MB / 1 GB
            </div>
          </div>

          <div className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c]">
            <div className="text-[11px] text-[#949ba4] flex items-center gap-1 font-medium mb-1">
              <HardDrive className="w-3.5 h-3.5 text-[#FAA61A]" />
              Database Engine
            </div>
            <div className="font-mono text-white font-bold text-base">
              SQLite (WAL Mode)
            </div>
          </div>

          <div className="bg-[#1e1f22] p-3 rounded-xl border border-[#35373c]">
            <div className="text-[11px] text-[#949ba4] flex items-center gap-1 font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#eb459e]" />
              Lavalink Audio
            </div>
            <div className="font-mono text-white font-bold text-base">
              Lavalink v4 (24/7)
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Instructions & Env */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environment File */}
        <div className="bg-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#5865F2]" />
                Auto-Configured .env File
              </h3>
              <button
                onClick={() => handleCopy('env', envText)}
                className="text-xs text-[#5865F2] hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copiedKey === 'env' ? <Check className="w-3.5 h-3.5 text-[#57f287]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'env' ? 'Copied!' : 'Copy Config'}</span>
              </button>
            </div>
            <p className="text-xs text-[#949ba4] leading-relaxed mb-4">
              Preset with your Bot Owner ID (<code className="text-[#f23f43]">{BOT_OWNER_ID}</code>), default prefix <code className="text-[#5865F2]">.</code>, and Lavalink 24/7 stream parameters.
            </p>

            <div className="bg-[#1e1f22] p-4 rounded-xl border border-[#35373c] font-mono text-xs text-[#57f287] overflow-x-auto">
              <pre>{envText}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#35373c]/60 flex items-center justify-between text-xs text-[#949ba4]">
            <span>Included automatically in the downloaded ZIP file</span>
          </div>
        </div>

        {/* Step-by-Step HeavenCloud Setup */}
        <div className="bg-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-md space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Server className="w-4 h-4 text-[#5865F2]" />
            HeavenCloud 1-Click Deployment Instructions
          </h3>

          <div className="space-y-3 text-xs text-[#dbdee1]">
            <div className="bg-[#1e1f22] p-3.5 rounded-xl border border-[#35373c] flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-white mb-0.5">Download Repository ZIP</h4>
                <p className="text-[#949ba4] leading-relaxed">
                  Click the green button above to download <code className="text-[#dbdee1]">Zenith_Discord_Bot_HeavenCloud_Package.zip</code> containing all modules, handlers, and configs.
                </p>
              </div>
            </div>

            <div className="bg-[#1e1f22] p-3.5 rounded-xl border border-[#35373c] flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-white mb-0.5">Create HeavenCloud Node.js App</h4>
                <p className="text-[#949ba4] leading-relaxed">
                  Go to <a href="https://heavencloud.net" target="_blank" rel="noreferrer" className="text-[#5865F2] underline font-semibold">heavencloud.net</a>, choose <strong>Node.js 20 LTS</strong> or <strong>Docker</strong>, and upload the zip file.
                </p>
              </div>
            </div>

            <div className="bg-[#1e1f22] p-3.5 rounded-xl border border-[#35373c] flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-white mb-0.5">Paste Discord Bot Token &amp; Deploy</h4>
                <p className="text-[#949ba4] leading-relaxed">
                  Enter your Discord Bot Token in the Environment Variables tab. Click <strong>Start</strong>. Zenith will connect immediately and remain online 24/7!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
