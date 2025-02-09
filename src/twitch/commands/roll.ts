import { ChatClient } from "@twurple/chat";
import {
  getRandomMessage,
  invalidNumberMessages,
} from "../../utils/invalidMessages";
import { rollDice } from "../../utils/rollDice";

export function rollCommand({
  user,
  chatClient,
  channel,
  rollType,
  sides,
}: {
  user: string;
  chatClient: ChatClient;
  channel: string;
  rollType: "dice" | "roll";
  sides: string;
}) {
  const sidesInput =
    sides ||
    {
      dice: "6",
      roll: "100",
    }[rollType];
  const sidesInputNumber = parseInt(sidesInput);

  if (!sidesInputNumber || sidesInputNumber < 1 || sidesInput.includes(".")) {
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  chatClient.say(
    channel,
    `@${user} rolled a ${rollDice(sidesInputNumber)} (d${sidesInputNumber})`
  );
}
