import { chatClient } from "./twitch";

async function main() {
  chatClient.connect();
}

main().catch(console.error);
