export function generateColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // Generate a unique number based on the characters in a string
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use the remainder of the division to obtain the hue (0-360)
  const h = Math.abs(hash % 360);

  return `hsl(${h}, 60%, 40%)`; // S = 60%, L = 40% — a dark enough background for white text
  // return `hsl(${h}, 40%, 35%)`; // pastel colors
}
