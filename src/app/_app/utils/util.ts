import { Type } from '@angular/core';

export function getComponentProp<T, K extends keyof T>(t: Type<T>, key: string): T[K] {
  if (t.hasOwnProperty(key)) {
    return t[key];
  }

  throw new Error('No Angular property found for ' + t.name);
}

export function renameFunction(fn: () => any | void, newName: string): () => any | void {
  Object.defineProperty(fn, 'name', {
    value: newName,
    writable: true,
  });

  return fn;
}
