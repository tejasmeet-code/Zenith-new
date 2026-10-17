/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { SapphireDashboard } from './components/SapphireDashboard.tsx';
import { DiscordChatSimulator } from './components/DiscordChatSimulator.tsx';
import { CustomEmojisPortal } from './components/CustomEmojisPortal.tsx';
import { QualityAuditor } from './components/QualityAuditor.tsx';
import { DeploymentPanel } from './components/DeploymentPanel.tsx';
import { generateZenithBotZip } from './utils/exportBotCode.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'sapphire' | 'simulator' | 'emojis' | 'quality' | 'deploy'>('sapphire');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);

  const handleDownloadCode = async () => {
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
    } catch (err) {
      console.error('Failed to export bot zip:', err);
    }
  };

  const handleRunCommandInChat = (cmd: string) => {
    setPendingCommand(cmd);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-[#1e1f22] text-[#dbdee1] flex flex-col font-sans selection:bg-[#5865F2] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadCode={handleDownloadCode}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'sapphire' && <SapphireDashboard />}
        {activeTab === 'simulator' && <DiscordChatSimulator />}
        {activeTab === 'emojis' && <CustomEmojisPortal />}
        {activeTab === 'quality' && <QualityAuditor />}
        {activeTab === 'deploy' && <DeploymentPanel />}
      </main>

      {/* Footer with Owner Credits */}
      <footer className="bg-[#111214] border-t border-[#232428] py-4 px-6 text-center text-xs text-[#949ba4]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Zenith Bot &amp; Sapphire Dashboard</span>
            <span>•</span>
            <span>Created &amp; Hosted by Owner: <code className="text-[#f23f43] font-mono font-bold">1181221352393420856</code></span>
          </div>
          <div className="text-[11px] text-[#5865F2]">
            Universal Superuser Access Mode Active (All Servers Unlocked)
          </div>
          <div>
            Built with 32+ Modules • Custom Discord Emojis • HeavenCloud Ready
          </div>
        </div>
      </footer>
    </div>
  );
}
