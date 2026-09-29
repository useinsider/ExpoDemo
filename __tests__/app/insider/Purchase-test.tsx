import * as React from 'react';
import RNInsider from 'react-native-insider';

import Purchase from '@/app/insider/Purchase';
import { buttonTexts, press, render } from '@/test-utils/screen';

const renderedProduct = () => (RNInsider.createNewProduct as jest.Mock).mock.results.at(-1)!.value;

describe('Purchase screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the revenue tracking buttons', async () => {
    const tree = await render(<Purchase />);

    expect(buttonTexts(tree)).toEqual(['Item Add To Cart', 'Item Remove From Cart', 'Item Purchase', 'Cart Clear']);
  });

  it('Item Add To Cart adds the product', async () => {
    const tree = await render(<Purchase />);

    await press(tree, 'Item Add To Cart');

    expect(RNInsider.itemAddedToCart).toHaveBeenCalledWith(renderedProduct());
  });

  it('Item Remove From Cart removes the product by ID', async () => {
    const tree = await render(<Purchase />);

    await press(tree, 'Item Remove From Cart');

    expect(RNInsider.itemRemovedFromCart).toHaveBeenCalledWith('productID');
  });

  it('Item Purchase purchases the product with a sale ID', async () => {
    const tree = await render(<Purchase />);

    await press(tree, 'Item Purchase');

    expect(RNInsider.itemPurchased).toHaveBeenCalledWith('uniqueSaleID', renderedProduct());
  });

  it('Cart Clear clears the cart', async () => {
    const tree = await render(<Purchase />);

    await press(tree, 'Cart Clear');

    expect(RNInsider.cartCleared).toHaveBeenCalledTimes(1);
  });
});
