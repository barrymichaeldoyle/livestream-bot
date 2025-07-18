import { ChatClient } from "@twurple/chat";
import { getRandomMessage } from "../../utils/invalidMessages";

export function unlurkCommand({
  chatClient,
  channel,
  userDisplayName,
}: {
  chatClient: ChatClient;
  channel: string;
  userDisplayName: string;
}) {
  const randomMessage = getRandomMessage(unlurkerResponseMessages);
  const processedMessage = randomMessage.replace("{user}", userDisplayName);
  chatClient.say(channel, processedMessage);
}

const unlurkerResponseMessages = [
  "Oh look, {user} has returned from the void! Welcome back to the land of the living! 🧟",
  "{user} announces they're unlurking like they're making a grand entrance. Sir, you were just quiet! 🎭",
  "Breaking: {user} decides to be useful again! This is unprecedented! 📰",
  "{user} emerges from lurk mode like they've been on a spiritual journey. You were just silent! 🧘",
  "Oh {user} is back? Did lurking get boring or did you finally find your keyboard? ⌨️",
  "{user} returns from lurking like they're back from war. You were just... not talking! 🪖",
  "Welcome back {user}! Did you learn anything interesting while being professionally useless? 🎓",
  "{user} announces unlurking like they're making a comeback tour. Nobody missed you! 🎪",
  "Oh {user} is active again? Let me alert the media about this miraculous recovery! 📺",
  "{user} returns from lurk mode like they're rising from the dead. You were just quiet! ⚰️",
  "Look who's back! {user} has decided to contribute to society again! How generous! 🎁",
  "{user} unlurks like they're emerging from hibernation. Did you have sweet dreams? 😴",
  "Oh {user} is talking again? There goes the peace and quiet we all enjoyed! 🕊️",
  "{user} returns from lurking like they've been on vacation. You were just being lazy! 🏖️",
  "Welcome back {user}! Your absence was as noticeable as your presence! 👻",
  "{user} announces unlurking like they're making a public service announcement. Nobody asked! 📢",
  "Oh {user} is back from lurking? Did you solve world hunger while you were gone? 🌍",
  "{user} returns like they're making a superhero entrance. Your power is mediocrity! 🦸",
  "Look who decided to grace us with their presence again! {user} has returned! 👑",
  "{user} unlurks like they're coming back from the dead. You were just being quiet! 🧟‍♂️",
  "Oh {user} is active again? Let me update my boring people tracker! 📊",
  "{user} returns from lurking like they've been on a top-secret mission. You were just silent! 🕵️",
  "Welcome back {user}! Did lurking live up to your expectations? 🎯",
  "{user} announces unlurking like they're making a dramatic return. Sir, you just started typing! 📝",
  "Oh {user} is back? There goes our collective IQ... oh wait, it was already low! 🧠",
  "{user} emerges from lurk mode like they're breaking out of prison. You were just quiet! 🔓",
  "Look who's back! {user} has decided to bless us with their commentary again! 🙏",
  "{user} returns from lurking like they're making a royal entrance. You're not that important! 👑",
  "Oh {user} is unlurking? Did you miss the sound of your own voice? 🎤",
  "{user} comes back from lurking like they've been on sabbatical. You were just being useless! 📚",
  "Welcome back {user}! Your lurking skills were as impressive as your chatting skills! 💪",
  "{user} announces unlurking like they're making a press release. Nobody subscribed to your updates! 📰",
  "Oh {user} is active again? Let me cancel the search party! 🔍",
  "{user} returns from lurking like they're making a triumphant comeback. You were just quiet! 🏆",
  "Look who decided to rejoin civilization! {user} has returned from the lurking wilderness! 🏕️",
];
