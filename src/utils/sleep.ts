export const sleep = (secons: number = 1) =>
  new Promise((resolve) => setTimeout(resolve, secons * 1000));
