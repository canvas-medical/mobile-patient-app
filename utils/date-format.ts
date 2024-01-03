/**
 * Formats a date string into a localized date format.
 *
 * @param date - The date string to format.
 * @param year - The format for the year. Defaults to '2-digit'.
 * @returns The formatted date string.
 */
export function formatDate(date: string, year: 'numeric' | '2-digit' = '2-digit') {
  return new Date(date).toLocaleDateString('en-US', {
    year,
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Adjusts a date string to the local time zone offset.
 *
 * @param date - The date string to adjust.
 * @returns The adjusted date string.
 */
export function timeZoneOffset(date: string) {
  return new Date(new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60000));
}
