import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="index" options={{ headerTitle: 'Tourism Helper Guide',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
        }, }} />
        <Stack.Screen name="Options" options={{ headerTitle: 'Tourism Helper Guide',
        headerTitleAlign: 'center',
        headerStyle: {
          // backgroundColor: '#001645',
          
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
        }, }} />
        <Stack.Screen name="OptionTypes" options={{ headerTitle: 'Tourism Helper Guide',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
        }, }} />
        <Stack.Screen name="Places" options={{ headerTitle: 'Tourism Helper Guide',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
        }, }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
