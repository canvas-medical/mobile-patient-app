/**
 * Formats a given date string into a time string.
 *
 * @param dateStr - The date string to be formatted.
 * @param AMPM - A boolean indicating whether to include AM/PM in the formatted time.
 * @returns The formatted time string.
 */
export function formatTime(dateStr: string, AMPM: boolean) {
  const date = new Date(dateStr);
  const timeZone = date.toString().match(/\((-*)\)/)?.pop();
  console.log(date.toString(), timeZone);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const strTime = `${(hours %= 12) || '12'}:${minutes < 10 ? `0${minutes}` : minutes} ${AMPM ? ampm : ''} ${timeZone}`;
  return strTime;
}
