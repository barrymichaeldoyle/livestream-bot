import fs from "fs";
import path from "path";
import { pluralize } from "../utils/pluralize";

const GOOD_IDEAS_FILE = path.join(__dirname, "../../data/good_ideas.json");

interface GoodIdeasData {
  // lowercase
  [username: string]: number;
}

export function loadGoodIdeas(): GoodIdeasData {
  try {
    return JSON.parse(fs.readFileSync(GOOD_IDEAS_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveGoodIdeas(points: GoodIdeasData) {
  fs.writeFileSync(GOOD_IDEAS_FILE, JSON.stringify(points, null, 2));
}

export function getGoodIdeas(user: string): number {
  const formattedUser = formatUserForDb(user);
  const goodIdeas = loadGoodIdeas();
  return goodIdeas[formattedUser] || 0;
}

export function addGoodIdeas(user: string, amount: number) {
  const formattedUser = formatUserForDb(user);
  const points = loadGoodIdeas();
  points[formattedUser] = (points[formattedUser] || 0) + amount;
  saveGoodIdeas(points);
}

export function removeGoodIdeas(user: string, amount: number): boolean {
  const points = loadGoodIdeas();
  const formattedUser = formatUserForDb(user);
  if (!points[formattedUser] || points[formattedUser] < amount) {
    return false;
  }
  points[formattedUser] -= amount;
  saveGoodIdeas(points);
  return true;
}

function formatUserForDb(user: string): string {
  return user.toLowerCase().replace(/@/g, "");
}

export function getGoodIdeasMessage(user: string): string {
  const goodIdeas = getGoodIdeas(user);
  return `You have ${goodIdeas} ${pluralize(
    goodIdeas,
    "good idea",
    "good ideas"
  )}.`;
}
