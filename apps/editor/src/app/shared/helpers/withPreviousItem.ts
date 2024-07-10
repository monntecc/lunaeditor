import { map, OperatorFunction, pairwise, pipe, startWith } from 'rxjs';

export function withPreviousItem<T>(): OperatorFunction<
  T,
  {
    previous?: T;
    current: T;
  }
> {
  return pipe(
    startWith(undefined),
    pairwise(),
    map(([previous, current]) => ({
      previous,
      current: current!
    }))
  );
}
