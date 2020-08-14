import Moment from 'moment';
import { PublicMeta } from './db';

export type HOCDecrator<InjectProps> = <Props extends InjectProps>(
  Component: React.ComponentType<Props>
) => void;

export const distinctReduce = (p: string[], v: string[]): string[] => [
  ...p,
  ...v.filter((np: string) => p.every((pp: string) => np !== pp)),
];

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
      date: Moment(metas[s].date, 'YYYY-MM-DD HH:mm:ss'),
    }))
    .sort((a: Sortable, b: Sortable) => (a.date.isBefore(b.date) ? 1 : -1))
    .map((obj: Sortable) => obj.s);
