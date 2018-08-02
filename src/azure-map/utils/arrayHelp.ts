export interface ArrDiff<T> {
  added: T[];
  deleted: T[];
}

export function arrayDiff<T>(old: T[], newArr: T[]): ArrDiff<T> {
  const difference: ArrDiff = {added: undefined, deleted: undefined};
  difference.added = newArr.filter(x => !old.includes(x));
  difference.deleted = old.filter(x => !newArr.includes(x));
  return difference;
}
