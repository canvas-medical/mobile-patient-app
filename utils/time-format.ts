/**
 * Formats a given date string into a time string.
 *
 * @param dateStr - The date string to be formatted.
 * @param AMPM - A boolean indicating whether to include AM/PM in the date string, defaults to false.
 * @param timezone - A boolean indicating whether to include timezone in the date string, defaults to false.
 * @returns The formatted time string.
 */
export function formatTime(dateStr: string, AMPM: boolean = false, timezone: boolean = false) {
  const date = new Date(dateStr);
  const dateWithTimezone = date.toLocaleString('en-US', { timeZoneName: 'short' });
  const timeZone = timezone && dateWithTimezone?.split(' ').pop();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const strTime = `${(hours %= 12) || '12'}:${minutes < 10 ? `0${minutes}` : minutes} ${AMPM ? ampm : ''} ${timeZone || ''}`.trimEnd();
  return strTime;
}
