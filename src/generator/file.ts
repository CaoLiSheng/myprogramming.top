import path from 'path';
import fs from 'fs-extra';

import '@common/shims-string';

declare var __out_path__: string;
declare var __production__: boolean;

export const inDir = path.join(process.cwd(), 'posts');

export const outDir = path.join(process.cwd(), __out_path__);

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

// pre write: do some cleaning
type WriteFileOptions =
  | string
  | {
      encoding?: string | null | undefined;
      mode?: string | number | undefined;
      flag?: string | undefined;
    }
  | null
  | undefined;

export function preWrite(
  file: string
): {
  writeFileSync: (data: any, options?: WriteFileOptions) => void;
} {
  if (fs.existsSync(file)) fs.removeSync(file);
  fs.createFileSync(file);
  return {
    writeFileSync: (data: any, options?: WriteFileOptions) =>
      fs.writeFileSync(file, data, options),
  };
}
