import * as React from 'react';
import RNInsider from 'react-native-insider';

import UserIdentifier from '@/app/insider/UserIdentifier';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('UserIdentifier screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the Login and Logout buttons', async () => {
    const tree = await render(<UserIdentifier />);

    expect(buttonTexts(tree)).toEqual(['Login', 'Logout']);
  });

  it('Login logs the current user in with the demo email', async () => {
    const tree = await render(<UserIdentifier />);

    await press(tree, 'Login');

    const user = RNInsider.getCurrentUser() as any;
    expect(user.login).toHaveBeenCalledTimes(1);
    const [identifiers, onInsiderID] = user.login.mock.calls[0];
    expect(identifiers.identifiers).toEqual({ addEmail: 'mobilexuseinsider@useinsider.com' });
    expect(onInsiderID).toEqual(expect.any(Function));
    expect(user.logout).not.toHaveBeenCalled();
  });

  it('Logout logs the current user out', async () => {
    const tree = await render(<UserIdentifier />);

    await press(tree, 'Logout');

    const user = RNInsider.getCurrentUser() as any;
    expect(user.logout).toHaveBeenCalledTimes(1);
    expect(user.login).not.toHaveBeenCalled();
  });
});
