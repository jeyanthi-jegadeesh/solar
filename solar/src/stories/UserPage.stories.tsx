// src/stories/UserPage.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserPage from '../components/user/UserPage';

export default {
  title: 'Pages/UserPage',
  component: UserPage,
} as Meta;

const Template: Story = () => <UserPage />;

export const Default = Template.bind({});
