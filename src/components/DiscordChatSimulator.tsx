import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Volume2, Shield, Sparkles, User, Info, Compass, HelpCircle } from 'lucide-react';
import type { DiscordMessage } from '../types/index.ts';
import { DiscordEmbedRenderer, renderWithCustomEmojis } from './DiscordEmbedRenderer.tsx';
import { botEngine } from '../utils/botEngine.ts';
import { DEFAULT_ZENITH_CONFIG, BOT_OWNER_ID } from '../data/defaultConfig.ts';

const SAMPLE_CHANNELS = [
  { id: 'commands', name: 'zenith-commands', type: 'text', unread: false },
  { id: 'staff-logs', name: 'staff-action-logs', type: 'text', unread: true },
  { id: 'ticket-0042', name: 'ticket-0042-billing', type: 'text', unread: false },
  { id: 'modmail', name: 'modmail-inbox', type: 'text', unread: false },
  { id: 'birthdays', name: 'birthdays', type: 'text', unread: false },
  { id: 'vc-lofi', name: '24/7 Lofi & Beats [Zenith]', type: 'voice', unread: false, connected: true }
];

const QUICK_COMMAND_CHIPS = [
  { label: '.help', cmd: '.help', desc: 'All 32+ module commands' },
  { label: '.play Lofi Girl', cmd: '.play Lofi Girl 24/7 Chill', desc: 'Music streaming' },
  { label: '.247', cmd: '.247', desc: 'Toggle 24/7 VC lock' },
  { label: '.staffhelp', cmd: '.staffhelp', desc: 'Bot Staff commands & role permissions' },
  { label: '.serverstaffhelp', cmd: '.serverstaffhelp', desc: 'Server moderator & admin commands' },
  { label: '.botstaff roles', cmd: '.botstaff roles', desc: 'View all Bot Staff roles' },
  { label: '.botstaff list', cmd: '.botstaff list', desc: 'Appointed Bot Staff members' },
  { label: '.botstaff add', cmd: '.botstaff add @Tejas Bot Manager', desc: 'Appoint Bot Staff member' },
  { label: '.globalban', cmd: '.globalban @RaidBot Phishing raid network', desc: 'Cross-server network ban' },
  { label: '.botstaffquota', cmd: '.botstaffquota', desc: 'Internal Bot Staff performance quotas' },
  { label: '.premiumhelp', cmd: '.premiumhelp', desc: 'Premium perks & status' },
  { label: '.antinuke', cmd: '.antinuke', desc: 'Security matrix' },
  { label: '.jail @Rogue 24h', cmd: '.jail @Rogue 24h Mass Mention', desc: 'Isolate offender' },
  { label: '.banrequest @Scam', cmd: '.banrequest @Scam Toxicity https://cdn.discordapp.com/proof.png', desc: 'Jr staff ban proposal' },
  { label: '.stats', cmd: '.stats', desc: 'StatBot metrics' },
  { label: '.achievers', cmd: '.achievers', desc: 'Weekly achievers broadcast' },
  { label: '.snipe', cmd: '.snipe', desc: 'Inspect deleted message' },
  { label: '.ticketpanel', cmd: '.ticketpanel', desc: 'Deploy ticket buttons' },
  { label: '.work', cmd: '.work', desc: 'Earn virtual credits' },
  { label: '.eval', cmd: '.eval client.guilds.cache.size', desc: 'Owner terminal' }
];

export const DiscordChatSimulator: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState('commands');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<DiscordMessage[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Initialize with initial bot welcome & help message
  useEffect(() => {
    const initialHelp = botEngine.executeCommand('.help');
    setMessages([
      {
        id: 'msg-welcome-0',
        author: {
          id: BOT_OWNER_ID,
          name: 'ZenithOwner',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
          roleColor: '#ED4245',
          badges: ['<a:zenith_badge_owner:129841800300000002>']
        },
        content: '.help',
        timestamp: 'Today at 06:00 AM',
        channelId: 'commands'
      },
      initialHelp
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendCommand = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: DiscordMessage = {
      id: `msg-${Date.now()}-user`,
      author: {
        id: BOT_OWNER_ID,
        name: 'ZenithOwner',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        roleColor: '#ED4245',
        badges: ['<a:zenith_badge_owner:129841800300000002>']
      },
      content: text,
      timestamp: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channelId: activeChannelId
    };

    // Bot execution
    const botResponse = botEngine.executeCommand(text);

    setMessages((prev) => [...prev, userMsg, botResponse]);
    if (!textToSend) setInputMessage('');
  };

  const handleButtonClick = (buttonId: string) => {
    // Map button to command actions
    if (buttonId === 'btn_staffhelp') {
      handleSendCommand('.staffhelp');
    } else if (buttonId === 'btn_premiumhelp') {
      handleSendCommand('.premiumhelp');
    } else if (buttonId === 'btn_music_toggle' || buttonId === 'btn_music_247') {
      handleSendCommand('.247');
    } else if (buttonId === 'btn_music_skip') {
      handleSendCommand('.skip');
    } else if (buttonId === 'btn_music_stop') {
      handleSendCommand('.stop');
    } else if (buttonId === 'btn_open_ticket_support') {
      handleSendCommand('.ticket open Support Request');
    } else if (buttonId.startsWith('btn_banreq_accept')) {
      handleSendCommand('.ban @Offender 30d Ban request approved by Senior Mod');
    } else if (buttonId.startsWith('btn_trivia_')) {
      handleSendCommand('B');
    } else {
      handleSendCommand('.help');
    }
  };

  const currentChannel = SAMPLE_CHANNELS.find((c) => c.id === activeChannelId) || SAMPLE_CHANNELS[0];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] min-h-[640px] bg-[#313338] rounded-xl overflow-hidden border border-[#232428] shadow-2xl">
      {/* Channels Sidebar */}
      <div className="w-full lg:w-64 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col shrink-0">
        {/* Guild Header */}
        <div className="h-12 px-4 border-b border-[#1f2023] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#5865F2] flex items-center justify-center font-bold text-white text-xs">
              Z
            </div>
            <span className="font-bold text-white text-sm tracking-tight truncate">
              Zenith Official HQ
            </span>
          </div>
          <span className="text-white text-xs">▼</span>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="text-[11px] font-bold text-[#949ba4] px-2 py-1 tracking-wider uppercase flex items-center justify-between">
            <span>Text Channels</span>
            <span className="text-xs">+</span>
          </div>

          {SAMPLE_CHANNELS.filter((c) => c.type === 'text').map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannelId(channel.id)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeChannelId === channel.id
                  ? 'bg-[#404249] text-white'
                  : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Hash className="w-4 h-4 text-[#80848e] shrink-0" />
                <span className="truncate">{channel.name}</span>
              </div>
              {channel.unread && (
                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
              )}
            </button>
          ))}

          <div className="text-[11px] font-bold text-[#949ba4] px-2 py-1 mt-3 tracking-wider uppercase flex items-center justify-between">
            <span>Voice Channels (24/7)</span>
            <span className="text-xs">+</span>
          </div>

          {SAMPLE_CHANNELS.filter((c) => c.type === 'voice').map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleSendCommand('.play Lofi Beats')}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-[#57f287] bg-[#57f287]/10 hover:bg-[#57f287]/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Volume2 className="w-4 h-4 text-[#57f287] shrink-0 animate-pulse" />
                <span className="truncate">{channel.name}</span>
              </div>
              <span className="text-[10px] bg-[#57f287]/30 px-1.5 py-0.5 rounded font-mono">
                24/7
              </span>
            </button>
          ))}
        </div>

        {/* User Status Bar */}
        <div className="h-14 bg-[#232428] px-3 flex items-center justify-between border-t border-[#1e1f22]">
          <div className="flex items-center gap-2.5 truncate">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-[#5865F2]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a55a] rounded-full border-2 border-[#232428]" />
            </div>
            <div className="truncate">
              <div className="text-white text-xs font-bold leading-none truncate flex items-center gap-1">
                ZenithOwner
                {renderWithCustomEmojis('<a:zenith_badge_owner:129841800300000002>')}
              </div>
              <div className="text-[11px] text-[#949ba4] font-mono leading-tight">
                #1181221352393420856
              </div>
            </div>
          </div>
          <div className="text-[#b5bac1] hover:text-white cursor-pointer text-xs">
            ⚙️
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338] overflow-hidden">
        {/* Channel Header */}
        <div className="h-12 px-4 border-b border-[#232428] flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-white">
            <Hash className="w-5 h-5 text-[#80848e]" />
            <span className="font-bold text-sm">{currentChannel.name}</span>
            <span className="hidden sm:inline text-xs text-[#949ba4] border-l border-[#404249] pl-3 ml-1">
              Zenith Bot Command Line &amp; Live Discord Embed Testing
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#949ba4]">
            <span className="bg-[#2b2d31] px-2 py-1 rounded text-[11px] text-[#dbdee1] flex items-center gap-1">
              {renderWithCustomEmojis('<:zenith_online:129841800700000001>')}
              <span>Prefix: <code className="text-[#5865F2] font-bold">.</code> or <code className="text-[#5865F2] font-bold">/</code></span>
            </span>
          </div>
        </div>

        {/* Message Feed */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm"
        >
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 hover:bg-[#2e3035]/40 p-1.5 -mx-1.5 rounded transition-colors group">
              <img
                src={msg.author.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 leading-none mb-1">
                  <span
                    className="font-bold text-white text-sm"
                    style={{ color: msg.author.roleColor }}
                  >
                    {msg.author.name}
                  </span>

                  {msg.author.isBot && (
                    <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      BOT
                    </span>
                  )}

                  {msg.author.badges &&
                    msg.author.badges.map((b, i) => (
                      <span key={i}>{renderWithCustomEmojis(b)}</span>
                    ))}

                  <span className="text-[11px] text-[#949ba4] font-medium ml-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.content && (
                  <div className="text-[#dbdee1] text-sm break-words whitespace-pre-wrap leading-relaxed">
                    {renderWithCustomEmojis(msg.content)}
                  </div>
                )}

                {msg.embeds &&
                  msg.embeds.map((embed, i) => (
                    <DiscordEmbedRenderer
                      key={i}
                      embed={embed}
                      buttons={msg.buttons}
                      onButtonClick={handleButtonClick}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Command Chips */}
        <div className="px-4 py-2 bg-[#2b2d31]/80 border-t border-[#232428] flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[#949ba4] text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-[#5865F2]" />
            Quick Run:
          </span>
          {QUICK_COMMAND_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendCommand(chip.cmd)}
              className="bg-[#1e1f22] hover:bg-[#5865F2] text-[#dbdee1] hover:text-white px-2.5 py-1 rounded-full text-xs font-mono font-medium shrink-0 transition-colors cursor-pointer border border-[#35373c] hover:border-[#5865F2]"
              title={chip.desc}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Command Input Box */}
        <div className="p-4 bg-[#313338] pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCommand();
            }}
            className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center gap-3 shadow-inner border border-transparent focus-within:border-[#5865F2]/60 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-[#4e5058] flex items-center justify-center text-white text-xs font-bold shrink-0">
              +
            </span>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message #zenith-commands (Type .help, .play, .staffquota, .antinuke, .jail, etc.)"
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-[#80848e] font-sans"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="text-[#949ba4] hover:text-white disabled:opacity-40 disabled:hover:text-[#949ba4] cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-[#949ba4] mt-1.5 px-1">
            <span>Supports prefix <code className="text-white font-mono">.</code>, slash <code className="text-white font-mono">/</code>, or no-prefix</span>
            <span className="text-[#57f287] font-medium">Custom Emojis Rendered Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
