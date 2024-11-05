// point :: number -> number -> number
export function point(difficulty, removedLine) {
  if (removedLine === 1) return difficulty * 40;
  if (removedLine === 2) return difficulty * 100;
  if (removedLine === 3) return difficulty * 300;
  if (removedLine === 4) return difficulty * 1200;
}
