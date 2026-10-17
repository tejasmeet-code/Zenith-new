export interface CustomEmoji {
  id: string;
  name: string;
  animated: boolean;
  code: string; // e.g. <:zenith_shield:129841800100000001> or <a:zenith_music:129841800100000002>
  category: 'moderation' | 'music' | 'staff' | 'tickets' | 'economy' | 'stats' | 'badges' | 'system' | 'misc';
  description: string;
  svgIcon: string;
}

export type ModuleCategory =
  | 'core'
  | 'moderation'
  | 'music'
  | 'staff'
  | 'tickets'
  | 'automod'
  | 'analytics'
  | 'engagement'
  | 'economy'
  | 'utility';

export interface BotCommand {
  name: string;
  description: string;
  usage: string;
  aliases: string[];
  slashSupported: boolean;
  prefixSupported: boolean;
  noPrefixSupported: boolean;
  permission: 'Everyone' | 'Staff' | 'Junior Mod' | 'Senior Mod' | 'Admin' | 'Bot Staff' | 'Owner';
  category: string;
  cooldownSeconds?: number;
}

export interface BotModule {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  enabled: boolean;
  iconName: string;
  features: string[];
  commands: BotCommand[];
  settings: Record<string, any>;
}

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: string; // Hex color string, e.g. #5865F2
  author?: {
    name: string;
    icon_url?: string;
    url?: string;
  };
  fields?: DiscordEmbedField[];
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  banner?: string; // Top or inline banner image URL
  footer?: {
    text: string;
    icon_url?: string;
  };
  timestamp?: string;
}

export interface DiscordButton {
  id: string;
  label: string;
  style: 'primary' | 'secondary' | 'success' | 'danger' | 'link';
  emoji?: string;
  url?: string;
  disabled?: boolean;
}

export interface DiscordMessage {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isBot?: boolean;
    roleColor?: string;
    badges?: string[];
  };
  content?: string;
  embeds?: DiscordEmbed[];
  buttons?: DiscordButton[];
  timestamp: string;
  channelId: string;
  pinned?: boolean;
}

export interface ModerationCase {
  caseId: number;
  userId: string;
  userName: string;
  userAvatar: string;
  moderatorId: string;
  moderatorName: string;
  action: 'WARN' | 'MUTE' | 'JAIL' | 'KICK' | 'BAN' | 'SOFTBAN';
  reason: string;
  proofUrl?: string;
  duration?: string;
  timestamp: string;
  active: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  tier: 'Trainee' | 'Junior Mod' | 'Senior Mod' | 'Admin' | 'Manager' | 'Owner';
  weeklyMessages: number;
  weeklyTickets: number;
  weeklyVcMinutes: number;
  quotaMet: boolean;
  strikes: number;
  infractions: string[];
  isStaffOfWeek?: boolean;
  isStaffOfMonth?: boolean;
}

export interface TicketSession {
  id: string;
  channelName: string;
  creatorId: string;
  creatorName: string;
  category: 'General Support' | 'Staff Application' | 'Donation / Premium' | 'Player Report';
  status: 'open' | 'claimed' | 'closed';
  claimedBy?: string;
  openedAt: string;
  messagesCount: number;
  rating?: number;
}

export interface ReportItem {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedBy: string;
  reason: string;
  proofUrl: string;
  status: 'pending' | 'actioned' | 'dismissed';
  timestamp: string;
}

export interface QualityCheckResult {
  id: number;
  title: string;
  category: 'Discord API v14' | 'Rate-Limit & Sharding' | 'Security & Injection' | 'Memory & Event Loop' | 'Error Recovery';
  status: 'passed' | 'warning' | 'failed';
  score: number;
  details: string;
  targetFiles: string[];
}

export type BotStaffTier =
  | 'Bot Owner'
  | 'Bot Manager'
  | 'Bot Admin'
  | 'Bot Senior Mod'
  | 'Bot Support';

export interface BotStaffRole {
  id: string;
  name: string;
  tier: BotStaffTier;
  color: string;
  description: string;
  permissions: string[];
  membersCount: number;
}

export interface BotStaffMember {
  userId: string;
  username: string;
  avatar: string;
  roleId: string;
  roleName: string;
  tier: BotStaffTier;
  assignedAt: string;
  assignedBy: string;
  strikes: number;
  weeklyHandledTickets: number;
  weeklyGuildAudits: number;
  notes: string;
}

