import { ChatClient } from "@twurple/chat";

import { getPoints } from "../pointsFileManager";

export function pointsCommand({
  user,
  userDisplayName,
  chatClient,
  channel,
}: {
  user: string;
  userDisplayName: string;
  chatClient: ChatClient;
  channel: string;
}) {
  const points = getPoints(user);
  chatClient.say(channel, `${userDisplayName}, you have ${points} points.`);
}
