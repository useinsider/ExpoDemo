import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import CustomButton from '@/components/CustomButton';

export async function render(element: React.ReactElement) {
  let tree!: renderer.ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(element);
  });
  return tree;
}

export function buttonTexts(tree: renderer.ReactTestRenderer) {
  return tree.root.findAllByType(CustomButton).map((button) => button.props.text);
}

export async function press(tree: renderer.ReactTestRenderer, text: string) {
  const button = tree.root.find((node) => node.type === CustomButton && node.props.text === text);
  await act(async () => {
    button.findByType(TouchableHighlight).props.onPress();
  });
}
