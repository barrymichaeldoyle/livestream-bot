import { ChatClient } from "@twurple/chat";

import { addPoints, removePoints, getPoints } from "../pointsFileManager";
import { pluralize } from "../../utils/pluralize";

// !r odd 100
// !r

export type RouletteBetType =
  | "number"
  | "odd"
  | "even"
  | "red"
  | "black"
  | "1to18"
  | "19to36"
  | "1st12"
  | "2nd12"
  | "3rd12"
  | "1stthird"
  | "2ndthird"
  | "3rdthird"
  | "00";

interface RouletteBet {
  /**
   * The lowercase username of the player
   */
  betType: RouletteBetType;
  betAmount: number;
  betValue?: number;
}

export class RouletteGame {
  private bets: Record<string, RouletteBet[]> = {};
  private isActive: boolean = false;
  private timer: NodeJS.Timeout | null = null;
  private secondsRemaining = 60;

  constructor(private chatClient: ChatClient, private channel: string) {}

  public startGame() {
    if (this.isActive) {
      return false;
    }

    this.isActive = true;
    this.bets = {};
    this.secondsRemaining = 60;

    // Announce game start
    this.chatClient.say(
      this.channel,
      "🎰 Roulette game has started! You have 60 seconds to place your bets!"
    );

    // Start countdown timer
    this.timer = setInterval(() => {
      this.secondsRemaining--;

      // Announce time remaining at specific intervals
      if (this.secondsRemaining === 10 || this.secondsRemaining === 5) {
        this.chatClient.say(
          this.channel,
          `⏰ ${this.secondsRemaining} seconds remaining to place your bets!`
        );
      }

      if (this.secondsRemaining <= 0) {
        this.endGame();
      }
    }, 1_000);

    return true;
  }

  public placeBet(
    username: string,
    betType: RouletteBet["betType"],
    betAmount: number,
    betValue?: number
  ) {
    const lowerCaseUsername = username.toLowerCase();
    if (!this.isActive) {
      return false;
    }

    if (!this.bets[lowerCaseUsername]) {
      this.bets[lowerCaseUsername] = [];
    }

    // Check if player has enough points
    // This should technically never happen, but just in case
    const currentPoints = getPoints(lowerCaseUsername);
    if (currentPoints < betAmount) {
      this.chatClient.say(
        this.channel,
        `@${username} you don't have enough points for this bet!`
      );
      return false;
    }

    // Deduct points immediately
    removePoints(lowerCaseUsername, betAmount);

    this.bets[lowerCaseUsername].push({
      betType,
      betAmount,
      betValue,
    });

    return true;
  }

  private endGame() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    const result = Math.floor(Math.random() * 38); // 0-36 + 00
    this.calculateResults(result);
    this.isActive = false;
    this.bets = {};
  }

  private calculateResults(result: number) {
    const is0or00 = result === 0 || result === 37; // 37 represents '00'
    const isRed = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ].includes(result);
    const isBlack = !is0or00 && !isRed;
    const isEven = !is0or00 && result % 2 === 0;
    const isOdd = !is0or00 && result % 2 !== 0;

    // Announce the result
    const resultNumber = result === 37 ? "00" : result.toString();
    const resultColor =
      result === 0 || result === 37 ? "green" : isRed ? "red" : "black";
    this.chatClient.say(
      this.channel,
      `🎲 The ball landed on ${resultNumber} (${resultColor})!`
    );

    // Process each player's bets
    for (const [username, playerBets] of Object.entries(this.bets)) {
      let totalWinnings = 0;

      for (const bet of playerBets) {
        let won = false;
        let multiplier = 0;

        switch (bet.betType) {
          case "number":
            won = bet.betValue === result;
            multiplier = 35; // 35:1 payout for single number
            break;
          case "00":
            won = result === 37;
            multiplier = 35; // 35:1 payout for 00
            break;
          case "red":
            won = isRed;
            multiplier = 1; // 1:1 payout
            break;
          case "black":
            won = isBlack;
            multiplier = 1;
            break;
          case "even":
            won = isEven;
            multiplier = 1;
            break;
          case "odd":
            won = isOdd;
            multiplier = 1;
            break;
          case "1to18":
            won = result >= 1 && result <= 18;
            multiplier = 1;
            break;
          case "19to36":
            won = result >= 19 && result <= 36;
            multiplier = 1;
            break;
          case "1st12":
            won = result >= 1 && result <= 12;
            multiplier = 2; // 2:1 payout
            break;
          case "2nd12":
            won = result >= 13 && result <= 24;
            multiplier = 2;
            break;
          case "3rd12":
            won = result >= 25 && result <= 36;
            multiplier = 2;
            break;
          case "1stthird":
            won = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(
              result
            );
            multiplier = 2;
            break;
          case "2ndthird":
            won = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(
              result
            );
            multiplier = 2;
            break;
          case "3rdthird":
            won = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(
              result
            );
            multiplier = 2;
            break;
        }

        if (won) {
          const betWinnings = bet.betAmount * (multiplier + 1);
          totalWinnings += betWinnings;
        }
      }

      // Announce results to player
      if (totalWinnings > 0) {
        addPoints(username, totalWinnings);
        this.chatClient.say(
          this.channel,
          `🎉 @${username} won ${totalWinnings} points!`
        );
      } else {
        this.chatClient.say(
          this.channel,
          `😢 @${username} lost their ${pluralize(
            this.bets[username].length,
            "bet",
            "bets"
          )}.`
        );
      }
    }
  }
}

// TODO: figure out the great bug in the system. Test this shiz!
