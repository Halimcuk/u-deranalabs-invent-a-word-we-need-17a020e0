// Cordcrypt — a newly coined word for the drawer of dead cables and
// chargers kept just in case for devices nobody owns any more.
// Writes the entry to /output/entry.txt (or $OUTPUT_DIR/entry.txt)
// and checks the 1-140 character gate itself before exiting.
// The file ends with a single trailing newline; the entry line itself
// is 101 characters, inside the gate.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Cordcrypt: the drawer of dead cables and chargers kept just in case for devices nobody owns any more.";

const outDir = process.env.OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

// Self gate: 1 to 140 characters of UTF-8 text, not only whitespace,
// and a single line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 140) {
  console.error(`Gate failed: entry is ${chars} characters, must be 1-140.`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("Gate failed: entry is only whitespace.");
  process.exit(1);
}
if (ENTRY.includes("\n")) {
  console.error("Gate failed: entry must be a single line.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");
console.log(`Wrote ${chars} characters to ${outFile}`);
