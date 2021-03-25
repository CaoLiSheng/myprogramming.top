import Moment from 'moment';
import { PublicMeta } from './db';

export type HOCDecrator<InjectProps> = <Props extends InjectProps>(
  Component: React.ComponentType<Props>
) => void;

export const distinctReduce = ( p: string[], v: string[] ): string[] => [
  ...p,
  ...v.filter( ( np: string ) => p.every( ( pp: string ) => np !== pp ) ),
];

export const intersectingReduce = (
  p: string[],
  v: string[],
  idx: number,
): string[] => ( idx === 0
  ? v
  : [ ...p.filter( ( np: string ) => v.includes( np ) ) ] );

interface Sortable {
  s: string;
  date: Moment.Moment;
}

export const dateSortDesc = (
  src: string[],
  metas: { [key: string]: PublicMeta },
): string[] => src
  .map( ( s: string ) => ( {
    s,
    date: Moment( metas[s].date ),
  } ) )
  .sort( ( a: Sortable, b: Sortable ) => ( a.date.isBefore( b.date ) ? 1 : -1 ) )
  .map( ( obj: Sortable ) => obj.s );

export function switcher (
  jobAtOnce: ( ...params: unknown[] ) => void,
  jobLater: ( ...params: unknown[] ) => void,
  delay: number,
): ( ...params: unknown[] ) => void {
  let _timer: NodeJS.Timeout | null = null;
  let _need_once = true;

  return ( ...params: unknown[] ) => {
    if ( _timer !== null ) clearTimeout( _timer );

    if ( _need_once ) {
      _need_once = false;
      jobAtOnce( ...params );
    }

    _timer = setTimeout( () => {
      _timer = null;
      _need_once = true;
      jobLater( ...params );
    }, delay );
  };
}
