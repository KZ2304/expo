import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { LoadingScreen } from '@/components/ui/loading-screen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts(Ionicons.font);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return <LoadingScreen message="Preparing Daroy..." />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121316' },
        }}
      />
    </ThemeProvider>
  );
}
