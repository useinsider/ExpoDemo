import * as React from 'react';
import RNInsider from 'react-native-insider';

import MessageCenter from '@/app/insider/MessageCenter';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('MessageCenter screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single message center button', async () => {
    const tree = await render(<MessageCenter />);

    expect(buttonTexts(tree)).toEqual(['Get Message Center Data']);
  });

  it('requests up to 100 messages from a window around now', async () => {
    const tree = await render(<MessageCenter />);

    await press(tree, 'Get Message Center Data');

    expect(RNInsider.getMessageCenterData).toHaveBeenCalledWith(
      100,
      expect.any(Date),
      expect.any(Date),
      expect.any(Function)
    );
    const [, startDate, endDate] = (RNInsider.getMessageCenterData as jest.Mock).mock.calls[0];
    expect(startDate.getTime()).toBeLessThan(Date.now());
    expect(endDate.getTime()).toBeGreaterThan(Date.now());
  });
});
