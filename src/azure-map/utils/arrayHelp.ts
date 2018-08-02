export interface ArrDiff<T> {
  added: T[];
  deleted: T[];
}


export function arrayDiff<T>(old: T[], newArr: T[]): ArrDiff<T> {
  return {
    added: newArr.filter(x => !old.includes(x)),
    deleted: old.filter(x => !newArr.includes(x))
  };
}
