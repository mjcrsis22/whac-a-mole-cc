export const vibrate = (pattern: VibratePattern): boolean => {
  return window.navigator?.vibrate?.(pattern);
};
