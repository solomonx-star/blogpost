'use client'


import { createContext, useState, useContext } from 'react'
 
export const ThemeContext = createContext(null)
 
export default function ThemeProvider({ children, defaultTheme = 'dark' }) {
  const [theme, setTheme] = useState(defaultTheme)
  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}