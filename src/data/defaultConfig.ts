import type { ModerationCase, StaffMember, TicketSession, ReportItem, BotStaffRole, BotStaffMember } from '../types/index.ts';

export const BOT_OWNER_ID = '1181221352393420856';

export interface ZenithConfig {
  botName: string;
  ownerId: string;
  defaultPrefix: string;
  noPrefixEnabled: boolean;
  statusText: string;
  statusType: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | 'COMPETING';
  embedColor: string;
  premiumActive: boolean;
  premiumTier: string;
  botStaffIds: string[];
}

export const DEFAULT_ZENITH_CONFIG: ZenithConfig = {
  botName: 'Zenith',
  ownerId: BOT_OWNER_ID,
  defaultPrefix: '.',
  noPrefixEnabled: true,
  statusText: '.help | .staffhelp | 24/7 Shield Active',
  statusType: 'PLAYING',
  embedColor: '#5865F2',
  premiumActive: true,
  premiumTier: 'Zenith Diamond Ultra',
  botStaffIds: [BOT_OWNER_ID, '998822334455667788']
};

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: BOT_OWNER_ID,
    name: 'ZenithOwner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    tier: 'Owner',
    weeklyMessages: 842,
    weeklyTickets: 24,
    weeklyVcMinutes: 620,
    quotaMet: true,
    strikes: 0,
    infractions: [],
    isStaffOfWeek: true,
    isStaffOfMonth: true
  },
  {
    id: '129849100000000001',
    name: 'Aiden_Admin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    tier: 'Admin',
    weeklyMessages: 512,
    weeklyTickets: 18,
    weeklyVcMinutes: 340,
    quotaMet: true,
    strikes: 0,
    infractions: []
  },
  {
    id: '129849100000000002',
    name: 'Elena_SeniorMod',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    tier: 'Senior Mod',
    weeklyMessages: 390,
    weeklyTickets: 14,
    weeklyVcMinutes: 210,
    quotaMet: true,
    strikes: 1,
    infractions: ['Missed weekend moderation shift on 10/10']
  },
  {
    id: '129849100000000003',
    name: 'Marcus_JuniorMod',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    tier: 'Junior Mod',
    weeklyMessages: 180,
    weeklyTickets: 4,
    weeklyVcMinutes: 95,
    quotaMet: false,
    strikes: 2,
    infractions: ['Failed ticket response quota (Target: 10, Actual: 4)', 'Unjustified mute on user #402']
  }
];

export const INITIAL_MOD_CASES: ModerationCase[] = [
  {
    caseId: 1045,
    userId: '887766554433221100',
    userName: 'RaidBot_99',
    userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
    moderatorId: BOT_OWNER_ID,
    moderatorName: 'Zenith Antinuke Guard',
    action: 'BAN',
    reason: 'Antinuke tripwire triggered: unauthorized mass role deletion attempt',
    proofUrl: 'https://cdn.discordapp.com/attachments/audit-1045.png',
    timestamp: 'Today at 05:42 AM',
    active: true
  },
  {
    caseId: 1044,
    userId: '776655443322110099',
    userName: 'ToxicSpammer',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    moderatorId: '129849100000000002',
    moderatorName: 'Elena_SeniorMod',
    action: 'JAIL',
    reason: 'Targeted harassment in #general chat and repeated pinging',
    proofUrl: 'https://cdn.discordapp.com/attachments/proof-1044.png',
    duration: '24 Hours',
    timestamp: 'Yesterday at 11:20 PM',
    active: true
  },
  {
    caseId: 1043,
    userId: '665544332211009988',
    userName: 'PhishScammer',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    moderatorId: 'Zenith Automod',
    moderatorName: 'Zenith Automod',
    action: 'MUTE',
    reason: 'Sent malicious phishing link (discord-nitro-gift-free.xyz)',
    duration: '7 Days',
    timestamp: 'Yesterday at 08:15 PM',
    active: true
  }
];

export const INITIAL_TICKETS: TicketSession[] = [
  {
    id: 'ticket-0042',
    channelName: 'ticket-0042',
    creatorId: '554433221100998877',
    creatorName: 'CryptoFan',
    category: 'Donation / Premium',
    status: 'claimed',
    claimedBy: 'Aiden_Admin',
    openedAt: '2 hours ago',
    messagesCount: 8
  },
  {
    id: 'ticket-0043',
    channelName: 'ticket-0043',
    creatorId: '443322110099887766',
    creatorName: 'GamerGirl99',
    category: 'Staff Application',
    status: 'open',
    openedAt: '35 minutes ago',
    messagesCount: 3
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-101',
    reportedUserId: '332211009988776655',
    reportedUserName: 'GrieferPlayer',
    reportedBy: 'ViperSniper',
    reason: 'Promoting unauthorized cheats and sending malicious download link in VC',
    proofUrl: 'https://cdn.discordapp.com/attachments/report-proof-101.png',
    status: 'pending',
    timestamp: '15 minutes ago'
  }
];

export const BOT_STAFF_ROLES: BotStaffRole[] = [
  {
    id: 'role_bot_owner',
    name: 'Zenith Bot Owner',
    tier: 'Bot Owner',
    color: '#ED4245',
    description: 'Supreme control over the entire Zenith Bot network, database, and infrastructure.',
    permissions: ['ALL', 'eval', 'leaveserver', 'manage_staff', 'database', 'global_blacklist', 'deploy', 'bypass_all'],
    membersCount: 1
  },
  {
    id: 'role_bot_manager',
    name: 'Zenith Bot Manager',
    tier: 'Bot Manager',
    color: '#EB459E',
    description: 'Manages bot staff team, oversees global announcements, and grants premium licenses.',
    permissions: ['manage_staff', 'global_blacklist', 'botbroadcast', 'premiumgrant', 'guildinfo', 'leaveserver', 'botreload'],
    membersCount: 1
  },
  {
    id: 'role_bot_admin',
    name: 'Zenith Bot Administrator',
    tier: 'Bot Admin',
    color: '#5865F2',
    description: 'Authorizes global blacklists, inspects bot telemetry, and executes module hot-reloads.',
    permissions: ['global_blacklist', 'botbroadcast', 'guildinfo', 'botreload', 'botstats', 'triagereports'],
    membersCount: 2
  },
  {
    id: 'role_bot_seniormod',
    name: 'Zenith Bot Senior Mod',
    tier: 'Bot Senior Mod',
    color: '#FEE75C',
    description: 'Audits guild behavior, manages global member report triage, and assists guild owners.',
    permissions: ['guildinfo', 'triagereports', 'botstats', 'userlookup', 'appeallist'],
    membersCount: 3
  },
  {
    id: 'role_bot_support',
    name: 'Zenith Bot Support',
    tier: 'Bot Support',
    color: '#57F287',
    description: 'Provides direct helpdesk and modmail responses to Zenith community questions.',
    permissions: ['modmail_reply', 'triagereports', 'botstats', 'userlookup'],
    membersCount: 4
  }
];

export const INITIAL_BOT_STAFF: BotStaffMember[] = [
  {
    userId: BOT_OWNER_ID,
    username: 'ZenithCreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    roleId: 'role_bot_owner',
    roleName: 'Zenith Bot Owner',
    tier: 'Bot Owner',
    assignedAt: '2024-01-01',
    assignedBy: 'System',
    strikes: 0,
    weeklyHandledTickets: 48,
    weeklyGuildAudits: 14,
    notes: 'Official Bot Creator & Architect (ID: 1181221352393420856)'
  },
  {
    userId: '998822334455667788',
    username: 'Nova_BotManager',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    roleId: 'role_bot_manager',
    roleName: 'Zenith Bot Manager',
    tier: 'Bot Manager',
    assignedAt: '2024-03-15',
    assignedBy: BOT_OWNER_ID,
    strikes: 0,
    weeklyHandledTickets: 32,
    weeklyGuildAudits: 9,
    notes: 'Directs bot community staff and reviews global blacklist appeals'
  },
  {
    userId: '887766554433221122',
    username: 'Valkyrie_BotAdmin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    roleId: 'role_bot_admin',
    roleName: 'Zenith Bot Administrator',
    tier: 'Bot Admin',
    assignedAt: '2024-05-10',
    assignedBy: BOT_OWNER_ID,
    strikes: 0,
    weeklyHandledTickets: 25,
    weeklyGuildAudits: 6,
    notes: 'Lead engineer for shard health and Lavalink audio stability'
  },
  {
    userId: '776655443322110033',
    username: 'Echo_BotSupport',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    roleId: 'role_bot_support',
    roleName: 'Zenith Bot Support',
    tier: 'Bot Support',
    assignedAt: '2024-08-01',
    assignedBy: '998822334455667788',
    strikes: 0,
    weeklyHandledTickets: 19,
    weeklyGuildAudits: 3,
    notes: 'Handles incoming community modmail and new guild setup help'
  }
];

