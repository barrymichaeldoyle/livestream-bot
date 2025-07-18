import { ChatClient } from "@twurple/chat";
import { loadGoodIdeas } from "../goodIdeasFileManager";

export function goodIdeasCommand({
  chatClient,
  channel,
}: {
  chatClient: ChatClient;
  channel: string;
}) {
  const allGoodIdeas = loadGoodIdeas();
  const sortedGoodIdeas = Object.entries(allGoodIdeas).sort(
    (a, b) => b[1].length - a[1].length
  );
  const top10 = sortedGoodIdeas.slice(0, 10);
  const message = top10
    .map(([user, goodIdeas]) => `@${user}: ${goodIdeas.length}`)
    .join(" | ");
  chatClient.say(channel, message);
}
