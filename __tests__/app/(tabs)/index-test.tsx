import * as React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import Main from '@/app/(tabs)/index';

// The Insider demo sections call the native SDK; this test only covers the
// location-permission request made on mount, so they are stubbed out.
jest.mock('@/app/insider/UserAttribute', () => () => null);
jest.mock('@/app/insider/UserIdentifier', () => () => null);
jest.mock('@/app/insider/Event', () => () => null);
jest.mock('@/app/insider/Product', () => () => null);
jest.mock('@/app/insider/Purchase', () => () => null);
jest.mock('@/app/insider/SmartRecommender', () => () => null);
jest.mock('@/app/insider/SocialProof', () => () => null);
jest.mock('@/app/insider/PageVisit', () => () => null);
jest.mock('@/app/insider/GDPR', () => () => null);
jest.mock('@/app/insider/MessageCenter', () => () => null);
jest.mock('@/app/insider/ContentOptimizer', () => () => null);
jest.mock('@/components/Header', () => () => null);

describe('Home screen location permission request', () => {
  let requestSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.replaceProperty(Platform, 'OS', 'android');
    requestSpy = jest
      .spyOn(PermissionsAndroid, 'request')
      .mockResolvedValue(PermissionsAndroid.RESULTS.DENIED);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('requests ACCESS_FINE_LOCATION exactly once on mount on Android', async () => {
    await act(async () => {
      renderer.create(<Main />);
    });

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      expect.any(Object)
    );
  });

  it('does not request the permission again on re-render', async () => {
    let tree!: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(<Main />);
    });
    await act(async () => {
      tree.update(<Main />);
    });
    await act(async () => {
      tree.update(<Main />);
    });

    expect(requestSpy).toHaveBeenCalledTimes(1);
  });
});
