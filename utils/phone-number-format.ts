/**
 * Formats a phone number by adding parentheses and dashes.
 *
 * @param value - The phone number to format.
 * @returns The formatted phone number.
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return '';
  const phoneNumber = value.replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}
