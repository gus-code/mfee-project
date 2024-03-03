export function shorten(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return `${str.substr(0, str.lastIndexOf(" ", maxLen))}...`;
}
