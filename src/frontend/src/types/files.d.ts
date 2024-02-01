//Author: Nico Mangold

///Allow .svg and and .png as import

declare module '*.svg' {
  const file: string;
  export default file;
}

declare module '*.png' {
  const file: string;
  export default file;
}
