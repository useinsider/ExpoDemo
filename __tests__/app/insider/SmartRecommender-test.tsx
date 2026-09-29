import * as React from 'react';
import RNInsider from 'react-native-insider';

import SmartRecommender from '@/app/insider/SmartRecommender';
import { buttonTexts, press, render } from '@/test-utils/screen';

const product = (index: number) => (RNInsider.createNewProduct as jest.Mock).mock.results[index].value;

describe('SmartRecommender screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the recommendation buttons', async () => {
    const tree = await render(<SmartRecommender />);

    expect(buttonTexts(tree)).toEqual(['Get Smart Recommender Data', 'Trigger Add To Cart & Purchase']);
  });

  it('Get Smart Recommender Data requests all three recommendation variants', async () => {
    const tree = await render(<SmartRecommender />);

    await press(tree, 'Get Smart Recommender Data');

    expect(RNInsider.getSmartRecommendation).toHaveBeenCalledWith(1, 'tr_TR', 'TRY', expect.any(Function));
    expect(RNInsider.getSmartRecommendationWithProduct).toHaveBeenCalledWith(
      product(0),
      1,
      'tr_TR',
      expect.any(Function)
    );
    expect(RNInsider.getSmartRecommendationWithProductIDs).toHaveBeenCalledWith(
      ['XX', 'YY', 'ZZ'],
      1,
      'en_US',
      'US',
      expect.any(Function)
    );
  });

  it('Trigger Add To Cart & Purchase clicks, adds and purchases once the recommendation arrives', async () => {
    const tree = await render(<SmartRecommender />);

    await press(tree, 'Trigger Add To Cart & Purchase');

    expect(RNInsider.getSmartRecommendation).toHaveBeenCalledWith(1, 'tr_TR', 'TRY', expect.any(Function));
    expect(RNInsider.clickSmartRecommendationProduct).not.toHaveBeenCalled();

    const onRecommendation = (RNInsider.getSmartRecommendation as jest.Mock).mock.calls[0][3];
    onRecommendation({ data: [] });

    expect(RNInsider.clickSmartRecommendationProduct).toHaveBeenCalledWith(1, product(0));
    expect(RNInsider.itemAddedToCart).toHaveBeenCalledWith(product(0));
    expect(RNInsider.itemPurchased).toHaveBeenCalledWith(expect.stringMatching(/^sale_id_\d+$/), product(0));
  });
});
