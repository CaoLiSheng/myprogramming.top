interface String {
  filter(...fns: ((file: string) => boolean)[]): boolean;
}
