import React, { useState } from 'react';
import { ZENITH_CUSTOM_EMOJIS } from '../data/customEmojis.ts';
import type { CustomEmoji } from '../types/index.ts';
import { Copy, Check, Download, Sparkles, ExternalLink, ShieldAlert, Layers } from 'lucide-react';
import JSZip from 'jszip';

export const CustomEmojisPortal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Emojis' },
    { id: 'moderation', label: 'Moderation & Defense' },
    { id: 'music', label: '24/7 Music (Animated)' },
    { id: 'staff', label: 'Staff & Hierarchy' },
    { id: 'badges', label: 'Owner & VIP Badges' },
    { id: 'stats', label: 'StatBot Analytics' },
    { id: 'economy', label: 'Coins & Economy' },
    { id: 'system', label: 'System & Status' }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadEmojiPack = async () => {
    const zip = new JSZip();
    const folder = zip.folder('zenith-custom-emojis');

    ZENITH_CUSTOM_EMOJIS.forEach((emoji) => {
      // Create clean standalone SVG
      const cleanSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none">
  ${emoji.svgIcon.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
</svg>`;
      folder?.file(`${emoji.name}.svg`, cleanSvg);
    });

    // Add manifest
    const manifest = {
      name: 'Zenith Custom Discord Emojis',
      author: 'Zenith Bot Engine',
      total: ZENITH_CUSTOM_EMOJIS.length,
      emojis: ZENITH_CUSTOM_EMOJIS.map((e) => ({
        name: e.name,
        code: e.code,
        animated: e.animated,
        category: e.category
      }))
    };
    folder?.file('manifest.json', JSON.stringify(manifest, null, 2));

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Zenith_Custom_Discord_Emojis_Pack.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredEmojis = ZENITH_CUSTOM_EMOJIS.filter(
    (e) => selectedCategory === 'all' || e.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2b2d31] via-[#1e1f22] to-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                100% Custom Discord Emojis
              </span>
              <span className="text-[#57f287] text-xs font-semibold">
                ✓ Zero Unicode Fallbacks
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Zenith Custom Emojis &amp; Developer Portal Pack
            </h2>
            <p className="text-xs sm:text-sm text-[#949ba4] mt-1.5 max-w-2xl leading-relaxed">
              Every single embed, command response, and UI element in Zenith strictly uses custom animated and static Discord emojis (<code className="text-[#5865F2]">&lt;:name:id&gt;</code> and <code className="text-[#eb459e]">&lt;a:name:id&gt;</code>). Download the bulk asset pack or copy codes directly into Discord!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadEmojiPack}
              className="bg-[#248046] hover:bg-[#1a6334] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Emoji Pack (.zip)</span>
            </button>

            <a
              href="https://discord.new/zenith-emoji-server-template"
              target="_blank"
              rel="noreferrer"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Emoji Server Template</span>
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[#35373c]/60">
          {categories.map((cat) => (
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

      {/* Grid of Emojis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEmojis.map((emoji) => (
          <div
            key={emoji.id}
            className="bg-[#2b2d31] border border-[#35373c] hover:border-[#5865F2]/60 p-4 rounded-xl flex flex-col justify-between transition-all hover:shadow-lg group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-[#1e1f22] flex items-center justify-center border border-[#35373c] ${
                  emoji.animated ? 'ring-2 ring-[#eb459e]/50 animate-pulse' : ''
                }`}>
                  <div
                    className="w-7 h-7 flex items-center justify-center [&>svg]:w-7 [&>svg]:h-7"
                    dangerouslySetInnerHTML={{ __html: emoji.svgIcon }}
                  />
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                    emoji.animated
                      ? 'bg-[#eb459e]/20 text-[#eb459e] border border-[#eb459e]/30'
                      : 'bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30'
                  }`}>
                    {emoji.animated ? 'ANIMATED' : 'STATIC'}
                  </span>
                  <span className="text-[10px] text-[#949ba4] font-medium capitalize">
                    {emoji.category}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-white text-sm mb-1 truncate">
                :{emoji.name}:
              </h4>
              <p className="text-xs text-[#949ba4] leading-relaxed line-clamp-2 mb-3">
                {emoji.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#35373c]/50 flex items-center justify-between gap-2">
              <code className="text-[10px] font-mono text-[#57f287] bg-[#1e1f22] px-2 py-1 rounded truncate flex-1 border border-[#35373c]">
                {emoji.code}
              </code>
              <button
                onClick={() => handleCopyCode(emoji.code)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  copiedCode === emoji.code
                    ? 'bg-[#248046] text-white'
                    : 'bg-[#35373c] hover:bg-[#5865F2] text-white'
                }`}
                title="Copy Discord syntax to clipboard"
              >
                {copiedCode === emoji.code ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Developer Portal Guide */}
      <div className="bg-[#2b2d31] p-6 rounded-2xl border border-[#35373c] shadow-md space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#5865F2]" />
          How to Upload to Discord Developer Portal &amp; Emoji Servers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#dbdee1]">
          <div className="bg-[#1e1f22] p-4 rounded-xl border border-[#35373c]">
            <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center text-xs mb-2">
              1
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Download Assets</h4>
            <p className="text-[#949ba4] leading-relaxed">
              Click the <strong>Download Emoji Pack</strong> button above to download all vector SVG &amp; PNG icons organized by category.
            </p>
          </div>

          <div className="bg-[#1e1f22] p-4 rounded-xl border border-[#35373c]">
            <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center text-xs mb-2">
              2
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Upload to Discord Server</h4>
            <p className="text-[#949ba4] leading-relaxed">
              Open your Discord Server Settings → <strong>Emoji</strong> → <strong>Upload Emoji</strong>. Drag-and-drop the files from the ZIP folder.
            </p>
          </div>

          <div className="bg-[#1e1f22] p-4 rounded-xl border border-[#35373c]">
            <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center text-xs mb-2">
              3
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Automatic Bot Sync</h4>
            <p className="text-[#949ba4] leading-relaxed">
              Zenith automatically registers and uses your uploaded custom emoji IDs across all servers hosting the bot!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
