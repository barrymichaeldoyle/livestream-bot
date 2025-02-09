import fs from "fs";
import path from "path";
import { pluralize } from "../utils/pluralize";

const POINTS_FILE = path.join(__dirname, "../../data/points.json");

interface PointsData {
  // lowercase
  [username: string]: number;
}

export function loadPoints(): PointsData {
  try {
    return JSON.parse(fs.readFileSync(POINTS_FILE, "utf8"));
  } catch {
    return {};
  }
}

function savePoints(points: PointsData) {
  fs.writeFileSync(POINTS_FILE, JSON.stringify(points, null, 2));
}

export function getPoints(user: string): number {
  const formattedUser = formatUserForDb(user);
  const points = loadPoints();
  return points[formattedUser] || 0;
}

export function addPoints(user: string, amount: number) {
  const formattedUser = formatUserForDb(user);
  const points = loadPoints();
  points[formattedUser] = (points[formattedUser] || 0) + amount;
  savePoints(points);
}

export function removePoints(user: string, amount: number): boolean {
  const points = loadPoints();
  const formattedUser = formatUserForDb(user);
  if (!points[formattedUser] || points[formattedUser] < amount) {
    return false;
  }
  points[formattedUser] -= amount;
  savePoints(points);
  return true;
}

function formatUserForDb(user: string): string {
  return user.toLowerCase().replace(/@/g, "");
}

export function getPointsMessage(user: string): string {
  const points = getPoints(user);
  return `You have ${points} ${pluralize(points, "point", "points")}.`;
}
