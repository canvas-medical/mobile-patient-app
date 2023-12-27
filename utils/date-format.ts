export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

export function timeZoneOffset(date: string) {
  return new Date(new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60000));
}
