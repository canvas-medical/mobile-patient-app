import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

/**
 * Custom hook that detects whether the keyboard is currently visible on the screen.
 * It returns a boolean value indicating the visibility of the keyboard.
 *
 * @returns {boolean} - Whether the keyboard is visible or not.
 */
export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

/**
 * Custom hook that detects the height of the keyboard.
 * It returns a number value indicating the height of the keyboard.
 *
 * @returns {number} - The height of the keyboard.
 */
export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  function onKeyboardShow(event: KeyboardEvent) {
    setKeyboardHeight(event.endCoordinates.height);
  }
  function onKeyboardHide() {
    setKeyboardHeight(0);
  }
  useEffect(() => {
    const onShow = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const onHide = Keyboard.addListener('keyboardDidHide', onKeyboardHide);
    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);
  return keyboardHeight;
}
