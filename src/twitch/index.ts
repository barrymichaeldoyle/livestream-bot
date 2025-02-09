import { ApiClient } from "@twurple/api";
import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";

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

const authProvider = new StaticAuthProvider(
  config.TWITCH_BOT_CLIENT_ID,
  config.TWITCH_BOT_ACCESS_TOKEN
);

export const chatClient = new ChatClient({
  authProvider,
  channels: [config.TWITCH_CHANNEL_NAME],
});

const apiClient = new ApiClient({ authProvider });

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

chatClient.onMessage(async (channel: string, user: string, text: string) => {
  activeUsers.add(user);
  console.log(channel, user, text, activeUsers);

  const isCommand = text.startsWith("!");

  if (isCommand) {
    const [command, ...args] = text.toLowerCase().split(" ");

    if (command === "!roll") {
      return rollCommand({
        user,
        chatClient,
        channel,
        rollType: "roll",
        sides: args[0],
      });
    }
    if (command === "!dice" || command === "!dics") {
      return rollCommand({
        user,
        chatClient,
        channel,
        rollType: "dice",
        sides: args[0],
      });
    }

    if (command === "!points") {
      return pointsCommand({ user, chatClient, channel });
    }

    if (command === "!gamble") {
      return gambleCommand({ amount: args[0], user, chatClient, channel });
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

    if (["!leaderboard", "!toppoints", "!lb", "!tp"].includes(command)) {
      return leaderboardCommand({ user, chatClient, channel });
    }

    if (command === "!weather") {
      return weatherCommand({ user, chatClient, channel });
    }

    if (command === "!repo") {
      return repoCommand({ user, chatClient, channel });
    }

    if (["!help", "!command"].includes(command)) {
      return chatClient.say(
        channel,
        `@${user} checkout out the commands panel in the about section for a list of commands you can use!`
      );
    }

    const randomMessage = getRandomMessage(invalidCommandMessages);
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }
});
