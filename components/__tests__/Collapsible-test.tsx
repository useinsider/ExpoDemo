import * as React from 'react';
import renderer, { act } from 'react-test-renderer';

import { Collapsible } from '@/components/Collapsible';
import { Colors } from '@/constants/Colors';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@expo/vector-icons/Ionicons', () => {
  const { Text } = jest.requireActual('react-native');
  const MockIonicons = (props: { name: string; color: string }) => <Text {...props} />;
  MockIonicons.displayName = 'Ionicons';
  return { __esModule: true, default: MockIonicons };
});

const mockUseColorScheme = jest.requireMock('react-native/Libraries/Utilities/useColorScheme')
  .default as jest.Mock;

async function chevronColor() {
  let tree!: renderer.ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(<Collapsible title="Section">content</Collapsible>);
  });
  return tree.root.findByProps({ name: 'chevron-forward-outline' }).props.color;
}

describe('Collapsible chevron color', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReset();
  });

  it('uses Colors.dark.icon in dark mode', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect(await chevronColor()).toBe(Colors.dark.icon);
  });

  it.each([null, 'unspecified'])('uses Colors.light.icon for a %p color scheme', async (scheme) => {
    mockUseColorScheme.mockReturnValue(scheme);

    expect(await chevronColor()).toBe(Colors.light.icon);
  });
});
