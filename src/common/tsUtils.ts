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
      date: Moment(metas[s].date, 'YYYY-MM-DD'),
    }))
    .sort((a: Sortable, b: Sortable) => (a.date.isBefore(b.date) ? 1 : -1))
    .map((obj: Sortable) => obj.s);
