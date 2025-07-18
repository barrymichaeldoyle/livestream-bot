import { ChatClient } from "@twurple/chat";
import { getRandomMessage } from "../../utils/invalidMessages";

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
  "Oh {user} is going to lurk now? How original! Nobody's ever done that before! 🙄",
  "{user} announces they're lurking like it's breaking news. Sir, this isn't CNN! 📺",
  "Wow {user}, thanks for the lurking announcement! Really needed that update! 📢",
  "{user} going into lurk mode like they're some kind of stealth operative. You're not that important! 🥷",
  "Oh no, {user} is lurking! However will we survive without your riveting commentary? 😱",
  "{user} thinks lurking is a personality trait. It's not, it's just being quiet! 🤫",
  "Breaking: {user} decides to lurk! In other news, water is wet! 💧",
  "{user} announces lurking like they're declaring independence. Sir, you're just going quiet! 🏳️",
  "Oh {user} is lurking now? Let me alert the press about this groundbreaking development! 📰",
  "{user} going into lurk mode like they're activating some special ability. Your superpower is silence! 🦸",
  "Farewell {user}! May your lurking be as entertaining as your chatting... so not at all! 👋",
  "{user} thinks lurking announcements are necessary. Nobody asked for a status update! 📱",
  "Oh {user} is lurking? There goes the neighborhood's intellectual level! 🏠",
  "{user} goes to lurk like they're clocking out of work. This isn't a job, it's supposed to be fun! ⏰",
  "Amazing {user}! You've mastered the art of being present but useless! 🎨",
  "{user} announces lurking like they're going on a spiritual journey. You're just being quiet! 🧘",
  "Breaking news: {user} decides to contribute nothing! Back to you in the studio! 📻",
  "{user} thinks lurking is an event worth announcing. Your bar for excitement is concerningly low! 🍸",
  "Oh {user} is lurking now? Try not to strain yourself with all that... nothing! 💪",
  "{user} going into lurk mode like they're entering witness protection! 🕵️",
  "Congratulations {user}! You've achieved peak laziness! Mom would be so proud! 🏆",
  "{user} announces lurking like they're making a grand exit. Sir, you're just going quiet! 🚪",
  "Oh {user} is lurking? Let me update my diary about this riveting development! 📔",
  "{user} thinks lurking announcements are helpful. They're about as useful as a chocolate teapot! 🍫",
  "Farewell {user}! May your lurking be as memorable as your personality! 🎭",
  "{user} going to lurk like they're entering hibernation mode. Wake me up when you're interesting! 😴",
  "Oh {user} is lurking now? There goes our entertainment value... oh wait, it was already gone! 📉",
  "{user} announces lurking like they're making a presidential address. Sir, you're just being quiet! 🎤",
  "Breaking: {user} chooses to be decorative rather than functional! Revolutionary! 🏺",
  "{user} thinks lurking is worth announcing. Your standards are impressively low! 📏",
  "Oh {user} is lurking? Don't let the door hit you on the way to... nowhere! 🚪",
  "{user} going into lurk mode like they're activating stealth technology. You're not that advanced! 🛸",
  "Congratulations {user}! You've successfully announced your intention to do nothing! 🎉",
  "{user} thinks lurking announcements are necessary public service. They're not! 🚫",
  "Oh {user} is lurking now? Try not to overwhelm us with your absence! 👻",
];
