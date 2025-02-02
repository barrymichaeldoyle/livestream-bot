import { ChatClient } from "@twurple/chat";
import {
  invalidNumberMessages,
  notEnoughPointsMessages,
} from "../../utils/invalidMessages";
import { addPoints, getPoints, removePoints } from "../pointsFileManager";

export function giveCommand({
  giver,
  chatClient,
  channel,
  receiver,
  amount,
}: {
  giver: string;
  chatClient: ChatClient;
  channel: string;
  receiver: string;
  amount: string;
}) {
  const pointsToGive = parseInt(amount);

  if (isNaN(pointsToGive) || pointsToGive <= 0) {
    const randomMessage =
      invalidNumberMessages[
        Math.floor(Math.random() * invalidNumberMessages.length)
      ];
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  const giverPoints = getPoints(giver);

  if (giverPoints < pointsToGive) {
    const randomMessage =
      notEnoughPointsMessages[
        Math.floor(Math.random() * notEnoughPointsMessages.length)
      ];
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  if (giver.toLowerCase() === receiver.toLowerCase()) {
    chatClient.say(channel, `@${giver} wtf are you trying to do bro?`);
    return;
  }

  // Transfer the points
  removePoints(giver, -pointsToGive);
  addPoints(receiver, pointsToGive);

  const randomMessage =
    giveMessages[Math.floor(Math.random() * giveMessages.length)];

  chatClient.say(
    channel,
    `@${giver} gave ${pointsToGive} points to @${receiver.replace(
      /@/g,
      ""
    )}! ${randomMessage}`
  );
}

const giveMessages = [
  "I hope you don't spend it all in one place... like on bad decisions.",
  "You better use those wisely, or they'll vanish faster than your dignity.",
  "It's not like you actually *earned* them.",
  "The thought counts, right?",
  "Maybe now you can buy some taste in music.",
  "Don't spend it all on Fortnite skins, okay?",
  "Maybe now you can afford a personality upgrade.",
  "You'll need a few more to match your worth.",
  "Go ahead, buy yourself something nice... like a clue.",
  "Let's see how long it takes for you to waste those.",
  "The real gift is knowing my generosity... and your lack of gratitude.",
  "One step closer to greatness... or, you know, just a bit closer to mediocrity.",
  "Maybe these points will finally help you win something in life.",
  "Who knew you could be worth this much?",
  "Hopefully, this doesn't go straight to your head.",
  "I mean, it's not like you're going to use them for anything important.",
  "You're still a noob.",
  "Use them wisely... or don't, whatever, it's not my problem.",
  "Don't worry, they're not nearly enough to redeem you.",
  "Consider this a minor token of my eternal pity.",
  "You're still a few points short of being relevant.",
  "Only a ton more points and you'll be halfway to useful.",
  "But you probably won't even notice them.",
];
