import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Game from '../components/pages/game';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Game',
  component: Game,
} as ComponentMeta<typeof Game>;

export const Primary: ComponentStory<typeof Game> = () => <Game />;
