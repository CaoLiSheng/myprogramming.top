import Moment from 'moment';
import { PublicMeta } from './db';

export type HOCDecrator<InjectProps> = <Props extends InjectProps>(
  Component: React.ComponentType<Props>
) => void;

export const distinctReduce = (p: string[], v: string[]): string[] => [
  ...p,
  ...v.filter((np: string) => p.every((pp: string) => np !== pp)),
];

export const intersectingReduce = (
  p: string[],
  v: string[],
  idx: number
): string[] =>
  idx === 0
    ? v
    : [...p.filter((np: string) => v.some((nv: string) => np === nv))];

interface Sortable {
  s: string;
  date: Moment.Moment;
}

export const dateSortDesc = (
  src: string[],
  metas: { [key: string]: PublicMeta }
): string[] =>
  src
    .map((s: string) => ({
      s,
      date: Moment(metas[s].date),
    }))
    .sort((a: Sortable, b: Sortable) => (a.date.isBefore(b.date) ? 1 : -1))
    .map((obj: Sortable) => obj.s);

export function switcher(
  jobAtOnce: (...params: any[]) => void,
  jobLater: (...params: any[]) => void,
  delay: number
): (...params: any[]) => void {
  let _timer: NodeJS.Timeout | null = null;
  let _need_once: boolean = true;

  return (...params: any[]) => {
    if (null !== _timer) clearTimeout(_timer);

    if (_need_once) {
      _need_once = false;
      jobAtOnce(...params);
    }

    _timer = setTimeout(() => {
      _timer = null;
      _need_once = true;
      jobLater(...params);
    }, delay);
  };
}
