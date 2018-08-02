import {T} from '@angular/core/src/render3';

export interface ArrDiff {
  added: T[];
  deleted: T[];
}

export interface Foo {
  name: string;
  type: string;
}

export function arrayDiff(old: T[], newArr: T[]): ArrDiff {
  const difference: ArrDiff = {added: undefined, deleted: undefined};
  difference.added = newArr.filter(x => !old.includes(x));
  difference.deleted = old.filter(x => !newArr.includes(x));
  return difference;
}
