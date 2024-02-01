//Author Erik Priemer

import {join} from 'path';

const PROJECT_PATH = join(__dirname, '../');

export function projectPath(filename: string): string {
  return join(PROJECT_PATH, filename);
}
