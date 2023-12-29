export function formatDate(date: string, year: 'numeric' | '2-digit' = '2-digit') {
  return new Date(date).toLocaleDateString('en-US', {
    year,
    month: 'short',
    day: 'numeric',
  });
}

export function timeZoneOffset(date: string) {
  return new Date(new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60000));
}
