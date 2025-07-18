import { ApiClient } from "@twurple/api";
import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient, ChatMessage } from "@twurple/chat";

import { config } from "../config/env";
import { addPoints } from "./pointsFileManager";

import { pointsCommand } from "./commands/points";
import { gambleCommand } from "./commands/gamble";
import { rollCommand } from "./commands/roll";
import { giveCommand } from "./commands/give";
import { leaderboardCommand } from "./commands/leaderboard";
import { weatherCommand } from "./commands/weather";
import { repoCommand } from "./commands/repo";
import {
  getRandomMessage,
  invalidCommandMessages,
} from "../utils/invalidMessages";
import { timeCommand } from "./commands/time";
import { RouletteGame } from "./games/roulette";
import { placeRouletteBetCommand } from "./commands/placeRouletteBet";
import { COMMANDS_VALUES } from "../constant";
import { shoutoutCommand } from "./commands/shoutout";
import { goodIdeasCommand } from "./commands/goodideas";
import { lurkCommand } from "./commands/lurk";
import { unlurkCommand } from "./commands/unlurk";

const authProvider = new StaticAuthProvider(
  config.TWITCH_BOT_CLIENT_ID,
  config.TWITCH_BOT_ACCESS_TOKEN
);

export const chatClient = new ChatClient({
  authProvider,
  channels: [config.TWITCH_CHANNEL_NAME],
});

const apiClient = new ApiClient({ authProvider });

const rouletteGame = new RouletteGame(chatClient, config.TWITCH_CHANNEL_NAME);

chatClient.onConnect(() => {
  console.log("Bot connected to Twitch");
});

const activeUsers = new Set<string>();
setInterval(() => {
  activeUsers.forEach((user) => addPoints(user, 5));
  if (activeUsers.size > 0) {
    console.log(
      "Awarded points to active users.",
      Array.from(activeUsers).join(", ")
    );
  } else {
    console.log("No active users to award points to.");
  }
  activeUsers.clear();
}, 300_000);

chatClient.onMessage(
  async (channel: string, user: string, text: string, msg: ChatMessage) => {
    activeUsers.add(user);
    console.log(channel, user, text, activeUsers);

    const isMe = user === channel;
    const isCommand = text.startsWith("!");
    const userDisplayName = `@${msg.userInfo.displayName}`;

    if (isCommand) {
      const [command, ...args] = text.toLowerCase().split(" ");

      /**
       * Commands that only I can use
       */
      if (isMe) {
        if (["!so", "!shoutout"].includes(command)) {
          return shoutoutCommand({
            apiClient,
            shoutoutChannel: args[0],
            chatClient,
            channel,
          });
        }
      }

      if (command === "!today") {
        return chatClient.say(channel, COMMANDS_VALUES.today);
      }

      if (command === "!roll") {
        return rollCommand({
          userDisplayName,
          chatClient,
          channel,
          rollType: "roll",
          sides: args[0],
        });
      }
      if (["!dice", "!dics"].includes(command)) {
        return rollCommand({
          userDisplayName,
          chatClient,
          channel,
          rollType: "dice",
          sides: args[0],
        });
      }

      if (command === "!points") {
        return pointsCommand({ user, userDisplayName, chatClient, channel });
      }

      if (command === "!gamble") {
        return gambleCommand({ amount: args[0], user, chatClient, channel });
      }

      if (command === "!roulette") {
        return rouletteGame.startGame();
      }

      if (command === "!r") {
        return placeRouletteBetCommand({
          betType: args[0],
          amount: args[1],
          user,
          chatClient,
          channel,
          rouletteGame,
        });
      }

      if (command === "!give") {
        return giveCommand({
          giver: user,
          receiver: args[0],
          amount: args[1],
          chatClient,
          channel,
        });
      }

      if (command === "!lurk") {
        return lurkCommand({ chatClient, channel, userDisplayName });
      }

      if (command === "!unlurk") {
        return unlurkCommand({ chatClient, channel, userDisplayName });
      }

      if (["!goodideas", "!gi"].includes(command)) {
        return goodIdeasCommand({ chatClient, channel });
      }

      if (["!leaderboard", "!toppoints", "!lb", "!tp"].includes(command)) {
        return leaderboardCommand({ chatClient, channel });
      }

      if (command === "!weather") {
        return weatherCommand({ user, chatClient, channel });
      }

      if (command === "!repo") {
        return repoCommand({ user, chatClient, channel });
      }

      if (["!yt", "!youtube"].includes(command)) {
        return chatClient.say(
          channel,
          `Barry has a YouTube Channel: https://youtube.com/barrymichaeldoyle`
        );
      }

      if (["!gh", "!github"].includes(command)) {
        return chatClient.say(
          channel,
          `Barry has GitHub: https://github.com/barrymichaeldoyle`
        );
      }

      if (["!pp", "!patchpulse"].includes(command)) {
        return chatClient.say(
          channel,
          `Check out Barry's devtool project Patch Pulse: https://github.com/Patch-Pulse/cli (give it a ⭐)`
        );
      }

      if (["!help", "!command"].includes(command)) {
        return chatClient.say(
          channel,
          `@${user} checkout out the commands panel in the about section for a list of commands you can use!`
        );
      }

      if (command === "!time") {
        return timeCommand({ user, chatClient, channel });
      }

      const randomMessage = getRandomMessage(invalidCommandMessages);
      return chatClient.say(channel, `@${user} ${randomMessage}`);
    }
  }
);
