export const toFixedFromExp = (value: number) => {
  const stringified = value.toString();
  if (stringified.includes('e')) {
    const [, decimals] = stringified.split('e');
    const decimalsCount = Number(decimals.substr(1));
    return value.toFixed(decimalsCount);
  }

  return stringified;
};
