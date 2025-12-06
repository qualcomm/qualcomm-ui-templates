"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

import type {QdsTheme} from "@qualcomm-ui/qds-core/theme"

type ThemeContextValue = {
  setTheme: (theme: QdsTheme) => void
  theme: QdsTheme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme: QdsTheme
}

export function ThemeProvider({
  children,
  defaultTheme,
}: ThemeProviderProps): ReactNode {
  const [theme, setThemeState] = useState<QdsTheme>(defaultTheme)

  const setTheme = useCallback((newTheme: QdsTheme) => {
    document.cookie = `app-qds-theme=${newTheme}; path=/; max-age=31536000`
    document.documentElement.setAttribute("data-theme", newTheme)
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{setTheme, theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
