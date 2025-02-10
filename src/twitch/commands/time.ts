import { ChatClient } from "@twurple/chat";

export function timeCommand({
  user,
  chatClient,
  channel,
}: {
  user: string;
  chatClient: ChatClient;
  channel: string;
}) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return chatClient.say(
    channel,
    `@${user} The local time for Barry right now is ${time}`
  );
}
