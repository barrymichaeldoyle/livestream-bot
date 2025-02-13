import { ChatClient } from "@twurple/chat";
import { loadPoints } from "../pointsFileManager";

export function leaderboardCommand({
  chatClient,
  channel,
}: {
  chatClient: ChatClient;
  channel: string;
}) {
  const allPoints = loadPoints();
  const sortedPoints = Object.entries(allPoints).sort((a, b) => b[1] - a[1]);
  const top10 = sortedPoints.slice(0, 10);
  const message = top10
    .map(([user, points]) => `@${user}: ${points}`)
    .join(" | ");
  chatClient.say(channel, message);
}
