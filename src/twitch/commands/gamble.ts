import { ChatClient } from "@twurple/chat";
import { rollDice } from "../../utils/rollDice";
import { addPoints, getPoints, removePoints } from "../pointsFileManager";
import {
  invalidNumberMessages,
  notEnoughPointsMessages,
} from "../../utils/invalidMessages";

export function gambleCommand({
  amount,
  user,
  chatClient,
  channel,
}: {
  amount: string;
  user: string;
  chatClient: ChatClient;
  channel: string;
}) {
  const betAmount = parseInt(amount);

  if (isNaN(betAmount) || betAmount <= 0) {
    const randomMessage =
      invalidNumberMessages[
        Math.floor(Math.random() * invalidNumberMessages.length)
      ];
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  const userPoints = getPoints(user);
  if (betAmount > userPoints) {
    const randomMessage =
      notEnoughPointsMessages[
        Math.floor(Math.random() * notEnoughPointsMessages.length)
      ];
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  // Roll a d100
  const roll = rollDice(100);
  let winnings = 0;
  let message = `@${user} rolled a ${roll}... `;

  if (roll <= 50) {
    removePoints(user, betAmount);
    message += `Oof. You lost ${betAmount} points. Sucks to be you. ❌`;
  } else if (roll <= 90) {
    winnings = Math.floor(betAmount * 1.5);
    addPoints(user, winnings);
    message += `Not bad! You won ${winnings} points! 🎉`;
  } else if (roll < 100) {
    winnings = betAmount * 2;
    addPoints(user, winnings);
    message += `JACKPOT!! 🎰 You won ${winnings} points! 🔥🚀`;
  } else {
    winnings = betAmount * 3;
    addPoints(user, winnings);
    message += `You rolled a 100! 🎰 You won ${winnings} points! 🔥🚀`;
  }

  chatClient.say(channel, message);
}
