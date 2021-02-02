import md5 from 'md5';

String.prototype.filter = function(
  this: string,
  ...fns: ((file: string) => boolean)[]
): boolean {
  const self: string = `${this}`;
  for (let i = 0; i < fns.length; i++) {
    if (fns[i](self)) continue;
    else return false;
  }
  return true;
};

String.prototype.md5 = function(
  this: string,
  name: string,
  ext: string,
  len: number
): string {
  return `${name}.${md5(this).substring(0, len)}.${ext}`;
};

String.prototype.toInt = function(this: string): number | undefined {
  const self: string = this;
  try {
    const parsed = parseInt(self);

    if (isNaN(parsed)) return undefined;

    return parsed;
  } catch {
    console.error(`${self} is not a integer.`);
    return undefined;
  }
};

String.prototype.uniqueCheck = (function() {
  const checkers = {};
  return function(this: string, key: string): boolean {
    let theChecker = checkers[key];
    if (!theChecker) {
      theChecker = checkers[key] = this;
    }
    return this === theChecker;
  };
})();
