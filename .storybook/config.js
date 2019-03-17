import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    brandTitle: '@blackbox-visiosn/mui-audio-player',
    theme: themes.light,
  },
});

addDecorator(withInfo({ inline: true, header: false }));

const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
