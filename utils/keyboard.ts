import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

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
