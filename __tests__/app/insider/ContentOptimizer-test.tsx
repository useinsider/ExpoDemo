import * as React from 'react';
import RNInsider from 'react-native-insider';
import ContentOptimizerDataType from 'react-native-insider/src/ContentOptimizerDataType';

import ContentOptimizer from '@/app/insider/ContentOptimizer';
import { buttonTexts, press, render } from '@/test-utils/screen';

describe('ContentOptimizer screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single content optimizer button', async () => {
    const tree = await render(<ContentOptimizer />);

    expect(buttonTexts(tree)).toEqual(['Get Variable With Content Optimizer']);
  });

  it('requests string, bool and int variables as elements', async () => {
    const tree = await render(<ContentOptimizer />);

    await press(tree, 'Get Variable With Content Optimizer');

    expect(RNInsider.getContentStringWithName).toHaveBeenCalledWith(
      'string_variable_name',
      'defaultValue',
      ContentOptimizerDataType.Element,
      expect.any(Function)
    );
    expect(RNInsider.getContentBoolWithName).toHaveBeenCalledWith(
      'bool_variable_name',
      true,
      ContentOptimizerDataType.Element,
      expect.any(Function)
    );
    expect(RNInsider.getContentIntWithName).toHaveBeenCalledWith(
      'int_variable_name',
      10,
      ContentOptimizerDataType.Element,
      expect.any(Function)
    );
  });
});
