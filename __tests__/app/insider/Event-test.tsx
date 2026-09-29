import * as React from 'react';
import RNInsider from 'react-native-insider';

import Event from '@/app/insider/Event';
import { buttonTexts, press, render } from '@/test-utils/screen';

const tagEvent = RNInsider.tagEvent as jest.Mock;

describe('Event screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a single Trigger Events button', async () => {
    const tree = await render(<Event />);

    expect(buttonTexts(tree)).toEqual(['Trigger Events']);
  });

  it('tags and builds the three demo events', async () => {
    const tree = await render(<Event />);

    await press(tree, 'Trigger Events');

    expect(tagEvent.mock.calls).toEqual([['first_event'], ['second_event'], ['third_event']]);
    const [first, second, third] = tagEvent.mock.results.map((result) => result.value);

    expect(first.build).toHaveBeenCalledTimes(1);

    expect(second.addParameterWithInt).toHaveBeenCalledWith('int_parameter', 10);
    expect(second.build).toHaveBeenCalledTimes(1);

    expect(third.addParameterWithString).toHaveBeenCalledWith('string_parameter', 'This is Insider.');
    expect(third.addParameterWithInt).toHaveBeenCalledWith('int_parameter', 10);
    expect(third.addParameterWithDouble).toHaveBeenCalledWith('double_parameter', 10.5);
    expect(third.addParameterWithBoolean).toHaveBeenCalledWith('bool_parameter', true);
    expect(third.addParameterWithDate).toHaveBeenCalledWith('date_parameter', expect.any(Date));
    expect(third.addParameterWithArray).toHaveBeenCalledWith('array_parameter', ['value1', 'value2', 'value3']);
    expect(third.build).toHaveBeenCalledTimes(1);
  });
});
