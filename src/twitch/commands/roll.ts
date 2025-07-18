import { ChatClient } from "@twurple/chat";
import {
  getRandomMessage,
  invalidNumberMessages,
} from "../../utils/invalidMessages";
import { rollDice } from "../../utils/rollDice";

export function rollCommand({
  userDisplayName,
  chatClient,
  channel,
  rollType,
  sides,
}: {
  userDisplayName: string;
  chatClient: ChatClient;
  channel: string;
  rollType: "dice" | "roll";
  sides?: string;
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
    return chatClient.say(channel, `${userDisplayName} ${randomMessage}`);
  }

  chatClient.say(
    channel,
    `${userDisplayName} rolled a ${rollDice(
      sidesInputNumber
    )} (d${sidesInputNumber})`
  );
}
