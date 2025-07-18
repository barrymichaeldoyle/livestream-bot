import { ChatClient } from "@twurple/chat";
import { ApiClient } from "@twurple/api";

import { getRandomMessage } from "../../utils/invalidMessages";
import { TIPSY_PINEAPPLE_EMOTES } from "../tipsy_pineapple_emotes";

/**
 * A command for the streamer to shoutout a channel.
 */
export function shoutoutCommand({
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
  // TODO: Uncomment this when we have a way to get the user's access token
  // apiClient.chat.shoutoutUser(channel, shoutoutChannel);

  // Get a random message and replace the placeholder with the actual channel name
  const randomMessage = getRandomMessage(shoutoutMessages);
  const processedMessage = randomMessage.replace(
    "{shoutoutChannel}",
    shoutoutChannel
  );

  return chatClient.say(channel, processedMessage);
}

const shoutoutMessages = [
  `Go follow {shoutoutChannel} before I roast you for having terrible taste in streamers! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{shoutoutChannel} is actually decent. Unlike most of you degenerates. Go support them! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Shoutout to {shoutoutChannel}! They're way more entertaining than watching paint dry... unlike this chat. ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Everyone spam {shoutoutChannel} with follows! Do something productive for once! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Hey {shoutoutChannel}! Thanks for existing so I have someone decent to recommend! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{shoutoutChannel} streams are fire! Go watch them instead of being useless here! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `PSA: {shoutoutChannel} makes content that won't kill your brain cells. Rare find! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Mandatory shoutout to {shoutoutChannel}! They're carrying the platform while you're all... not. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Go follow {shoutoutChannel} right now! I'm not asking, I'm demanding! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{shoutoutChannel} is proof that good streamers exist. Go support actual talent! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Shoutout to {shoutoutChannel}! They're the reason Twitch isn't completely hopeless! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `Everyone follow {shoutoutChannel}! They deserve better viewers than the ones here! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Big ups to {shoutoutChannel}! Finally, someone worth watching! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Go show {shoutoutChannel} some love! They're infinitely more entertaining than your life! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{shoutoutChannel} is carrying the entire platform. The least you can do is follow them! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Shoutout to {shoutoutChannel}! They're what peak performance looks like! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Everyone raid {shoutoutChannel}! Time to witness actual quality content! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Go support {shoutoutChannel}! They're out here making moves while you're making excuses! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{shoutoutChannel} streams are addictive. Way better than your current bad habits! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Shoutout to {shoutoutChannel}! They're the main character while you're all NPCs! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Everyone follow {shoutoutChannel} before I start questioning your life choices! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Big shoutout to {shoutoutChannel}! They're actually entertaining, imagine that! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Go support {shoutoutChannel}! They're proof that talent exists somewhere on this platform! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{shoutoutChannel} is streaming greatness while you're all streaming mediocrity! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Shoutout to {shoutoutChannel}! They're the reason I still believe in humanity! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `Everyone go follow {shoutoutChannel}! Do something right for once in your lives! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Big ups to {shoutoutChannel}! They're carrying harder than your mom carried you! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Go show {shoutoutChannel} some love! They're actually worth your time! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{shoutoutChannel} is streaming perfection while you're all streaming chaos! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Shoutout to {shoutoutChannel}! They're the antidote to boring content! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Everyone support {shoutoutChannel}! They're what success looks like! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Go follow {shoutoutChannel}! They're the reason the follow button exists! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Big shoutout to {shoutoutChannel}! They're proof that good things happen to good streamers! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{shoutoutChannel} is out here being iconic while you're all being... not! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Go support {shoutoutChannel}! They're the diamond in the rough of this platform! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
];
