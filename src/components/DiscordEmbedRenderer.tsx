import React from 'react';
import type { DiscordEmbed, DiscordButton } from '../types/index.ts';
import { ZENITH_CUSTOM_EMOJIS } from '../data/customEmojis.ts';

interface DiscordEmbedRendererProps {
  embed: DiscordEmbed;
  buttons?: DiscordButton[];
  onButtonClick?: (buttonId: string) => void;
}

/**
 * Replaces <:name:id> and <a:name:id> emoji tags with rendered SVG icons.
 */
export function renderWithCustomEmojis(text: string): React.ReactNode {
  if (!text) return null;

  // Regex matching <:name:id> or <a:name:id>
  const emojiRegex = /<(a?):([a-zA-Z0-9_]+):([0-9]+)>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = emojiRegex.exec(text)) !== null) {
    const isAnimated = match[1] === 'a';
    const emojiName = match[2];
    const emojiId = match[3];

    // Push preceding text
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Find custom emoji definition
    const customDef = ZENITH_CUSTOM_EMOJIS.find(e => e.name === emojiName || e.id === emojiId);

    if (customDef) {
      parts.push(
        <span
          key={`emoji-${match.index}`}
          className={`inline-flex items-center align-middle mx-0.5 ${isAnimated ? 'animate-pulse' : ''}`}
          title={`${customDef.name} (${customDef.code})`}
        >
          <span
            className="w-4 h-4 inline-block [&>svg]:w-4 [&>svg]:h-4 [&>svg]:inline"
            dangerouslySetInnerHTML={{ __html: customDef.svgIcon }}
          />
        </span>
      );
    } else {
      // Fallback custom pill icon
      parts.push(
        <span key={`emoji-${match.index}`} className="inline-flex items-center px-1 py-0.5 rounded text-[10px] bg-indigo-900/60 text-indigo-300 font-mono align-middle mx-0.5 border border-indigo-700/50">
          :{emojiName}:
        </span>
      );
    }

    lastIndex = emojiRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

export const DiscordEmbedRenderer: React.FC<DiscordEmbedRendererProps> = ({ embed, buttons, onButtonClick }) => {
  const embedColor = embed.color || '#5865F2';

  return (
    <div className="flex flex-col gap-2 max-w-2xl my-1">
      <div
        className="rounded-r-lg rounded-l-[3px] bg-[#2b2d31] p-3 text-sm text-[#dbdee1] border-l-4 shadow-sm overflow-hidden"
        style={{ borderLeftColor: embedColor }}
      >
        {/* Top Header Banner (Sapphire Bot Style) */}
        {embed.banner && (
          <div className="mb-3 -mx-3 -mt-3 overflow-hidden border-b border-[#1e1f22]">
            <img src={embed.banner} alt="Banner" className="w-full h-28 sm:h-36 object-cover" />
          </div>
        )}

        {/* Author */}
        {embed.author && (
          <div className="flex items-center gap-2 mb-2">
            {embed.author.icon_url && (
              <img src={embed.author.icon_url} alt="" className="w-5 h-5 rounded-full object-cover" />
            )}
            <span className="font-semibold text-white text-xs">
              {renderWithCustomEmojis(embed.author.name)}
            </span>
          </div>
        )}

        {/* Title */}
        {embed.title && (
          <div className="font-bold text-white text-base mb-1.5 flex items-center gap-1.5 leading-snug">
            {renderWithCustomEmojis(embed.title)}
          </div>
        )}

        {/* Thumbnail + Description */}
        <div className="flex justify-between gap-3">
          {embed.description && (
            <div className="text-[#dbdee1] text-xs sm:text-sm whitespace-pre-wrap leading-relaxed flex-1">
              {renderWithCustomEmojis(embed.description)}
            </div>
          )}
          {embed.thumbnail && (
            <div className="shrink-0">
              <img
                src={embed.thumbnail.url}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover border border-[#1e1f22]"
              />
            </div>
          )}
        </div>

        {/* Fields Grid */}
        {embed.fields && embed.fields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#35373c]/60">
            {embed.fields.map((field, idx) => (
              <div
                key={idx}
                className={`${field.inline ? 'col-span-1' : 'col-span-full'} bg-[#232428]/60 p-2 rounded`}
              >
                <div className="font-semibold text-[#949ba4] text-xs uppercase tracking-wide mb-0.5">
                  {renderWithCustomEmojis(field.name)}
                </div>
                <div className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                  {renderWithCustomEmojis(field.value)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Large Image */}
        {embed.image && (
          <div className="mt-3 overflow-hidden rounded-md border border-[#1e1f22]">
            <img src={embed.image.url} alt="" className="w-full max-h-60 object-cover" />
          </div>
        )}

        {/* Footer */}
        {embed.footer && (
          <div className="flex items-center gap-2 mt-3 pt-2 text-[11px] text-[#949ba4] border-t border-[#35373c]/40">
            {embed.footer.icon_url && (
              <img src={embed.footer.icon_url} alt="" className="w-4 h-4 rounded-full" />
            )}
            <span>{renderWithCustomEmojis(embed.footer.text)}</span>
            {embed.timestamp && <span>• {embed.timestamp}</span>}
          </div>
        )}
      </div>

      {/* Interactive Action Row Buttons */}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {buttons.map((btn) => {
            let styleClass = 'bg-[#4e5058] hover:bg-[#6d6f78] text-white';
            if (btn.style === 'primary') styleClass = 'bg-[#5865F2] hover:bg-[#4752C4] text-white';
            if (btn.style === 'success') styleClass = 'bg-[#248046] hover:bg-[#1a6334] text-white';
            if (btn.style === 'danger') styleClass = 'bg-[#da373c] hover:bg-[#a12828] text-white';

            return (
              <button
                key={btn.id}
                onClick={() => onButtonClick && onButtonClick(btn.id)}
                disabled={btn.disabled}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${styleClass}`}
              >
                {btn.emoji && renderWithCustomEmojis(btn.emoji)}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
