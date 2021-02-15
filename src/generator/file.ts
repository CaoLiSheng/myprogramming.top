import path from 'path';
import fs from 'fs-extra';

import '@common/shims-string';

import argv from './yargs';

declare var __production__: boolean;

export const inDir = path.join(process.cwd(), argv.inDir || 'posts');

export const outDir = path.join(process.cwd(), argv.outDir);

function isDir(file: string): boolean {
  return fs.statSync(path.join(inDir, file)).isDirectory();
}

function isFile(file: string): boolean {
  return fs.statSync(path.join(inDir, file)).isFile();
}

function isMarkdown(file: string): boolean {
  return file.endsWith('.md');
}

function notDraft(file: string): boolean {
  return !__production__ || !file.startsWith('draft-');
}

function notPrivate(file: string): boolean {
  return !__production__ || !file.startsWith('private-');
}

export function isAsset(file: string): boolean {
  return file.filter(notPrivate, isDir);
}

export function isPost(file: string): boolean {
  return file.filter(notPrivate, notDraft, isMarkdown, isFile);
}

export const extractPostName = (() => {
  const end = '.md'.length;
  return function(fileName: string): string {
    return fileName.substring(0, fileName.length - end);
  };
})();
