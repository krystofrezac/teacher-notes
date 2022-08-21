import { createTheming } from '@callstack/react-theme-provider';

export type SpacingKey = '0' | '1/4' | '1/2' | '1' | '2' | '4';
export type Spacing = Record<SpacingKey, string>;
const spacing: Spacing = {
  '0': '0',
  '1/4': '0.25rem',
  '1/2': '0.5rem',
  '1': '1rem',
  '2': '2rem',
  '4': '4rem',
};

const theme = {
  spacing,
};

export type Theme = typeof theme;

export const { ThemeProvider, withTheme, useTheme } = createTheming(theme);
