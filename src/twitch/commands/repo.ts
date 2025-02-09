import { ChatClient } from "@twurple/chat";

export function repoCommand({
  chatClient,
  channel,
  user,
}: {
  chatClient: ChatClient;
  channel: string;
  user: string;
}) {
  return chatClient.say(
    channel,
    `@${user} the source code to this bot built by Barry Michael Doyle is over here: https://github.com/barrymichaeldoyle/livestream-bot`
  );
}
