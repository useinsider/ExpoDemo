import * as React from 'react';
import RNInsider from 'react-native-insider';

import PageVisit from '@/app/insider/PageVisit';
import { buttonTexts, press, render } from '@/test-utils/screen';

const taxonomy = ['taxonomy1', 'taxonomy2', 'taxonomy3'];
const renderedProduct = () => (RNInsider.createNewProduct as jest.Mock).mock.results.at(-1)!.value;

describe('PageVisit screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the page visit buttons', async () => {
    const tree = await render(<PageVisit />);

    expect(buttonTexts(tree)).toEqual(['Home Page', 'Category Page', 'Cart Page', 'Product Page']);
    expect(RNInsider.createNewProduct).toHaveBeenCalledWith(
      'productID',
      'productName',
      taxonomy,
      'imageURL',
      1000.5,
      'currency'
    );
  });

  it('Home Page visits the home page', async () => {
    const tree = await render(<PageVisit />);

    await press(tree, 'Home Page');

    expect(RNInsider.visitHomePage).toHaveBeenCalledTimes(1);
  });

  it('Category Page visits the listing page with the taxonomy', async () => {
    const tree = await render(<PageVisit />);

    await press(tree, 'Category Page');

    expect(RNInsider.visitListingPage).toHaveBeenCalledWith(taxonomy);
  });

  it('Cart Page visits the cart page with two products', async () => {
    const tree = await render(<PageVisit />);

    await press(tree, 'Cart Page');

    const product = renderedProduct();
    expect(RNInsider.visitCartPage).toHaveBeenCalledWith([product, product]);
  });

  it('Product Page visits the product detail page', async () => {
    const tree = await render(<PageVisit />);

    await press(tree, 'Product Page');

    expect(RNInsider.visitProductDetailPage).toHaveBeenCalledWith(renderedProduct());
  });
});
