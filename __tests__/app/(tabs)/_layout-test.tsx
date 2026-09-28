import * as React from 'react';
import renderer, { act } from 'react-test-renderer';

import TabLayout from '@/app/(tabs)/_layout';
import { Colors } from '@/constants/Colors';

jest.mock('@/hooks/useColorScheme', () => ({ useColorScheme: jest.fn() }));

jest.mock('expo-router', () => {
  const MockTabs = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
  MockTabs.Screen = () => null;
  return { Tabs: MockTabs };
});

const mockUseColorScheme = jest.requireMock('@/hooks/useColorScheme').useColorScheme as jest.Mock;
const { Tabs } = jest.requireMock('expo-router');

async function activeTintColor() {
  let tree!: renderer.ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(<TabLayout />);
  });
  return tree.root.findByType(Tabs).props.screenOptions.tabBarActiveTintColor;
}

describe('TabLayout tabBarActiveTintColor', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReset();
  });

  it('uses Colors.dark.tint in dark mode', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect(await activeTintColor()).toBe(Colors.dark.tint);
  });

  it.each([null, 'unspecified'])('uses Colors.light.tint for a %p color scheme', async (scheme) => {
    mockUseColorScheme.mockReturnValue(scheme);

    expect(await activeTintColor()).toBe(Colors.light.tint);
  });
});
