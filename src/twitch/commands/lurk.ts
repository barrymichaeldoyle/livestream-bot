import { ChatClient } from "@twurple/chat";
import { getRandomMessage } from "../../utils/invalidMessages";
import { TIPSY_PINEAPPLE_EMOTES } from "../tipsy_pineapple_emotes";

export function lurkCommand({
  chatClient,
  channel,
  userDisplayName,
}: {
  chatClient: ChatClient;
  channel: string;
  userDisplayName: string;
}) {
  const randomMessage = getRandomMessage(lurkerResponseMessages);
  const processedMessage = randomMessage.replace("{user}", userDisplayName);
  chatClient.say(channel, processedMessage);
}

const lurkerResponseMessages = [
  `Oh {user} is going to lurk now? How original! Nobody's ever done that before! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} announces they're lurking like it's breaking news. Sir, this isn't CNN! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Wow {user}, thanks for the lurking announcement! Really needed that update! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} going into lurk mode like they're some kind of stealth operative. You're not that important! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Oh no, {user} is lurking! However will we survive without your riveting commentary? ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} thinks lurking is a personality trait. It's not, it's just being quiet! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Breaking: {user} decides to lurk! In other news, water is wet! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `{user} announces lurking like they're declaring independence. Sir, you're just going quiet! ${TIPSY_PINEAPPLE_EMOTES.wave}`,
  `Oh {user} is lurking now? Let me alert the press about this groundbreaking development! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} going into lurk mode like they're activating some special ability. Your superpower is silence! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Farewell {user}! May your lurking be as entertaining as your chatting... so not at all! ${TIPSY_PINEAPPLE_EMOTES.wave}`,
  `{user} thinks lurking announcements are necessary. Nobody asked for a status update! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Oh {user} is lurking? There goes the neighborhood's intellectual level! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `{user} goes to lurk like they're clocking out of work. This isn't a job, it's supposed to be fun! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Amazing {user}! You've mastered the art of being present but useless! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} announces lurking like they're going on a spiritual journey. You're just being quiet! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `Breaking news: {user} decides to contribute nothing! Back to you in the studio! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} thinks lurking announcements are an event worth announcing. Your bar for excitement is concerningly low! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Oh {user} is lurking now? Try not to strain yourself with all that... nothing! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `{user} going into lurk mode like they're entering witness protection! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Congratulations {user}! You've achieved peak laziness! Mom would be so proud! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} announces lurking like they're making a grand exit. Sir, you're just going quiet! ${TIPSY_PINEAPPLE_EMOTES.wave}`,
  `Oh {user} is lurking? Let me update my diary about this riveting development! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} thinks lurking announcements are helpful. They're about as useful as a chocolate teapot! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Farewell {user}! May your lurking be as memorable as your personality! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{user} going to lurk like they're entering hibernation mode. Wake me up when you're interesting! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Oh {user} is lurking now? There goes our entertainment value... oh wait, it was already gone! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} announces lurking like they're making a presidential address. Sir, you're just being quiet! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Breaking: {user} chooses to be decorative rather than functional! Revolutionary! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} thinks lurking is worth announcing. Your standards are impressively low! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Oh {user} is lurking? Don't let the door hit you on the way to... nowhere! ${TIPSY_PINEAPPLE_EMOTES.wave}`,
  `{user} going into lurk mode like they're activating stealth technology. You're not that advanced! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Congratulations {user}! You've successfully announced your intention to do nothing! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} thinks lurking announcements are necessary public service. They're not! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Oh {user} is lurking now? Try not to overwhelm us with your absence! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
];
