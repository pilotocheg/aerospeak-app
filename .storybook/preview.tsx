import type { Preview, StoryFn, StoryContext } from '@storybook/react-vite'
import '../src/index.css'

const withThemeClass = (Story: StoryFn, context: StoryContext) => {
  const theme = context.globals.theme ?? 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')

  return Story(context.args, context)
}

const preview: Preview = {
  decorators: [withThemeClass],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'oklch(1 0 0)' },
        { name: 'slate', value: '#0f172a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
}

export default preview