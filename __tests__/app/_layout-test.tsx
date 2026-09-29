import * as React from 'react';
import RNInsider from 'react-native-insider';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';

import RootLayout from '@/app/_layout';
import { render } from '@/test-utils/screen';

jest.mock('react-native-reanimated', () => ({}));
jest.mock('expo-font', () => ({ useFonts: () => [true] }));
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock('expo-router', () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
  const Stack = Object.assign(Passthrough, { Screen: () => null });
  return { Stack, ThemeProvider: Passthrough, DarkTheme: {}, DefaultTheme: {} };
});
jest.mock('@/hooks/useColorScheme', () => ({ useColorScheme: () => 'light' }));

const init = RNInsider.init as jest.Mock;

describe('RootLayout Insider initialisation', () => {
  let log: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initialises the SDK with the partner name, app group and a callback', async () => {
    await render(<RootLayout />);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(
      'your_partner_name',
      'group.com.useinsider.ReactNativeDemo',
      expect.any(Function)
    );
  });

  it('applies the demo permission and collection settings', async () => {
    await render(<RootLayout />);

    expect(RNInsider.registerWithQuietPermission).toHaveBeenCalledWith(false);
    expect(RNInsider.setActiveForegroundPushView).toHaveBeenCalledTimes(1);
    expect(RNInsider.startTrackingGeofence).toHaveBeenCalledTimes(1);
    expect(RNInsider.enableIDFACollection).toHaveBeenCalledWith(false);
    expect(RNInsider.enableIpCollection).toHaveBeenCalledWith(false);
    expect(RNInsider.enableLocationCollection).toHaveBeenCalledWith(false);
    expect(RNInsider.enableCarrierCollection).toHaveBeenCalledWith(false);
  });

  it('does not initialise again on re-render', async () => {
    const tree = await render(<RootLayout />);

    await React.act(async () => {
      tree.update(<RootLayout />);
    });

    expect(init).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['NOTIFICATION_OPEN', InsiderCallbackType.NOTIFICATION_OPEN],
    ['TEMP_STORE_CUSTOM_ACTION', InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION],
    ['INAPP_SEEN', InsiderCallbackType.INAPP_SEEN],
  ])('logs %s callbacks', async (name, type) => {
    await render(<RootLayout />);
    const callback = init.mock.calls[0][2];

    callback(type, { id: 'payload' });

    expect(log).toHaveBeenCalledWith(`[INSIDER][${name}]: `, { id: 'payload' });
  });
});
