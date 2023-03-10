import { StyleSheet, Dimensions } from 'react-native'
import { createContext, useContext } from 'react'
import { Platform } from 'react-native'

const ThemeContext = createContext()
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

function ThemeProvider (props) {
  return <ThemeContext.Provider value={styleVariables} {...props} />
}

function useTheme () {
  const context = useContext(ThemeContext)
  if (!context) throw new Error(`Not inside the ThemeContext Provider`)
  return context
}

const styleVariables = {
  colors: {
    primary: '#00696c',
    onPrimary: '#ffffff',
    primaryContainer: '#6ff6fa',
    onPrimaryContainer: '#002021',
    secondary: '#4a6363',
    onSecondary: '#ffffff',
    secondaryContainer: '#cce8e8',
    onSecondaryContainer: '#041f20',
    tertiary: '#4d5f7c',
    onTertiary: '#ffffff',
    tertiaryContainer: '#d4e3ff',
    onTertiaryContainer: '#061c36',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#fafdfc',
    onBackground: '#191c1c',
    surface: '#fafdfc',
    onSurface: '#191c1c',
    surfaceVariant: '#dae4e4',
    onSurfaceVariant: '#3f4949',
    outline: '#6f7979'
  },
  fontSizes: {
    displayLarge: { fontSize: 57, fontWeight: '400' },
    displayMedium: { fontSize: 45, fontWeight: '400' },
    displaySmall: { fontSize: 36, fontWeight: '400' },
    headlineLarge: { fontSize: 32, fontWeight: '400' },
    headlineMedium: { fontSize: 28, fontWeight: '400' },
    headlineSmall: { fontSize: 24, fontWeight: '400' },
    titleLarge: { fontSize: 22, fontWeight: '400' },
    titleMedium: { fontSize: 16, fontWeight: '500' },
    titleSmall: { fontSize: 14, fontWeight: '500' },
    labelLarge: { fontSize: 14, fontWeight: '500' },
    labelMedium: { fontSize: 12, fontWeight: '500' },
    labelSmall: { fontSize: 11, fontWeight: '500' },
    bodyLarge: { fontSize: 16, fontWeight: '400' },
    bodyMedium: { fontSize: 14, fontWeight: '400' },
    bodySmall: { fontSize: 12, fontWeight: '400' }
  },
  windowHeight,
  windowWidth
}

export { useTheme, ThemeProvider }
