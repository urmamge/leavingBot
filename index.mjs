// Posts a message in LEAVE_CHANNEL_ID whenever someone leaves the server.
// Needs the "Server Members Intent" switched on for the bot in the Discord developer portal.
import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const { DISCORD_TOKEN, LEAVE_CHANNEL_ID } = process.env;
const LEAVE_MESSAGE = process.env.LEAVE_MESSAGE || "{name} has left";

if (!DISCORD_TOKEN || !LEAVE_CHANNEL_ID) {
  console.error("Set DISCORD_TOKEN and LEAVE_CHANNEL_ID in .env (see .env.example)");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, (c) => console.log(`Logged in as ${c.user.tag}`));

client.on(Events.GuildMemberRemove, async (member) => {
  const channel = await client.channels.fetch(LEAVE_CHANNEL_ID).catch(() => null);
  if (!channel?.isTextBased() || channel.guildId !== member.guild.id) return;

  const text = LEAVE_MESSAGE
    .replaceAll("{user}", `<@${member.id}>`)
    .replaceAll("{name}", member.user.username)
    .replaceAll("{count}", String(member.guild.memberCount));

  // The user has already left, so the mention can't ping them anyway; keep it silent regardless.
  await channel.send({ content: text, allowedMentions: { parse: [] } }).catch(console.error);
});

client.login(DISCORD_TOKEN);
