import * as React from 'react';
import RNInsider from 'react-native-insider';

import Product from '@/app/insider/Product';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('Product screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single Create Product button', async () => {
    const tree = await render(<Product />);

    expect(buttonTexts(tree)).toEqual(['Create Product']);
  });

  it('creates a product and sets its attributes', async () => {
    const tree = await render(<Product />);

    await press(tree, 'Create Product');

    expect(RNInsider.createNewProduct).toHaveBeenCalledWith(
      'productID',
      'productName',
      ['taxonomy1', 'taxonomy2', 'taxonomy3'],
      'imageURL',
      1000.5,
      'currency'
    );
    const product = (RNInsider.createNewProduct as jest.Mock).mock.results[0].value;
    expect(product.setColor).toHaveBeenCalledWith('color');
    expect(product.setVoucherName).toHaveBeenCalledWith('voucherName');
    expect(product.setVoucherDiscount).toHaveBeenCalledWith(10.5);
    expect(product.setPromotionName).toHaveBeenCalledWith('promotionName');
    expect(product.setPromotionDiscount).toHaveBeenCalledWith(10.5);
    expect(product.setSize).toHaveBeenCalledWith('size');
    expect(product.setSalePrice).toHaveBeenCalledWith(10.5);
    expect(product.setShippingCost).toHaveBeenCalledWith(10.5);
    expect(product.setQuantity).toHaveBeenCalledWith(10);
    expect(product.setStock).toHaveBeenCalledWith(10);
    expect(product.setCustomAttributeWithString).toHaveBeenCalledWith('string_parameter', 'This is Insider.');
    expect(product.setCustomAttributeWithInt).toHaveBeenCalledWith('int_parameter', 10);
    expect(product.setCustomAttributeWithDouble).toHaveBeenCalledWith('double_parameter', 10.5);
    expect(product.setCustomAttributeWithBoolean).toHaveBeenCalledWith('bool_parameter', true);
    expect(product.setCustomAttributeWithDate).toHaveBeenCalledWith('date_parameter', expect.any(Date));
    expect(product.setCustomAttributeWithArray).toHaveBeenCalledWith('array_parameter', ['value1', 'value2', 'value3']);
  });
});
