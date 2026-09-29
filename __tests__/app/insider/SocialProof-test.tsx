import * as React from 'react';
import RNInsider from 'react-native-insider';

import SocialProof from '@/app/insider/SocialProof';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('SocialProof screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single social proof button', async () => {
    const tree = await render(<SocialProof />);

    expect(buttonTexts(tree)).toEqual(['Trigger Social Proof']);
  });

  it('visits the product detail page of the rendered product', async () => {
    const tree = await render(<SocialProof />);

    await press(tree, 'Trigger Social Proof');

    const product = (RNInsider.createNewProduct as jest.Mock).mock.results.at(-1)!.value;
    expect(RNInsider.visitProductDetailPage).toHaveBeenCalledWith(product);
  });
});
