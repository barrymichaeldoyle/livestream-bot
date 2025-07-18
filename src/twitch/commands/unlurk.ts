import { ChatClient } from "@twurple/chat";
import { getRandomMessage } from "../../utils/invalidMessages";
import { TIPSY_PINEAPPLE_EMOTES } from "../tipsy_pineapple_emotes";

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
  `Oh look, {user} has returned from the void! Welcome back to the land of the living! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} announces they're unlurking like they're making a grand entrance. Sir, you were just quiet! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `Breaking: {user} decides to be useful again! This is unprecedented! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} emerges from lurk mode like they've been on a spiritual journey. You were just silent! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `Oh {user} is back? Did lurking get boring or did you finally find your keyboard? ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} returns from lurking like they're back from war. You were just... not talking! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Welcome back {user}! Did you learn anything interesting while being professionally useless? ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} announces unlurking like they're making a comeback tour. Nobody missed you! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Oh {user} is active again? Let me alert the media about this miraculous recovery! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} returns from lurk mode like they're rising from the dead. You were just quiet! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Look who's back! {user} has decided to contribute to society again! How generous! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `{user} unlurks like they're emerging from hibernation. Did you have sweet dreams? ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Oh {user} is talking again? There goes the peace and quiet we all enjoyed! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} returns from lurking like they've been on vacation. You were just being lazy! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Welcome back {user}! Your absence was as noticeable as your presence! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} announces unlurking like they're making a public service announcement. Nobody asked! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Oh {user} is back from lurking? Did you solve world hunger while you were gone? ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `{user} returns like they're making a superhero entrance. Your power is mediocrity! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Look who decided to grace us with their presence again! {user} has returned! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{user} unlurks like they're coming back from the dead. You were just being quiet! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Oh {user} is active again? Let me update my boring people tracker! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} returns from lurking like they've been on a top-secret mission. You were just silent! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Welcome back {user}! Did lurking live up to your expectations? ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `{user} announces unlurking like they're making a dramatic return. Sir, you just started typing! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Oh {user} is back? There goes our collective IQ... oh wait, it was already low! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} emerges from lurk mode like they're breaking out of prison. You were just quiet! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `Look who's back! {user} has decided to bless us with their commentary again! ${TIPSY_PINEAPPLE_EMOTES.love}`,
  `{user} returns from lurking like they're making a royal entrance. You're not that important! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `Oh {user} is unlurking? Did you miss the sound of your own voice? ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `{user} comes back from lurking like they've been on sabbatical. You were just being useless! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
  `Welcome back {user}! Your lurking skills were as impressive as your chatting skills! ${TIPSY_PINEAPPLE_EMOTES.whatALegend}`,
  `{user} announces unlurking like they're making a press release. Nobody subscribed to your updates! ${TIPSY_PINEAPPLE_EMOTES.classic}`,
  `Oh {user} is active again? Let me cancel the search party! ${TIPSY_PINEAPPLE_EMOTES.lol}`,
  `{user} returns from lurking like they're making a triumphant comeback. You were just quiet! ${TIPSY_PINEAPPLE_EMOTES.drink}`,
  `Look who decided to rejoin civilization! {user} has returned from the lurking wilderness! ${TIPSY_PINEAPPLE_EMOTES.pineapple}`,
];
