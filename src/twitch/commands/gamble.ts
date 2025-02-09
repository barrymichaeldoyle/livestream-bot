import { ChatClient } from "@twurple/chat";
import { rollDice } from "../../utils/rollDice";
import {
  addPoints,
  getPoints,
  getPointsMessage,
  removePoints,
} from "../pointsFileManager";
import {
  invalidNumberMessages,
  notEnoughPointsMessages,
} from "../../utils/invalidMessages";
import { pluralize } from "../../utils/pluralize";

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
  if (amount.toLowerCase() === "odds") {
    return chatClient.say(
      channel,
      `@${user} you roll a d100! 🎰 Roll a 100, and you win 3x your bet! 🔥🚀 Roll between 91 and 99 (inclusive), and you win 2x your bet! 🎉 Roll between 50 and 90 (exclusive), and you win 1.5x your bet! 🎉 Roll 50 or lower, and you lose your bet! ❌`
    );
  }

  const betAmount =
    amount.toLowerCase() === "all" ? getPoints(user) : parseInt(amount);

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
  const wonPointsStr = pluralize(winnings, "point", "points");

  if (roll <= 50) {
    removePoints(user, betAmount);
    message += `Oof. You lost ${betAmount} ${wonPointsStr}. Sucks to be you. ❌`;
  } else if (roll <= 90) {
    winnings = Math.floor(betAmount * 1.5);
    addPoints(user, winnings);
    message += `Not bad! You won ${winnings} ${wonPointsStr}! 🎉`;
  } else if (roll < 100) {
    winnings = betAmount * 2;
    addPoints(user, winnings);
    message += `JACKPOT!! 🎰 You won ${winnings} ${wonPointsStr}! 🔥🚀`;
  } else {
    winnings = betAmount * 3;
    addPoints(user, winnings);
    message += `You rolled a 100! 🎰 You won ${winnings} ${wonPointsStr}! 🔥🚀`;
  }

  const currentPointsStr = getPointsMessage(user);

  chatClient.say(channel, `${message} ${currentPointsStr}`);
}
