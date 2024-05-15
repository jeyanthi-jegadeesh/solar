import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserNavbar from '../components/user/UserNavbar';

export default {
  title: 'Components/UserNavbar',
  component: UserNavbar
} as Meta;

const Template: Story = () => <UserNavbar />;

export const Default = Template.bind({});

