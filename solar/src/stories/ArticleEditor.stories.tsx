import React from 'react';
import { Story, Meta } from '@storybook/react';
import ArticleEditor from '../components/user/QuizResults';

export default {
  title: 'Components/ArticleEditor',
  component: ArticleEditor
} as Meta;

const Template: Story = () => <ArticleEditor />;

export const Default = Template.bind({});

