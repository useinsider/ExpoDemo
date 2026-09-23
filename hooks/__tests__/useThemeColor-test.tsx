import * as React from 'react';
import renderer, { act } from 'react-test-renderer';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseColorScheme = jest.requireMock('react-native/Libraries/Utilities/useColorScheme')
  .default as jest.Mock;

async function resolveColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  let result: string | undefined;
  function Probe() {
    result = useThemeColor(props, colorName);
    return null;
  }
  await act(async () => {
    renderer.create(<Probe />);
  });
  return result;
}

describe('useThemeColor', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReset();
  });

  it('returns Colors.dark[colorName] in dark mode', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect(await resolveColor({}, 'text')).toBe(Colors.dark.text);
  });

  it('returns props.dark in dark mode when it is given', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect(await resolveColor({ light: '#111111', dark: '#222222' }, 'text')).toBe('#222222');
  });

  it.each([null, 'unspecified'])(
    'resolves a %p color scheme to the light palette',
    async (scheme) => {
      mockUseColorScheme.mockReturnValue(scheme);

      expect(await resolveColor({}, 'text')).toBe(Colors.light.text);
    }
  );
});
