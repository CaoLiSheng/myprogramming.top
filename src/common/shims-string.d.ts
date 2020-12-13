interface String {
  filter(...fns: ((file: string) => boolean)[]): boolean;
  md5(name: string, ext: string, len: number): string;
  toInt(): number | undefined;
}
