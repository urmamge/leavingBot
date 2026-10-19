# leavingBot
Bot that sends a discord message whenever someone leaves a server

## Setup

1. In the [Discord developer portal](https://discord.com/developers/applications), open your bot and turn on **Server Members Intent** (Bot tab). Without it Discord never tells the bot when someone leaves.
2. Invite the bot with the **View Channel** and **Send Messages** permissions on the channel you want the messages in.
3. `npm install`
4. Copy `.env.example` to `.env` and fill in `DISCORD_TOKEN` and `LEAVE_CHANNEL_ID`.
5. `npm start`

## Running it on the server

Same as the overwatchbot, on the Oracle VM with pm2. First time:

```
git clone https://github.com/urmamge/leavingBot ~/leavingBot
cd ~/leavingBot && npm install
nano .env   # DISCORD_TOKEN and LEAVE_CHANNEL_ID
pm2 start index.mjs --name leavingbot && pm2 save
```

After pushing changes:

```
cd ~/leavingBot && git pull && npm install && pm2 restart leavingbot
```
