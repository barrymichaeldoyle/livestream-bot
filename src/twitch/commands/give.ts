import { ChatClient } from "@twurple/chat";
import {
  getRandomMessage,
  invalidNumberMessages,
  notEnoughPointsMessages,
} from "../../utils/invalidMessages";
import { addPoints, getPoints, removePoints } from "../pointsFileManager";
import { TIPSY_PINEAPPLE_EMOTES } from "../tipsy_pineapple_emotes";

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
  receiver?: string;
  amount?: string;
}) {
  if (!amount) {
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  const pointsToGive =
    amount.toLowerCase() === "all" ? getPoints(giver) : parseInt(amount);

  if (isNaN(pointsToGive) || pointsToGive <= 0) {
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  const giverPoints = getPoints(giver);

  if (giverPoints < pointsToGive) {
    const randomMessage = getRandomMessage(notEnoughPointsMessages);
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  if (!receiver) {
    // TODO: change this with invalid receiveMessages
    const randomMessage = getRandomMessage(invalidNumberMessages);
    return chatClient.say(channel, `@${giver} ${randomMessage}`);
  }

  if (giver.toLowerCase() === receiver.toLowerCase()) {
    chatClient.say(channel, `@${giver} wtf are you trying to do bro?`);
    return;
  }

  // Transfer the points
  removePoints(giver, pointsToGive);
  addPoints(receiver, pointsToGive);

  const randomMessage = getRandomMessage(giveMessages);

  chatClient.say(
    channel,
    `@${giver} gave ${pointsToGive} points to @${receiver.replace(
      /@/g,
      ""
    )}! ${randomMessage}`
  );
}

const giveMessages = [
  `I hope you don't spend it all in one place... like on bad decisions. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `You better use those wisely, or they'll vanish faster than your dignity. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `It's not like you actually *earned* them. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `The thought counts, right? ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Maybe now you can buy some taste in music. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Don't spend it all on Fortnite skins, okay? ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Maybe now you can afford a personality upgrade. ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `You'll need a few more to match your worth. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Go ahead, buy yourself something nice... like a clue. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Let's see how long it takes for you to waste those. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `The real gift is knowing my generosity... and your lack of gratitude. ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `One step closer to greatness... or, you know, just a bit closer to mediocrity. ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Maybe these points will finally help you win something in life. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Who knew you could be worth this much? ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Hopefully, this doesn't go straight to your head. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `I mean, it's not like you're going to use them for anything important. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `You're still a noob. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Use them wisely... or don't, whatever, it's not my problem. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Don't worry, they're not nearly enough to redeem you. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Consider this a minor token of my eternal pity. ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `You're still a few points short of being relevant. ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Only a ton more points and you'll be halfway to useful. ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `But you probably won't even notice them. ${TIPSY_PINEAPPLE_EMOTES.classic}`,
];
