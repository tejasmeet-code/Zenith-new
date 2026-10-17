import type { DiscordMessage, DiscordEmbed, ModerationCase, StaffMember, TicketSession, ReportItem, BotStaffRole, BotStaffMember } from '../types/index.ts';
import { DEFAULT_ZENITH_CONFIG, INITIAL_MOD_CASES, INITIAL_STAFF_MEMBERS, INITIAL_TICKETS, INITIAL_REPORTS, BOT_STAFF_ROLES, INITIAL_BOT_STAFF } from '../data/defaultConfig.ts';
import { BOT_MODULES } from '../data/modulesData.ts';

export interface BotEngineState {
  config: typeof DEFAULT_ZENITH_CONFIG;
  cases: ModerationCase[];
  staff: StaffMember[];
  botStaffRoles: BotStaffRole[];
  botStaffMembers: BotStaffMember[];
  tickets: TicketSession[];
  reports: ReportItem[];
  wallet: number;
  bank: number;
  snipeCache: {
    author: string;
    content: string;
    channel: string;
    timestamp: string;
  } | null;
  musicPlayer: {
    currentTrack: string;
    artist: string;
    duration: string;
    position: string;
    isPlaying: boolean;
    is247: boolean;
    volume: number;
    bassboost: string;
    loop: boolean;
  };
  serverStats: {
    totalMembers: number;
    onlineMembers: number;
    inVoice: number;
    boostCount: number;
    messagesToday: number;
  };
}

export class ZenithBotEngine {
  public state: BotEngineState;

  constructor() {
    this.state = {
      config: { ...DEFAULT_ZENITH_CONFIG },
      cases: [...INITIAL_MOD_CASES],
      staff: [...INITIAL_STAFF_MEMBERS],
      botStaffRoles: [...BOT_STAFF_ROLES],
      botStaffMembers: [...INITIAL_BOT_STAFF],
      tickets: [...INITIAL_TICKETS],
      reports: [...INITIAL_REPORTS],
      wallet: 1450,
      bank: 8500,
      snipeCache: {
        author: 'SpamUser#1337',
        content: 'Check this link guys: https://free-gift-fake.com (deleted instantly)',
        channel: 'general',
        timestamp: '2 minutes ago'
      },
      musicPlayer: {
        currentTrack: 'Lofi Hip Hop - Chill Beats to Relax/Study',
        artist: 'ChilledCow / Lofi Girl',
        duration: '03:45',
        position: '01:12',
        isPlaying: true,
        is247: true,
        volume: 85,
        bassboost: 'Medium',
        loop: false
      },
      serverStats: {
        totalMembers: 1420,
        onlineMembers: 412,
        inVoice: 38,
        boostCount: 14,
        messagesToday: 3890
      }
    };
  }

  /**
   * Evaluates command input and produces a simulated Discord bot response.
   */
  public executeCommand(rawInput: string, authorName = 'ZenithOwner', authorId = DEFAULT_ZENITH_CONFIG.ownerId): DiscordMessage {
    const trimmed = rawInput.trim();
    const prefix = this.state.config.defaultPrefix;
    let cleanInput = trimmed;

    if (cleanInput.startsWith(prefix)) {
      cleanInput = cleanInput.slice(prefix.length).trim();
    } else if (cleanInput.startsWith('/')) {
      cleanInput = cleanInput.slice(1).trim();
    }

    const parts = cleanInput.split(/\s+/);
    const commandName = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    const isOwner = authorId === this.state.config.ownerId;
    const timestamp = 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. HELP & DISCOVERY
    if (commandName === 'help' || commandName === 'commands') {
      return this.generateHelpMessage(timestamp);
    }

    // 2. BOT STAFF HELP (.staffhelp) & SERVER STAFF HELP (.serverstaffhelp / .modhelp)
    if (commandName === 'staffhelp' || commandName === 'shelp' || commandName === 'botstaffhelp') {
      return this.generateStaffHelpMessage(timestamp);
    }

    if (commandName === 'serverstaffhelp' || commandName === 'modhelp' || commandName === 'moderatorhelp') {
      return this.generateServerStaffHelpMessage(timestamp);
    }

    // 3. PREMIUM HELP (.premiumhelp)
    if (commandName === 'premiumhelp' || commandName === 'phelp') {
      return this.generatePremiumHelpMessage(timestamp);
    }

    // 4. MUSIC COMMANDS (.play, .247, .skip, .stop, .queue, .volume, .bassboost)
    if (['play', 'p', 'music', '247', 'skip', 'stop', 'queue', 'volume', 'bassboost'].includes(commandName)) {
      return this.handleMusicCommands(commandName, args, timestamp);
    }

    // 5. ANTINUKE (.antinuke, .whitelist, .quarantine)
    if (['antinuke', 'an', 'whitelist', 'wl', 'quarantine'].includes(commandName)) {
      return this.handleAntinukeCommands(commandName, args, isOwner, timestamp);
    }

    // 6. AUTOMOD (.automod, .antispam, .antiinvite)
    if (['automod', 'am', 'antispam', 'antiinvite'].includes(commandName)) {
      return this.handleAutomodCommands(commandName, args, timestamp);
    }

    // 7. MODERATION COMMANDS (.warn, .mute, .jail, .unjail, .banrequest, .kick, .ban, .softban, .case, .purge)
    if (['warn', 'mute', 'timeout', 'jail', 'unjail', 'banrequest', 'kick', 'ban', 'softban', 'case', 'purge', 'clear'].includes(commandName)) {
      return this.handleModerationCommands(commandName, args, authorName, authorId, timestamp);
    }

    // 8. STAFF MANAGEMENT (.staffquota, .staffstrike, .staffpromote, .staffdemote, .staffcomplaint, .staffofweek)
    if (['staffquota', 'quota', 'staffstrike', 'staffpromote', 'staffdemote', 'staffcomplaint', 'complain', 'staffofweek', 'sow'].includes(commandName)) {
      return this.handleStaffManagementCommands(commandName, args, authorName, timestamp);
    }

    // 9. STATS & ANALYTICS (.stats, .vctop, .topchat, .setupcounters)
    if (['stats', 'serverstats', 'vctop', 'topchat', 'setupcounters'].includes(commandName)) {
      return this.handleStatsCommands(commandName, timestamp);
    }

    // 10. APPEALS (.appeal, .appeallist)
    if (['appeal', 'appeallist', 'appeals'].includes(commandName)) {
      return this.handleAppealsCommands(commandName, args, authorName, timestamp);
    }

    // 11. REPORTS (.report, .reports)
    if (['report', 'rep', 'reports'].includes(commandName)) {
      return this.handleReportsCommands(commandName, args, authorName, timestamp);
    }

    // 12. LEVELING (.rank, .level, .xp, .leaderboard)
    if (['rank', 'level', 'xp', 'leaderboard', 'top'].includes(commandName)) {
      return this.handleLevelingCommands(commandName, args, authorName, timestamp);
    }

    // 13. WEEKLY / MONTHLY ACHIEVERS (.achievers, .weeklyachievers, .monthlyachievers)
    if (['achievers', 'weeklyachievers', 'monthlyachievers'].includes(commandName)) {
      return this.handleAchieversMessage(commandName, timestamp);
    }

    // 14. MODMAIL (.reply, .areply, .closemail)
    if (['reply', 'r', 'areply', 'closemail', 'modmail'].includes(commandName)) {
      return this.handleModmailCommands(commandName, args, authorName, timestamp);
    }

    // 15. BIRTHDAYS (.setbirthday, .birthdays)
    if (['setbirthday', 'birthday', 'birthdays'].includes(commandName)) {
      return this.handleBirthdayCommands(commandName, args, authorName, timestamp);
    }

    // 16. SNIPE (.snipe, .editsnipe, .reactionsnipe)
    if (['snipe', 's', 'editsnipe', 'reactionsnipe'].includes(commandName)) {
      return this.handleSnipeCommands(commandName, timestamp);
    }

    // 17. LOCK & LOCKDOWN (.lock, .unlock, .lockdown, .slowmode)
    if (['lock', 'unlock', 'lockdown', 'slowmode'].includes(commandName)) {
      return this.handleLockdownCommands(commandName, args, timestamp);
    }

    // 18. ECONOMY (.balance, .bal, .work, .daily, .rob, .deposit, .slots)
    if (['balance', 'bal', 'credits', 'work', 'daily', 'rob', 'deposit', 'dep', 'slots'].includes(commandName)) {
      return this.handleEconomyCommands(commandName, args, timestamp);
    }

    // 19. BOT STAFF / OWNER COMMANDS (.botstaff, .serverlist, .eval, .blacklist, .gban, etc.)
    if (['botstaff', 'serverlist', 'eval', 'blacklist', 'leaveserver', 'globalban', 'gban', 'globalunban', 'botbroadcast', 'guildinfo', 'premiumgrant', 'botreload', 'botstaffquota'].includes(commandName)) {
      return this.handleBotStaffCommands(commandName, args, isOwner, authorId, authorName, timestamp);
    }

    // 20. GAMES & TROLLING (.trivia, .connect4, .fakeban, .roast, .ship, .8ball)
    if (['trivia', 'connect4', 'fakeban', 'roast', 'ship', '8ball'].includes(commandName)) {
      return this.handleGamesAndTrolling(commandName, args, authorName, timestamp);
    }

    // 21. TICKETS (.ticketpanel, .close, .claim, .transcript)
    if (['ticketpanel', 'close', 'claim', 'transcript'].includes(commandName)) {
      return this.handleTicketCommands(commandName, args, authorName, timestamp);
    }

    // DEFAULT UNKNOWN COMMAND
    return {
      id: `msg-${Date.now()}`,
      author: {
        id: 'zenith-bot',
        name: 'Zenith',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        isBot: true,
        badges: ['<:zenith_verified:129841800500000002>']
      },
      content: undefined,
      embeds: [
        {
          title: '<:zenith_warn:129841800100000004> Command Not Recognized',
          description: `Command \`${trimmed}\` was not found. Type \`.help\` to view all 32+ module commands or \`.staffhelp\` for moderator commands.`,
          color: '#FAA61A',
          footer: {
            text: `Zenith Core Engine • Prefix: ${prefix} or /`
          }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  // Helper Generators
  private generateHelpMessage(timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: {
        id: 'zenith-bot',
        name: 'Zenith',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        isBot: true,
        badges: ['<:zenith_verified:129841800500000002>']
      },
      embeds: [
        {
          title: '<:zenith_shield:129841800100000001> Zenith Bot Command Central',
          description: `Welcome to **Zenith** — the ultimate Discord security, music, and server management engine.\n**Owner:** <@${this.state.config.ownerId}> \`[1181221352393420856]\`\n**Default Prefix:** \`.\` (No prefix supported for authorized staff)`,
          color: '#5865F2',
          fields: [
            {
              name: '<a:zenith_disc:129841800200000002> Music & Audio (24/7)',
              value: '`.play <song>` • `.247` • `.skip` • `.queue` • `.volume` • `.bassboost` • `.stop`',
              inline: false
            },
            {
              name: '<:zenith_shield:129841800100000001> Security & Antinuke',
              value: '`.antinuke` • `.whitelist` • `.quarantine` • `.automod` • `.antiinvite` • `.antispam`',
              inline: false
            },
            {
              name: '<:zenith_ban:129841800100000002> Moderation & Cases',
              value: '`.warn` • `.mute` • `.jail` • `.unjail` • `.banrequest` • `.kick` • `.ban` • `.softban` • `.case`',
              inline: false
            },
            {
              name: '<a:zenith_crown:129841800300000001> Staff Governance',
              value: '`.staffquota` • `.staffstrike` • `.staffpromote` • `.staffcomplaint` • `.staffofweek` • `.staffhelp`',
              inline: false
            },
            {
              name: '<:zenith_analytics:129841800400000001> Stats & Achievers (StatBot)',
              value: '`.stats` • `.vctop` • `.topchat` • `.setupcounters` • `.achievers` • `.rank` • `.leaderboard`',
              inline: false
            },
            {
              name: '<a:zenith_coin:129841800600000001> Economy & Entertainment',
              value: '`.balance` • `.work` • `.daily` • `.rob` • `.slots` • `.trivia` • `.connect4` • `.fakeban` • `.ship`',
              inline: false
            },
            {
              name: '<:zenith_ticket:129841800300000004> Utility & Community',
              value: '`.ticketpanel` • `.report` • `.appeal` • `.snipe` • `.lock` • `.remindme` • `.birthdays` • `.premiumhelp`',
              inline: false
            }
          ],
          footer: {
            text: 'All commands support prefix `.` and slash `/` commands • Custom Discord Emojis Active'
          }
        }
      ],
      buttons: [
        { id: 'btn_staffhelp', label: 'Staff Commands', style: 'primary', emoji: '<a:zenith_crown:129841800300000001>' },
        { id: 'btn_premiumhelp', label: 'Premium Perks', style: 'success', emoji: '<a:zenith_sparkles:129841800500000001>' },
        { id: 'btn_music_toggle', label: 'Music Player', style: 'secondary', emoji: '<a:zenith_equalizer:129841800200000001>' }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private generateStaffHelpMessage(timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: {
        id: 'zenith-bot',
        name: 'Zenith Bot Staff Governance',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        isBot: true,
        badges: ['<a:zenith_badge_owner:129841800300000002>', '<a:zenith_crown:129841800300000001>']
      },
      embeds: [
        {
          title: '<a:zenith_crown:129841800300000001> Zenith Bot Staff Directory & Role Hierarchy (.staffhelp)',
          description: `Official command & privilege matrix for the **Zenith Bot Staff Team**.\nEach command clearly indicates which **Bot Staff Role** is authorized to execute it.\n\n*Looking for Server Staff / Moderation commands in this guild? Run \`.serverstaffhelp\`.*`,
          color: '#ED4245',
          fields: [
            {
              name: '<a:zenith_badge_owner:129841800300000002> [Bot Owner Role (1181221352393420856)]',
              value: '• `.eval <code>` — Sandboxed Node.js VM expression execution\n• `.botstaff add @user <role>` — Appoint a new Bot Staff member\n• `.botstaff remove @user` — Revoke Bot Staff permissions from user\n• `.botstaff setrole @user <role>` — Change Bot Staff tier assignment\n• `.leaveserver <guildId>` — Force Zenith to leave unauthorized guild\n• `.deploybot` — Trigger hot reload or cloud deployment update',
              inline: false
            },
            {
              name: '👑 [Bot Manager Role & Above]',
              value: '• `.botbroadcast <message>` — Global system announcement to all 1,420 guilds\n• `.premiumgrant <guildId> <tier>` — Authorize Zenith Premium Diamond tier\n• `.botreload [module]` — Real-time hot module reload without restart\n• `.botstaff list` — View all active Bot Staff team members and roles\n• `.botstaff roles` — View all configured Bot Staff roles & permissions',
              inline: false
            },
            {
              name: '🛡️ [Bot Administrator Role & Above]',
              value: '• `.globalban` / `.gban @user <reason>` — Network-wide ban across all guilds\n• `.globalunban <userId>` — Revoke network-wide global ban\n• `.guildinfo <guildId>` — Deep security inspection of connected guild\n• `.botstats` — Bot infrastructure telemetry, shards, RAM, Lavalink nodes\n• `.blacklist <add/remove> <id>` — Global entity blacklist from Zenith',
              inline: false
            },
            {
              name: '🔰 [Bot Senior Mod Role & Above]',
              value: '• `.triagereports` — Review escalated player reports from all server guilds\n• `.appeallist` — Inspect global ban & punishment appeal cases\n• `.userlookup <userId>` — Global audit history for cross-server infractions',
              inline: false
            },
            {
              name: '💬 [Bot Support Role & Above]',
              value: '• `.modmail reply <message>` — Send official support reply into member DM\n• `.botstaffquota` — Check weekly bot support & triage quota progress\n• `.supportcases` — View open technical support tickets in Zenith HQ',
              inline: false
            }
          ],
          footer: {
            text: 'Zenith Internal Staff Team • Bot Owner ID: 1181221352393420856'
          }
        }
      ],
      buttons: [
        { id: 'btn_botstaff_list', label: 'Bot Staff Members', style: 'primary', emoji: '<a:zenith_badge_owner:129841800300000002>' },
        { id: 'btn_botstaff_roles', label: 'Bot Staff Roles', style: 'secondary', emoji: '<a:zenith_crown:129841800300000001>' },
        { id: 'btn_serverstaff_help', label: 'Server Staff Commands (.serverstaffhelp)', style: 'success', emoji: '<:zenith_shield:129841800100000001>' }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private generateServerStaffHelpMessage(timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: {
        id: 'zenith-bot',
        name: 'Zenith Server Moderation',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        isBot: true,
        badges: ['<:zenith_shield:129841800100000001>']
      },
      embeds: [
        {
          title: '<:zenith_shield:129841800100000001> Zenith Server Staff & Moderator Commands (.serverstaffhelp)',
          description: `Commands for server moderators and administrators in the current Discord guild.`,
          color: '#5865F2',
          fields: [
            {
              name: '🔰 Junior Moderator (Server)',
              value: '• `.warn @user <reason> [proof]` — Issues logged warning with user DM\n• `.mute @user <time> <reason>` — Applies Discord timeout API\n• `.banrequest @user <reason> <proof>` — Proposes ban for Senior Mod approval\n• `.slowmode <seconds>` • `.lock` • `.unlock`',
              inline: false
            },
            {
              name: '🛡️ Senior Moderator (Server)',
              value: '• `.kick @user [reason]`\n• `.ban @user [time] <reason> [proof]`\n• `.softban @user <reason>` — Bans & instantly unbans to wipe 7 days messages\n• `.jail @user <time> <reason>` — Strips roles, isolates to #jail channel\n• `.unjail @user` • `.purge <1-100>` • `.appeallist`',
              inline: false
            },
            {
              name: '👑 Server Administrator & Management',
              value: '• `.staffquota [@staff]` — Inspect weekly staff quota progress\n• `.staffstrike @staff <reason> [proof]` — Issues formal strike (3 strikes = demote)\n• `.staffpromote @staff` / `.staffdemote @staff`\n• `.lockdown` — Emergency locks all public channels\n• `.ticketpanel` • `.setupcounters` • `.whitelist @user`',
              inline: false
            }
          ],
          footer: {
            text: 'Server staff management active in this guild • For Bot Staff, run .staffhelp'
          }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private generatePremiumHelpMessage(timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: {
        id: 'zenith-bot',
        name: 'Zenith Premium',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        isBot: true,
        badges: ['<a:zenith_sparkles:129841800500000001>']
      },
      embeds: [
        {
          title: '<a:zenith_sparkles:129841800500000001> Zenith Premium Tiers & Privileges (.premiumhelp)',
          description: `**Server Status:** <a:zenith_sparkles:129841800500000001> **Zenith Diamond Ultra (Active)**\nYour server enjoys unmetered enterprise privileges and prioritized gateway shards.`,
          color: '#EB459E',
          fields: [
            {
              name: '💎 24/7 Dedicated Voice Connection',
              value: 'Music engine remains persistently in voice channels even when empty with lossless 320kbps audio.',
              inline: false
            },
            {
              name: '🛡️ Enterprise Antinuke Defense Speed',
              value: 'Sub-50ms trigger response rate with auto-snapshot rollbacks and unlimited whitelist slots.',
              inline: false
            },
            {
              name: '📊 Unmetered StatBot Analytics',
              value: 'Realtime member voice metrics, 30-day chat velocity heatmaps, and custom animated counter channels.',
              inline: false
            },
            {
              name: '🎨 Custom Bot Branding & Emojis',
              value: 'Custom embed hex accents, custom avatar cards, and dedicated DM dispatch priority.',
              inline: false
            }
          ],
          footer: {
            text: 'Premium License Valid Through 2028 • Hosted on HeavenCloud'
          }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  // Module Handlers
  private handleMusicCommands(cmd: string, args: string[], timestamp: string): DiscordMessage {
    if (cmd === '247') {
      this.state.musicPlayer.is247 = !this.state.musicPlayer.is247;
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Music', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: `<a:zenith_equalizer:129841800200000001> 24/7 Mode ${this.state.musicPlayer.is247 ? 'Enabled' : 'Disabled'}`,
            description: `Zenith will ${this.state.musicPlayer.is247 ? '**permanently stay** in your voice channel 24/7 without disconnecting.' : 'now leave when the channel is empty.'}`,
            color: this.state.musicPlayer.is247 ? '#57F287' : '#FAA61A',
            footer: { text: '24/7 Lavalink v4 Audio Engine' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    if (cmd === 'play' || cmd === 'p') {
      const query = args.join(' ') || 'Lofi Chill Hip Hop - Deep Study Mix';
      this.state.musicPlayer.currentTrack = query;
      this.state.musicPlayer.isPlaying = true;
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Music', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_disc:129841800200000002> Now Playing',
            description: `**[${this.state.musicPlayer.currentTrack}](https://discord.gg/zenith)**\n\n\`01:12\` ▬▬▬▬▬▬🔘▬▬▬▬ \`03:45\`\n\n<a:zenith_equalizer:129841800200000001> **Status:** Playing | **24/7 Lock:** ${this.state.musicPlayer.is247 ? 'ON' : 'OFF'}\n<:zenith_volume:129841800200000004> **Volume:** ${this.state.musicPlayer.volume}% | **BassBoost:** ${this.state.musicPlayer.bassboost}`,
            color: '#5865F2',
            thumbnail: { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80' },
            footer: { text: 'Requested by ZenithOwner • 320kbps Lavalink Stream' }
          }
        ],
        buttons: [
          { id: 'btn_music_pause', label: this.state.musicPlayer.isPlaying ? 'Pause' : 'Resume', style: 'secondary', emoji: '<:zenith_play:129841800200000003>' },
          { id: 'btn_music_skip', label: 'Skip', style: 'secondary' },
          { id: 'btn_music_stop', label: 'Stop', style: 'danger' },
          { id: 'btn_music_247', label: '24/7 Lock', style: this.state.musicPlayer.is247 ? 'success' : 'secondary', emoji: '<a:zenith_equalizer:129841800200000001>' }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // Default music status / queue
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Music', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_equalizer:129841800200000001> Zenith Audio Status & Queue',
          description: `**Now Playing:** \`${this.state.musicPlayer.currentTrack}\`\n**Channel:** 🎙️ General Voice • **24/7 Stay Alive:** ${this.state.musicPlayer.is247 ? '<:zenith_online:129841800700000001> ACTIVE' : 'OFF'}\n**Queue (2 Tracks):**\n1. *Synthwave Cyber City* [04:12]\n2. *Ambient Rain & Thunder Piano* [08:30]`,
          color: '#5865F2',
          footer: { text: 'Type .play <song> to queue more tracks' }
        }
      ],
      buttons: [
        { id: 'btn_music_skip', label: 'Skip Track', style: 'primary' },
        { id: 'btn_music_stop', label: 'Clear Queue', style: 'danger' }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleAntinukeCommands(cmd: string, args: string[], isOwner: boolean, timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Antinuke', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_shield:129841800100000001> Zenith Antinuke Security Matrix',
          description: `Server defense is **FULLY ACTIVE**. Rogue admins and bot raids will be intercepted instantly.`,
          color: '#5865F2',
          fields: [
            { name: '<:zenith_ban:129841800100000002> Mass Ban Tripwire', value: 'Threshold: 3 bans in 10s -> Auto-Quarantine & Demote', inline: true },
            { name: '<:zenith_lock:129841800100000005> Channel / Role Guard', value: 'Threshold: 2 deletions -> Auto-Restore snapshot', inline: true },
            { name: '<:zenith_warn:129841800100000004> Bot Addition Guard', value: 'Unauthorized bot joins -> Instant kick', inline: true },
            { name: '<a:zenith_badge_owner:129841800300000002> Whitelist Owner', value: `<@${this.state.config.ownerId}> (Immune)`, inline: true }
          ],
          footer: { text: 'Enterprise Antinuke System Active' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleAutomodCommands(cmd: string, args: string[], timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Automod', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_warn:129841800100000004> Discord Native & Zenith Automod Rules',
          description: `All automod filters are active and enforcing server rules in real-time.`,
          color: '#FAA61A',
          fields: [
            { name: 'Anti-Discord Invites', value: '<:zenith_online:129841800700000001> Enabled (Deletes message & Warns user)', inline: true },
            { name: 'Anti-Spam & Duplicates', value: '<:zenith_online:129841800700000001> Enabled (5 msgs in 3s max)', inline: true },
            { name: 'Mass Mention Limiter', value: '<:zenith_online:129841800700000001> Limit: 4 mentions max', inline: true },
            { name: 'Phishing Filter', value: '<:zenith_online:129841800700000001> Scans against 25,000+ known domains', inline: true }
          ],
          footer: { text: 'Synced with Discord Native Automod Rules' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleModerationCommands(cmd: string, args: string[], modName: string, modId: string, timestamp: string): DiscordMessage {
    const targetUser = args[0] || '@Offender';
    const reason = args.slice(1).join(' ') || 'Violating server rules';
    const newCaseId = this.state.cases.length > 0 ? Math.max(...this.state.cases.map(c => c.caseId)) + 1 : 1001;

    let action: ModerationCase['action'] = 'WARN';
    let color = '#FAA61A';
    let emoji = '<:zenith_warn:129841800100000004>';

    if (cmd === 'jail' || cmd === 'prison') {
      action = 'JAIL';
      color = '#FEE75C';
      emoji = '<:zenith_jail:129841800100000003>';
    } else if (cmd === 'mute' || cmd === 'timeout') {
      action = 'MUTE';
      color = '#FAA61A';
      emoji = '<:zenith_warn:129841800100000004>';
    } else if (cmd === 'ban' || cmd === 'kick' || cmd === 'softban') {
      action = cmd.toUpperCase() as any;
      color = '#ED4245';
      emoji = '<:zenith_ban:129841800100000002>';
    } else if (cmd === 'banrequest') {
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Ban Request Queue', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_ban:129841800100000002> Ban Request Submitted (Junior Staff)',
            description: `A junior staff member has submitted a ban proposal for Senior Staff review.`,
            color: '#ED4245',
            fields: [
              { name: 'Target User', value: targetUser, inline: true },
              { name: 'Requested By', value: modName, inline: true },
              { name: 'Reason', value: reason, inline: false },
              { name: 'Proof', value: '[Click to inspect attached proof](https://cdn.discordapp.com/attachments/proof-req.png)', inline: false }
            ],
            footer: { text: 'Senior Moderators: Click button below to accept or reject' }
          }
        ],
        buttons: [
          { id: `btn_banreq_accept_${newCaseId}`, label: 'Approve & Ban', style: 'danger', emoji: '<:zenith_ban:129841800100000002>' },
          { id: `btn_banreq_deny_${newCaseId}`, label: 'Reject Proposal', style: 'secondary' }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    const newCase: ModerationCase = {
      caseId: newCaseId,
      userId: '129840000000000001',
      userName: targetUser.replace('@', ''),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      moderatorId: modId,
      moderatorName: modName,
      action,
      reason,
      proofUrl: 'https://cdn.discordapp.com/attachments/proof-case.png',
      duration: action === 'JAIL' || action === 'MUTE' ? '24 Hours' : undefined,
      timestamp,
      active: true
    };

    this.state.cases.unshift(newCase);

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Moderation', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: `${emoji} Moderation Action Applied | Case #${newCaseId}`,
          description: `**Target:** ${targetUser}\n**Action:** \`${action}\`\n**Moderator:** ${modName}\n**Reason:** ${reason}\n\n*Direct Message receipt dispatched to user with appeal instructions.*`,
          color,
          fields: [
            { name: 'Case ID', value: `#${newCaseId}`, inline: true },
            { name: 'Proof Attached', value: '[Inspect Proof Attachment](https://cdn.discordapp.com/attachments/proof-case.png)', inline: true },
            { name: 'DM Status', value: '<:zenith_online:129841800700000001> Delivered to User DM', inline: true }
          ],
          footer: { text: `Zenith Audit Trail • Case #${newCaseId}` }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleStaffManagementCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    if (cmd === 'staffquota' || cmd === 'quota') {
      const staffList = this.state.staff.map(s => {
        const quotaIcon = s.quotaMet ? '<:zenith_quota:129841800300000003>' : '<:zenith_warn:129841800100000004>';
        return `${quotaIcon} **${s.name}** [${s.tier}]\nMessages: \`${s.weeklyMessages}/350\` • Tickets: \`${s.weeklyTickets}/10\` • VC: \`${s.weeklyVcMinutes}/180m\` • Strikes: \`${s.strikes}/3\``;
      }).join('\n\n');

      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Staff Quota Tracker', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_crown:129841800300000001> Weekly Staff Quota Progress',
            description: `Active quota period resets Sunday 23:59 UTC.\n\n${staffList}`,
            color: '#5865F2',
            footer: { text: 'Minimum requirements: 350 msgs • 10 tickets • 180 min voice' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    if (cmd === 'staffofweek' || cmd === 'sow') {
      const topStaff = this.state.staff.find(s => s.isStaffOfWeek) || this.state.staff[0];
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Staff Governance', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_crown:129841800300000001> Staff of the Week Announcement',
            description: `Congratulations to **${topStaff.name}** for exemplary dedication to server moderation and community support!\n\n<:zenith_quota:129841800300000003> **Messages Logged:** \`${topStaff.weeklyMessages}\`\n<:zenith_ticket:129841800300000004> **Tickets Claimed & Resolved:** \`${topStaff.weeklyTickets}\`\n<:zenith_mic:129841800400000003> **Voice Activity:** \`${Math.round(topStaff.weeklyVcMinutes / 60)}h ${topStaff.weeklyVcMinutes % 60}m\``,
            color: '#FEE75C',
            thumbnail: { url: topStaff.avatar },
            footer: { text: 'Staff of the Week receives +5,000 Zenith Credits & Hall of Fame Badge' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Staff', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_crown:129841800300000001> Staff Action Logged',
          description: `Staff command executed by **${authorName}**. Action recorded in the staff ledger.`,
          color: '#5865F2'
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleStatsCommands(cmd: string, timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith StatBot Analytics', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_analytics:129841800400000001> Server Analytics & StatBot Metrics',
          description: `Real-time activity analytics powered by the Zenith StatBot engine.`,
          color: '#5865F2',
          fields: [
            { name: '👥 Total Members', value: `\`${this.state.serverStats.totalMembers.toLocaleString()}\``, inline: true },
            { name: '<:zenith_online:129841800700000001> Online Now', value: `\`${this.state.serverStats.onlineMembers.toLocaleString()}\``, inline: true },
            { name: '<:zenith_mic:129841800400000003> Active in VC', value: `\`${this.state.serverStats.inVoice}\` members`, inline: true },
            { name: '<a:zenith_sparkles:129841800500000001> Server Boosts', value: `Level 3 (\`${this.state.serverStats.boostCount}\` Boosts)`, inline: true },
            { name: '<a:zenith_flame:129841800400000002> Messages Today', value: `\`${this.state.serverStats.messagesToday.toLocaleString()}\` msgs`, inline: true },
            { name: '⏱️ Voice Hours Logged', value: '`184.5 Hours` this week', inline: true }
          ],
          footer: { text: 'Automated Counter Channels Refresh Every 10 Minutes' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleAppealsCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    const caseId = args[0] || '1043';
    const explanation = args.slice(1).join(' ') || 'I sincerely apologize for the spam, my account was briefly compromised.';

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Appeals Portal', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_ticket:129841800300000004> Moderation Appeal Submitted',
          description: `Your appeal for **Case #${caseId}** has been dispatched to Senior Staff for review.`,
          color: '#5865F2',
          fields: [
            { name: 'Appellant', value: authorName, inline: true },
            { name: 'Case Reference', value: `#${caseId}`, inline: true },
            { name: 'Submitted Explanation', value: explanation, inline: false },
            { name: 'Status', value: '<a:zenith_loading:129841800700000002> Under Review by Senior Staff', inline: false }
          ],
          footer: { text: 'You will receive an automated DM when staff make a decision.' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleReportsCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    const targetUser = args[0] || '@Scammer123';
    const reason = args.slice(1).join(' ') || 'Posting malicious links in general chat';

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Reports Desk', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_warn:129841800100000004> Member Report Received with Proof',
          description: `Thank you for keeping the community safe. Staff will triage this report shortly.`,
          color: '#ED4245',
          fields: [
            { name: 'Reported Member', value: targetUser, inline: true },
            { name: 'Reported By', value: authorName, inline: true },
            { name: 'Reason', value: reason, inline: false },
            { name: 'Proof Attachment', value: '[Verified Screenshot Proof](https://cdn.discordapp.com/attachments/proof.png)', inline: false }
          ],
          footer: { text: 'Staff triage channel notified with 1-click Quick Punish buttons' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleLevelingCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Leveling', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_flame:129841800400000002> Zenith Level & Rank Card',
          description: `**Member:** ${authorName}\n**Level:** \`42\` • **Rank:** \`#1\` in Server\n\n\`12,450 XP\` ▬▬▬▬▬▬🔘▬▬▬▬ \`15,000 XP\` (83%)\n\n<a:zenith_sparkles:129841800500000001> **Multiplier:** 2.0x (Server Booster)\n<:zenith_mic:129841800400000003> **Voice XP Earned:** \`4,200 XP\` (7 Hours in VC)`,
          color: '#5865F2',
          thumbnail: { url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
          footer: { text: 'Next Role Reward: Level 50 [Zenith Legend Role]' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleAchieversMessage(cmd: string, timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Achievers', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_crown:129841800300000001> 🏆 Zenith Weekly Community & Staff Achievers',
          description: `Recognizing the most active leaders, talkers, and voice participants of the week!\n*(Staff eligibility in member ranks: Disabled)*`,
          color: '#FEE75C',
          fields: [
            {
              name: '<a:zenith_crown:129841800300000001> Staff of the Week',
              value: `👑 **ZenithOwner** (Owner)\nMessages: \`842\` | Tickets Resolved: \`24\` | Voice: \`10.3h\``,
              inline: false
            },
            {
              name: '<:zenith_mic:129841800400000003> Most Voice Channel Time (Member)',
              value: `🎙️ **AcousticVibes** — \`28 Hours 40 Minutes\` in VC this week!`,
              inline: false
            },
            {
              name: '<a:zenith_flame:129841800400000002> Most Active Chatter (Member)',
              value: `💬 **HyperText** — \`1,894 Messages\` sent in text channels!`,
              inline: false
            }
          ],
          footer: { text: 'Next Achievers broadcast scheduled for Sunday at 23:59 UTC' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleModmailCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    const text = args.join(' ') || 'Hello, thank you for reaching out to the moderation team.';
    const isAnonymous = cmd === 'areply';

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Modmail Relay', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_modmail:129841800700000004> Modmail Dispatch Sent to User DM',
          description: `**Content:** ${text}`,
          color: '#5865F2',
          footer: { text: isAnonymous ? 'Sent anonymously as Zenith Staff' : `Sent by Moderator: ${authorName}` }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleBirthdayCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Birthdays', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_birthday:129841800700000003> Birthday Registered!',
          description: `Your birthday has been stored as **${args[0] || '17/10'}** in Zenith's midnight scheduler.\n\nWhen your special day arrives, Zenith will post a celebratory announcement in <#birthdays> and assign you the exclusive **Birthday Star** role for 24 hours!`,
          color: '#EB459E',
          footer: { text: 'Zenith Birthday System Active' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleSnipeCommands(cmd: string, timestamp: string): DiscordMessage {
    if (!this.state.snipeCache) {
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Snipe', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [{ title: '🔍 No Deleted Messages Found', description: 'There are no recently deleted messages cached in this channel.', color: '#FAA61A' }],
        timestamp,
        channelId: 'commands'
      };
    }

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Snipe Inspector', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '🎯 Sniped Deleted Message',
          description: `**Author:** ${this.state.snipeCache.author}\n**Channel:** #${this.state.snipeCache.channel}\n**Deleted:** ${this.state.snipeCache.timestamp}\n\n**Original Content:**\n\`\`\`\n${this.state.snipeCache.content}\n\`\`\``,
          color: '#5865F2',
          footer: { text: 'Zenith Snipe Ring Buffer' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleLockdownCommands(cmd: string, args: string[], timestamp: string): DiscordMessage {
    const isServerLock = cmd === 'lockdown';
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Lockdown', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_lock:129841800100000005> ' + (isServerLock ? 'Emergency Server Lockdown Imposed' : 'Channel Locked'),
          description: isServerLock
            ? 'All public channels have been locked to `@everyone` to stop raid activity. Only authorized staff may speak.'
            : 'This channel has been locked. Regular members cannot send messages until unlocked.',
          color: '#ED4245',
          footer: { text: 'Type .unlock to lift channel restriction' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleEconomyCommands(cmd: string, args: string[], timestamp: string): DiscordMessage {
    if (cmd === 'work') {
      const earned = Math.floor(Math.random() * 120) + 80;
      this.state.wallet += earned;
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Economy', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_coin:129841800600000001> Work Shift Completed',
            description: `You completed your shift as a Discord Bot Security Engineer and earned **+${earned} Zenith Credits**!\n\n**New Wallet Balance:** \`${this.state.wallet} Credits\``,
            color: '#57F287'
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    if (cmd === 'daily') {
      this.state.wallet += 250;
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Economy', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_coin:129841800600000001> Daily Allowance Claimed',
            description: `You received your daily stipend of **+250 Zenith Credits**!\n\n**Wallet:** \`${this.state.wallet} Credits\` • **Bank:** \`${this.state.bank} Credits\``,
            color: '#57F287'
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Virtual Bank', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_bank:129841800600000002> Zenith Financial Account',
          description: `**Cash in Wallet:** \`${this.state.wallet.toLocaleString()} Credits\`\n<:zenith_bank:129841800600000002> **Bank Vault:** \`${this.state.bank.toLocaleString()} Credits\`\n**Net Worth:** \`${(this.state.wallet + this.state.bank).toLocaleString()} Credits\``,
          color: '#5865F2',
          footer: { text: 'Type .deposit all to store money securely from robbers' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleBotStaffCommands(
    cmd: string,
    args: string[],
    isOwner: boolean,
    authorId: string,
    authorName: string,
    timestamp: string
  ): DiscordMessage {
    // Check if author is Bot Staff
    const staffMember = this.state.botStaffMembers.find(m => m.userId === authorId);
    const isBotStaff = isOwner || !!staffMember;
    const authorTier = isOwner ? 'Bot Owner' : (staffMember?.tier || 'None');

    // 1. EVAL: Strictly Bot Owner
    if (cmd === 'eval') {
      if (!isOwner) {
        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Security', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [{ title: '<:zenith_ban:129841800100000002> Access Denied', description: 'The `.eval` command is strictly restricted to the Zenith Bot Owner (`1181221352393420856`).', color: '#ED4245' }],
          timestamp,
          channelId: 'commands'
        };
      }
      const code = args.join(' ') || 'client.guilds.cache.size';
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Owner Terminal', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_badge_owner:129841800300000002> Owner Eval Execution',
            description: `**Expression:**\n\`\`\`js\n${code}\n\`\`\`\n**Result:**\n\`\`\`js\n${code.includes('guild') ? '1,420 guilds connected | Shard 0/1 Online' : 'Executed in 0.28ms [PROCESSED_CLEAN]'}\n\`\`\``,
            color: '#57F287',
            footer: { text: `Executed by Bot Owner: ${DEFAULT_ZENITH_CONFIG.ownerId}` }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 2. BOT STAFF MANAGEMENT: .botstaff <roles|list|add|remove|setrole>
    if (cmd === 'botstaff') {
      const sub = (args[0] || 'list').toLowerCase();

      // .botstaff roles
      if (sub === 'roles') {
        const rolesList = this.state.botStaffRoles.map(r => {
          return `**${r.name}** [${r.tier}]\n• **Description:** ${r.description}\n• **Assigned Members:** \`${r.membersCount}\`\n• **Permissions:** \`${r.permissions.join(', ')}\``;
        }).join('\n\n');

        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Bot Staff Registry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [
            {
              title: '<a:zenith_crown:129841800300000001> Zenith Bot Staff Roles Directory',
              description: `Here are all official bot staff roles configured in the Zenith core database:\n\n${rolesList}`,
              color: '#5865F2',
              footer: { text: 'To assign roles, use .botstaff add @user <roleName>' }
            }
          ],
          timestamp,
          channelId: 'commands'
        };
      }

      // .botstaff list
      if (sub === 'list') {
        const staffList = this.state.botStaffMembers.map(m => {
          return `• **${m.username}** (\`${m.userId}\`)\n  Role: **${m.roleName}** [${m.tier}] | Assigned by: \`${m.assignedBy}\`\n  Weekly Audits: \`${m.weeklyGuildAudits}\` | Resolved Tickets: \`${m.weeklyHandledTickets}\``;
        }).join('\n\n');

        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Bot Staff Registry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [
            {
              title: '<a:zenith_badge_owner:129841800300000002> Zenith Official Bot Staff Team',
              description: `Total Appointed Bot Staff: **${this.state.botStaffMembers.length} Members**\n\n${staffList}`,
              color: '#5865F2',
              footer: { text: 'To add staff, Owner or Manager runs .botstaff add @user <roleName>' }
            }
          ],
          timestamp,
          channelId: 'commands'
        };
      }

      // .botstaff add @user <roleName>
      if (sub === 'add') {
        if (!isOwner && authorTier !== 'Bot Manager') {
          return {
            id: `msg-${Date.now()}`,
            author: { id: 'zenith-bot', name: 'Zenith Security', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
            embeds: [{ title: '<:zenith_ban:129841800100000002> Permission Denied', description: 'Only the **Bot Owner** or a **Bot Manager** can appoint new Bot Staff members.', color: '#ED4245' }],
            timestamp,
            channelId: 'commands'
          };
        }

        const targetUser = args[1] || '@NewStaffMember';
        const roleQuery = args.slice(2).join(' ') || 'Bot Support';
        const cleanName = targetUser.replace('@', '');
        const role = this.state.botStaffRoles.find(r => r.name.toLowerCase().includes(roleQuery.toLowerCase()) || r.tier.toLowerCase().includes(roleQuery.toLowerCase())) || this.state.botStaffRoles[4];

        const newStaff: BotStaffMember = {
          userId: `1298${Math.floor(Math.random() * 899999 + 100000)}000000`,
          username: cleanName,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
          roleId: role.id,
          roleName: role.name,
          tier: role.tier,
          assignedAt: new Date().toISOString().split('T')[0],
          assignedBy: authorName,
          strikes: 0,
          weeklyHandledTickets: 0,
          weeklyGuildAudits: 0,
          notes: `Appointed by ${authorName} on ${new Date().toLocaleDateString()}`
        };

        this.state.botStaffMembers.push(newStaff);
        role.membersCount += 1;

        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Bot Staff Registry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [
            {
              title: '<a:zenith_crown:129841800300000001> Bot Staff Member Appointed',
              description: `Successfully granted **${role.name}** permissions to **${targetUser}**.\n\n• **Assigned Role:** \`${role.name}\`\n• **Tier:** \`${role.tier}\`\n• **Permissions:** \`${role.permissions.join(', ')}\`\n• **Appointed By:** ${authorName}`,
              color: '#57F287',
              footer: { text: 'New bot staff member synced to global network' }
            }
          ],
          timestamp,
          channelId: 'commands'
        };
      }

      // .botstaff remove @user
      if (sub === 'remove') {
        if (!isOwner && authorTier !== 'Bot Manager') {
          return {
            id: `msg-${Date.now()}`,
            author: { id: 'zenith-bot', name: 'Zenith Security', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
            embeds: [{ title: '<:zenith_ban:129841800100000002> Permission Denied', description: 'Only the **Bot Owner** or a **Bot Manager** can revoke Bot Staff permissions.', color: '#ED4245' }],
            timestamp,
            channelId: 'commands'
          };
        }

        const targetUser = args[1] || '';
        const cleanTarget = targetUser.replace('@', '');
        const index = this.state.botStaffMembers.findIndex(m => m.username.toLowerCase() === cleanTarget.toLowerCase() || m.userId === cleanTarget);

        if (index === -1) {
          return {
            id: `msg-${Date.now()}`,
            author: { id: 'zenith-bot', name: 'Zenith Bot Staff Registry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
            embeds: [{ title: '<:zenith_warn:129841800100000004> Member Not Found', description: `Could not find a Bot Staff member matching \`${targetUser}\`. Run \`.botstaff list\` to see all staff.`, color: '#FAA61A' }],
            timestamp,
            channelId: 'commands'
          };
        }

        const removed = this.state.botStaffMembers.splice(index, 1)[0];
        const role = this.state.botStaffRoles.find(r => r.id === removed.roleId);
        if (role && role.membersCount > 0) role.membersCount -= 1;

        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Bot Staff Registry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [
            {
              title: '<:zenith_ban:129841800100000002> Bot Staff Member Removed',
              description: `Revoked all Bot Staff permissions and roles from **${removed.username}** (\`${removed.userId}\`).`,
              color: '#ED4245',
              footer: { text: `Action authorized by ${authorName}` }
            }
          ],
          timestamp,
          channelId: 'commands'
        };
      }
    }

    // 3. BOT STAFF QUOTA (.botstaffquota)
    if (cmd === 'botstaffquota') {
      const quotaRows = this.state.botStaffMembers.map(m => {
        return `• **${m.username}** [${m.tier}]\n  Tickets Answered: \`${m.weeklyHandledTickets}/20\` • Guild Audits: \`${m.weeklyGuildAudits}/5\` • Strikes: \`${m.strikes}/3\``;
      }).join('\n\n');

      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Bot Staff Governance', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_crown:129841800300000001> Zenith Bot Staff Weekly Quotas',
            description: `Performance metrics for the internal Zenith bot support and administration team:\n\n${quotaRows}`,
            color: '#5865F2',
            footer: { text: 'Weekly bot staff quota resets Sunday at 23:59 UTC' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 4. GLOBAL BAN (.globalban / .gban)
    if (cmd === 'globalban' || cmd === 'gban') {
      if (!isOwner && !['Bot Manager', 'Bot Admin'].includes(authorTier)) {
        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Global Defense', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [{ title: '<:zenith_ban:129841800100000002> Access Denied', description: 'Global ban requires **Bot Administrator** or above.', color: '#ED4245' }],
          timestamp,
          channelId: 'commands'
        };
      }

      const target = args[0] || '@GlobalMaliciousActor';
      const reason = args.slice(1).join(' ') || 'Cross-server raiding and malicious phishing link distribution';

      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Global Defense Matrix', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_ban:129841800100000002> Network-Wide Global Ban Executed',
            description: `**Offender:** ${target}\n**Enforcing Staff:** ${authorName} [${authorTier}]\n**Reason:** ${reason}\n\n<:zenith_shield:129841800100000001> **Scope:** Auto-banned across **1,420 connected Discord guilds**.\n*Suspect placed on permanent global blacklist.*`,
            color: '#ED4245',
            footer: { text: 'Zenith Global Security Network' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 5. BOT BROADCAST (.botbroadcast)
    if (cmd === 'botbroadcast') {
      if (!isOwner && authorTier !== 'Bot Manager') {
        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Security', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [{ title: '<:zenith_ban:129841800100000002> Access Denied', description: 'Global broadcasts require **Bot Manager** role or above.', color: '#ED4245' }],
          timestamp,
          channelId: 'commands'
        };
      }

      const broadcastMsg = args.join(' ') || 'Zenith v2.5.0 update deployed successfully with ultra-low latency Lavalink v4 audio and enhanced antinuke defense.';

      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Global Announcement', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '📢 Zenith Global Network Broadcast Dispatched',
            description: `**Broadcast Message:**\n>>> ${broadcastMsg}\n\n<:zenith_online:129841800700000001> **Delivered to:** 1,420 Guild Notification Channels\n**Authorized by:** ${authorName} [${authorTier}]`,
            color: '#5865F2',
            footer: { text: 'Zenith Broadcast Protocol • All Guilds Notified' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 6. GUILD INFO (.guildinfo)
    if (cmd === 'guildinfo') {
      const guildId = args[0] || '129840000000000000';
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Bot Staff Telemetry', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_analytics:129841800400000001> Guild Telemetry Inspection',
            description: `**Guild Name:** Zenith Official HQ (\`${guildId}\`)\n**Owner ID:** \`${BOT_OWNER_ID}\`\n**Members:** 5,200 (Online: 1,840)\n**Antinuke Shield:** <span className="text-[#57f287]">ACTIVE</span>\n**Music 24/7 Node:** Connected (Lavalink Node #1)\n**Tier:** Zenith Diamond Ultra`,
            color: '#5865F2',
            footer: { text: `Inspected by Bot Staff: ${authorName}` }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 7. PREMIUM GRANT (.premiumgrant)
    if (cmd === 'premiumgrant') {
      if (!isOwner && authorTier !== 'Bot Manager') {
        return {
          id: `msg-${Date.now()}`,
          author: { id: 'zenith-bot', name: 'Zenith Security', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
          embeds: [{ title: '<:zenith_ban:129841800100000002> Access Denied', description: 'Granting premium licenses requires **Bot Manager** role or above.', color: '#ED4245' }],
          timestamp,
          channelId: 'commands'
        };
      }

      const guildId = args[0] || '129840000000000000';
      const tier = args[1] || 'Diamond Ultra';

      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Premium Licensing', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_sparkles:129841800500000001> Zenith Premium License Granted',
            description: `Guild \`${guildId}\` has been elevated to **Zenith ${tier}**.\n\n• **24/7 Audio:** Unlocked\n• **Priority Gateway Shards:** Assigned\n• **Licensed by:** ${authorName} [${authorTier}]`,
            color: '#EB459E',
            footer: { text: 'License Key Activated • HeavenCloud Database Synced' }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // 8. BOT RELOAD (.botreload)
    if (cmd === 'botreload') {
      const moduleName = args[0] || 'all';
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Core Engine', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '🔄 Bot Modules Hot-Reloaded',
            description: `Successfully reloaded **${moduleName}** modules in **18ms** without dropping any active 24/7 voice connections or ticket states.`,
            color: '#57F287',
            footer: { text: `Hot reload initiated by ${authorName}` }
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    // Default serverlist / botstats
    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Bot Staff', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<a:zenith_badge_owner:129841800300000002> Global Server List & Infrastructure',
          description: `Total Guilds: **1,420** | Total Cached Members: **482,900**\n• Shards: **2 Active Shards** (All healthy)\n• Lavalink Node #1: **Online (0.2% CPU, 48 Streams Active)**\n• Database WAL: **Healthy (0 lock waits)**`,
          color: '#5865F2',
          footer: { text: 'Type .staffhelp to view all Bot Staff commands and authorized roles' }
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleGamesAndTrolling(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    if (cmd === 'fakeban') {
      const target = args[0] || '@Friend';
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Moderation', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_ban:129841800100000002> Member Banned from Server',
            description: `**Offender:** ${target}\n**Reason:** *Permanently banned for having questionable taste in memes!*\n\n*(Just kidding, this was a fakeban troll command!)*`,
            color: '#ED4245'
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    if (cmd === 'ship') {
      const u1 = args[0] || 'Zenith';
      const u2 = args[1] || 'Owner';
      const score = 96;
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Love Calculator', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<a:zenith_sparkles:129841800500000001> Love Compatibility Test',
            description: `**${u1}** + **${u2}**\n\n\`💖 96%\` ▬▬▬▬▬▬▬▬▬▬🔘 \`100%\`\n\n*A match made in heaven! Absolutely inseparable connection.*`,
            color: '#EB459E'
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Trivia & Games', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '🎮 Zenith Interactive Trivia',
          description: `**Category:** Technology & Cyber Security\n**Question:** Which port does Discord voice gateway use for UDP voice packet transmission?\n\nClick the correct button below before the 30-second timer runs out!`,
          color: '#5865F2'
        }
      ],
      buttons: [
        { id: 'btn_trivia_a', label: 'A) Port 443', style: 'secondary' },
        { id: 'btn_trivia_b', label: 'B) Port 50000-65535 UDP', style: 'secondary' },
        { id: 'btn_trivia_c', label: 'C) Port 80', style: 'secondary' },
        { id: 'btn_trivia_d', label: 'D) Port 3000', style: 'secondary' }
      ],
      timestamp,
      channelId: 'commands'
    };
  }

  private handleTicketCommands(cmd: string, args: string[], authorName: string, timestamp: string): DiscordMessage {
    if (cmd === 'ticketpanel') {
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Ticket Dispatch', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_ticket:129841800300000004> Zenith Customer Support & Applications',
            description: `Need assistance or want to apply for staff? Select an inquiry category below to open a private ticket with our moderation team.\n\n• **General Support:** Server inquiries, permissions, bots\n• **Staff Application:** Trainee & Moderator applications\n• **Premium / Billing:** License key redemption & perk inquiries\n• **Player Report:** File confidential report with proof attachments`,
            color: '#5865F2',
            footer: { text: 'Tickets are archived with full HTML transcripts upon resolution' }
          }
        ],
        buttons: [
          { id: 'btn_open_ticket_support', label: 'Support Ticket', style: 'primary', emoji: '<:zenith_ticket:129841800300000004>' },
          { id: 'btn_open_ticket_staff', label: 'Staff Application', style: 'secondary', emoji: '<a:zenith_crown:129841800300000001>' },
          { id: 'btn_open_ticket_premium', label: 'Premium Billing', style: 'success', emoji: '<a:zenith_sparkles:129841800500000001>' },
          { id: 'btn_open_ticket_report', label: 'Player Report', style: 'danger', emoji: '<:zenith_warn:129841800100000004>' }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    if (cmd === 'close') {
      return {
        id: `msg-${Date.now()}`,
        author: { id: 'zenith-bot', name: 'Zenith Ticket System', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
        embeds: [
          {
            title: '<:zenith_ticket:129841800300000004> Ticket Marked for Closure',
            description: `This ticket was closed by **${authorName}**.\nFull HTML transcript generated and delivered to user DM and <#transcripts>.\n\n*Channel will delete in 5 seconds.*`,
            color: '#ED4245'
          }
        ],
        timestamp,
        channelId: 'commands'
      };
    }

    return {
      id: `msg-${Date.now()}`,
      author: { id: 'zenith-bot', name: 'Zenith Tickets', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', isBot: true },
      embeds: [
        {
          title: '<:zenith_ticket:129841800300000004> Ticket Claimed',
          description: `**${authorName}** has claimed this ticket. They will be handling your inquiry directly.`,
          color: '#57F287'
        }
      ],
      timestamp,
      channelId: 'commands'
    };
  }
}

export const botEngine = new ZenithBotEngine();
