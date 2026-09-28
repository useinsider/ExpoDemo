import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import ParallaxScrollView from '@/components/ParallaxScrollView';

jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseColorScheme = jest.requireMock('react-native/Libraries/Utilities/useColorScheme')
  .default as jest.Mock;

const headerBackgroundColor = { light: '#A1CEDC', dark: '#1D3D47' };

async function headerBackground() {
  let tree!: renderer.ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(
      <ParallaxScrollView
        headerBackgroundColor={headerBackgroundColor}
        headerImage={<Text testID="header-image">header</Text>}>
        <Text>body</Text>
      </ParallaxScrollView>
    );
  });
  const header = tree.root.findByProps({ testID: 'header-image' }).parent!;
  return StyleSheet.flatten(header.props.style).backgroundColor;
}

describe('ParallaxScrollView header background', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReset();
  });

  it('uses headerBackgroundColor.dark in dark mode', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect(await headerBackground()).toBe(headerBackgroundColor.dark);
  });

  it.each(['light', null, 'unspecified'])(
    'uses headerBackgroundColor.light for a %p color scheme',
    async (scheme) => {
      mockUseColorScheme.mockReturnValue(scheme);

      expect(await headerBackground()).toBe(headerBackgroundColor.light);
    }
  );
});
