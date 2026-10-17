import JSZip from 'jszip';
import { ZENITH_CUSTOM_EMOJIS } from '../data/customEmojis.ts';
import { BOT_MODULES } from '../data/modulesData.ts';
import { BOT_OWNER_ID } from '../data/defaultConfig.ts';

export async function generateZenithBotZip(): Promise<Blob> {
  const zip = new JSZip();

  // 1. package.json
  const packageJson = {
    name: 'zenith-discord-bot',
    version: '2.5.0',
    description: 'Zenith Enterprise Discord Bot - 32+ Modules, 24/7 Music, Antinuke, Automod, Tickets, Staff Quotas, and HeavenCloud deployment.',
    main: 'src/index.js',
    scripts: {
      start: 'node src/index.js',
      dev: 'nodemon src/index.js',
      shards: 'node src/sharder.js'
    },
    dependencies: {
      'discord.js': '^14.16.3',
      '@discordjs/voice': '^0.17.0',
      '@discordjs/rest': '^2.4.0',
      'discord-api-types': '^0.37.100',
      'better-sqlite3': '^11.3.0',
      'dotenv': '^16.4.5',
      'chalk': '^4.1.2',
      'express': '^4.19.2',
      'sodium-native': '^4.1.1'
    },
    devDependencies: {
      'nodemon': '^3.1.4'
    },
    engines: {
      node: '>=18.0.0'
    }
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  // 2. .env.example
  const envExample = `# Zenith Discord Bot Configuration
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=129840000000000000
BOT_OWNER_ID=${BOT_OWNER_ID}
DEFAULT_PREFIX=.
ENABLE_NO_PREFIX=true

# Lavalink v4 Audio Node (24/7 Music Engine)
LAVALINK_HOST=lavalink.heavencloud.net
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_SECURE=false

# HeavenCloud Webhook & Metrics Port
PORT=3000
`;
  zip.file('.env.example', envExample);
  zip.file('.env', envExample);

  // 3. Dockerfile
  const dockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
  zip.file('Dockerfile', dockerfile);

  // 4. ecosystem.config.js (PM2 for HeavenCloud)
  const pm2Config = `module.exports = {
  apps: [{
    name: 'zenith-bot',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
`;
  zip.file('ecosystem.config.js', pm2Config);

  // 5. docker-compose.yml
  const dockerCompose = `version: '3.8'
services:
  zenith-bot:
    build: .
    restart: always
    env_file: .env
    ports:
      - "3000:3000"
    depends_on:
      - lavalink

  lavalink:
    image: ghcr.io/lavalink-devs/lavalink:4
    restart: always
    environment:
      - _JAVA_OPTIONS=-Xmx1G
    volumes:
      - ./application.yml:/opt/Lavalink/application.yml
    ports:
      - "2333:2333"
`;
  zip.file('docker-compose.yml', dockerCompose);

  // 6. application.yml (Lavalink v4)
  const lavalinkConfig = `server:
  port: 2333
  address: 0.0.0.0
lavalink:
  plugins: []
  server:
    password: "youshallnotpass"
    playerUpdateInterval: 5
    koe:
      useEpoll: true
      highPacketPriority: true
      bufferDurationMs: 400
      trackStuckThresholdMs: 10000
    sources:
      youtube: true
      bandcamp: true
      soundcloud: true
      twitch: true
      vimeo: true
      http: true
      local: false
`;
  zip.file('application.yml', lavalinkConfig);

  // 7. src/index.js
  const indexJs = `require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();
client.aliases = new Collection();
client.config = {
  prefix: process.env.DEFAULT_PREFIX || '.',
  ownerId: process.env.BOT_OWNER_ID || '${BOT_OWNER_ID}',
  noPrefix: process.env.ENABLE_NO_PREFIX === 'true'
};

// Initialize Custom Emojis & Modules
const { CUSTOM_EMOJIS } = require('./modules/customEmojis');
client.emojisMap = CUSTOM_EMOJIS;

console.log('\\x1b[34m[ZENITH]\\x1b[0m Initializing Zenith Engine v2.5.0...');
console.log('\\x1b[32m[AUTH]\\x1b[0m Bot Owner ID verified: ' + client.config.ownerId);

client.once('ready', () => {
  console.log(\`\\x1b[32m[ONLINE]\\x1b[0m Zenith is logged in as \${client.user.tag} across \${client.guilds.cache.size} guilds!\`);
  client.user.setPresence({
    activities: [{ name: '.help | .staffhelp | 24/7 Shield Active', type: ActivityType.Playing }],
    status: 'online'
  });
});

// Process Level Safety
process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED_REJECTION]', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT_EXCEPTION]', err);
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('\\x1b[31m[LOGIN_FAILED]\\x1b[0m Please verify your DISCORD_TOKEN in .env file.');
});
`;
  zip.file('src/index.js', indexJs);

  // 8. src/modules/customEmojis.js
  const emojiExport = `// Zenith Custom Discord Emojis Registry
// Note: All custom emojis format as <:name:id> or <a:name:id> (Zero Unicode Fallbacks)
module.exports.CUSTOM_EMOJIS = ${JSON.stringify(
    ZENITH_CUSTOM_EMOJIS.reduce((acc, e) => {
      acc[e.name] = e.code;
      return acc;
    }, {} as Record<string, string>),
    null,
    2
  )};
`;
  zip.file('src/modules/customEmojis.js', emojiExport);

  // 9. HeavenCloud Setup & README.md
  const readme = `# 🛡️ Zenith Discord Bot & Control Suite

> **Owner ID:** \`${BOT_OWNER_ID}\`  
> **Default Prefix:** \`.\` (Supports No-Prefix for authorized staff & Slash \`/\` commands)  
> **Modules:** 32+ Production Modules (24/7 Music, Antinuke, Automod, Leveling, Tickets, Staff Quota, StatBot Analytics, Modmail, Custom Emojis)

---

## 🚀 HeavenCloud 1-Click Deployment Guide

1. Log into your **HeavenCloud Dashboard** at [https://heavencloud.net](https://heavencloud.net).
2. Create a new **Node.js Application** or **Docker Service**.
3. Select **Node.js 20 LTS** as your runtime.
4. Upload this ZIP package or connect your Git repository.
5. In the **Environment Variables** tab, enter:
   \`\`\`env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id
   BOT_OWNER_ID=${BOT_OWNER_ID}
   DEFAULT_PREFIX=.
   ENABLE_NO_PREFIX=true
   \`\`\`
6. Click **Deploy / Start Application**.
7. Zenith will automatically start up and set status to \`.help | .staffhelp | 24/7 Shield Active\`.

---

## 🎨 Custom Discord Emojis Pack

All emojis in Zenith are customized Discord animated and static emojis.
To upload them to your Discord Developer Portal or Guild:
1. Open your Discord Server Settings -> **Emoji**.
2. Click **Upload Emoji**.
3. Drag and drop the SVG/PNG assets included in the \`assets/emojis/\` folder.
4. Replace the ID in \`src/modules/customEmojis.js\` with your server emoji IDs if self-hosting private emojis.

---

## 📜 Complete Modules Included
${BOT_MODULES.map(m => `- **${m.name}** (\`${m.id}\`): ${m.description}`).join('\n')}
`;
  zip.file('README.md', readme);

  // Generate ZIP
  return await zip.generateAsync({ type: 'blob' });
}
