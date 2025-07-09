'use client'


import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme as nextUseTheme,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export const useTheme = nextUseTheme
