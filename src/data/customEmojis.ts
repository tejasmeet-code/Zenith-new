import type { CustomEmoji } from '../types/index.ts';

export const ZENITH_CUSTOM_EMOJIS: CustomEmoji[] = [
  // ==========================================
  // 1-32: DEDICATED SEPARATE EMOJI FOR EVERY MODULE
  // ==========================================
  {
    id: '129841810100000001',
    name: 'zenith_mod_music',
    animated: true,
    code: '<a:zenith_mod_music:129841810100000001>',
    category: 'music',
    description: 'Module: 24/7 Music Engine (Lavalink v4)',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
  },
  {
    id: '129841810100000002',
    name: 'zenith_mod_antinuke',
    animated: false,
    code: '<:zenith_mod_antinuke:129841810100000002>',
    category: 'moderation',
    description: 'Module: Antinuke Defense Shield Matrix',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/></svg>'
  },
  {
    id: '129841810100000003',
    name: 'zenith_mod_automod',
    animated: false,
    code: '<:zenith_mod_automod:129841810100000003>',
    category: 'moderation',
    description: 'Module: Discord Native Automod & Filter Engine',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
  },
  {
    id: '129841810100000004',
    name: 'zenith_mod_leveling',
    animated: true,
    code: '<a:zenith_mod_leveling:129841810100000004>',
    category: 'stats',
    description: 'Module: Leveling & Rank Progress System',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><polyline points="18 15 12 9 6 15"/><polyline points="18 9 12 3 6 9"/></svg>'
  },
  {
    id: '129841810100000005',
    name: 'zenith_mod_tickets',
    animated: false,
    code: '<:zenith_mod_tickets:129841810100000005>',
    category: 'tickets',
    description: 'Module: Multi-Category Support Tickets',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
  },
  {
    id: '129841810100000006',
    name: 'zenith_mod_moderation',
    animated: false,
    code: '<:zenith_mod_moderation:129841810100000006>',
    category: 'moderation',
    description: 'Module: Moderation Commands, Jail & Cases',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="m14 13-7.5 7.5c-.8.8-2.2.8-3 0s-.8-2.2 0-3L11 10"/><path d="m16 16 6-6"/></svg>'
  },
  {
    id: '129841810100000007',
    name: 'zenith_mod_staff',
    animated: false,
    code: '<:zenith_mod_staff:129841810100000007>',
    category: 'staff',
    description: 'Module: Server Staff Governance & Quotas',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    id: '129841810100000008',
    name: 'zenith_mod_reports',
    animated: false,
    code: '<:zenith_mod_reports:129841810100000008>',
    category: 'tickets',
    description: 'Module: Member Reports & Proof Attachment',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>'
  },
  {
    id: '129841810100000009',
    name: 'zenith_mod_dms',
    animated: false,
    code: '<:zenith_mod_dms:129841810100000009>',
    category: 'system',
    description: 'Module: DM Dispatch for Moderation Actions & Alerts',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  },
  {
    id: '129841810100000010',
    name: 'zenith_mod_stats',
    animated: false,
    code: '<:zenith_mod_stats:129841810100000010>',
    category: 'stats',
    description: 'Module: StatBot Voice Counters & Analytics',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
  },
  {
    id: '129841810100000011',
    name: 'zenith_mod_appeals',
    animated: false,
    code: '<:zenith_mod_appeals:129841810100000011>',
    category: 'tickets',
    description: 'Module: Punishment Appeals System',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>'
  },
  {
    id: '129841810100000012',
    name: 'zenith_mod_birthday',
    animated: true,
    code: '<a:zenith_mod_birthday:129841810100000012>',
    category: 'system',
    description: 'Module: Birthday Wishing Automation',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><line x1="12" y1="7" x2="12" y2="11"/><circle cx="12" cy="4" r="1"/></svg>'
  },
  {
    id: '129841810100000013',
    name: 'zenith_mod_snipe',
    animated: false,
    code: '<:zenith_mod_snipe:129841810100000013>',
    category: 'moderation',
    description: 'Module: Snipe & Edit History Audit',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>'
  },
  {
    id: '129841810100000014',
    name: 'zenith_mod_lock',
    animated: false,
    code: '<:zenith_mod_lock:129841810100000014>',
    category: 'moderation',
    description: 'Module: Channel & Server Emergency Lock',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
  {
    id: '129841810100000015',
    name: 'zenith_mod_economy',
    animated: true,
    code: '<a:zenith_mod_economy:129841810100000015>',
    category: 'economy',
    description: 'Module: Economy, Bank, Robbery & Shop',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h6"/></svg>'
  },
  {
    id: '129841810100000016',
    name: 'zenith_mod_roles',
    animated: false,
    code: '<:zenith_mod_roles:129841810100000016>',
    category: 'system',
    description: 'Module: Role, Channel & Category Management',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    id: '129841810100000017',
    name: 'zenith_mod_autorole',
    animated: false,
    code: '<:zenith_mod_autorole:129841810100000017>',
    category: 'system',
    description: 'Module: Instant Join Autoroles',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  },
  {
    id: '129841810100000018',
    name: 'zenith_mod_verification',
    animated: false,
    code: '<:zenith_mod_verification:129841810100000018>',
    category: 'system',
    description: 'Module: Captcha & Button Verification Gate',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  },
  {
    id: '129841810100000019',
    name: 'zenith_mod_modmail',
    animated: true,
    code: '<a:zenith_mod_modmail:129841810100000019>',
    category: 'tickets',
    description: 'Module: Direct Modmail Inbox & Threads',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><line x1="12" y1="13" x2="12" y2="21"/></svg>'
  },
  {
    id: '129841810100000020',
    name: 'zenith_mod_games',
    animated: true,
    code: '<a:zenith_mod_games:129841810100000020>',
    category: 'economy',
    description: 'Module: Casino Games, Trivia & Minigames',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="7.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>'
  },
  {
    id: '129841810100000021',
    name: 'zenith_mod_trolling',
    animated: false,
    code: '<:zenith_mod_trolling:129841810100000021>',
    category: 'economy',
    description: 'Module: Fun & Harmless Trolling Commands',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  },
  {
    id: '129841810100000022',
    name: 'zenith_mod_giveaways',
    animated: true,
    code: '<a:zenith_mod_giveaways:129841810100000022>',
    category: 'economy',
    description: 'Module: Automated Giveaways & Winner Rolls',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>'
  },
  {
    id: '129841810100000023',
    name: 'zenith_mod_welcomer',
    animated: true,
    code: '<a:zenith_mod_welcomer:129841810100000023>',
    category: 'system',
    description: 'Module: Welcomer Cards & Custom Banners',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>'
  },
  {
    id: '129841810100000024',
    name: 'zenith_mod_autoreact',
    animated: false,
    code: '<:zenith_mod_autoreact:129841810100000024>',
    category: 'system',
    description: 'Module: Auto-Reactor Emoji Trigger Rules',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    id: '129841810100000025',
    name: 'zenith_mod_autorespond',
    animated: false,
    code: '<:zenith_mod_autorespond:129841810100000025>',
    category: 'system',
    description: 'Module: Auto-Responder Pattern Matches',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  },
  {
    id: '129841810100000026',
    name: 'zenith_mod_invites',
    animated: false,
    code: '<:zenith_mod_invites:129841810100000026>',
    category: 'system',
    description: 'Module: Invite Trackers & Join Analytics',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  },
  {
    id: '129841810100000027',
    name: 'zenith_mod_logging',
    animated: false,
    code: '<:zenith_mod_logging:129841810100000027>',
    category: 'moderation',
    description: 'Module: Advanced Realtime Server Audit Logs',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>'
  },
  {
    id: '129841810100000028',
    name: 'zenith_mod_dmonjoin',
    animated: false,
    code: '<:zenith_mod_dmonjoin:129841810100000028>',
    category: 'system',
    description: 'Module: Automated Welcome DM on Join',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="M22 2 11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  },
  {
    id: '129841810100000029',
    name: 'zenith_mod_reminders',
    animated: false,
    code: '<:zenith_mod_reminders:129841810100000029>',
    category: 'system',
    description: 'Module: Reminders & Sticky Announcements',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  },
  {
    id: '129841810100000030',
    name: 'zenith_mod_automations',
    animated: true,
    code: '<a:zenith_mod_automations:129841810100000030>',
    category: 'system',
    description: 'Module: Scheduled Tasks & Thread Automations',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>'
  },
  {
    id: '129841810100000031',
    name: 'zenith_mod_profile',
    animated: false,
    code: '<:zenith_mod_profile:129841810100000031>',
    category: 'badges',
    description: 'Module: Bot Profile Customization & Badges',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
  },
  {
    id: '129841810100000032',
    name: 'zenith_mod_achievers',
    animated: true,
    code: '<a:zenith_mod_achievers:129841810100000032>',
    category: 'staff',
    description: 'Module: Weekly & Monthly Achiever Broadcasts',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>'
  },
  {
    id: '129841810100000033',
    name: 'zenith_mod_tempvoice',
    animated: true,
    code: '<a:zenith_mod_tempvoice:129841810100000033>',
    category: 'system',
    description: 'Module: Dynamic TempVoice & Join to Create Private Rooms',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/><circle cx="18" cy="4" r="2" fill="#57F287"/></svg>'
  },
  {
    id: '129841810100000034',
    name: 'zenith_tempvoice_lock',
    animated: false,
    code: '<:zenith_tempvoice_lock:129841810100000034>',
    category: 'system',
    description: 'TempVoice: Lock Private Voice Room',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
  {
    id: '129841810100000035',
    name: 'zenith_tempvoice_permit',
    animated: false,
    code: '<:zenith_tempvoice_permit:129841810100000035>',
    category: 'system',
    description: 'TempVoice: Permit Trusted Friend to Locked Voice Room',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>'
  },
  {
    id: '129841810100000036',
    name: 'zenith_tempvoice_limit',
    animated: false,
    code: '<:zenith_tempvoice_limit:129841810100000036>',
    category: 'system',
    description: 'TempVoice: Set Voice Room User Limit',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
  },

  // ==========================================
  // 34-42: SEPARATE EMOJIS FOR BADGES
  // ==========================================
  {
    id: '129841820100000001',
    name: 'zenith_badge_owner',
    animated: true,
    code: '<a:zenith_badge_owner:129841820100000001>',
    category: 'badges',
    description: 'Badge: Official Bot Owner (1181221352393420856)',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>'
  },
  {
    id: '129841820100000002',
    name: 'zenith_badge_dev',
    animated: true,
    code: '<a:zenith_badge_dev:129841820100000002>',
    category: 'badges',
    description: 'Badge: Active Discord Verified Developer',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
  },
  {
    id: '129841820100000003',
    name: 'zenith_badge_early',
    animated: false,
    code: '<:zenith_badge_early:129841820100000003>',
    category: 'badges',
    description: 'Badge: Early Supporter Founding Member',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    id: '129841820100000004',
    name: 'zenith_badge_bughunter',
    animated: false,
    code: '<:zenith_badge_bughunter:129841820100000004>',
    category: 'badges',
    description: 'Badge: Bug Hunter Diamond Elite',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M12 18v4"/><path d="M4 12a8 8 0 0 0 16 0"/><path d="m19 19-3-3"/><path d="m5 19 3-3"/><path d="m20 9-4 1"/><path d="m4 9 4 1"/></svg>'
  },
  {
    id: '129841820100000005',
    name: 'zenith_badge_partner',
    animated: false,
    code: '<:zenith_badge_partner:129841820100000005>',
    category: 'badges',
    description: 'Badge: Official Zenith Partner Server',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  },
  {
    id: '129841820100000006',
    name: 'zenith_badge_vip',
    animated: true,
    code: '<a:zenith_badge_vip:129841820100000006>',
    category: 'badges',
    description: 'Badge: VIP Global Superuser',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/></svg>'
  },
  {
    id: '129841820100000007',
    name: 'zenith_badge_booster',
    animated: true,
    code: '<a:zenith_badge_booster:129841820100000007>',
    category: 'badges',
    description: 'Badge: Support Server Nitro Booster',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
  },
  {
    id: '129841820100000008',
    name: 'zenith_badge_staff_cert',
    animated: false,
    code: '<:zenith_badge_staff_cert:129841820100000008>',
    category: 'badges',
    description: 'Badge: Certified Staff Administrator',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>'
  },

  // ==========================================
  // 41-48: SEPARATE EMOJIS FOR PREMIUM FEATURES
  // ==========================================
  {
    id: '129841830100000001',
    name: 'zenith_prem_diamond',
    animated: true,
    code: '<a:zenith_prem_diamond:129841830100000001>',
    category: 'badges',
    description: 'Premium: Diamond Ultra Guild Plan',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/></svg>'
  },
  {
    id: '129841830100000002',
    name: 'zenith_prem_gold',
    animated: false,
    code: '<:zenith_prem_gold:129841830100000002>',
    category: 'badges',
    description: 'Premium: Gold Tier Plan',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h6"/></svg>'
  },
  {
    id: '129841830100000003',
    name: 'zenith_prem_320k',
    animated: true,
    code: '<a:zenith_prem_320k:129841830100000003>',
    category: 'music',
    description: 'Premium: 320kbps Studio Audio Bitrate',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 11v2"/></svg>'
  },
  {
    id: '129841830100000004',
    name: 'zenith_prem_custom_bot',
    animated: false,
    code: '<:zenith_prem_custom_bot:129841830100000004>',
    category: 'system',
    description: 'Premium: Custom Bot Avatar & Status Host',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
  {
    id: '129841830100000005',
    name: 'zenith_prem_instant_audit',
    animated: false,
    code: '<:zenith_prem_instant_audit:129841830100000005>',
    category: 'moderation',
    description: 'Premium: 0ms Instant Audit Snapshot Rollback',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  },
  {
    id: '129841830100000006',
    name: 'zenith_prem_bypass',
    animated: false,
    code: '<:zenith_prem_bypass:129841830100000006>',
    category: 'moderation',
    description: 'Premium: Superuser Rate Limit Exemption',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  },
  {
    id: '129841830100000007',
    name: 'zenith_prem_cloud_priority',
    animated: true,
    code: '<a:zenith_prem_cloud_priority:129841830100000007>',
    category: 'system',
    description: 'Premium: HeavenCloud Dedicated VIP Shard',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
  },
  {
    id: '129841830100000008',
    name: 'zenith_prem_unlimited',
    animated: false,
    code: '<:zenith_prem_unlimited:129841830100000008>',
    category: 'system',
    description: 'Premium: Unlimited Embeds & Tickets Capacity',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"/></svg>'
  },

  // ==========================================
  // 49-54: SEPARATE EMOJIS FOR NO-PREFIX & DEVELOPER
  // ==========================================
  {
    id: '129841840100000001',
    name: 'zenith_noprefix_badge',
    animated: false,
    code: '<:zenith_noprefix_badge:129841840100000001>',
    category: 'system',
    description: 'No-Prefix: Global No-Prefix Execution Access',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  },
  {
    id: '129841840100000002',
    name: 'zenith_noprefix_toggle',
    animated: true,
    code: '<a:zenith_noprefix_toggle:129841840100000002>',
    category: 'system',
    description: 'No-Prefix: Realtime Fast Command Dispatch',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  },
  {
    id: '129841840100000003',
    name: 'zenith_dev_terminal',
    animated: true,
    code: '<a:zenith_dev_terminal:129841840100000003>',
    category: 'system',
    description: 'Developer: Live Bash & Cluster Shell',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>'
  },
  {
    id: '129841840100000004',
    name: 'zenith_dev_github',
    animated: false,
    code: '<:zenith_dev_github:129841840100000004>',
    category: 'system',
    description: 'Developer: Zenith GitHub Core Engine Repo',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#dbdee1" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>'
  },
  {
    id: '129841840100000005',
    name: 'zenith_dev_api_key',
    animated: false,
    code: '<:zenith_dev_api_key:129841840100000005>',
    category: 'system',
    description: 'Developer: HeavenCloud Cluster API Secret Key',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><path d="m21 2-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l-1.5-1.5L8 9l-1.5-1.5L5 9l-3 3 5 5 14-14z"/></svg>'
  },
  {
    id: '129841840100000006',
    name: 'zenith_dev_cpu',
    animated: true,
    code: '<a:zenith_dev_cpu:129841840100000006>',
    category: 'system',
    description: 'Developer: Dual-Core CPU Load & Memory Monitor',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/></svg>'
  },

  // ==========================================
  // 55-62: SEPARATE EMOJIS FOR BOT STAFF ROLES & TIERS
  // ==========================================
  {
    id: '129841850100000001',
    name: 'zenith_role_bot_owner',
    animated: true,
    code: '<a:zenith_role_bot_owner:129841850100000001>',
    category: 'staff',
    description: 'Bot Staff Role: Bot Owner (Root Bypass)',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>'
  },
  {
    id: '129841850100000002',
    name: 'zenith_role_executive',
    animated: false,
    code: '<:zenith_role_executive:129841850100000002>',
    category: 'staff',
    description: 'Bot Staff Role: Executive Director',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    id: '129841850100000003',
    name: 'zenith_role_manager',
    animated: false,
    code: '<:zenith_role_manager:129841850100000003>',
    category: 'staff',
    description: 'Bot Staff Role: Bot Operations Manager',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>'
  },
  {
    id: '129841850100000004',
    name: 'zenith_role_senior_admin',
    animated: false,
    code: '<:zenith_role_senior_admin:129841850100000004>',
    category: 'staff',
    description: 'Bot Staff Role: Senior Bot Administrator',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  },
  {
    id: '129841850100000005',
    name: 'zenith_role_bot_mod',
    animated: false,
    code: '<:zenith_role_bot_mod:129841850100000005>',
    category: 'staff',
    description: 'Bot Staff Role: Global Bot Moderator',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><path d="m14 13-7.5 7.5c-.8.8-2.2.8-3 0s-.8-2.2 0-3L11 10"/><path d="m16 16 6-6"/></svg>'
  },
  {
    id: '129841850100000006',
    name: 'zenith_role_support_agent',
    animated: false,
    code: '<:zenith_role_support_agent:129841850100000006>',
    category: 'staff',
    description: 'Bot Staff Role: Support Server Specialist',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
  },
  {
    id: '129841850100000007',
    name: 'zenith_role_trainee',
    animated: false,
    code: '<:zenith_role_trainee:129841850100000007>',
    category: 'staff',
    description: 'Bot Staff Role: Junior Staff Trainee',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#949ba4" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  },
  {
    id: '129841850100000008',
    name: 'zenith_role_support_dm',
    animated: true,
    code: '<a:zenith_role_support_dm:129841850100000008>',
    category: 'staff',
    description: 'Automated Support Server DM Invite Dispatch',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  },

  // ==========================================
  // 63-78: IMPORTED ARCHETYPE EMOJIS FROM WICK, SAPPHIRE & DYNO
  // ==========================================
  {
    id: '129841860100000001',
    name: 'wick_quarantine_shield',
    animated: false,
    code: '<:wick_quarantine_shield:129841860100000001>',
    category: 'moderation',
    description: 'Wick Antinuke Quarantine Isolation Chamber',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  },
  {
    id: '129841860100000002',
    name: 'wick_panic_siren',
    animated: true,
    code: '<a:wick_panic_siren:129841860100000002>',
    category: 'moderation',
    description: 'Wick Emergency Panic Lockdown Siren',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
  },
  {
    id: '129841860100000003',
    name: 'wick_honeypot_trap',
    animated: false,
    code: '<:wick_honeypot_trap:129841860100000003>',
    category: 'moderation',
    description: 'Wick Honeypot Raid Trap Channel',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.2 1.2L3 12l5.8 1.9a2 2 0 0 1 1.2 1.2L12 21l1.9-5.8a2 2 0 0 1 1.2-1.2L21 12l-5.8-1.9a2 2 0 0 1-1.2-1.2z"/></svg>'
  },
  {
    id: '129841860100000004',
    name: 'sapphire_crystal',
    animated: true,
    code: '<a:sapphire_crystal:129841860100000004>',
    category: 'system',
    description: 'Sapphire Interactive Dashboard Crystal',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><polygon points="12 2 2 7 12 22 22 7 12 2"/></svg>'
  },
  {
    id: '129841860100000005',
    name: 'sapphire_banner_builder',
    animated: false,
    code: '<:sapphire_banner_builder:129841860100000005>',
    category: 'system',
    description: 'Sapphire Visual Embed & Banner Studio',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
  },
  {
    id: '129841860100000006',
    name: 'sapphire_sparkle_badge',
    animated: true,
    code: '<a:sapphire_sparkle_badge:129841860100000006>',
    category: 'badges',
    description: 'Sapphire Shimmering Diamond Tier',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/></svg>'
  },
  {
    id: '129841860100000007',
    name: 'dyno_web_action',
    animated: false,
    code: '<:dyno_web_action:129841860100000007>',
    category: 'moderation',
    description: 'Dyno Web Action Center (Execute from Web)',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  },
  {
    id: '129841860100000008',
    name: 'dyno_gavel_punish',
    animated: false,
    code: '<:dyno_gavel_punish:129841860100000008>',
    category: 'moderation',
    description: 'Dyno Judicial Punishment Hammer',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><path d="m14 13-7.5 7.5c-.8.8-2.2.8-3 0s-.8-2.2 0-3L11 10"/><path d="m16 16 6-6"/></svg>'
  },
  {
    id: '129841860100000009',
    name: 'dyno_purge_broom',
    animated: false,
    code: '<:dyno_purge_broom:129841860100000009>',
    category: 'moderation',
    description: 'Dyno Instant Web Channel Purge',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'
  },
  {
    id: '129841860100000010',
    name: 'statbot_growth_pulse',
    animated: true,
    code: '<a:statbot_growth_pulse:129841860100000010>',
    category: 'stats',
    description: 'StatBot Precise Server Member Count Counter',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
  },
  {
    id: '129841860100000011',
    name: 'probot_rank_cup',
    animated: true,
    code: '<a:probot_rank_cup:129841860100000011>',
    category: 'stats',
    description: 'ProBot Style Level Rank Leaderboard',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
  },
  {
    id: '129841860100000012',
    name: 'hydra_lavalink_247',
    animated: true,
    code: '<a:hydra_lavalink_247:129841860100000012>',
    category: 'music',
    description: 'Hydra Lossless 24/7 Voice Channel Connection',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>'
  },
  {
    id: '129841860100000013',
    name: 'giveawaybot_gift',
    animated: true,
    code: '<a:giveawaybot_gift:129841860100000013>',
    category: 'economy',
    description: 'GiveawayBot Instant Reaction Drop Box',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>'
  },
  {
    id: '129841860100000014',
    name: 'carl_turtle_log',
    animated: false,
    code: '<:carl_turtle_log:129841860100000014>',
    category: 'moderation',
    description: 'Carl Style High-Volume Channel Logging',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
  },
  {
    id: '129841860100000015',
    name: 'mee6_xp_booster',
    animated: true,
    code: '<a:mee6_xp_booster:129841860100000015>',
    category: 'stats',
    description: 'Mee6 Style 2x Chat XP Voice Multiplier',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    id: '129841860100000016',
    name: 'discord_verified_bot',
    animated: false,
    code: '<:discord_verified_bot:129841860100000016>',
    category: 'system',
    description: 'Discord Verified Bot Official Checkmark',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  },

  // ==========================================
  // 79-115+: SYSTEM CONTROLS, ACTION STATUS & STATUS DOTS
  // ==========================================
  {
    id: '129841870100000001',
    name: 'zenith_status_online',
    animated: true,
    code: '<a:zenith_status_online:129841870100000001>',
    category: 'system',
    description: 'Status: 24/7 Gateway Shard Online Pulsing',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#57F287"/></svg>'
  },
  {
    id: '129841870100000002',
    name: 'zenith_status_idle',
    animated: false,
    code: '<:zenith_status_idle:129841870100000002>',
    category: 'system',
    description: 'Status: Standby Warm Cache',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FAA61A" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#FAA61A"/></svg>'
  },
  {
    id: '129841870100000003',
    name: 'zenith_status_dnd',
    animated: false,
    code: '<:zenith_status_dnd:129841870100000003>',
    category: 'system',
    description: 'Status: Emergency Lockdown Do Not Disturb',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
  },
  {
    id: '129841870100000004',
    name: 'zenith_action_success',
    animated: false,
    code: '<:zenith_action_success:129841870100000004>',
    category: 'system',
    description: 'Action Executed on Discord Gateway Successfully',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  },
  {
    id: '129841870100000005',
    name: 'zenith_action_failed',
    animated: false,
    code: '<:zenith_action_failed:129841870100000005>',
    category: 'system',
    description: 'Action Denied / Discord Rate Limit',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  },
  {
    id: '129841870100000006',
    name: 'zenith_bullet_blue',
    animated: false,
    code: '<:zenith_bullet_blue:129841870100000006>',
    category: 'system',
    description: 'Embed Custom Diamond Blue Bullet',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#5865F2"/></svg>'
  },
  {
    id: '129841870100000007',
    name: 'zenith_bullet_green',
    animated: false,
    code: '<:zenith_bullet_green:129841870100000007>',
    category: 'system',
    description: 'Embed Custom Emerald Green Bullet',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#57F287"/></svg>'
  },
  {
    id: '129841870100000008',
    name: 'zenith_bullet_red',
    animated: false,
    code: '<:zenith_bullet_red:129841870100000008>',
    category: 'system',
    description: 'Embed Custom Crimson Red Bullet',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ED4245" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#ED4245"/></svg>'
  },
  {
    id: '129841870100000009',
    name: 'zenith_bullet_gold',
    animated: false,
    code: '<:zenith_bullet_gold:129841870100000009>',
    category: 'system',
    description: 'Embed Custom Gold Bullet',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FEE75C" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#FEE75C"/></svg>'
  },
  {
    id: '129841870100000010',
    name: 'zenith_arrow_right',
    animated: false,
    code: '<:zenith_arrow_right:129841870100000010>',
    category: 'system',
    description: 'Embed Hierarchy Transition Arrow',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
  },
  {
    id: '129841870100000011',
    name: 'zenith_sparkles_pink',
    animated: true,
    code: '<a:zenith_sparkles_pink:129841870100000011>',
    category: 'badges',
    description: 'Animated Pink Star Sparkles',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EB459E" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.2 1.2L3 12l5.8 1.9a2 2 0 0 1 1.2 1.2L12 21l1.9-5.8a2 2 0 0 1 1.2-1.2L21 12l-5.8-1.9a2 2 0 0 1-1.2-1.2z"/></svg>'
  },
  {
    id: '129841870100000012',
    name: 'zenith_cloud_node',
    animated: true,
    code: '<a:zenith_cloud_node:129841870100000012>',
    category: 'system',
    description: 'HeavenCloud High Speed Edge Relay',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
  },
  {
    id: '129841870100000013',
    name: 'zenith_sync_gateway',
    animated: true,
    code: '<a:zenith_sync_gateway:129841870100000013>',
    category: 'system',
    description: 'Realtime Gateway Shard Synchronization',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#57F287" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
  },
  {
    id: '129841870100000014',
    name: 'zenith_dm_notification',
    animated: false,
    code: '<:zenith_dm_notification:129841870100000014>',
    category: 'system',
    description: 'Instant Member DM Alert Delivery',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
  },
  {
    id: '129841870100000015',
    name: 'zenith_verified_server',
    animated: false,
    code: '<:zenith_verified_server:129841870100000015>',
    category: 'system',
    description: 'Zenith Certified Protected Server',
    svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#5865F2" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>'
  }
];

export const TOTAL_CUSTOM_EMOJIS_COUNT = ZENITH_CUSTOM_EMOJIS.length;
