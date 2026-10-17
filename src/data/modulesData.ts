import type { BotModule } from '../types/index.ts';

export const BOT_MODULES: BotModule[] = [
  {
    id: 'music',
    name: '24/7 Music Engine',
    category: 'music',
    description: 'Ultra-low latency Lavalink v4 music streaming with 24/7 Voice Channel persistent lock, Spotify/SoundCloud/Apple Music support, and interactive player embeds.',
    enabled: true,
    iconName: 'Music',
    features: [
      '24/7 Voice Channel Stay Alive Mode',
      'Lossless audio with 320kbps bitrates',
      'Interactive player buttons (Play/Pause, Skip, Bassboost, Loop, Stop)',
      'Radio & Lofi Chill 24/7 presets',
      'Lyrics visualizer with auto-scroll'
    ],
    commands: [
      { name: 'play', description: 'Plays a track or playlist from YouTube/Spotify/SoundCloud', usage: '.play <song/URL>', aliases: ['p'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Music' },
      { name: '247', description: 'Toggles 24/7 persistent voice channel connection', usage: '.247', aliases: ['stay', 'alwayson'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Staff', category: 'Music' },
      { name: 'skip', description: 'Skips the currently playing track', usage: '.skip', aliases: ['s', 'next'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Music' },
      { name: 'stop', description: 'Stops music and clears the queue', usage: '.stop', aliases: ['leave', 'dc'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Staff', category: 'Music' },
      { name: 'queue', description: 'Displays currently queued tracks with pagination', usage: '.queue', aliases: ['q'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Music' },
      { name: 'bassboost', description: 'Applies hardware bassboost equalization', usage: '.bassboost <off/low/medium/high/earrape>', aliases: ['bb'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'Music' },
      { name: 'volume', description: 'Adjusts playback volume (1-200%)', usage: '.volume <level>', aliases: ['vol', 'v'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Music' }
    ],
    settings: {
      defaultVolume: 85,
      stay247: true,
      autoLeaveOnEmpty: false,
      djRoleRequired: false,
      djRoleId: '129841000000000001',
      defaultFilter: 'None'
    }
  },
  {
    id: 'antinuke',
    name: 'Antinuke Defense Shield',
    category: 'core',
    description: 'Enterprise server defense system against rogue administrators, unauthorized bot additions, mass channel deletion, mass bans, and webhook raids.',
    enabled: true,
    iconName: 'ShieldAlert',
    features: [
      'Mass Ban / Kick rate-limit tripwire (threshold: 3 actions/10s)',
      'Mass Channel / Role deletion prevention with auto-restore',
      'Instant Quarantine Role assignment for suspect accounts',
      'Bot Addition Guard (unwhitelisted bots instantly kicked)',
      'Whitelist bypass for Server Owner & Trusted Staff'
    ],
    commands: [
      { name: 'antinuke', description: 'View current antinuke status and triggered offenses', usage: '.antinuke', aliases: ['an'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Antinuke' },
      { name: 'whitelist', description: 'Add/Remove trusted administrators from antinuke checks', usage: '.whitelist <add/remove/list> @user', aliases: ['wl'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Antinuke' },
      { name: 'quarantine', description: 'Immediately isolate suspect member into locked quarantine role', usage: '.quarantine @user [reason]', aliases: ['isolate'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Antinuke' },
      { name: 'recovery', description: 'Rollback deleted channels/roles from cloud audit snapshot', usage: '.recovery <channels|roles>', aliases: ['rollback'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Antinuke' }
    ],
    settings: {
      massBanLimit: 3,
      massKickLimit: 3,
      massChannelDeleteLimit: 2,
      massRoleDeleteLimit: 2,
      webhookCreationLimit: 1,
      actionOnBreach: 'Quarantine & Strip Roles',
      logChannelId: '129842000000000001',
      whitelistedUsers: ['1181221352393420856']
    }
  },
  {
    id: 'automod',
    name: 'Automod & Anti-Raid',
    category: 'automod',
    description: 'Synchronized Discord Native Automod Rules plus Zenith deep keyword inspection, anti-invite, anti-spam, and anti-toxicity engine.',
    enabled: true,
    iconName: 'Cpu',
    features: [
      'Native Discord Automod Rules generator',
      'Anti-Invite link blocker with guild whitelist',
      'Anti-Spam & Anti-Duplicate message detection (5 msgs in 3s)',
      'Mass Mention filter (max 5 mentions)',
      'Phishing & Malicious link scanner'
    ],
    commands: [
      { name: 'automod', description: 'Configure automod rules and trigger sensitivities', usage: '.automod <setup/list/toggle>', aliases: ['am'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Automod' },
      { name: 'antispam', description: 'Set message speed limits and duplicate thresholds', usage: '.antispam <on/off/rate>', aliases: ['as'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Automod' },
      { name: 'antiinvite', description: 'Block unauthorized Discord invite links', usage: '.antiinvite <on/off>', aliases: ['antilink'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Automod' }
    ],
    settings: {
      blockDiscordInvites: true,
      blockPhishingDomains: true,
      maxMentionsPerMessage: 4,
      antiSpamThreshold: 5,
      actionTaken: 'Delete & Warn Offender'
    }
  },
  {
    id: 'staff_management',
    name: 'Staff Management & Quotas',
    category: 'staff',
    description: 'Comprehensive staff hierarchy governance: weekly activity quotas, infraction strikes, staff feedback embed, complaints system, and Staff of the Week/Month.',
    enabled: true,
    iconName: 'Award',
    features: [
      'Automated Weekly Quota tracking (messages, voice minutes, tickets claimed)',
      'Staff Hierarchy Tiers (Trainee -> Jr Mod -> Sr Mod -> Admin -> Manager)',
      'Strike & Infraction logging with auto-demote on 3 strikes',
      'Public Staff Complaint & Anonymous Staff Grievance system',
      'Automated Staff of the Week / Month / Year announcements'
    ],
    commands: [
      { name: 'staffquota', description: 'View current staff member weekly quota progress', usage: '.staffquota [@staff]', aliases: ['quota', 'sq'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Staff' },
      { name: 'staffstrike', description: 'Issue formal infraction strike against staff member', usage: '.staffstrike @staff <reason> [proof URL]', aliases: ['infraction'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Staff' },
      { name: 'staffpromote', description: 'Promote a staff member to the next tier', usage: '.staffpromote @staff [tier]', aliases: ['promote'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Staff' },
      { name: 'staffdemote', description: 'Demote a staff member due to quota failure or conduct', usage: '.staffdemote @staff [reason]', aliases: ['demote'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Staff' },
      { name: 'staffhelp', description: 'Lists all staff commands organized by permission tier', usage: '.staffhelp', aliases: ['shelp'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Staff' },
      { name: 'staffcomplaint', description: 'Submit confidential or public staff grievance', usage: '.staffcomplaint @staff <reason> [proof]', aliases: ['complain'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Staff' },
      { name: 'staffofweek', description: 'Display or announce Staff of the Week achiever', usage: '.staffofweek', aliases: ['sow'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Staff' }
    ],
    settings: {
      minWeeklyMessages: 350,
      minWeeklyTickets: 10,
      minWeeklyVcMinutes: 180,
      maxStrikesBeforeDemote: 3,
      staffFeedbackChannelId: '129842000000000002',
      complaintsChannelId: '129842000000000003'
    }
  },
  {
    id: 'moderation',
    name: 'Advanced Moderation & Cases',
    category: 'moderation',
    description: 'Enterprise moderation suite with unique auto-incrementing Case IDs, proof attachments, junior staff ban requests, jail cell isolation, and rich DM notifications.',
    enabled: true,
    iconName: 'Gavel',
    features: [
      'Numbered Case Audit Trail (#Case 1042) with proof attachments',
      'Junior Staff Ban Requests system (approval buttons for Senior Mods)',
      'Jail Isolation System (.jail @user 24h Toxicity -> strips roles & moves to #jail)',
      'Instant DM delivery with reason, moderator name, and appeal button',
      'Bulk message purge and channel lockdown'
    ],
    commands: [
      { name: 'warn', description: 'Issues a logged warning to a member with DM', usage: '.warn @user <reason> [proof URL]', aliases: ['w'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Junior Mod', category: 'Moderation' },
      { name: 'mute', description: 'Timeouts a member via Discord timeout API', usage: '.mute @user <time> <reason>', aliases: ['timeout', 'm'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Junior Mod', category: 'Moderation' },
      { name: 'jail', description: 'Isolates member in jail cell with restricted visibility', usage: '.jail @user <time> <reason>', aliases: ['prison'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Senior Mod', category: 'Moderation' },
      { name: 'unjail', description: 'Releases member from jail and restores previous roles', usage: '.unjail @user', aliases: ['release'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Senior Mod', category: 'Moderation' },
      { name: 'banrequest', description: 'Junior staff proposal for ban sent to Senior Mod queue', usage: '.banrequest @user <reason> <proof URL>', aliases: ['breq'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Junior Mod', category: 'Moderation' },
      { name: 'kick', description: 'Kicks a member from the server with DM explanation', usage: '.kick @user [reason]', aliases: ['k'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Senior Mod', category: 'Moderation' },
      { name: 'ban', description: 'Bans a member permanently or temporarily', usage: '.ban @user [time] <reason> [proof]', aliases: ['b'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Senior Mod', category: 'Moderation' },
      { name: 'softban', description: 'Bans and instantly unbans to clear last 7 days of messages', usage: '.softban @user <reason>', aliases: ['sb'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Senior Mod', category: 'Moderation' },
      { name: 'case', description: 'Inspect or update proof for an existing case ID', usage: '.case <caseId> [newProof/reason]', aliases: ['cinfo'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Moderation' },
      { name: 'purge', description: 'Bulk deletes specified number of messages', usage: '.purge <1-100> [@user]', aliases: ['clear'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Staff', category: 'Moderation' }
    ],
    settings: {
      modLogChannelId: '129842000000000004',
      banRequestChannelId: '129842000000000005',
      jailRoleId: '129842000000000006',
      jailChannelId: '129842000000000007',
      sendDmOnPunishment: true
    }
  },
  {
    id: 'tickets',
    name: 'Ticket Systems & Transcripts',
    category: 'tickets',
    description: 'Multi-category embed panels with interactive dropdowns, staff claim assignment, HTML transcript generation, user rating surveys, and auto-close timers.',
    enabled: true,
    iconName: 'Ticket',
    features: [
      'Custom button & select-menu ticket panel embed',
      'Categories: General Support, Staff Apps, Premium/Billing, Player Reports',
      'Claim system preventing staff collision',
      'One-click HTML transcript generation delivered to logs and user DM',
      '1 to 5 Star customer satisfaction rating survey on close'
    ],
    commands: [
      { name: 'ticketpanel', description: 'Deploy interactive ticket panel embed with buttons', usage: '.ticketpanel [#channel]', aliases: ['tpanel'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Tickets' },
      { name: 'close', description: 'Closes active ticket, creates transcript and prompts rating', usage: '.close [reason]', aliases: ['tclose'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Tickets' },
      { name: 'claim', description: 'Claims the current ticket exclusively for yourself', usage: '.claim', aliases: ['tclaim'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Tickets' },
      { name: 'transcript', description: 'Exports full HTML chat archive of active ticket', usage: '.transcript', aliases: ['savechat'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Staff', category: 'Tickets' }
    ],
    settings: {
      ticketCategoryParentId: '129843000000000001',
      transcriptLogChannelId: '129843000000000002',
      maxOpenTicketsPerUser: 1,
      sendDmTranscript: true,
      requireCloseReason: true
    }
  },
  {
    id: 'stats_system',
    name: 'StatBot Analytics & Counters',
    category: 'analytics',
    description: 'High-precision server metrics inspired by StatBot: voice channels displaying live member counters, voice call analytics, message volume, and top talkers.',
    enabled: true,
    iconName: 'BarChart3',
    features: [
      'Voice Channel Counter display (Total Members, Online, In VC, Boosts)',
      'Voice Time Tracker (minutes spent in voice channels per member)',
      'Message Activity leaderboards & hourly velocity graphs',
      'Custom bot emoji formatted stat cards'
    ],
    commands: [
      { name: 'stats', description: 'Displays server member count, voice statistics, and health', usage: '.stats', aliases: ['serverstats', 'metrics'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Analytics' },
      { name: 'vctop', description: 'Shows leaderboard of members with most voice channel time', usage: '.vctop [weekly/alltime]', aliases: ['voicetop'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Analytics' },
      { name: 'topchat', description: 'Displays top active chatters by message count', usage: '.topchat', aliases: ['messages'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Analytics' },
      { name: 'setupcounters', description: 'Creates automated voice channel statistics counters', usage: '.setupcounters', aliases: ['statcounters'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Analytics' }
    ],
    settings: {
      counterUpdateIntervalMinutes: 10,
      totalMembersChannelId: '129844000000000001',
      onlineMembersChannelId: '129844000000000002',
      inVcChannelId: '129844000000000003',
      boostChannelId: '129844000000000004'
    }
  },
  {
    id: 'appeals_system',
    name: 'Appeals Portal & System',
    category: 'moderation',
    description: 'Dedicated ban and timeout appeal workflow: users submit structured appeals with reason and evidence, staff review in Discord with 1-click Accept/Deny.',
    enabled: true,
    iconName: 'FileCheck',
    features: [
      'Structured questionnaire: Infraction reason, why forgive, proof/apology',
      'Staff review queue channel with Accept / Deny buttons',
      'Automated unban execution upon appeal approval',
      'Automatic DM notification to user with appeal verdict'
    ],
    commands: [
      { name: 'appeal', description: 'Submit an appeal for a warning, timeout, or ban', usage: '.appeal <caseId> <explanation>', aliases: ['unbanappeal'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'Appeals' },
      { name: 'appeallist', description: 'View pending moderation appeals awaiting staff review', usage: '.appeallist', aliases: ['appeals'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Senior Mod', category: 'Appeals' }
    ],
    settings: {
      appealQueueChannelId: '129845000000000001',
      cooldownBetweenAppealsDays: 14,
      allowDirectDmAppeals: true
    }
  },
  {
    id: 'reports_system',
    name: 'Member Reports with Proof',
    category: 'moderation',
    description: 'Community policing system: members report rule-breakers with image/video proofs; staff review triage queue and apply instant sanctions.',
    enabled: true,
    iconName: 'Flag',
    features: [
      'Report command requiring mandatory reason and proof link',
      'Staff triage channel with 1-click Quick Punish buttons',
      'Private DM receipt confirming report dispatch to user',
      'Spam prevention cooldowns on filing reports'
    ],
    commands: [
      { name: 'report', description: 'Report a rule breaker directly to online staff with proof', usage: '.report @user <reason> <proof URL>', aliases: ['rep'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Reports' },
      { name: 'reports', description: 'Inspect active pending member reports', usage: '.reports', aliases: ['openreports'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Reports' }
    ],
    settings: {
      reportsChannelId: '129846000000000001',
      requireProofUrl: true,
      notifyReporterOnAction: true
    }
  },
  {
    id: 'leveling',
    name: 'Leveling & Rank Cards',
    category: 'engagement',
    description: 'Engaging XP engine awarding points for chat and voice time, role multipliers (2x for Boosters), customizable rank cards, and role unlock rewards.',
    enabled: true,
    iconName: 'TrendingUp',
    features: [
      '15-25 XP per text message (60-second cooldown)',
      '10 XP per minute in Voice Channels',
      'Role multiplier support (e.g. 2x XP for Boosters/Donators)',
      'Custom Level-Up announcement card with bot emojis',
      'Configurable role rewards for levels 5, 10, 25, 50, 100'
    ],
    commands: [
      { name: 'rank', description: 'View personal XP rank card, level, and progress bar', usage: '.rank [@user]', aliases: ['level', 'xp'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Leveling' },
      { name: 'leaderboard', description: 'View server XP top leaderboard with page navigation', usage: '.leaderboard', aliases: ['levels', 'top'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Leveling' },
      { name: 'setxp', description: 'Manually grant or deduct XP from a member', usage: '.setxp @user <amount>', aliases: ['addxp'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Leveling' }
    ],
    settings: {
      xpPerMessageMin: 15,
      xpPerMessageMax: 25,
      voiceXpPerMinute: 10,
      levelUpChannelId: 'current',
      boosterMultiplier: 2.0
    }
  },
  {
    id: 'achievers',
    name: 'Weekly & Monthly Achievers',
    category: 'staff',
    description: 'Automated weekly & monthly broadcast celebrating Staff of the Week, most voice channel hours, and top chatters with custom bot emoji formatting.',
    enabled: true,
    iconName: 'Trophy',
    features: [
      'Automated Weekly recap posted Sunday at 23:59',
      'Staff of the Week selection based on quota score',
      'Top Voice Channel member & Top Chat talker recognition',
      'Option to include or exclude staff members from member activity ranks',
      '100% custom Discord emoji layout'
    ],
    commands: [
      { name: 'achievers', description: 'Shows the current week or month top achievers', usage: '.achievers [weekly/monthly]', aliases: ['weeklyachievers', 'monthlyachievers'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Staff' }
    ],
    settings: {
      announcementChannelId: '129847000000000001',
      allowStaffInActivityRanks: false,
      postDay: 'Sunday',
      postTime: '23:59'
    }
  },
  {
    id: 'modmail',
    name: 'Modmail & Thread Relay',
    category: 'tickets',
    description: 'Private bridge between member direct messages and staff thread channels, supporting anonymous moderator replies and transcript logging.',
    enabled: true,
    iconName: 'Mail',
    features: [
      'User DMs Zenith -> Opens private thread in #modmail',
      'Staff replies relayed back to user DM with embed formatting',
      'Anonymous reply option (.areply) hiding staff identity',
      'Full thread transcript saved upon closing'
    ],
    commands: [
      { name: 'reply', description: 'Sends a reply message to the user from the modmail thread', usage: '.reply <message>', aliases: ['r'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Modmail' },
      { name: 'areply', description: 'Sends an anonymous reply hiding your username', usage: '.areply <message>', aliases: ['ar'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Modmail' },
      { name: 'closemail', description: 'Closes modmail thread and saves transcript to log channel', usage: '.closemail [reason]', aliases: ['cmail'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Modmail' }
    ],
    settings: {
      modmailInboxChannelId: '129848000000000001',
      staffRoleAllowed: 'Staff',
      greetingMessage: 'Hello! You have reached Zenith Support. Our staff team has received your message.'
    }
  },
  {
    id: 'birthdays',
    name: 'Birthday Celebrations',
    category: 'engagement',
    description: 'Automatic birthday tracker: users register their birthday date and timezone, Zenith sends a celebratory embed at 00:00 and assigns the Birthday Star role.',
    enabled: true,
    iconName: 'Cake',
    features: [
      'Custom date and timezone registration (.setbirthday 24/07 UTC)',
      'Automated daily midnight scheduler',
      'Temporary 24-hour celebratory Birthday Star role',
      'Animated custom Discord birthday cake embed'
    ],
    commands: [
      { name: 'setbirthday', description: 'Register your birthday in DD/MM format with timezone', usage: '.setbirthday <DD/MM> [timezone]', aliases: ['birthday'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Birthdays' },
      { name: 'birthdays', description: 'View upcoming birthdays in the server this month', usage: '.birthdays', aliases: ['upcomingbirthdays'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Birthdays' }
    ],
    settings: {
      birthdayChannelId: '129849000000000001',
      birthdayRoleId: '129849000000000002',
      customMessage: 'Happy Birthday {user}! The server celebrates you today! 🎉'
    }
  },
  {
    id: 'snipe',
    name: 'Snipe & Audit Inspection',
    category: 'utility',
    description: 'Reveals recently deleted messages, edited messages with text diffs, and removed reactions within each channel.',
    enabled: true,
    iconName: 'Eye',
    features: [
      'In-memory message cache storing up to 10 deleted messages per channel',
      'Editsnipe tracking original text before modification',
      'Reaction snipe revealing unreacted emojis and user tags',
      'Staff bypass prevention'
    ],
    commands: [
      { name: 'snipe', description: 'Reveals the most recently deleted message in this channel', usage: '.snipe', aliases: ['s'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Utility' },
      { name: 'editsnipe', description: 'Reveals the before and after text of the last edited message', usage: '.editsnipe', aliases: ['es'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Utility' },
      { name: 'reactionsnipe', description: 'Reveals the last reaction removed from a message', usage: '.reactionsnipe', aliases: ['rs'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Utility' }
    ],
    settings: {
      cacheDurationMinutes: 60,
      ignoreBotMessages: true
    }
  },
  {
    id: 'lockdown',
    name: 'Lock & Emergency Lockdown',
    category: 'moderation',
    description: 'Rapid channel permission controls: lock current channel for @everyone, unlock with previous permissions, or trigger server-wide emergency lockdown.',
    enabled: true,
    iconName: 'Lock',
    features: [
      'One-command channel isolation (.lock [reason])',
      'Server-wide emergency lockdown isolating all public channels',
      'Slowmode adjustment from 1 second to 6 hours',
      'Automatic lock status embed with custom lock emoji'
    ],
    commands: [
      { name: 'lock', description: 'Locks the current channel to prevent members from typing', usage: '.lock [reason]', aliases: ['channellock'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Junior Mod', category: 'Moderation' },
      { name: 'unlock', description: 'Unlocks the channel and restores send messages permission', usage: '.unlock', aliases: ['channelunlock'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Junior Mod', category: 'Moderation' },
      { name: 'lockdown', description: 'Emergency lock applied to all public channels simultaneously', usage: '.lockdown [reason]', aliases: ['serverlock'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Moderation' },
      { name: 'slowmode', description: 'Sets slowmode cooldown between messages', usage: '.slowmode <seconds/off>', aliases: ['sm'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Junior Mod', category: 'Moderation' }
    ],
    settings: {
      lockdownExemptRoleIds: ['129841000000000001'],
      lockNotificationEmbed: true
    }
  },
  {
    id: 'economy',
    name: 'Economy & Virtual Banking',
    category: 'economy',
    description: 'Dynamic server economy system featuring wallet balances, bank vault interest, jobs, crime risk/reward, robberies, shop items, and casino games.',
    enabled: true,
    iconName: 'Coins',
    features: [
      'Wallet and Secure Bank balances',
      'Daily and Weekly paychecks (.daily, .weekly)',
      'Work shifts (.work) and risky heist operations (.crime)',
      'Robbery system with padlocks and defensive shield items',
      'Casino games: Coinflip, Slots, and Blackjack'
    ],
    commands: [
      { name: 'balance', description: 'Checks wallet and bank credits', usage: '.balance [@user]', aliases: ['bal', 'credits'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Economy' },
      { name: 'daily', description: 'Claim daily allowance of 250 credits', usage: '.daily', aliases: ['claimdaily'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Economy' },
      { name: 'work', description: 'Complete a random job shift for pay', usage: '.work', aliases: ['shift'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Economy' },
      { name: 'rob', description: 'Attempt to steal credits from another user wallet', usage: '.rob @user', aliases: ['steal'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'Economy' },
      { name: 'deposit', description: 'Deposit wallet money into protected bank vault', usage: '.deposit <amount/all>', aliases: ['dep'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Economy' },
      { name: 'slots', description: 'Gamble credits on the 3-reel slot machine', usage: '.slots <bet>', aliases: ['slot'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Economy' }
    ],
    settings: {
      currencyName: 'Zenith Credits',
      dailyAmount: 250,
      bankInterestRatePercent: 2.5
    }
  },
  {
    id: 'management_commands',
    name: 'Roles & Channels Manager',
    category: 'utility',
    description: 'Fast Discord management commands: create, delete, color, and assign roles, create voice/text/category channels, and bulk permission edits.',
    enabled: true,
    iconName: 'FolderPlus',
    features: [
      'Role creation with hex colors and hoisted permissions',
      'Channel and Category instant setup',
      'Bulk role assignment and removal',
      'Autorole assignment for new members and bots'
    ],
    commands: [
      { name: 'role', description: 'Manage server roles (give/remove/create/color)', usage: '.role <give/remove/create/delete> @user [roleName]', aliases: ['r'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Management' },
      { name: 'channel', description: 'Create, delete, or rename channels', usage: '.channel <create/delete/rename> <type> <name>', aliases: ['ch'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Management' },
      { name: 'autorole', description: 'Set roles automatically granted upon member join', usage: '.autorole <add/remove/list> @role', aliases: ['joinrole'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Management' }
    ],
    settings: {
      stickyRolesEnabled: true,
      autoMemberRoleId: '129850000000000001',
      autoBotRoleId: '129850000000000002'
    }
  },
  {
    id: 'verification',
    name: 'Verification Gate',
    category: 'core',
    description: 'Anti-bot security gate: Button verification, Captcha code challenges, and Rules acceptance modals before granting member access.',
    enabled: true,
    iconName: 'CheckCircle',
    features: [
      'One-click interactive Verify button',
      'Image / Alphanumeric captcha challenge to stop automated user-bots',
      'Auto-removes unverified role and grants verified member role',
      'Log channel auditing verification timestamps and IP geolocation'
    ],
    commands: [
      { name: 'verify', description: 'Triggers verification prompt or manual code entry', usage: '.verify', aliases: ['v'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Verification' },
      { name: 'setverify', description: 'Deploys verification embed message into channel', usage: '.setverify [#channel]', aliases: ['verifypanel'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Verification' }
    ],
    settings: {
      mode: 'Button & Captcha',
      unverifiedRoleId: '129851000000000001',
      verifiedRoleId: '129851000000000002',
      verificationChannelId: '129851000000000003'
    }
  },
  {
    id: 'giveaways',
    name: 'Giveaways System',
    category: 'engagement',
    description: 'Feature-rich giveaway manager with interactive Enter button, live timer updates, role requirement checks, bonus entries, and reroll command.',
    enabled: true,
    iconName: 'Gift',
    features: [
      'Interactive 🎉 Enter button with live entry counter',
      'Requirements: Required role, minimum server age, invite count',
      'Bonus entry multipliers for Boosters / VIPs',
      'Instant reroll command with winner mention'
    ],
    commands: [
      { name: 'gstart', description: 'Starts a giveaway with duration, winner count, and prize', usage: '.gstart <1h|2d> <winners> <prize>', aliases: ['giveaway'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Giveaways' },
      { name: 'greroll', description: 'Picks a new winner for an existing giveaway', usage: '.greroll [messageId]', aliases: ['reroll'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Giveaways' },
      { name: 'gend', description: 'Immediately finishes a giveaway and picks winners', usage: '.gend [messageId]', aliases: ['endgiveaway'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Giveaways' }
    ],
    settings: {
      defaultReaction: '🎉',
      embedColor: '#5865F2'
    }
  },
  {
    id: 'welcomer',
    name: 'Welcomer & DM On Join',
    category: 'engagement',
    description: 'Custom welcome card image generation, join channel embeds, member counter placeholders, and private Welcome DM with server guidelines.',
    enabled: true,
    iconName: 'UserPlus',
    features: [
      'High-resolution Welcome Card canvas preview',
      'Variables: {user}, {username}, {server}, {membercount}',
      'Automated Welcome DM sent directly to new members',
      'Goodbye / Leave message embed in dedicated channel'
    ],
    commands: [
      { name: 'testwelcome', description: 'Simulates a member join to test welcome card and DM', usage: '.testwelcome', aliases: ['testjoin'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Welcomer' }
    ],
    settings: {
      welcomeChannelId: '129852000000000001',
      sendWelcomeDm: true,
      welcomeDmMessage: 'Welcome to {server}, {user}! Make sure to read #rules and check out #roles to get started!',
      goodbyeChannelId: '129852000000000002'
    }
  },
  {
    id: 'invites',
    name: 'Invite Tracker',
    category: 'analytics',
    description: 'Tracks member join origin: calculates Real, Fake, Left, and Bonus invites, handles vanity URLs, and posts invite attribution in welcome channel.',
    enabled: true,
    iconName: 'Link',
    features: [
      'Precise invite calculation: Total = Real + Bonus - Left - Fake',
      'Vanity invite detection',
      'Invite leaderboard with top server promoters',
      'Bonus invite granting command for staff'
    ],
    commands: [
      { name: 'invites', description: 'Checks invite count and breakdown for yourself or a user', usage: '.invites [@user]', aliases: ['invs'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Invites' },
      { name: 'inviteleaderboard', description: 'Displays top inviter rankings', usage: '.inviteleaderboard', aliases: ['topinvites'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Invites' },
      { name: 'addinvites', description: 'Grants bonus invites to a user', usage: '.addinvites @user <count>', aliases: ['bonusinvites'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Invites' }
    ],
    settings: {
      fakeAccountAgeThresholdDays: 3,
      logInviteInWelcome: true
    }
  },
  {
    id: 'logging',
    name: 'Advanced Audit Logging',
    category: 'utility',
    description: 'Audits every single event: deleted/edited messages with diffs, channel/role changes, permission updates, member voice movements, and server modifications.',
    enabled: true,
    iconName: 'FileText',
    features: [
      'Message Delete & Edit with character diff highlights',
      'Role Create/Update/Delete and permission diffs',
      'Channel Create/Update/Delete',
      'Voice Channel Join, Move, and Disconnect events',
      'Member Join, Leave, Nickname, and Avatar changes'
    ],
    commands: [
      { name: 'logging', description: 'Configure log routing channels for different event types', usage: '.logging <setup/status>', aliases: ['auditlog'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Logging' }
    ],
    settings: {
      messageLogsChannelId: '129853000000000001',
      memberLogsChannelId: '129853000000000002',
      voiceLogsChannelId: '129853000000000003',
      serverLogsChannelId: '129853000000000004'
    }
  },
  {
    id: 'games_trolling',
    name: 'Games & Fun Trolling',
    category: 'engagement',
    description: 'Interactive multiplayer & mini-games (Connect 4, Trivia, Akinator, RPS) and trolling commands (Fakeban, Roast, Ship, Meme, 8ball).',
    enabled: true,
    iconName: 'Gamepad2',
    features: [
      'Trivia with 10+ categories and difficulty levels',
      'Connect 4 playable via interactive Discord buttons',
      'Fakeban with convincing simulated ban embed',
      'Compatibility Ship meter with percentage and rating'
    ],
    commands: [
      { name: 'trivia', description: 'Starts an interactive trivia question with button answers', usage: '.trivia [category]', aliases: ['quiz'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' },
      { name: 'connect4', description: 'Challenge another user to a game of Connect 4', usage: '.connect4 @user', aliases: ['c4'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' },
      { name: 'fakeban', description: 'Trolls a member with a fake ban embed', usage: '.fakeban @user [reason]', aliases: ['fban'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' },
      { name: 'roast', description: 'Delivers a witty and playful roast to target user', usage: '.roast [@user]', aliases: ['insult'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' },
      { name: 'ship', description: 'Calculates the love compatibility between two members', usage: '.ship @user1 @user2', aliases: ['love'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' },
      { name: '8ball', description: 'Ask the magic 8ball any question', usage: '.8ball <question>', aliases: ['ask'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Games' }
    ],
    settings: {
      enableTrollingCommands: true,
      sfwOnly: true
    }
  },
  {
    id: 'auto_responder',
    name: 'Auto-Reactor & Responder',
    category: 'utility',
    description: 'Custom trigger phrases that trigger automatic reactions, smart text responses, or rich Discord embeds with wildcard variable support.',
    enabled: true,
    iconName: 'MessageSquareShare',
    features: [
      'Exact match, Contains, and Regex trigger detection',
      'Auto-reaction with Zenith custom emojis',
      'Embed responses with custom titles and links',
      'Cooldown limits per trigger'
    ],
    commands: [
      { name: 'addresponse', description: 'Creates a new auto-response trigger and reply', usage: '.addresponse <trigger> | <reply>', aliases: ['autorespond'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Utility' },
      { name: 'addreact', description: 'Adds an automated emoji reaction to specific words', usage: '.addreact <trigger> <emoji>', aliases: ['autoreact'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Utility' },
      { name: 'responselist', description: 'Lists all registered automated triggers', usage: '.responselist', aliases: ['triggers'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Staff', category: 'Utility' }
    ],
    settings: {
      caseSensitive: false,
      ignoreBots: true
    }
  },
  {
    id: 'reminders',
    name: 'Reminders & Automations',
    category: 'utility',
    description: 'Scheduled reminders and recurring server task automations: reminds users in channel or DM with custom delay syntax (e.g. 30m, 2h, 1d).',
    enabled: true,
    iconName: 'Clock',
    features: [
      'Natural time parsing: 10m, 1h 30m, 2d',
      'Delivery options: Channel ping or Private Direct Message',
      'Recurring automated messages (e.g. daily bump reminders)',
      'List and cancel active reminders'
    ],
    commands: [
      { name: 'remindme', description: 'Sets a personal reminder with delay and note', usage: '.remindme <time> <message>', aliases: ['remind', 'timer'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Utility' },
      { name: 'reminders', description: 'Lists all your currently active pending reminders', usage: '.reminders', aliases: ['myreminders'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Utility' }
    ],
    settings: {
      maxRemindersPerUser: 10,
      allowDmReminders: true
    }
  },
  {
    id: 'premium_system',
    name: 'Premium Tiers & Perks',
    category: 'core',
    description: 'Subscription management for Zenith Premium: 24/7 Music lock bypass, unmetered logging, custom bot embeds, and high-priority Discord gateway sharding.',
    enabled: true,
    iconName: 'Sparkles',
    features: [
      'Perks: 24/7 Music VC Lock, Max Audio Bitrate, Unlimited Antinuke Whitelist',
      'Tier activation codes and automated guild upgrade',
      '.premiumhelp command showcasing privileges',
      'Custom embed colors and server badge styling'
    ],
    commands: [
      { name: 'premiumhelp', description: 'Displays all premium perks, commands, and subscription status', usage: '.premiumhelp', aliases: ['phelp', 'perks'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Premium' },
      { name: 'redeem', description: 'Redeems a premium license key for this server', usage: '.redeem <licenseKey>', aliases: ['activatepremium'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Admin', category: 'Premium' },
      { name: 'premiumstatus', description: 'Checks server premium expiration and active perks', usage: '.premiumstatus', aliases: ['pstatus'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'Premium' }
    ],
    settings: {
      currentTier: 'Zenith Diamond Tier',
      isPremiumGuild: true,
      validUntil: '2028-12-31'
    }
  },
  {
    id: 'bot_staff',
    name: 'Bot Staff & Owner Commands',
    category: 'core',
    description: 'Restricted administrative commands for Zenith bot staff and Owner (1181221352393420856): server inspection, emergency leaves, global blacklist, and broadcast.',
    enabled: true,
    iconName: 'Terminal',
    features: [
      'Restricted to Owner (ID: 1181221352393420856) and designated Bot Staff',
      '.staffhelp listing specialized bot staff controls',
      'Global server management (.serverlist, .leaveserver)',
      'Emergency broadcast notification system across all guilds',
      'Module hot-reload and remote runtime diagnostics'
    ],
    commands: [
      { name: 'botstaff', description: 'Add or remove global bot staff members', usage: '.botstaff <add/remove/list> @user', aliases: ['bs'], slashSupported: false, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Bot Staff' },
      { name: 'eval', description: 'Execute sandboxed JavaScript expression in bot environment', usage: '.eval <code>', aliases: ['e'], slashSupported: false, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Bot Staff' },
      { name: 'serverlist', description: 'Lists all servers hosting Zenith with member counts', usage: '.serverlist [page]', aliases: ['guilds'], slashSupported: false, prefixSupported: true, noPrefixSupported: false, permission: 'Bot Staff', category: 'Bot Staff' },
      { name: 'leaveserver', description: 'Forces Zenith to gracefully leave a specified guild ID', usage: '.leaveserver <guildId>', aliases: ['forceleave'], slashSupported: false, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Bot Staff' },
      { name: 'blacklist', description: 'Globally blacklist abusive users or guilds from Zenith', usage: '.blacklist <add/remove> <id> <reason>', aliases: ['gban'], slashSupported: false, prefixSupported: true, noPrefixSupported: false, permission: 'Owner', category: 'Bot Staff' }
    ],
    settings: {
      botOwnerId: '1181221352393420856',
      botStaffIds: ['1181221352393420856', '998822334455667788']
    }
  },
  {
    id: 'tempvoice',
    name: 'TempVoice Dynamic Private Channels',
    category: 'utility',
    description: 'Auto-creating temporary voice channels (Join-to-Create): users join master channel, get a private room with full ownership, lock/unlock, user limits, and auto-delete when empty.',
    enabled: true,
    iconName: 'Volume2',
    features: [
      'Join-to-Create Master Voice Generator',
      'Instant private voice channel creation with owner permissions',
      'Interactive room controls (Lock, Unlock, Set Limit, Rename, Bitrate)',
      'Trust / Permit trusted friends into locked rooms',
      'Kick / Ban unauthorized users from private voice room',
      'Auto-deletion of temporary room when last member disconnects'
    ],
    commands: [
      { name: 'vclock', description: 'Locks temporary voice channel preventing other users from joining', usage: '.vclock', aliases: ['privateroom'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vcunlock', description: 'Unlocks temporary voice channel allowing anyone to join', usage: '.vcunlock', aliases: ['publicroom'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vcname', description: 'Renames temporary voice channel', usage: '.vcname <new name>', aliases: ['vcrename'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vclimit', description: 'Sets member slot limit for voice room (0-99)', usage: '.vclimit <number>', aliases: ['slots'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vcpermit', description: 'Grants access to a specific friend to join your locked room', usage: '.vcpermit @user', aliases: ['trust', 'vcallow'], slashSupported: true, prefixSupported: true, noPrefixSupported: true, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vckick', description: 'Kicks an unwanted member from your temporary voice room', usage: '.vckick @user', aliases: ['vcdisconnect'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'TempVoice' },
      { name: 'vcclaim', description: 'Claims ownership of temporary room if owner leaves', usage: '.vcclaim', aliases: ['claimroom'], slashSupported: true, prefixSupported: true, noPrefixSupported: false, permission: 'Everyone', category: 'TempVoice' }
    ],
    settings: {
      masterChannelName: '➕ Join to Create',
      defaultCategory: '🔊 Dynamic Voice Rooms',
      defaultUserLimit: 0,
      defaultBitrateKbps: 96,
      autoDeleteWhenEmpty: true
    }
  }
];
