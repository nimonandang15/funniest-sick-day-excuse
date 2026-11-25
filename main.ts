// The Funniest Sick-Day Excuse — make.fun entry
// Writes a single sick-day excuse line to /output/entry.txt and enforces
// the competition gate: 1-200 characters, a single line, exactly one sentence.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Can't come in today, my smoke alarm started chirping at 3am and I've been up ever since trying to negotiate with it like a landlord.";

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const sentences = ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be exactly one sentence, got ${sentences.length}`);
  }
  // ASCII-only: byte count equals char count, so the entry is as small as
  // possible for its length (smaller text wins an exact judge tie-break).
  if (Buffer.byteLength(ENTRY, "utf8") !== chars) {
    throw new Error("entry must be ASCII-only");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}

main();
