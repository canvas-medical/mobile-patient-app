export function formatTime(dateStr: string, AMPM: boolean) {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const strTime = `${(hours %= 12) || '12'}:${minutes < 10 ? `0${minutes}` : minutes} ${AMPM ? ampm : ''}`;
  return strTime;
}
