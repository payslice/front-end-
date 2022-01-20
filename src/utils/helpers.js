export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function toCurrency(amount) {
  return `NGN ${parseInt(amount).toLocaleString()}`;
}
