import React from 'react';
import { Story, Meta } from '@storybook/react';
import ImageUpload from '../components/user/ImageUpload';

export default {
  title: 'Components/ImageUpload',
  component: ImageUpload
} as Meta;

const Template: Story = () => <ImageUpload />;

export const Default = Template.bind({});
