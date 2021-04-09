export function clickIn (
  target: HTMLElement | null | undefined,
  ...wrappers: ( HTMLElement | null )[]
): boolean {
  if ( wrappers.length === 0 ) return false;

  while ( target ) {
    if ( wrappers.includes ( target ) ) return true;
    target = target?.parentElement;
  }
  return false;
}
