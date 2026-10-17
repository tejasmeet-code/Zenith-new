import test from 'node:test';
import assert from 'node:assert/strict';
import { ZenithBotEngine } from './botEngine.ts';
import { DEFAULT_ZENITH_CONFIG } from '../data/defaultConfig.ts';

test('ZenithBotEngine initializes with correct owner and defaults', () => {
  const engine = new ZenithBotEngine();
  assert.equal(engine.state.config.ownerId, '1181221352393420856');
  assert.equal(engine.state.config.botName, 'Zenith');
  assert.equal(engine.state.config.defaultPrefix, '.');
  assert.equal(engine.state.musicPlayer.is247, true);
});

test('Prefix and no-prefix command parsing executes correctly', () => {
  const engine = new ZenithBotEngine();

  // Test .help
  const helpWithPrefix = engine.executeCommand('.help');
  assert.ok(helpWithPrefix.embeds && helpWithPrefix.embeds.length > 0);
  assert.ok(helpWithPrefix.embeds[0].title?.includes('Zenith Bot Command Central'));

  // Test slash command /help
  const helpSlash = engine.executeCommand('/help');
  assert.ok(helpSlash.embeds && helpSlash.embeds.length > 0);
  assert.ok(helpSlash.embeds[0].title?.includes('Zenith Bot Command Central'));

  // Test no-prefix help
  const helpNoPrefix = engine.executeCommand('help');
  assert.ok(helpNoPrefix.embeds && helpNoPrefix.embeds.length > 0);
  assert.ok(helpNoPrefix.embeds[0].title?.includes('Zenith Bot Command Central'));
});

test('Music 24/7 toggle works and updates state', () => {
  const engine = new ZenithBotEngine();
  const initial247 = engine.state.musicPlayer.is247;

  const res = engine.executeCommand('.247');
  assert.equal(engine.state.musicPlayer.is247, !initial247);
  assert.ok(res.embeds?.[0].title?.includes('24/7 Mode'));
});

test('Moderation command generates case ID and records proof URL', () => {
  const engine = new ZenithBotEngine();
  const initialCasesCount = engine.state.cases.length;

  const res = engine.executeCommand('.jail @RogueAdmin 24h Mass spam in general');
  assert.equal(engine.state.cases.length, initialCasesCount + 1);

  const newestCase = engine.state.cases[0];
  assert.equal(newestCase.action, 'JAIL');
  assert.ok(newestCase.caseId > 1000);
  assert.ok(res.embeds?.[0].title?.includes('Case #'));
});

test('Economy work command increments wallet credits', () => {
  const engine = new ZenithBotEngine();
  const startingWallet = engine.state.wallet;

  const res = engine.executeCommand('.work');
  assert.ok(engine.state.wallet > startingWallet);
  assert.ok(res.embeds?.[0].description?.includes('Zenith Credits'));
});

test('Owner eval command requires verified owner ID', () => {
  const engine = new ZenithBotEngine();

  // Impostor user attempt
  const rejected = engine.executeCommand('.eval process.exit()', 'Hacker', '123456789');
  assert.ok(rejected.embeds?.[0].title?.includes('Access Denied'));

  // Real owner attempt
  const allowed = engine.executeCommand('.eval client.guilds.cache.size', 'ZenithOwner', DEFAULT_ZENITH_CONFIG.ownerId);
  assert.ok(allowed.embeds?.[0].title?.includes('Owner Eval Execution'));
});

test('Staff help command displays all hierarchy tiers and commands', () => {
  const engine = new ZenithBotEngine();
  const res = engine.executeCommand('.staffhelp');
  assert.ok(res.embeds?.[0].title?.includes('Role Hierarchy'));
  assert.ok(res.embeds?.[0].fields?.some(f => f.name.includes('Bot Owner')));
  assert.ok(res.embeds?.[0].fields?.some(f => f.name.includes('Bot Manager')));
  assert.ok(res.embeds?.[0].fields?.some(f => f.name.includes('Bot Administrator')));
});
