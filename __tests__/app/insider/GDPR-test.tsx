import * as React from 'react';
import RNInsider from 'react-native-insider';

import GDPR from '@/app/insider/GDPR';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('GDPR screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the consent buttons', async () => {
    const tree = await render(<GDPR />);

    expect(buttonTexts(tree)).toEqual(['GDPR True', 'GDPR False']);
  });

  it.each([
    ['GDPR True', true],
    ['GDPR False', false],
  ])('%s sets the GDPR consent to %p', async (text, consent) => {
    const tree = await render(<GDPR />);

    await press(tree, text);

    expect(RNInsider.setGDPRConsent).toHaveBeenCalledTimes(1);
    expect(RNInsider.setGDPRConsent).toHaveBeenCalledWith(consent);
  });
});
