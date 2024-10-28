import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from '../components/features/auth/aplication/provider/SessionProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    rickFont1: require('../assets/fonts/get_schwifty.ttf'),
    rickFont2: require('../assets/fonts/get_schwifty.ttf')
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
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name='home' />
          <Stack.Screen name='+not-found' />
          <Stack.Screen name='auth/login'></Stack.Screen>
          <Stack.Screen name='characters/CharactersListScreen' options={{}}
          />
          <Stack.Screen name='episodes/EpisodesListsScreen' />
          <Stack.Screen name='locations/LocationsListsScreen'
          />
          <Stack.Screen name='profile/AuthenticatedUserScreen'
          ></Stack.Screen>
        </Stack>
        {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      </ThemeProvider>
    </SessionProvider>
  );
}
