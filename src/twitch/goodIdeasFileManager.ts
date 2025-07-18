import fs from "fs";
import path from "path";
import { pluralize } from "../utils/pluralize";

const GOOD_IDEAS_FILE = path.join(__dirname, "../../data/good_ideas.json");

interface GoodIdeasData {
  // lowercase
  [username: string]: string[];
}

export function loadGoodIdeas(): GoodIdeasData {
  try {
    return JSON.parse(fs.readFileSync(GOOD_IDEAS_FILE, "utf8"));
  } catch {
    return {};
  }
}

export function getGoodIdeas(user: string): string[] {
  const formattedUser = formatUserForDb(user);
  const goodIdeas = loadGoodIdeas();
  return goodIdeas[formattedUser] || [];
}

function formatUserForDb(user: string): string {
  return user.toLowerCase().replace(/@/g, "");
}
