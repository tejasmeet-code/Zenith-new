import React, { useState } from 'react';
import {
  Shield,
  Layers,
  Sparkles,
  Server,
  Terminal,
  Settings2,
  Users,
  Award,
  Music,
  CheckCircle2,
  Radio,
  BarChart3,
  Mail,
  UserCheck,
  AlertTriangle,
  Send,
  Plus,
  Trash2,
  Image as ImageIcon,
  Copy,
  ExternalLink,
  ChevronDown,
  Lock,
  LogOut,
  RefreshCw,
  Gift,
  Coins,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Flame,
  Zap,
  Search,
  Sliders,
  Eye,
  HelpCircle,
  Activity,
  FileText,
  Check,
  X,
  Clock,
  UserMinus,
  UserX,
  MessageSquare,
  FolderPlus,
  ShieldAlert,
  FlameKindling,
  Repeat,
  Shuffle
} from 'lucide-react';
import { BOT_OWNER_ID, BOT_STAFF_ROLES, INITIAL_BOT_STAFF } from '../data/defaultConfig.ts';
import { ZENITH_CUSTOM_EMOJIS, TOTAL_CUSTOM_EMOJIS_COUNT } from '../data/customEmojis.ts';
import { BOT_MODULES } from '../data/modulesData.ts';
import type { DiscordEmbed, DiscordEmbedField, DiscordButton, BotStaffMember, ModerationCase } from '../types/index.ts';
import { DiscordEmbedRenderer, renderWithCustomEmojis } from './DiscordEmbedRenderer.tsx';
import { botEngine } from '../utils/botEngine.ts';

interface GuildItem {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  onlineCount: number;
  role: string;
  isPremium: boolean;
}

const INITIAL_SAMPLE_GUILDS: GuildItem[] = [
  {
    id: '129840000000000000',
    name: 'Zenith Official HQ',
    icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    memberCount: 5200,
    onlineCount: 1840,
    role: 'Owner (Unrestricted)',
    isPremium: true
  },
  {
    id: '129840000000000001',
    name: 'Cloud Gaming Syndicate',
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80',
    memberCount: 3400,
    onlineCount: 920,
    role: 'Owner Bypass Active',
    isPremium: true
  },
  {
    id: '129840000000000002',
    name: 'Anime & Chill Lounge',
    icon: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=120&q=80',
    memberCount: 2900,
    onlineCount: 810,
    role: 'Owner Bypass Active',
    isPremium: false
  },
  {
    id: '129840000000000003',
    name: 'MetaVerse Esports',
    icon: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=120&q=80',
    memberCount: 4800,
    onlineCount: 1420,
    role: 'Owner Bypass Active',
    isPremium: true
  },
  {
    id: '129840000000000004',
    name: 'DarkRealm RPG Guild',
    icon: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=120&q=80',
    memberCount: 6100,
    onlineCount: 2200,
    role: 'Owner Bypass Active',
    isPremium: true
  },
  {
    id: '129840000000000005',
    name: 'Lofi 24/7 Radio Station',
    icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80',
    memberCount: 8500,
    onlineCount: 3100,
    role: 'Owner Bypass Active',
    isPremium: true
  }
];

export const SapphireDashboard: React.FC = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser] = useState({
    id: BOT_OWNER_ID,
    username: 'ZenithOwner',
    discriminator: '0001',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    badges: ['Owner', 'Early Supporter', 'Verified Developer']
  });

  const [guildList, setGuildList] = useState<GuildItem[]>(INITIAL_SAMPLE_GUILDS);
  const [activeGuild, setActiveGuild] = useState<GuildItem>(INITIAL_SAMPLE_GUILDS[0]);

  // Section switcher: Unified Sapphire + Wick + Dyno control
  const [activeSection, setActiveSection] = useState<
    | 'overview'
    | 'dyno-mod'
    | 'wick-security'
    | 'embed-builder'
    | 'music-player'
    | 'tempvoice'
    | 'tickets-desk'
    | 'giveaways'
    | 'statbot'
    | 'all-modules'
    | 'server-staff'
    | 'bot-staff'
    | 'heavencloud'
    | 'emojis-hub'
  >('overview');

  // TempVoice State
  const [masterChannelName, setMasterChannelName] = useState('➕ Join to Create');
  const [tempVoiceCategory, setTempVoiceCategory] = useState('🔊 Dynamic Voice Rooms');
  const [defaultUserLimit, setDefaultUserLimit] = useState(0);
  const [defaultBitrate, setDefaultBitrate] = useState(96);
  const [activeTempVoiceRooms, setActiveTempVoiceRooms] = useState([
    { id: 'tv-1', name: "🔊 Nova's Gaming Lounge", owner: 'NovaGamer#1201', membersCount: 3, isLocked: false, limit: 4 },
    { id: 'tv-2', name: "🔊 Valkyrie's Strategy Room", owner: 'Valkyrie#8821', membersCount: 2, isLocked: true, limit: 2 },
    { id: 'tv-3', name: '🔊 Lofi Study Chill', owner: 'CyberSamurai', membersCount: 5, isLocked: false, limit: 0 }
  ]);

  // Owner God Mode / Universal Access Modals
  const [showUniversalModal, setShowUniversalModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [customDirectId, setCustomDirectId] = useState('');
  const [customDirectName, setCustomDirectName] = useState('');

  // Top Action Notification Banner
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const notifyAction = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(null), 5000);
  };

  // ----------------------------------------------------
  // 1. DYNO-STYLE WEB MODERATION ACTION CENTER STATE
  // ----------------------------------------------------
  const [targetUser, setTargetUser] = useState('');
  const [modAction, setModAction] = useState<'WARN' | 'MUTE' | 'JAIL' | 'KICK' | 'BAN' | 'SOFTBAN'>('WARN');
  const [modReason, setModReason] = useState('Violating server community safety guidelines');
  const [modDuration, setModDuration] = useState('1 hour');
  const [modProof, setModProof] = useState('');
  const [sendDmToUser, setSendDmToUser] = useState(true);
  const [purgeRecentMessages, setPurgeRecentMessages] = useState(true);
  const [directPurgeChannel, setDirectPurgeChannel] = useState('#general');
  const [directPurgeCount, setDirectPurgeCount] = useState(25);

  const [activeCases, setActiveCases] = useState<ModerationCase[]>([
    {
      caseId: 1042,
      userId: '129840009988776655',
      userName: 'RogueSpammer#9921',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      moderatorId: BOT_OWNER_ID,
      moderatorName: 'ZenithOwner',
      action: 'JAIL',
      reason: 'Automated spam raid pattern detected by Automod',
      duration: '24 hours',
      timestamp: 'Today at 06:14 AM',
      active: true
    },
    {
      caseId: 1041,
      userId: '129840008877665544',
      userName: 'GhostRaidBot#0012',
      userAvatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80',
      moderatorId: BOT_OWNER_ID,
      moderatorName: 'ZenithOwner',
      action: 'BAN',
      reason: 'Unauthorized bot invite attempt blocked by Antinuke',
      timestamp: 'Yesterday at 23:40',
      active: true
    },
    {
      caseId: 1040,
      userId: '129840007766554433',
      userName: 'ToxicPlayer#1289',
      userAvatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=120&q=80',
      moderatorId: BOT_OWNER_ID,
      moderatorName: 'ZenithOwner',
      action: 'MUTE',
      reason: 'Inappropriate language in public lounge',
      duration: '3 hours',
      timestamp: 'Yesterday at 18:22',
      active: false
    }
  ]);

  const handleExecuteWebModAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUser.trim()) return;

    const newCase: ModerationCase = {
      caseId: Math.max(...activeCases.map(c => c.caseId), 1000) + 1,
      userId: `1298${Math.floor(Math.random() * 899999 + 100000)}000000`,
      userName: targetUser.replace('@', ''),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      moderatorId: BOT_OWNER_ID,
      moderatorName: currentUser.username,
      action: modAction,
      reason: modReason,
      duration: modAction === 'MUTE' || modAction === 'JAIL' ? modDuration : undefined,
      proofUrl: modProof || undefined,
      timestamp: 'Just now',
      active: true
    };

    setActiveCases([newCase, ...activeCases]);
    setTargetUser('');

    notifyAction(
      `DISCORD ACTION EXECUTED: ${modAction} applied on @${newCase.userName} (Case #${newCase.caseId}) ${
        sendDmToUser ? '• DM sent with appeal link' : ''
      }`
    );
  };

  const handlePurgeChannel = () => {
    notifyAction(
      `PURGE COMPLETED: Cleared ${directPurgeCount} messages in ${directPurgeChannel} on Discord Gateway!`
    );
  };

  const handleRevokeCase = (caseId: number) => {
    setActiveCases(prev => prev.map(c => c.caseId === caseId ? { ...c, active: false } : c));
    notifyAction(`Case #${caseId} revoked on Discord Gateway! User unpunished.`);
  };

  // ----------------------------------------------------
  // 2. WICK-STYLE ANTINUKE & EMERGENCY PANIC MATRIX
  // ----------------------------------------------------
  const [panicModeActive, setPanicModeActive] = useState(false);
  const [quarantinedUsers, setQuarantinedUsers] = useState([
    { id: '129840003322110011', username: 'SuspiciousRaidAlt#4412', reason: 'Mass mention trigger (>7 in 2s)', flaggedAt: '12 mins ago' },
    { id: '129840002211009988', username: 'PhishLinkBot#1109', reason: 'Attempted discord phishing gift redirect', flaggedAt: '35 mins ago' }
  ]);
  const [massBanLimit, setMassBanLimit] = useState(3);
  const [massKickLimit, setMassKickLimit] = useState(3);
  const [massChannelDeleteLimit, setMassChannelDeleteLimit] = useState(2);
  const [massRoleDeleteLimit, setMassRoleDeleteLimit] = useState(2);
  const [honeypotChannel, setHoneypotChannel] = useState('#trap-verification');
  const [antiRaidAccountAgeDays, setAntiRaidAccountAgeDays] = useState(7);

  const togglePanicMode = () => {
    const newState = !panicModeActive;
    setPanicModeActive(newState);
    if (newState) {
      notifyAction(
        'EMERGENCY PANIC LOCKDOWN TRIGGERED! All text channels set to read-only, voice connections terminated, invite links invalidated.'
      );
    } else {
      notifyAction('Emergency Panic Lockdown Lifted. Server returned to standard Antinuke posture.');
    }
  };

  const handleReleaseQuarantine = (userId: string) => {
    setQuarantinedUsers(prev => prev.filter(u => u.id !== userId));
    notifyAction(`Quarantine revoked for user ${userId}. Standard member roles restored.`);
  };

  const handleBanQuarantine = (userId: string) => {
    setQuarantinedUsers(prev => prev.filter(u => u.id !== userId));
    notifyAction(`PERMANENT BAN EXECUTED on quarantined suspect ${userId}. Cleared from Discord.`);
  };

  // ----------------------------------------------------
  // 3. SAPPHIRE-STYLE VISUAL EMBED BUILDER
  // ----------------------------------------------------
  const [embedTitle, setEmbedTitle] = useState('Zenith Global Server Announcement');
  const [embedDescription, setEmbedDescription] = useState(
    'Zenith v2.5.0 has been deployed with **24/7 Lavalink Audio**, **Antinuke Shield Matrix**, and full **HeavenCloud Cloud Orchestration**.\n\n• Zero downtime failover active\n• All custom emojis synchronized\n• Staff quotas active Sunday 23:59 UTC'
  );
  const [embedColor, setEmbedColor] = useState('#5865F2');
  const [embedBanner, setEmbedBanner] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
  const [embedAuthor, setEmbedAuthor] = useState('Zenith System Core');
  const [embedFooter, setEmbedFooter] = useState('Zenith Core Engine • Hosted on HeavenCloud');
  const [embedTargetChannel, setEmbedTargetChannel] = useState('#announcements');
  const [embedFields, setEmbedFields] = useState<DiscordEmbedField[]>([
    { name: '<:zenith_shield:129841800100000001> Security Status', value: 'Antinuke Fully Active', inline: true },
    { name: '<a:zenith_equalizer:129841800200000001> Audio Engine', value: '24/7 Voice Channel Lock', inline: true },
    { name: '<a:zenith_prem_diamond:129841830100000001> Guild Tier', value: 'Diamond Ultra Tier', inline: true }
  ]);
  const [selectedEmojiForField, setSelectedEmojiForField] = useState(ZENITH_CUSTOM_EMOJIS[0].code);

  const handleAddField = () => {
    setEmbedFields(prev => [
      ...prev,
      { name: `${selectedEmojiForField} New Feature Point`, value: 'Clean key points with zero fluff.', inline: true }
    ]);
  };

  const handleRemoveField = (index: number) => {
    setEmbedFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleDispatchEmbed = () => {
    botEngine.executeCommand(`.announce ${embedTitle}`);
    notifyAction(`EMBED BROADCASTED: Visual announcement delivered directly to ${embedTargetChannel} on Discord!`);
  };

  // ----------------------------------------------------
  // 4. LIVE 24/7 MUSIC WEB PLAYER CONSOLE
  // ----------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(true);
  const [is247Locked, setIs247Locked] = useState(true);
  const [musicVolume, setMusicVolume] = useState(85);
  const [musicTrackSearch, setMusicTrackSearch] = useState('');
  const [voiceChannelName, setVoiceChannelName] = useState('Lofi Lounge 24/7');
  const [playlistQueue, setPlaylistQueue] = useState([
    { id: '1', title: 'Cyberpunk Lo-Fi Chill Beats 2026', artist: 'Zenith Audio Lab', duration: '3:45', requestedBy: 'ZenithOwner' },
    { id: '2', title: 'Night Ride Synthwave Odyssey', artist: 'RetroCloud', duration: '4:20', requestedBy: 'CyberSamurai' },
    { id: '3', title: 'Deep Focus Ambient Piano', artist: 'Serenity Wave', duration: '2:50', requestedBy: 'StaffBot' }
  ]);

  const handleAddTrackToQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicTrackSearch.trim()) return;
    const newTrack = {
      id: String(Date.now()),
      title: musicTrackSearch.trim(),
      artist: 'Lavalink Stream #1',
      duration: '3:30',
      requestedBy: currentUser.username
    };
    setPlaylistQueue(prev => [...prev, newTrack]);
    setMusicTrackSearch('');
    notifyAction(`MUSIC QUEUED: "${newTrack.title}" added to 24/7 voice channel "${voiceChannelName}"`);
  };

  const handleSkipTrack = () => {
    if (playlistQueue.length > 1) {
      setPlaylistQueue(prev => prev.slice(1));
      notifyAction('MUSIC SKIPPED: Playing next track in queue on Lavalink node.');
    } else {
      notifyAction('Queue has 1 song remaining. Loop mode active.');
    }
  };

  // ----------------------------------------------------
  // 5. DYNO/WEB TICKET & MODMAIL DESK
  // ----------------------------------------------------
  const [selectedTicketId, setSelectedTicketId] = useState('ticket-1092');
  const [ticketReplyInput, setTicketReplyInput] = useState('');
  const [ticketList, setTicketList] = useState([
    {
      id: 'ticket-1092',
      channelName: 'ticket-1092',
      userName: 'NovaGamer#1201',
      category: 'General Support',
      openedAt: '15m ago',
      status: 'Open',
      messages: [
        { sender: 'NovaGamer#1201', text: 'Hey! I purchased Diamond VIP rank on the web store but haven\'t received my autorole yet.', time: '15m ago', isStaff: false },
        { sender: 'ZenithBot', text: 'Thank you for opening a support ticket! A staff member will be with you shortly.', time: '15m ago', isStaff: true }
      ]
    },
    {
      id: 'ticket-1091',
      channelName: 'staff-app-042',
      userName: 'Valkyrie#8821',
      category: 'Staff Application',
      openedAt: '1h ago',
      status: 'Claimed',
      messages: [
        { sender: 'Valkyrie#8821', text: 'Submitting my weekly moderation portfolio for Junior Mod tier.', time: '1h ago', isStaff: false },
        { sender: 'ZenithOwner', text: 'Portfolio received. Checking quota metrics.', time: '40m ago', isStaff: true }
      ]
    }
  ]);

  const activeTicket = ticketList.find(t => t.id === selectedTicketId) || ticketList[0];

  const handleSendTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketReplyInput.trim()) return;

    const newMsg = {
      sender: currentUser.username,
      text: ticketReplyInput.trim(),
      time: 'Just now',
      isStaff: true
    };

    setTicketList(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return { ...t, messages: [...t.messages, newMsg] };
      }
      return t;
    }));

    setTicketReplyInput('');
    notifyAction(`TICKET REPLY SENT: Dispatched directly to #${activeTicket.channelName} on Discord Gateway!`);
  };

  const handleCloseTicket = () => {
    setTicketList(prev => prev.filter(t => t.id !== selectedTicketId));
    notifyAction(`TICKET CLOSED: Encrypted HTML transcript saved & archived on HeavenCloud!`);
  };

  // ----------------------------------------------------
  // 6. GIVEAWAY LAUNCHER FROM WEB
  // ----------------------------------------------------
  const [giveawayPrize, setGiveawayPrize] = useState('1x Discord Nitro (Monthly) + Zenith Diamond Rank');
  const [giveawayWinners, setGiveawayWinners] = useState(1);
  const [giveawayDuration, setGiveawayDuration] = useState('24 hours');
  const [giveawayChannel, setGiveawayChannel] = useState('#giveaways');
  const [activeGiveaways, setActiveGiveaways] = useState([
    {
      id: 'gw-1',
      prize: '3x Zenith Diamond Lifetime Subscriptions',
      winners: 3,
      channel: '#giveaways',
      endsIn: '6 hours remaining',
      entries: 142
    }
  ]);

  const handleLaunchGiveaway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giveawayPrize.trim()) return;

    const newGw = {
      id: `gw-${Date.now()}`,
      prize: giveawayPrize.trim(),
      winners: giveawayWinners,
      channel: giveawayChannel,
      endsIn: giveawayDuration,
      entries: 1
    };

    setActiveGiveaways([newGw, ...activeGiveaways]);
    notifyAction(`GIVEAWAY LAUNCHED: Interactive giveaway embed dispatched to ${giveawayChannel} on Discord!`);
  };

  // ----------------------------------------------------
  // 7. BOT STAFF & SUPPORT SERVER MANAGEMENT
  // ----------------------------------------------------
  const [supportServerId, setSupportServerId] = useState('129840000000000000');
  const [supportServerInvite, setSupportServerInvite] = useState('https://discord.gg/zenith');
  const [botStaffList, setBotStaffList] = useState<BotStaffMember[]>([...INITIAL_BOT_STAFF]);
  const [newStaffUser, setNewStaffUser] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('role_bot_manager');

  const handleAppointBotStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffUser.trim()) return;

    const role = BOT_STAFF_ROLES.find((r) => r.id === newStaffRole) || BOT_STAFF_ROLES[1];
    const newMember: BotStaffMember = {
      userId: `1298${Math.floor(Math.random() * 899999 + 100000)}000000`,
      username: newStaffUser.replace('@', ''),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      roleId: role.id,
      roleName: role.name,
      tier: role.tier,
      assignedAt: new Date().toISOString().split('T')[0],
      assignedBy: currentUser.username,
      strikes: 0,
      weeklyHandledTickets: 0,
      weeklyGuildAudits: 0,
      notes: `Appointed by ${currentUser.username} via Web Control Center`
    };

    setBotStaffList((prev) => [...prev, newMember]);
    setNewStaffUser('');

    notifyAction(
      `BOT STAFF APPOINTED: @${newMember.username} assigned as ${role.name}. Automated DM dispatched inviting them to ${supportServerInvite}!`
    );
  };

  const handleRevokeBotStaff = (userId: string) => {
    setBotStaffList((prev) => prev.filter((m) => m.userId !== userId));
    notifyAction(`Bot staff credentials revoked for user ID ${userId}.`);
  };

  // ----------------------------------------------------
  // 8. HEAVENCLOUD CLOUD HOSTING INTEGRATION
  // ----------------------------------------------------
  const [isCloudDeploying, setIsCloudDeploying] = useState(false);
  const [cloudDeployStatus, setCloudDeployStatus] = useState<string | null>(null);

  const handleHeavenCloudDeploy = () => {
    setIsCloudDeploying(true);
    setCloudDeployStatus('Authenticating HeavenCloud Cluster API via secret credentials...');

    setTimeout(() => {
      setCloudDeployStatus('Container image built: Zenith Core v2.5.0 with Lavalink v4 audio & PM2 supervisor...');
    }, 1200);

    setTimeout(() => {
      setCloudDeployStatus('Connecting 2 Gateway Shards & Voice WebSocket Nodes to Virginia cluster...');
    }, 2400);

    setTimeout(() => {
      setIsCloudDeploying(false);
      setCloudDeployStatus('ONLINE — Zenith Bot cluster running 24/7 on HeavenCloud with 18ms latency!');
      notifyAction('HEAVENCLOUD SYNC COMPLETE: Zenith Bot is fully ONLINE and operational 24/7!');
    }, 3800);
  };

  // ----------------------------------------------------
  // 9. MODULES TOGGLES STATE
  // ----------------------------------------------------
  const [modulesState, setModulesState] = useState(BOT_MODULES);
  const [moduleSearch, setModuleSearch] = useState('');

  const toggleModule = (modId: string) => {
    setModulesState(prev => prev.map(m => m.id === modId ? { ...m, enabled: !m.enabled } : m));
    const mod = modulesState.find(m => m.id === modId);
    notifyAction(`Module "${mod?.name}" is now ${!mod?.enabled ? 'ENABLED' : 'DISABLED'} on Discord Gateway!`);
  };

  return (
    <div className="flex flex-col xl:flex-row h-full min-h-[820px] bg-[#0f1013] text-[#dbdee1] rounded-2xl border border-[#232428] shadow-2xl overflow-hidden font-sans">
      {/* 1. Leftmost Guild Icon Rail */}
      <div className="w-18 bg-[#17181c] border-r border-[#232428] flex flex-col items-center py-4 space-y-3 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5865F2] to-[#7289da] flex items-center justify-center text-white font-black text-xl shadow-lg cursor-pointer hover:rounded-xl transition-all">
          Z
        </div>

        <div className="w-8 h-[2px] bg-[#2b2d31] rounded-full my-1" />

        {/* Guilds List (Universal Access) */}
        {guildList.map((guild) => (
          <div key={guild.id} className="relative group">
            {activeGuild.id === guild.id && (
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-r-full" />
            )}
            <button
              onClick={() => setActiveGuild(guild)}
              className={`w-12 h-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden border-2 cursor-pointer ${
                activeGuild.id === guild.id
                  ? 'border-[#5865F2] rounded-2xl shadow-md'
                  : 'border-transparent hover:border-[#35373c]'
              }`}
              title={`${guild.name} (${guild.memberCount.toLocaleString()} members) - Owner Bypass Active`}
            >
              <img src={guild.icon} alt={guild.name} className="w-full h-full object-cover" />
            </button>
          </div>
        ))}

        {/* Universal Access Server Switcher (+) */}
        <button
          onClick={() => setShowUniversalModal(true)}
          className="w-12 h-12 rounded-3xl hover:rounded-2xl bg-[#232428] hover:bg-[#5865F2] text-[#57f287] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow group border border-dashed border-[#57f287]/40 hover:border-[#5865F2]"
          title="Owner God Mode: Access Any Discord Server by ID or Search (No Admin Perms Required)"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex-1" />

        {/* User Avatar with God Mode Indicator */}
        <div className="relative group">
          <img
            src={currentUser.avatar}
            alt="User"
            className="w-10 h-10 rounded-full border border-[#ED4245] object-cover cursor-pointer"
            title={`Owner ID: ${BOT_OWNER_ID} (God Mode Active)`}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#57f287] rounded-full border-2 border-[#17181c]" />
        </div>
      </div>

      {/* 2. Sapphire / Wick / Dyno Navigation Sidebar */}
      <div className="w-64 bg-[#1a1b1f] border-r border-[#27292e] flex flex-col shrink-0">
        {/* Guild Header with Universal Access Banner */}
        <div className="h-16 px-4 border-b border-[#27292e] flex items-center justify-between gap-2">
          <div className="truncate">
            <h3 className="font-bold text-white text-sm truncate flex items-center gap-1.5">
              <span>{activeGuild.name}</span>
              <span className="text-[#5865F2] text-xs">✓</span>
            </h3>
            <span className="text-[10px] text-[#57f287] font-semibold flex items-center gap-1 truncate">
              <Shield className="w-3 h-3 text-[#57f287] shrink-0" />
              Owner Bypass Active (No Admin Perms Needed)
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowCreditsModal(true)}
              className="bg-[#eb459e]/20 hover:bg-[#eb459e]/40 text-[#eb459e] border border-[#eb459e]/40 text-[9px] font-extrabold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              title="View Owner Credits & Netlify Hosting"
            >
              Credits
            </button>
            <button
              onClick={() => setShowUniversalModal(true)}
              className="bg-[#5865F2]/20 hover:bg-[#5865F2]/40 text-[#5865F2] border border-[#5865F2]/40 text-[9px] font-extrabold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              title="Switch to Any Discord Server in Database"
            >
              All
            </button>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-semibold">
          {/* CATEGORY: CORE CONTROL */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#80848e] px-2 mb-1.5">
              Independent Actions
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'overview'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>Command Center</span>
              </button>

              <button
                onClick={() => setActiveSection('dyno-mod')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'dyno-mod'
                    ? 'bg-[#ED4245] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 shrink-0 text-[#ED4245]" />
                  <span>Dyno Web Moderation</span>
                </div>
                <span className="text-[9px] bg-[#ED4245]/30 text-[#ED4245] font-extrabold px-1.5 rounded border border-[#ED4245]/50">
                  EXEC
                </span>
              </button>

              <button
                onClick={() => setActiveSection('wick-security')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'wick-security'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-[#FAA61A]" />
                  <span>Wick Antinuke &amp; Panic</span>
                </div>
                {panicModeActive && (
                  <span className="w-2 h-2 rounded-full bg-[#ED4245] animate-ping" />
                )}
              </button>
            </div>
          </div>

          {/* CATEGORY: CREATIVE & MEDIA */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#80848e] px-2 mb-1.5">
              Media &amp; Community
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveSection('embed-builder')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'embed-builder'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 shrink-0 text-[#eb459e]" />
                  <span>Sapphire Embed Builder</span>
                </div>
                <span className="text-[9px] bg-[#eb459e] text-white font-extrabold px-1 rounded">
                  BANNER
                </span>
              </button>

              <button
                onClick={() => setActiveSection('music-player')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'music-player'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Music className="w-4 h-4 shrink-0 text-[#57f287]" />
                  <span>24/7 Music Console</span>
                </div>
                <span className="text-[9px] bg-[#57f287]/20 text-[#57f287] font-mono px-1 rounded">
                  24/7
                </span>
              </button>

              <button
                onClick={() => setActiveSection('tempvoice')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'tempvoice'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 shrink-0 text-[#57f287]" />
                  <span>TempVoice Rooms</span>
                </div>
                <span className="text-[9px] bg-[#57f287]/20 text-[#57f287] font-mono px-1 rounded font-bold">
                  AUTO-VC
                </span>
              </button>

              <button
                onClick={() => setActiveSection('tickets-desk')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'tickets-desk'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-[#5865F2]" />
                  <span>Tickets &amp; Modmail</span>
                </div>
                <span className="text-[10px] text-[#57f287] font-mono font-bold">
                  {ticketList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('giveaways')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'giveaways'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <Gift className="w-4 h-4 shrink-0 text-[#FEE75C]" />
                <span>Giveaways Launcher</span>
              </button>

              <button
                onClick={() => setActiveSection('statbot')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'statbot'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4 shrink-0 text-[#57f287]" />
                <span>StatBot Telemetry</span>
              </button>
            </div>
          </div>

          {/* CATEGORY: GOVERNANCE & ROLES */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#80848e] px-2 mb-1.5">
              Staff &amp; Modules
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveSection('all-modules')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'all-modules'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 shrink-0 text-[#5865F2]" />
                  <span>All 32 Modules Hub</span>
                </div>
                <span className="text-[9px] bg-[#5865F2]/20 text-[#5865F2] font-mono font-bold px-1 rounded">
                  32
                </span>
              </button>

              <button
                onClick={() => setActiveSection('server-staff')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'server-staff'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 shrink-0 text-[#FEE75C]" />
                <span>Server Staff Quotas</span>
              </button>

              <button
                onClick={() => setActiveSection('bot-staff')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'bot-staff'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 shrink-0 text-[#ED4245]" />
                  <span>Bot Staff &amp; Roles</span>
                </div>
                <span className="text-[10px] text-[#57f287] font-mono font-bold">
                  {botStaffList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('emojis-hub')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'emojis-hub'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#EB459E]" />
                  <span>Custom Emojis ({TOTAL_CUSTOM_EMOJIS_COUNT})</span>
                </div>
                <span className="text-[9px] bg-[#EB459E]/20 text-[#EB459E] font-extrabold px-1 rounded">
                  105+
                </span>
              </button>

              <button
                onClick={() => setActiveSection('heavencloud')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'heavencloud'
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'text-[#949ba4] hover:bg-[#27292e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Server className="w-4 h-4 shrink-0 text-[#5865F2]" />
                  <span>HeavenCloud Cluster</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#57f287] animate-pulse" />
              </button>
            </div>
          </div>
        </div>

        {/* User Card Bar */}
        <div className="h-16 bg-[#141518] border-t border-[#27292e] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-[#ED4245]" />
            <div className="truncate">
              <div className="text-white text-xs font-bold truncate flex items-center gap-1">
                <span>{currentUser.username}</span>
                <span className="text-[9px] bg-[#ED4245] text-white px-1 rounded font-black">OWNER</span>
              </div>
              <div className="text-[10px] text-[#949ba4] font-mono">
                {BOT_OWNER_ID}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-[#949ba4] hover:text-[#ED4245] transition-colors p-1"
            title="Discord Session State"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main Action Workspace */}
      <div className="flex-1 bg-[#131418] flex flex-col overflow-y-auto">
        {/* Top Direct Action Notification Banner */}
        {actionNotification && (
          <div className="bg-[#248046] text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top border-b border-[#248046]/50 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              <span>{actionNotification}</span>
            </div>
            <button onClick={() => setActionNotification(null)} className="text-white text-xs font-bold cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* SECTION: OVERVIEW & COMMAND CENTER */}
        {activeSection === 'overview' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    Zenith Unified Control Suite
                  </span>
                  <span className="text-[#57f287] text-xs font-semibold">
                    Independent Web Execution Active
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {activeGuild.name} Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                  Manage moderation, audio, tickets, security, and staff directly from this website without opening Discord.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://demonzenith.netlify.app"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1e1f24] hover:bg-[#27292e] text-white border border-[#27292e] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>demonzenith.netlify.app</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#1e1f24] p-4 rounded-2xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4] font-medium">Total Members</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  {activeGuild.memberCount.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#57f287] mt-1">+142 this week</div>
              </div>

              <div className="bg-[#1e1f24] p-4 rounded-2xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4] font-medium">Online Right Now</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  {activeGuild.onlineCount.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#5865F2] mt-1">35% Activity Rate</div>
              </div>

              <div className="bg-[#1e1f24] p-4 rounded-2xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4] font-medium">24/7 Audio Status</div>
                <div className="text-2xl font-bold text-[#57f287] font-mono mt-1">
                  LOCKED
                </div>
                <div className="text-[11px] text-[#949ba4] mt-1">320kbps Lavalink v4</div>
              </div>

              <div className="bg-[#1e1f24] p-4 rounded-2xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4] font-medium">Antinuke Defense</div>
                <div className={`text-2xl font-bold font-mono mt-1 ${panicModeActive ? 'text-[#ED4245]' : 'text-[#5865F2]'}`}>
                  {panicModeActive ? 'PANIC ACTIVE' : 'ARMED'}
                </div>
                <div className="text-[11px] text-[#57f287] mt-1">0 breaches detected</div>
              </div>
            </div>

            {/* Direct Web Actions Command Bar (No Discord Required) */}
            <div className="bg-gradient-to-r from-[#1e1f24] via-[#23242a] to-[#1e1f24] p-6 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27292e] pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FEE75C]" />
                    Direct Web Execution Shortcuts
                  </h3>
                  <p className="text-xs text-[#949ba4] mt-0.5">
                    Click any shortcut to trigger real-time actions directly on the Discord Gateway.
                  </p>
                </div>
                <span className="text-[10px] bg-[#57f287]/20 text-[#57f287] border border-[#57f287]/40 px-2 py-0.5 rounded font-mono font-bold">
                  Zero Discord Client Required
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveSection('dyno-mod')}
                  className="bg-[#ED4245]/20 hover:bg-[#ED4245]/30 border border-[#ED4245]/40 text-[#ED4245] p-3.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Execute Punishment</span>
                </button>

                <button
                  onClick={togglePanicMode}
                  className={`${
                    panicModeActive
                      ? 'bg-[#ED4245] text-white animate-pulse'
                      : 'bg-[#FAA61A]/20 hover:bg-[#FAA61A]/30 border border-[#FAA61A]/40 text-[#FAA61A]'
                  } p-3.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group`}
                >
                  <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{panicModeActive ? 'Disable Panic Lock' : 'Trigger Panic Lock'}</span>
                </button>

                <button
                  onClick={() => setActiveSection('embed-builder')}
                  className="bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-[#5865F2] p-3.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Dispatch Embed</span>
                </button>

                <button
                  onClick={() => setActiveSection('giveaways')}
                  className="bg-[#eb459e]/20 hover:bg-[#eb459e]/30 border border-[#eb459e]/40 text-[#eb459e] p-3.5 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Launch Giveaway</span>
                </button>
              </div>
            </div>

            {/* Hub Feature Quick Launch Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveSection('dyno-mod')}
                className="bg-[#1e1f24] hover:bg-[#23242a] p-5 rounded-2xl border border-[#27292e] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ED4245]/20 text-[#ED4245] flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-[#ED4245] transition-colors">
                  Dyno Web Action Center
                </h4>
                <p className="text-xs text-[#949ba4] mt-1">
                  Warn, Mute, Jail, Kick, or Ban members directly from the web with proof attachments and automatic appeal DMs.
                </p>
              </div>

              <div
                onClick={() => setActiveSection('wick-security')}
                className="bg-[#1e1f24] hover:bg-[#23242a] p-5 rounded-2xl border border-[#27292e] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAA61A]/20 text-[#FAA61A] flex items-center justify-center mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-[#FAA61A] transition-colors">
                  Wick Antinuke &amp; Quarantine
                </h4>
                <p className="text-xs text-[#949ba4] mt-1">
                  1-Click Emergency Panic Server Lock, Quarantine Chamber, and Mass-Action rate limit tripwires.
                </p>
              </div>

              <div
                onClick={() => setActiveSection('music-player')}
                className="bg-[#1e1f24] hover:bg-[#23242a] p-5 rounded-2xl border border-[#27292e] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#57f287]/20 text-[#57f287] flex items-center justify-center mb-3">
                  <Music className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-[#57f287] transition-colors">
                  24/7 Lavalink Console
                </h4>
                <p className="text-xs text-[#949ba4] mt-1">
                  Control audio streaming, seek tracks, toggle 24/7 lock, and manage voice queues directly from the browser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: DYNO WEB MODERATION ACTION CENTER */}
        {activeSection === 'dyno-mod' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#ED4245] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Dyno Web Action Center
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  Execute Direct Discord Actions Without Typing
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Web Moderation Command Console
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Take immediate action on any guild member from your browser. Dispatches real-time moderation cases and user DMs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form 1: Member Action Form */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-[#27292e] pb-2 flex items-center justify-between">
                  <span>Take Action on Member</span>
                  <span className="text-[10px] text-[#5865F2] font-mono">Gateway Protocol v14</span>
                </h3>

                <form onSubmit={handleExecuteWebModAction} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Target Member (Username, Tag, or Discord ID)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@Username or 1298400011223344"
                      value={targetUser}
                      onChange={(e) => setTargetUser(e.target.value)}
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2.5 rounded-xl border border-[#27292e] focus:border-[#ED4245] outline-none"
                    />
                  </div>

                  {/* Action Selector Buttons */}
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1.5">
                      Select Moderation Action
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WARN', 'MUTE', 'JAIL', 'KICK', 'BAN', 'SOFTBAN'] as const).map((action) => (
                        <button
                          key={action}
                          type="button"
                          onClick={() => setModAction(action)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            modAction === action
                              ? 'bg-[#ED4245] text-white border-[#ED4245] shadow'
                              : 'bg-[#131418] text-[#949ba4] border-[#27292e] hover:border-[#ED4245]/50 hover:text-white'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration (if Mute or Jail) */}
                  {(modAction === 'MUTE' || modAction === 'JAIL') && (
                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Punishment Duration
                      </label>
                      <select
                        value={modDuration}
                        onChange={(e) => setModDuration(e.target.value)}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      >
                        <option value="10 minutes">10 Minutes</option>
                        <option value="1 hour">1 Hour</option>
                        <option value="6 hours">6 Hours</option>
                        <option value="24 hours">24 Hours (1 Day)</option>
                        <option value="7 days">7 Days</option>
                        <option value="Permanent">Permanent</option>
                      </select>
                    </div>
                  )}

                  {/* Reason */}
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Audit Log Reason
                    </label>
                    <input
                      type="text"
                      value={modReason}
                      onChange={(e) => setModReason(e.target.value)}
                      placeholder="Reason for punishment..."
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#ED4245] outline-none"
                    />
                  </div>

                  {/* Proof Attachment */}
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Evidence Proof Attachment (Image / Link URL)
                    </label>
                    <input
                      type="text"
                      value={modProof}
                      onChange={(e) => setModProof(e.target.value)}
                      placeholder="https://cdn.discordapp.com/attachments/..."
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#ED4245] outline-none font-mono"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="pt-2 space-y-2 text-xs">
                    <label className="flex items-center gap-2 text-[#dbdee1] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendDmToUser}
                        onChange={(e) => setSendDmToUser(e.target.checked)}
                        className="rounded border-[#27292e] text-[#5865F2] focus:ring-0"
                      />
                      <span>Dispatch automated DM to member with Case ID &amp; Appeal Form</span>
                    </label>

                    <label className="flex items-center gap-2 text-[#dbdee1] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={purgeRecentMessages}
                        onChange={(e) => setPurgeRecentMessages(e.target.checked)}
                        className="rounded border-[#27292e] text-[#5865F2] focus:ring-0"
                      />
                      <span>Purge target member's messages from the last 24 hours</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 bg-[#ED4245] hover:bg-[#c93b3e] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Execute {modAction} on Discord Gateway</span>
                  </button>
                </form>
              </div>

              {/* Form 2: Direct Purge Messages Tool */}
              <div className="space-y-6">
                <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-[#27292e] pb-2 flex items-center justify-between">
                    <span>Direct Channel Purge Tool</span>
                    <span className="text-[10px] text-[#ED4245] font-mono">Mass Clear</span>
                  </h3>

                  <p className="text-xs text-[#949ba4]">
                    Purge messages instantly from any text channel without needing to switch to Discord and type <code>.purge</code>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Select Channel
                      </label>
                      <select
                        value={directPurgeChannel}
                        onChange={(e) => setDirectPurgeChannel(e.target.value)}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      >
                        <option value="#general">#general</option>
                        <option value="#lounge">#lounge</option>
                        <option value="#bot-commands">#bot-commands</option>
                        <option value="#announcements">#announcements</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Message Count
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[10, 25, 50, 100].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setDirectPurgeCount(count)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                              directPurgeCount === count
                                ? 'bg-[#5865F2] text-white border-[#5865F2]'
                                : 'bg-[#131418] text-[#949ba4] border-[#27292e]'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePurgeChannel}
                    className="w-full bg-[#27292e] hover:bg-[#ED4245] hover:text-white text-[#dbdee1] font-bold text-xs py-2.5 rounded-xl transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Purge {directPurgeCount} Messages from {directPurgeChannel}</span>
                  </button>
                </div>

                {/* Info Card */}
                <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#5865F2] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#949ba4] leading-relaxed">
                    <span className="font-bold text-white block mb-0.5">Automated Appeals &amp; Proof Integration</span>
                    All moderation actions executed from this dashboard automatically generate encrypted audit entries, log to <code>#mod-logs</code>, and deliver direct messages containing appeal links to punished users.
                  </div>
                </div>
              </div>
            </div>

            {/* Live Case History Table */}
            <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#5865F2]" />
                  Active Moderation Cases ({activeCases.length})
                </h3>
                <span className="text-xs text-[#949ba4]">
                  Realtime Case Log
                </span>
              </div>

              <div className="divide-y divide-[#27292e]">
                {activeCases.map((c) => (
                  <div key={c.caseId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
                        c.action === 'BAN' ? 'bg-[#ED4245]' : c.action === 'JAIL' ? 'bg-[#FAA61A]' : 'bg-[#5865F2]'
                      }`}>
                        #{c.caseId}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{c.userName}</span>
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                            c.action === 'BAN' ? 'bg-[#ED4245]/20 text-[#ED4245]' : 'bg-[#FAA61A]/20 text-[#FAA61A]'
                          }`}>
                            {c.action}
                          </span>
                          {!c.active && (
                            <span className="text-[10px] bg-[#57f287]/20 text-[#57f287] px-1.5 rounded font-bold">
                              REVOKED
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#949ba4] mt-0.5">
                          {c.reason} {c.duration && `• Duration: ${c.duration}`} • Mod: {c.moderatorName} ({c.timestamp})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {c.active && (
                        <button
                          onClick={() => handleRevokeCase(c.caseId)}
                          className="text-xs font-bold text-[#57f287] hover:bg-[#57f287]/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-[#57f287]/40"
                        >
                          Pardon / Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: WICK ANTINUKE & EMERGENCY PANIC MATRIX */}
        {activeSection === 'wick-security' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#FAA61A] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Wick Antinuke Matrix
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  Zero Trust Defense Infrastructure
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Antinuke &amp; Emergency Panic Matrix
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Trigger 1-click server lockdowns, isolate suspicious join floods in the Quarantine Chamber, and configure rate-limit tripwires.
              </p>
            </div>

            {/* Emergency Panic Lockdown Banner */}
            <div className={`p-6 rounded-2xl border transition-all ${
              panicModeActive
                ? 'bg-[#ED4245]/20 border-[#ED4245] shadow-2xl shadow-[#ED4245]/20'
                : 'bg-[#1e1f24] border-[#27292e]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                    panicModeActive ? 'bg-[#ED4245] animate-pulse' : 'bg-[#FAA61A]/20 text-[#FAA61A]'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Emergency Panic Mode Server Lockdown</span>
                      {panicModeActive && (
                        <span className="text-xs bg-[#ED4245] text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                          LOCKDOWN ACTIVE
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#949ba4] mt-1 max-w-xl">
                      When triggered, Zenith sets every text channel to read-only, closes voice channels, prevents invites, and activates aggressive captcha filtering for all new accounts.
                    </p>
                  </div>
                </div>

                <button
                  onClick={togglePanicMode}
                  className={`px-5 py-3 rounded-xl font-extrabold text-xs transition-all shadow-lg cursor-pointer active:scale-95 ${
                    panicModeActive
                      ? 'bg-white text-[#ED4245] hover:bg-[#dbdee1]'
                      : 'bg-[#ED4245] hover:bg-[#c93b3e] text-white'
                  }`}
                >
                  {panicModeActive ? 'LIFT PANIC LOCKDOWN' : 'TRIGGER EMERGENCY PANIC LOCKDOWN'}
                </button>
              </div>
            </div>

            {/* Quarantine Chamber Table */}
            <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <UserX className="w-4 h-4 text-[#ED4245]" />
                    Quarantine Chamber ({quarantinedUsers.length})
                  </h3>
                  <p className="text-[11px] text-[#949ba4]">
                    Accounts isolated into locked quarantine role pending staff review.
                  </p>
                </div>
                <span className="text-xs text-[#57f287] font-semibold">
                  Zero Trust Active
                </span>
              </div>

              {quarantinedUsers.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#949ba4]">
                  No suspicious accounts currently quarantined. All safe.
                </div>
              ) : (
                <div className="divide-y divide-[#27292e]">
                  {quarantinedUsers.map((u) => (
                    <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{u.username}</span>
                          <span className="text-[10px] text-[#949ba4] font-mono">ID: {u.id}</span>
                        </div>
                        <div className="text-xs text-[#ED4245] font-semibold mt-0.5">
                          Trigger: {u.reason} • Flagged {u.flaggedAt}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleReleaseQuarantine(u.id)}
                          className="bg-[#57f287]/20 hover:bg-[#57f287]/30 text-[#57f287] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-[#57f287]/40"
                        >
                          Release User
                        </button>
                        <button
                          onClick={() => handleBanQuarantine(u.id)}
                          className="bg-[#ED4245] hover:bg-[#c93b3e] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Permanently Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tripwires & Rate Limits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] space-y-3">
                <h3 className="font-bold text-white text-sm">Mass Action Tripwire Limits</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-[#131418] p-2.5 rounded-xl border border-[#27292e]">
                    <span>Mass Ban Rate Limit</span>
                    <span className="font-mono text-[#5865F2] font-bold">{massBanLimit} bans / 10s</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#131418] p-2.5 rounded-xl border border-[#27292e]">
                    <span>Mass Kick Rate Limit</span>
                    <span className="font-mono text-[#5865F2] font-bold">{massKickLimit} kicks / 10s</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#131418] p-2.5 rounded-xl border border-[#27292e]">
                    <span>Mass Channel Deletion</span>
                    <span className="font-mono text-[#5865F2] font-bold">{massChannelDeleteLimit} deletions / 10s</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#131418] p-2.5 rounded-xl border border-[#27292e]">
                    <span>Mass Role Deletion</span>
                    <span className="font-mono text-[#5865F2] font-bold">{massRoleDeleteLimit} deletions / 10s</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] space-y-3">
                <h3 className="font-bold text-white text-sm">Honeypot &amp; Superuser Whitelist</h3>
                <p className="text-xs text-[#949ba4]">
                  Bot Owner (<code className="text-[#ED4245] font-mono">{BOT_OWNER_ID}</code>) is permanently whitelisted with bypass immunity across all tripwires.
                </p>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#949ba4]">Honeypot Channel:</span>
                    <span className="text-[#FAA61A] font-mono font-bold">{honeypotChannel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#949ba4]">Min Account Age:</span>
                    <span className="text-white font-mono font-bold">{antiRaidAccountAgeDays} Days</span>
                  </div>
                  <div className="text-[#57f287] font-mono font-semibold pt-1 border-t border-[#27292e]">
                    • Whitelisted: ZenithOwner ({BOT_OWNER_ID}) [ROOT BYPASS]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: SAPPHIRE EMBED BUILDER */}
        {activeSection === 'embed-builder' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Sapphire Visual Engine
                </span>
                <span className="text-[#57f287] text-xs font-medium">
                  Live Discord Preview • No Fluff
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Discord Embed &amp; Banner Builder
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Craft high-impact Discord embeds with banner artwork, custom emojis, and bullet points. Dispatches directly to your server channel.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Controls */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#27292e] pb-2">
                  Embed Properties
                </h3>

                {/* Banner URL */}
                <div>
                  <label className="block text-xs font-bold text-[#949ba4] mb-1">
                    Top Header Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={embedBanner}
                    onChange={(e) => setEmbedBanner(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#5865F2] outline-none"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#949ba4] mb-1">
                    Embed Title (Custom Emojis Supported)
                  </label>
                  <input
                    type="text"
                    value={embedTitle}
                    onChange={(e) => setEmbedTitle(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#5865F2] outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#949ba4] mb-1">
                    Description &amp; Key Bullet Points
                  </label>
                  <textarea
                    rows={4}
                    value={embedDescription}
                    onChange={(e) => setEmbedDescription(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs p-3 rounded-xl border border-[#27292e] focus:border-[#5865F2] outline-none"
                  />
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#949ba4] mb-1">
                    Accent Border Color
                  </label>
                  <div className="flex items-center gap-2">
                    {['#5865F2', '#ED4245', '#57F287', '#FEE75C', '#EB459E', '#232428'].map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setEmbedColor(col)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          embedColor === col ? 'scale-110 border-white shadow' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: col }}
                      />
                    ))}
                    <input
                      type="text"
                      value={embedColor}
                      onChange={(e) => setEmbedColor(e.target.value)}
                      className="w-24 bg-[#131418] text-white text-xs px-2 py-1.5 rounded-lg border border-[#27292e] font-mono"
                    />
                  </div>
                </div>

                {/* Target Channel */}
                <div>
                  <label className="block text-xs font-bold text-[#949ba4] mb-1">
                    Target Discord Channel
                  </label>
                  <select
                    value={embedTargetChannel}
                    onChange={(e) => setEmbedTargetChannel(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                  >
                    <option value="#announcements">#announcements</option>
                    <option value="#updates">#updates</option>
                    <option value="#general">#general</option>
                    <option value="#rules">#rules</option>
                  </select>
                </div>

                {/* Fields Section with Custom Emoji Selector */}
                <div className="pt-3 border-t border-[#27292e] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">
                      Dynamic Fields ({embedFields.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddField}
                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Field
                    </button>
                  </div>

                  {/* Emoji dropdown helper */}
                  <div className="bg-[#131418] p-2.5 rounded-xl border border-[#27292e] flex items-center gap-2 text-xs">
                    <span className="text-[#949ba4] text-[11px] font-semibold shrink-0">
                      Insert Custom Emoji:
                    </span>
                    <select
                      value={selectedEmojiForField}
                      onChange={(e) => setSelectedEmojiForField(e.target.value)}
                      className="bg-[#1e1f24] text-white text-xs px-2 py-1 rounded-lg border border-[#27292e] outline-none flex-1 font-mono"
                    >
                      {ZENITH_CUSTOM_EMOJIS.map((emoji) => (
                        <option key={emoji.id} value={emoji.code}>
                          :{emoji.name}: ({emoji.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fields list */}
                  <div className="space-y-2">
                    {embedFields.map((f, idx) => (
                      <div key={idx} className="bg-[#131418] p-2.5 rounded-xl border border-[#27292e] space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={f.name}
                            onChange={(e) => {
                              const updated = [...embedFields];
                              updated[idx].name = e.target.value;
                              setEmbedFields(updated);
                            }}
                            className="flex-1 bg-[#1e1f24] text-white text-xs px-2 py-1 rounded border border-[#27292e] outline-none"
                            placeholder="Field Title"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveField(idx)}
                            className="text-[#ED4245] hover:text-white p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={f.value}
                          onChange={(e) => {
                            const updated = [...embedFields];
                            updated[idx].value = e.target.value;
                            setEmbedFields(updated);
                          }}
                          className="w-full bg-[#1e1f24] text-[#dbdee1] text-xs px-2 py-1 rounded border border-[#27292e] outline-none"
                          placeholder="Field Value"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-Time Live Discord Preview */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] flex flex-col shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-[#27292e] pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#57f287]" />
                    Live Discord Embed Output
                  </span>
                  <span className="text-[11px] text-[#949ba4]">Rendered Exactly as in Discord</span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <DiscordEmbedRenderer
                    embed={{
                      banner: embedBanner,
                      title: embedTitle,
                      description: embedDescription,
                      color: embedColor,
                      author: { name: embedAuthor },
                      footer: { text: embedFooter },
                      fields: embedFields
                    }}
                    buttons={[
                      { id: 'btn_preview_1', label: 'Primary Action', style: 'primary', emoji: '<:zenith_shield:129841800100000001>' },
                      { id: 'btn_preview_2', label: 'Documentation', style: 'secondary' }
                    ]}
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#27292e] flex items-center justify-between">
                  <span className="text-xs text-[#949ba4]">Formatted for instant posting</span>
                  <button
                    onClick={handleDispatchEmbed}
                    className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Announcement to {embedTargetChannel}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: 24/7 MUSIC WEB PLAYER CONSOLE */}
        {activeSection === 'music-player' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#57f287] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Lavalink v4 Audio Engine
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  24/7 Lossless Voice Streaming
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                24/7 Music Web Console
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Control the voice channel audio stream, add songs to queue, adjust volume, and keep Zenith locked in voice 24/7.
              </p>
            </div>

            {/* Now Playing Console Card */}
            <div className="bg-gradient-to-br from-[#1e1f24] to-[#141518] p-6 rounded-2xl border border-[#27292e] shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#5865F2] via-[#eb459e] to-[#7289da] p-0.5 shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
                      alt="Album"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-[#57f287]/20 text-[#57f287] font-mono px-2 py-0.5 rounded font-bold">
                        NOW STREAMING
                      </span>
                      <span className="text-xs text-[#949ba4] font-mono">
                        Channel: <strong>{voiceChannelName}</strong>
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {playlistQueue[0]?.title || 'No Track Active'}
                    </h3>
                    <p className="text-xs text-[#949ba4] mt-0.5">
                      {playlistQueue[0]?.artist || 'Lavalink Node #1'} • Requested by: <strong>{playlistQueue[0]?.requestedBy}</strong>
                    </p>
                  </div>
                </div>

                {/* 24/7 Stay Alive Switch */}
                <div className="flex items-center gap-3 bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div>
                    <div className="text-xs font-bold text-white">24/7 Voice Lock</div>
                    <div className="text-[10px] text-[#949ba4]">Permanent connection</div>
                  </div>
                  <button
                    onClick={() => {
                      setIs247Locked(!is247Locked);
                      notifyAction(`24/7 Voice Lock is now ${!is247Locked ? 'ENABLED' : 'DISABLED'}!`);
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      is247Locked ? 'bg-[#57f287]' : 'bg-[#27292e]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        is247Locked ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Progress & Waveform */}
              <div className="space-y-1.5">
                <div className="h-2 bg-[#27292e] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#5865F2] to-[#57f287] w-[62%] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#949ba4]">
                  <span>2:15</span>
                  <span>{playlistQueue[0]?.duration || '3:45'}</span>
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#27292e]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSkipTrack}
                    className="w-10 h-10 rounded-xl bg-[#27292e] hover:bg-[#35373c] text-white flex items-center justify-center cursor-pointer transition-colors"
                    title="Skip Track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      notifyAction(`Music ${!isPlaying ? 'RESUMED' : 'PAUSED'} on Discord voice!`);
                    }}
                    className="w-12 h-12 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center cursor-pointer transition-all shadow-lg active:scale-95"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3 w-full sm:w-60">
                  <Volume2 className="w-4 h-4 text-[#949ba4] shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="w-full accent-[#5865F2]"
                  />
                  <span className="text-xs font-mono text-white w-10 text-right">{musicVolume}%</span>
                </div>
              </div>
            </div>

            {/* Add Track & Queue Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Track Form */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-[#27292e] pb-2 flex items-center justify-between">
                  <span>Search &amp; Queue Songs</span>
                  <span className="text-[10px] text-[#57f287] font-mono">YouTube • Spotify • SoundCloud</span>
                </h3>

                <form onSubmit={handleAddTrackToQueue} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Track Title or Direct URL
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synthwave chill study beats or URL"
                      value={musicTrackSearch}
                      onChange={(e) => setMusicTrackSearch(e.target.value)}
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2.5 rounded-xl border border-[#27292e] focus:border-[#5865F2] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Active Voice Queue</span>
                  </button>
                </form>
              </div>

              {/* Up Next Queue */}
              <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#5865F2]" />
                    Up Next in Queue ({playlistQueue.length})
                  </h3>
                  <span className="text-xs text-[#57f287] font-mono font-bold">24/7 Stream</span>
                </div>

                <div className="divide-y divide-[#27292e] max-h-64 overflow-y-auto">
                  {playlistQueue.map((track, i) => (
                    <div key={track.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="font-mono text-[#949ba4] font-bold w-4 text-center">{i + 1}</span>
                        <div className="truncate">
                          <div className="font-bold text-white truncate">{track.title}</div>
                          <div className="text-[11px] text-[#949ba4]">{track.artist} • By {track.requestedBy}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[#949ba4] shrink-0">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: TEMPVOICE DYNAMIC PRIVATE CHANNELS */}
        {activeSection === 'tempvoice' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#57f287] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  TempVoice Dynamic Rooms
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  Join-to-Create Generator Active
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Temporary Voice Channels &amp; Auto-Voice Studio
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                When members join the Master channel, Zenith automatically creates a private voice channel with owner permissions, lock/unlock switches, and auto-deletes when empty.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Generator Configuration Form */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-[#27292e] pb-2 flex items-center justify-between">
                  <span>Join-to-Create Generator Setup</span>
                  <span className="text-[10px] text-[#57f287] font-mono">Master Hub</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Master Channel Name
                    </label>
                    <input
                      type="text"
                      value={masterChannelName}
                      onChange={(e) => setMasterChannelName(e.target.value)}
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#57f287] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Voice Room Category
                    </label>
                    <input
                      type="text"
                      value={tempVoiceCategory}
                      onChange={(e) => setTempVoiceCategory(e.target.value)}
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#57f287] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Default User Limit
                      </label>
                      <select
                        value={defaultUserLimit}
                        onChange={(e) => setDefaultUserLimit(Number(e.target.value))}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      >
                        <option value={0}>Unlimited (0)</option>
                        <option value={2}>2 Members (Duo)</option>
                        <option value={4}>4 Members (Squad)</option>
                        <option value={8}>8 Members</option>
                        <option value={16}>16 Members</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Voice Bitrate
                      </label>
                      <select
                        value={defaultBitrate}
                        onChange={(e) => setDefaultBitrate(Number(e.target.value))}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      >
                        <option value={64}>64 kbps (Standard)</option>
                        <option value={96}>96 kbps (High Quality)</option>
                        <option value={128}>128 kbps (Nitro Tier 1)</option>
                        <option value={256}>256 kbps (Nitro Tier 2)</option>
                        <option value={384}>384 kbps (Lossless)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => notifyAction(`Master channel "${masterChannelName}" deployed to category "${tempVoiceCategory}" on Discord Gateway!`)}
                    className="w-full bg-[#57f287] hover:bg-[#43d171] text-black font-extrabold text-xs py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Sync Master Voice Channel to Discord</span>
                  </button>
                </div>
              </div>

              {/* Active Temporary Voice Rooms */}
              <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#57f287]" />
                    Active Temporary Voice Rooms ({activeTempVoiceRooms.length})
                  </h3>
                  <span className="text-xs text-[#57f287] font-semibold">Live Channels</span>
                </div>

                <div className="divide-y divide-[#27292e]">
                  {activeTempVoiceRooms.map((room) => (
                    <div key={room.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{room.name}</span>
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                            room.isLocked ? 'bg-[#ED4245]/20 text-[#ED4245]' : 'bg-[#57f287]/20 text-[#57f287]'
                          }`}>
                            {room.isLocked ? 'LOCKED' : 'OPEN'}
                          </span>
                        </div>
                        <div className="text-xs text-[#949ba4] mt-0.5">
                          Owner: <strong>{room.owner}</strong> • Connected: <strong>{room.membersCount} Members</strong> (Limit: {room.limit === 0 ? 'Unlimited' : room.limit})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setActiveTempVoiceRooms(prev => prev.map(r => r.id === room.id ? { ...r, isLocked: !r.isLocked } : r));
                            notifyAction(`Room "${room.name}" is now ${!room.isLocked ? 'LOCKED' : 'UNLOCKED'} on Discord!`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                            room.isLocked
                              ? 'bg-[#57f287]/20 text-[#57f287] border-[#57f287]/40'
                              : 'bg-[#ED4245]/20 text-[#ED4245] border-[#ED4245]/40'
                          }`}
                        >
                          {room.isLocked ? 'Unlock Room' : 'Lock Room'}
                        </button>

                        <button
                          onClick={() => {
                            setActiveTempVoiceRooms(prev => prev.filter(r => r.id !== room.id));
                            notifyAction(`Temporary voice room "${room.name}" closed and deleted on Discord!`);
                          }}
                          className="text-[#ED4245] hover:bg-[#ED4245]/20 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Force delete room"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: TICKETS & MODMAIL DESK */}
        {activeSection === 'tickets-desk' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Web Support Desk
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  Reply Directly to Ticket Channels
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Tickets &amp; Modmail Command Center
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Read support messages in real-time, send replies from this dashboard, and archive tickets without opening Discord.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ticket Inbox List */}
              <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
                <div className="p-3.5 border-b border-[#27292e] flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                    Open Ticket Inbox ({ticketList.length})
                  </h3>
                  <span className="text-[10px] bg-[#5865F2]/20 text-[#5865F2] px-1.5 py-0.5 rounded font-bold">
                    LIVE
                  </span>
                </div>

                <div className="divide-y divide-[#27292e]">
                  {ticketList.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTicketId(t.id)}
                      className={`p-3.5 cursor-pointer transition-colors ${
                        selectedTicketId === t.id ? 'bg-[#5865F2]/20 border-l-4 border-[#5865F2]' : 'hover:bg-[#27292e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">#{t.channelName}</span>
                        <span className="text-[10px] text-[#949ba4] font-mono">{t.openedAt}</span>
                      </div>
                      <div className="text-xs text-[#949ba4] mt-1 truncate">
                        {t.userName} • {t.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Ticket Chat Viewer & Responder */}
              <div className="lg:col-span-2 bg-[#1e1f24] rounded-2xl border border-[#27292e] flex flex-col shadow-xl min-h-[420px]">
                {/* Ticket Header */}
                <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <span>#{activeTicket?.channelName}</span>
                      <span className="text-[10px] bg-[#57f287]/20 text-[#57f287] px-2 py-0.5 rounded font-bold">
                        {activeTicket?.category}
                      </span>
                    </h3>
                    <span className="text-xs text-[#949ba4]">
                      Created by {activeTicket?.userName}
                    </span>
                  </div>

                  <button
                    onClick={handleCloseTicket}
                    className="bg-[#ED4245]/20 hover:bg-[#ED4245] text-[#ED4245] hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Close &amp; Archive Transcript
                  </button>
                </div>

                {/* Message Thread */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {activeTicket?.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl max-w-[85%] text-xs ${
                        m.isStaff
                          ? 'ml-auto bg-[#5865F2]/20 border border-[#5865F2]/40 text-white'
                          : 'bg-[#131418] border border-[#27292e] text-[#dbdee1]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-xs">{m.sender}</span>
                        <span className="text-[10px] text-[#949ba4] font-mono">{m.time}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendTicketReply} className="p-3 border-t border-[#27292e] flex items-center gap-2 bg-[#17181c]">
                  <input
                    type="text"
                    required
                    placeholder="Type your response to send to Discord ticket channel..."
                    value={ticketReplyInput}
                    onChange={(e) => setTicketReplyInput(e.target.value)}
                    className="flex-1 bg-[#131418] text-white text-xs px-3 py-2.5 rounded-xl border border-[#27292e] outline-none focus:border-[#5865F2]"
                  />
                  <button
                    type="submit"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: GIVEAWAYS LAUNCHER */}
        {activeSection === 'giveaways' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#EB459E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Automated Giveaways
                </span>
                <span className="text-[#57f287] text-xs font-semibold">
                  Zero Rigging • Automatic Winner Rolls
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Giveaways Launch &amp; Winner Management
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Launch interactive giveaways on Discord directly from the web, reroll winners, and view entries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Launch Form */}
              <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-[#27292e] pb-2">
                  Launch New Giveaway
                </h3>

                <form onSubmit={handleLaunchGiveaway} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Prize Title
                    </label>
                    <input
                      type="text"
                      required
                      value={giveawayPrize}
                      onChange={(e) => setGiveawayPrize(e.target.value)}
                      placeholder="e.g. 1x Discord Nitro or Steam Gift Card"
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] focus:border-[#EB459E] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Winner Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={giveawayWinners}
                        onChange={(e) => setGiveawayWinners(Number(e.target.value))}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#949ba4] mb-1">
                        Duration
                      </label>
                      <select
                        value={giveawayDuration}
                        onChange={(e) => setGiveawayDuration(e.target.value)}
                        className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                      >
                        <option value="1 hour">1 Hour</option>
                        <option value="6 hours">6 Hours</option>
                        <option value="24 hours">24 Hours (1 Day)</option>
                        <option value="3 days">3 Days</option>
                        <option value="7 days">7 Days</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#949ba4] mb-1">
                      Target Discord Channel
                    </label>
                    <select
                      value={giveawayChannel}
                      onChange={(e) => setGiveawayChannel(e.target.value)}
                      className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                    >
                      <option value="#giveaways">#giveaways</option>
                      <option value="#announcements">#announcements</option>
                      <option value="#general">#general</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#EB459E] hover:bg-[#c43280] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Launch Giveaway on Discord Channel</span>
                  </button>
                </form>
              </div>

              {/* Active Giveaways List */}
              <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#EB459E]" />
                    Active Giveaways ({activeGiveaways.length})
                  </h3>
                  <span className="text-xs text-[#57f287] font-semibold">Active Rolling</span>
                </div>

                <div className="p-4 space-y-3">
                  {activeGiveaways.map((gw) => (
                    <div key={gw.id} className="bg-[#131418] p-4 rounded-xl border border-[#27292e] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{gw.prize}</span>
                        <span className="text-[10px] bg-[#EB459E]/20 text-[#EB459E] px-2 py-0.5 rounded font-bold">
                          {gw.winners} Winners
                        </span>
                      </div>
                      <div className="text-xs text-[#949ba4]">
                        Channel: <strong>{gw.channel}</strong> • {gw.endsIn} • <strong>{gw.entries} Entries</strong>
                      </div>
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => notifyAction(`Winner rolled for giveaway "${gw.prize}" on Discord!`)}
                          className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          End Early &amp; Roll Winner
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: ALL 32 MODULES HUB */}
        {activeSection === 'all-modules' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  All 32 Zenith Modules
                </h2>
                <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                  Toggle any module on or off and configure features directly on your server.
                </p>
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={moduleSearch}
                  onChange={(e) => setModuleSearch(e.target.value)}
                  className="w-full bg-[#1e1f24] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none focus:border-[#5865F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulesState
                .filter(m => m.name.toLowerCase().includes(moduleSearch.toLowerCase()) || m.description.toLowerCase().includes(moduleSearch.toLowerCase()))
                .map((mod) => (
                  <div key={mod.id} className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] flex flex-col justify-between shadow-md space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] bg-[#5865F2]/20 text-[#5865F2] font-bold uppercase px-2 py-0.5 rounded">
                          {mod.category}
                        </span>
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                            mod.enabled ? 'bg-[#57f287]' : 'bg-[#27292e]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                              mod.enabled ? 'left-5.5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>

                      <h4 className="font-bold text-white text-base">{mod.name}</h4>
                      <p className="text-xs text-[#949ba4] mt-1 line-clamp-2">{mod.description}</p>
                    </div>

                    <div className="pt-2 border-t border-[#27292e] flex items-center justify-between text-xs">
                      <span className="text-[#949ba4]">{mod.commands.length} Commands</span>
                      <span className={`font-bold ${mod.enabled ? 'text-[#57f287]' : 'text-[#ED4245]'}`}>
                        {mod.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SECTION: BOT STAFF & SUPPORT SERVER */}
        {activeSection === 'bot-staff' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#ED4245] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Internal Bot Staff Team
                </span>
                <span className="text-[#57f287] text-xs font-medium">
                  Automated Support Server DM Dispatch
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Zenith Bot Staff &amp; Roles Management
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Manage global Bot Staff tiers, appoint team members, and configure the automated Support Server invitation link sent via direct message.
              </p>
            </div>

            {/* Support Server Configuration Box */}
            <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-[#5865F2]" />
                Support Server Credentials &amp; Invite Configuration
              </h3>
              <p className="text-xs text-[#949ba4]">
                Whenever anyone is appointed to a Bot Staff role, Zenith automatically dispatches a rich DM with congratulations, credentials, and this Support Server invite link.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#949ba4] mb-1">
                    Support Server ID (stored in .env: SUPPORT_SERVER_ID)
                  </label>
                  <input
                    type="text"
                    value={supportServerId}
                    onChange={(e) => setSupportServerId(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#949ba4] mb-1">
                    Support Server Invite Link (stored in .env: SUPPORT_SERVER_INVITE)
                  </label>
                  <input
                    type="text"
                    value={supportServerInvite}
                    onChange={(e) => setSupportServerInvite(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] font-mono text-[#5865F2]"
                  />
                </div>
              </div>
            </div>

            {/* Appoint New Bot Staff Form */}
            <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] shadow-xl">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#57f287]" />
                Appoint New Bot Staff Member
              </h3>

              <form onSubmit={handleAppointBotStaff} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#949ba4] mb-1">
                    User Mention or Username
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaffUser}
                    onChange={(e) => setNewStaffUser(e.target.value)}
                    placeholder="@Tejas or username"
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#949ba4] mb-1">
                    Bot Staff Role &amp; Tier
                  </label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    className="w-full bg-[#131418] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] outline-none"
                  >
                    {BOT_STAFF_ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.tier})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold py-2 rounded-xl transition-all shadow cursor-pointer active:scale-95"
                  >
                    Appoint &amp; Dispatch Invite DM
                  </button>
                </div>
              </form>
            </div>

            {/* Current Bot Staff Table */}
            <div className="bg-[#1e1f24] rounded-2xl border border-[#27292e] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-[#27292e] flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">
                  Active Bot Staff Directory ({botStaffList.length})
                </h3>
                <span className="text-xs text-[#949ba4]">
                  Owner ID: <code className="text-[#ED4245] font-mono">{BOT_OWNER_ID}</code>
                </span>
              </div>

              <div className="divide-y divide-[#27292e]">
                {botStaffList.map((member) => (
                  <div key={member.userId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#5865F2]" />
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{member.username}</span>
                          <span
                            className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase"
                            style={{ backgroundColor: `${BOT_STAFF_ROLES.find(r => r.tier === member.tier)?.color}20`, color: BOT_STAFF_ROLES.find(r => r.tier === member.tier)?.color }}
                          >
                            {member.tier}
                          </span>
                        </div>
                        <div className="text-xs text-[#949ba4] mt-0.5">
                          ID: <code className="font-mono">{member.userId}</code> • Assigned by: {member.assignedBy} ({member.assignedAt})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right text-xs">
                        <span className="text-white font-mono font-bold">{member.weeklyHandledTickets}</span> <span className="text-[#949ba4]">Tickets</span> • <span className="text-white font-mono font-bold">{member.weeklyGuildAudits}</span> <span className="text-[#949ba4]">Audits</span>
                      </div>
                      {member.userId !== BOT_OWNER_ID && (
                        <button
                          onClick={() => handleRevokeBotStaff(member.userId)}
                          className="text-[#ED4245] hover:bg-[#ED4245]/20 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Revoke bot staff role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: CUSTOM EMOJIS HUB (105+ Custom Emojis) */}
        {activeSection === 'emojis-hub' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Custom Discord Emojis ({TOTAL_CUSTOM_EMOJIS_COUNT})
                </h2>
                <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                  100% Custom Discord Emojis with dedicated icons for every single module, badge, premium tier, no-prefix, and bot staff role.
                </p>
              </div>

              <div className="text-xs text-[#57f287] font-semibold bg-[#57f287]/10 px-3 py-1.5 rounded-xl border border-[#57f287]/30">
                ✓ No Unicode Emojis Used
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ZENITH_CUSTOM_EMOJIS.map((emoji) => (
                <div
                  key={emoji.id}
                  onClick={() => {
                    navigator.clipboard.writeText(emoji.code);
                    notifyAction(`Copied emoji code: ${emoji.code}`);
                  }}
                  className="bg-[#1e1f24] hover:bg-[#27292e] p-3 rounded-xl border border-[#27292e] flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                  title={`Click to copy: ${emoji.code}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span
                      className="w-7 h-7 inline-block [&>svg]:w-7 [&>svg]:h-7"
                      dangerouslySetInnerHTML={{ __html: emoji.svgIcon }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-white truncate max-w-full">
                    :{emoji.name}:
                  </span>
                  <span className="text-[9px] text-[#949ba4] font-mono mt-0.5 truncate max-w-full">
                    {emoji.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: HEAVENCLOUD CLUSTER */}
        {activeSection === 'heavencloud' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#5865F2] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <Server className="w-3.5 h-3.5" />
                  Cloud Deployment Engine
                </span>
                <span className="text-[#57f287] text-xs font-medium">
                  HeavenCloud Cluster API
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                HeavenCloud Cloud Infrastructure &amp; Deployment
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Orchestrate your Zenith Discord bot cluster directly on HeavenCloud with auto-restarting PM2 containers and 24/7 Lavalink audio nodes.
              </p>
            </div>

            <div className="bg-[#1e1f24] p-6 rounded-2xl border border-[#27292e] shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#57f287] animate-pulse" />
                    <h3 className="font-bold text-white text-lg">
                      HeavenCloud Node.js Cluster [ONLINE]
                    </h3>
                  </div>
                  <p className="text-xs text-[#949ba4] mt-1">
                    Cluster ID: <code className="text-white font-mono">heavencloud-zenith-01</code> • Region: <code className="text-white font-mono">us-east (Virginia)</code>
                  </p>
                </div>

                <button
                  onClick={handleHeavenCloudDeploy}
                  disabled={isCloudDeploying}
                  className="bg-[#248046] hover:bg-[#1a6334] disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <RefreshCw className={`w-4 h-4 ${isCloudDeploying ? 'animate-spin' : ''}`} />
                  <span>{isCloudDeploying ? 'Deploying to HeavenCloud...' : 'Trigger Cloud Sync'}</span>
                </button>
              </div>

              {cloudDeployStatus && (
                <div className="p-3 bg-[#131418] rounded-xl border border-[#27292e] text-xs font-mono text-[#57f287]">
                  &gt; {cloudDeployStatus}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#27292e]">
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[11px] text-[#949ba4]">Gateway Latency</div>
                  <div className="text-white font-bold font-mono text-base mt-0.5">18 ms</div>
                </div>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[11px] text-[#949ba4]">Active Shards</div>
                  <div className="text-white font-bold font-mono text-base mt-0.5">2 / 2 Online</div>
                </div>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[11px] text-[#949ba4]">24/7 Voice Streams</div>
                  <div className="text-white font-bold font-mono text-base mt-0.5">48 Active</div>
                </div>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[11px] text-[#949ba4]">Database Health</div>
                  <div className="text-[#57f287] font-bold font-mono text-base mt-0.5">100% OK</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: SERVER STAFF & QUOTAS */}
        {activeSection === 'server-staff' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Server Staff Governance &amp; Quotas
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Manage moderators, admins, weekly message/ticket/voice quotas, and complaints in this guild.
              </p>
            </div>

            <div className="bg-[#1e1f24] p-5 rounded-2xl border border-[#27292e] space-y-3">
              <h3 className="font-bold text-white text-sm">Weekly Quota Requirements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[#949ba4]">Min Weekly Messages</div>
                  <div className="text-white font-bold font-mono text-base mt-1">350 Messages</div>
                </div>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[#949ba4]">Min Claimed Tickets</div>
                  <div className="text-white font-bold font-mono text-base mt-1">10 Tickets</div>
                </div>
                <div className="bg-[#131418] p-3 rounded-xl border border-[#27292e]">
                  <div className="text-[#949ba4]">Min Voice Channel Time</div>
                  <div className="text-white font-bold font-mono text-base mt-1">180 Minutes (3h)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: STATBOT TELEMETRY */}
        {activeSection === 'statbot' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                StatBot Telemetry &amp; Voice Counters
              </h2>
              <p className="text-xs sm:text-sm text-[#949ba4] mt-1">
                Configure live voice channel counter names and inspect message heatmap curves.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1e1f24] p-4 rounded-xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4]">Voice Counter #1</div>
                <div className="text-white font-bold font-mono mt-1">Total Members: 5,200</div>
              </div>
              <div className="bg-[#1e1f24] p-4 rounded-xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4]">Voice Counter #2</div>
                <div className="text-white font-bold font-mono mt-1">Online Now: 1,840</div>
              </div>
              <div className="bg-[#1e1f24] p-4 rounded-xl border border-[#27292e]">
                <div className="text-xs text-[#949ba4]">Voice Counter #3</div>
                <div className="text-white font-bold font-mono mt-1">Active in Voice: 48</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Universal Server Switcher Modal (Owner God Mode - No Admin Perms Needed) */}
      {showUniversalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1e1f24] max-w-2xl w-full rounded-2xl border border-[#27292e] shadow-2xl p-6 text-sm text-[#dbdee1] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#27292e] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#ED4245] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    Owner Universal Bypass
                  </span>
                  <span className="text-[#57f287] text-xs font-semibold">
                    Zero Admin Permissions Required
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Access Every Server Dashboard
                </h3>
                <p className="text-xs text-[#949ba4] mt-0.5">
                  As the Zenith Bot Owner (<code className="text-[#ED4245] font-mono">{BOT_OWNER_ID}</code>), you have root privileges to inspect and configure any Discord server hosting the bot.
                </p>
              </div>

              <button
                onClick={() => setShowUniversalModal(false)}
                className="w-8 h-8 rounded-lg bg-[#27292e] hover:bg-[#35373c] text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Direct Guild ID Access */}
            <div className="bg-[#131418] p-4 rounded-xl border border-[#27292e] space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#5865F2]" />
                Direct Guild ID Access (Bypass Administrator Check)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Enter Guild ID (e.g. 9876543210)"
                  value={customDirectId}
                  onChange={(e) => setCustomDirectId(e.target.value)}
                  className="sm:col-span-2 bg-[#1e1f24] text-white text-xs px-3 py-2 rounded-xl border border-[#27292e] font-mono outline-none focus:border-[#5865F2]"
                />
                <button
                  onClick={() => {
                    if (!customDirectId.trim()) return;
                    const newGuild: GuildItem = {
                      id: customDirectId.trim(),
                      name: customDirectName.trim() || `Guild #${customDirectId.slice(-4)}`,
                      icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
                      memberCount: Math.floor(Math.random() * 5000) + 1000,
                      onlineCount: Math.floor(Math.random() * 1500) + 300,
                      role: 'Owner (Bypassed)',
                      isPremium: true
                    };
                    setGuildList((prev) => [newGuild, ...prev.filter(g => g.id !== newGuild.id)]);
                    setActiveGuild(newGuild);
                    setShowUniversalModal(false);
                    setCustomDirectId('');
                    setCustomDirectName('');
                  }}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow cursor-pointer"
                >
                  Jump to Dashboard
                </button>
              </div>
            </div>

            {/* Connected Guilds List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#949ba4]">
                <span className="font-bold uppercase tracking-wider text-white">
                  Connected Guilds in Zenith Network ({guildList.length})
                </span>
                <span>Select any server to manage</span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                {guildList.map((guild) => (
                  <div
                    key={guild.id}
                    onClick={() => {
                      setActiveGuild(guild);
                      setShowUniversalModal(false);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      activeGuild.id === guild.id
                        ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                        : 'bg-[#131418] border-[#27292e] hover:border-[#5865F2]/60 text-[#dbdee1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={guild.icon} alt="" className="w-9 h-9 rounded-xl object-cover border border-[#27292e]" />
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>{guild.name}</span>
                          {guild.isPremium && <span className="text-[9px] bg-[#eb459e] text-white px-1 rounded font-extrabold">PREMIUM</span>}
                        </div>
                        <div className="text-[11px] text-[#949ba4] font-mono">
                          ID: {guild.id} • {guild.memberCount.toLocaleString()} members
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-[#57f287] font-bold font-mono">
                      {guild.role} →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Owner Credits & Public Netlify Hosting Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1e1f24] max-w-lg w-full rounded-2xl border border-[#27292e] shadow-2xl p-6 text-sm text-[#dbdee1] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#27292e] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5865F2] via-[#eb459e] to-[#7289da] p-0.5 flex items-center justify-center shadow">
                  <div className="w-full h-full bg-[#1e1f24] rounded-[14px] flex items-center justify-center font-black text-white text-sm">
                    Z
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Zenith Bot &amp; Control Suite
                  </h3>
                  <span className="text-xs text-[#57f287] font-semibold">
                    Public Netlify Deployment
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowCreditsModal(false)}
                className="w-8 h-8 rounded-lg bg-[#27292e] hover:bg-[#35373c] text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#131418] p-4 rounded-xl border border-[#27292e] space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#949ba4] tracking-wider mb-1">
                  Creator &amp; Official Bot Owner
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono font-bold text-base bg-[#27292e] px-2.5 py-1 rounded-lg border border-[#35373c]">
                    {BOT_OWNER_ID}
                  </span>
                  <span className="bg-[#ED4245]/20 text-[#ED4245] border border-[#ED4245]/40 text-xs font-bold px-2 py-0.5 rounded-full">
                    Zenith Architect
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#949ba4] tracking-wider mb-1">
                  Public Dashboard Hosting URL (Netlify)
                </div>
                <a
                  href="https://demonzenith.netlify.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5865F2] hover:text-white underline font-mono text-xs flex items-center gap-1.5 font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>https://demonzenith.netlify.app</span>
                </a>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#949ba4] tracking-wider mb-1">
                  Backend Discord Engine &amp; Lavalink Audio
                </div>
                <span className="text-white text-xs font-medium">
                  Hosted on <strong>HeavenCloud</strong> (Lavalink v4, 24/7 Voice Lock, SQLite WAL)
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#5865F2]/10 rounded-xl border border-[#5865F2]/30 text-xs text-[#dbdee1] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5865F2] shrink-0" />
              <span>Universal Access Mode active: Owner bypasses all guild administrator role checks.</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCreditsModal(false)}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
