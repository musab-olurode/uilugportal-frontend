import { obj } from '../interfaces/obj';

export const normalizeName = (name: string) =>
  name
    .replace(',', '')
    .split(' ')
    .map(
      (nameSlice) =>
        nameSlice.charAt(0).toUpperCase() + nameSlice.slice(1).toLowerCase()
    )
    .join(' ');

export const gradePoints: obj<number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};
