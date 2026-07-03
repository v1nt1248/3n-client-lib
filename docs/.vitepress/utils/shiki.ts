import { createHighlighter, type Highlighter } from 'shiki';

let highlighterInstance: Highlighter | null = null;
let promise: Promise<Highlighter> | null = null;

export async function getHighlighter() {
  if (highlighterInstance) {
    return highlighterInstance;
  }

  if (!promise) {
    promise = createHighlighter({
      themes: ['github-light', 'one-dark-pro', 'github-dark'],
      langs: ['vue', 'typescript', 'javascript', 'css', 'scss', 'bash'],
    }).then(h => {
      highlighterInstance = h;
      return h;
    });
  }

  return promise;
}

export type Highlighter = Highlighter;
