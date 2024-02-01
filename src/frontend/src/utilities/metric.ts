//Author: Nico Mangold

//Converts pixels to rem with a root font-size of 16px and returns string
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}
