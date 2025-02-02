import { ChatClient } from "@twurple/chat";

import { getPoints } from "../pointsFileManager";

export function pointsCommand({
  user,
  chatClient,
  channel,
}: {
  user: string;
  chatClient: ChatClient;
  channel: string;
}) {
  const points = getPoints(user);
  chatClient.say(channel, `@${user}, you have ${points} points.`);
}
