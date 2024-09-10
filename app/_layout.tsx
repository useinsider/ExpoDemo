import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import RNInsider from 'react-native-insider';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

const initInsider = () => {
  // FIXME-INSIDER: Please change with your partner name and app group.
  RNInsider.init(
    "your_partner_name",
    "group.com.useinsider.ReactNativeDemo",
    (type: any, data: any) => {
      switch (type) {
        case InsiderCallbackType.NOTIFICATION_OPEN:
          console.log("[INSIDER][NOTIFICATION_OPEN]: ", data);
          break;
        case InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION:
          console.log("[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ", data);
          break;
        case InsiderCallbackType.INAPP_SEEN:
          console.log("[INSIDER][INAPP_SEEN]: ", data);
          break;
      }
    }
  );

  RNInsider.registerWithQuietPermission(false);
  RNInsider.setActiveForegroundPushView();
  RNInsider.startTrackingGeofence();
  RNInsider.enableIDFACollection(false);
  RNInsider.enableIpCollection(false);
  RNInsider.enableLocationCollection(false);
  RNInsider.enableCarrierCollection(false);

  console.log("[INSIDER] initialized");
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  let isInsiderInitialized = false;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initInsider();
  }, [isInsiderInitialized]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
