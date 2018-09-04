  export interface ArrDiff<T> {
    added: T[];
    deleted: T[];
  }


export function arrayDiff<T>(old: T[], newArr: T[]): ArrDiff<T> {
  const key1 = JSON.stringify(old).toLowerCase();
  const key2 = JSON.stringify(newArr).toLowerCase();

  console.log(key1);
  console.log(key2);

  if (JSON.stringify(old).toLowerCase() === JSON.stringify(newArr).toLowerCase()) {
    return {
      added: [],
      deleted: []
    };
  } else {
    return {
      added: newArr.filter(x => !old.includes(x)),
      deleted: old.filter(x => !newArr.includes(x))
    };
  }
}
