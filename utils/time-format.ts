/**
 * Formats a given date string into a time string.
 *
 * @param dateStr - The date string to be formatted.
 * @param extraInfo - A boolean indicating whether to include additional info in the date string, such as AM/PM or the time zone.
 * @returns The formatted time string.
 */
export function formatTime(dateStr: string, extraInfo: boolean) {
  const date = new Date(dateStr);
  const timeZone = date.toString().match(/((\w*?)(-))/g)[0].replace(/\W/g, '');
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const strTime = `${(hours %= 12) || '12'}:${minutes < 10 ? `0${minutes}` : minutes} ${extraInfo ? `${ampm} ${timeZone}` : ''}`;
  return strTime;
}
