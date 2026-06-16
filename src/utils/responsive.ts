import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design reference dimensions (based on standard mobile viewport layout: 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scales a dimension horizontally (based on screen width ratio).
 * Ideal for: component width, margins, paddings, icon dimensions.
 */
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scales a dimension vertically (based on screen height ratio).
 * Ideal for: component height, vertical paddings, vertical margins.
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Moderates scaling relative to screen size.
 * Ideal for: font sizes, border radius, small icon paddings.
 * Prevents elements from stretching excessively on large screens/tablets.
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Device configuration helpers
 */
export const isTablet = SCREEN_WIDTH >= 600;
export const isSmallDevice = SCREEN_WIDTH < 360;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
