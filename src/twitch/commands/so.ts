import { ChatClient } from "@twurple/chat";
import { ApiClient } from "@twurple/api";

import { getRandomMessage } from "../../utils/invalidMessages";

/**
 * A command for the streamer to shoutout a channel.
 */
export function soCommand({
  apiClient,
  shoutoutChannel,
  chatClient,
  channel,
}: {
  apiClient: ApiClient;
  shoutoutChannel: string;
  chatClient: ChatClient;
  channel: string;
}) {
  apiClient.chat.shoutoutUser(channel, shoutoutChannel);

  // Get a random message and replace the placeholder with the actual channel name
  const randomMessage = getRandomMessage(shoutoutMessages);
  const processedMessage = randomMessage.replace(
    "{shoutoutChannel}",
    shoutoutChannel
  );

  return chatClient.say(channel, processedMessage);
}

const shoutoutMessages = [
  "Go follow {shoutoutChannel} before I roast you for having terrible taste in streamers! 🔥",
  "{shoutoutChannel} is actually decent. Unlike most of you degenerates. Go support them! 💪",
  "Shoutout to {shoutoutChannel}! They're way more entertaining than watching paint dry... unlike this chat. 🎉",
  "Everyone spam {shoutoutChannel} with follows! Do something productive for once! 🔔",
  "Hey {shoutoutChannel}! Thanks for existing so I have someone decent to recommend! ✨",
  "{shoutoutChannel} streams are fire! Go watch them instead of being useless here! 🔥",
  "PSA: {shoutoutChannel} makes content that won't kill your brain cells. Rare find! 🧠",
  "Mandatory shoutout to {shoutoutChannel}! They're carrying the platform while you're all... not. 📺",
  "Go follow {shoutoutChannel} right now! I'm not asking, I'm demanding! 👑",
  "{shoutoutChannel} is proof that good streamers exist. Go support actual talent! 🌟",
  "Shoutout to {shoutoutChannel}! They're the reason Twitch isn't completely hopeless! 🎭",
  "Everyone follow {shoutoutChannel}! They deserve better viewers than the ones here! 😤",
  "Big ups to {shoutoutChannel}! Finally, someone worth watching! 🎬",
  "Go show {shoutoutChannel} some love! They're infinitely more entertaining than your life! 💜",
  "{shoutoutChannel} is carrying the entire platform. The least you can do is follow them! 🏋️",
  "Shoutout to {shoutoutChannel}! They're what peak performance looks like! 🔥",
  "Everyone raid {shoutoutChannel}! Time to witness actual quality content! 🚀",
  "Go support {shoutoutChannel}! They're out here making moves while you're making excuses! 💯",
  "{shoutoutChannel} streams are addictive. Way better than your current bad habits! 🎮",
  "Shoutout to {shoutoutChannel}! They're the main character while you're all NPCs! 🎭",
  "Everyone follow {shoutoutChannel} before I start questioning your life choices! 🔔",
  "Big shoutout to {shoutoutChannel}! They're actually entertaining, imagine that! 🎪",
  "Go support {shoutoutChannel}! They're proof that talent exists somewhere on this platform! ⭐",
  "{shoutoutChannel} is streaming greatness while you're all streaming mediocrity! 📡",
  "Shoutout to {shoutoutChannel}! They're the reason I still believe in humanity! 🙏",
  "Everyone go follow {shoutoutChannel}! Do something right for once in your lives! ✅",
  "Big ups to {shoutoutChannel}! They're carrying harder than your mom carried you! 🎒",
  "Go show {shoutoutChannel} some love! They're actually worth your time! ⏰",
  "{shoutoutChannel} is streaming perfection while you're all streaming chaos! 🎯",
  "Shoutout to {shoutoutChannel}! They're the antidote to boring content! 💊",
  "Everyone support {shoutoutChannel}! They're what success looks like! 🏆",
  "Go follow {shoutoutChannel}! They're the reason the follow button exists! 🔘",
  "Big shoutout to {shoutoutChannel}! They're proof that good things happen to good streamers! 🍀",
  "{shoutoutChannel} is out here being iconic while you're all being... not! 👑",
  "Go support {shoutoutChannel}! They're the diamond in the rough of this platform! 💎",
];
