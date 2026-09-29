import * as React from 'react';
import RNInsider from 'react-native-insider';
import InsiderGender from 'react-native-insider/src/InsiderGender';

import UserAttribute from '@/app/insider/UserAttribute';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('UserAttribute screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single Set Attribute button', async () => {
    const tree = await render(<UserAttribute />);

    expect(buttonTexts(tree)).toEqual(['Set Attribute']);
  });

  it('sets every demo attribute on the current user', async () => {
    const tree = await render(<UserAttribute />);

    await press(tree, 'Set Attribute');

    const user = RNInsider.getCurrentUser() as any;
    expect(user.setName).toHaveBeenCalledWith('Insider');
    expect(user.setSurname).toHaveBeenCalledWith('Demo');
    expect(user.setAge).toHaveBeenCalledWith(23);
    expect(user.setGender).toHaveBeenCalledWith(InsiderGender.Other);
    expect(user.setBirthday).toHaveBeenCalledWith(expect.any(Date));
    expect(user.setEmailOptin).toHaveBeenCalledWith(true);
    expect(user.setSMSOptin).toHaveBeenCalledWith(false);
    expect(user.setPushOptin).toHaveBeenCalledWith(true);
    expect(user.setLocationOptin).toHaveBeenCalledWith(true);
    expect(user.setFacebookID).toHaveBeenCalledWith('Facebook-ID');
    expect(user.setTwitterID).toHaveBeenCalledWith('Twittter-ID');
    expect(user.setLanguage).toHaveBeenCalledWith('TR');
    expect(user.setLocale).toHaveBeenCalledWith('tr_TR');
  });
});
