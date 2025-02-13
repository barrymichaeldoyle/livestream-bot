import { ChatClient } from "@twurple/chat";
import { RouletteBetType, RouletteGame } from "../games/roulette";
import {
  getRandomMessage,
  invalidNumberMessages,
  notEnoughPointsMessages,
} from "../../utils/invalidMessages";
import { getPoints } from "../pointsFileManager";

export function placeRouletteBetCommand({
  amount,
  betType,
  user,
  chatClient,
  channel,
  rouletteGame,
}: {
  betType?: string;
  amount?: string;
  user: string;
  chatClient: ChatClient;
  channel: string;
  rouletteGame: RouletteGame;
}) {
  if (!betType || !isValidBetType(betType)) {
    return chatClient.say(
      channel,
      `@${user} Invalid bet type. Please try again.`
    );
  }

  const processedBetType =
    betType === "00"
      ? betType
      : Number.isNaN(Number(betType))
      ? betType.toLowerCase()
      : Number(betType);

  const typeOfBet = Number.isNaN(processedBetType)
    ? (processedBetType as RouletteBetType)
    : "number";

  if (!amount) {
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  const betAmount =
    amount.toLowerCase() === "all" ? getPoints(user) : parseInt(amount);

  if (isNaN(betAmount) || betAmount <= 0) {
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  const userPoints = getPoints(user);
  if (betAmount > userPoints) {
    const randomMessage = getRandomMessage(notEnoughPointsMessages);
    return chatClient.say(channel, `@${user} ${randomMessage}`);
  }

  rouletteGame.placeBet(user.toLowerCase(), typeOfBet, betAmount);
}

function isValidNumberBet(bet: string | number): boolean {
  if (bet === "00") return true;
  const num = Number(bet);
  return !Number.isNaN(num) && num >= 0 && num <= 36;
}

function isValidBetType(bet: string): bet is RouletteBetType | "00" | string {
  if (isValidNumberBet(bet)) return true;

  const validSpecialBets: RouletteBetType[] = [
    "odd",
    "even",
    "red",
    "black",
    "1to18",
    "19to36",
    "1st12",
    "2nd12",
    "3rd12",
    "1stthird",
    "2ndthird",
    "3rdthird",
  ];
  return validSpecialBets.includes(bet.toLowerCase() as RouletteBetType);
}
