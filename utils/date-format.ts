/**
 * Formats a date string into a localized date format.
 *
 * @param date - The date string to format.
 * @param year - The format for the year. Defaults to '2-digit'.
 * @returns The formatted date string.
 */
export function formatDate(date: string, format?: { year: 'numeric' | '2-digit', month: 'numeric' | 'short', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('en-US', {
    year: format?.year ?? 'numeric',
    month: format?.month ?? 'short',
    day: format?.day ?? 'numeric',
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
