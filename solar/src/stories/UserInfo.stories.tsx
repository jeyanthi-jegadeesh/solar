import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserInfo, { UserInfoProps } from '../components/user/UserInfo';

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  argTypes: {
    imageUrl: { control: 'text' }
  }
} as Meta;

const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  imageUrl: 'https://via.placeholder.com/150'
};
