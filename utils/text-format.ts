/**
 * Capitalizes the first character of a string.
 *
 * @param string - The input string.
 * @returns The input string with the first character capitalized.
 */
export function capitalizeFirstCharacter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
