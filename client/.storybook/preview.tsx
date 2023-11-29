import type { Preview } from "@storybook/react";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux'; 
import { Provider } from 'react-redux';
import { rootReducer } from '../src/store/reducer/index';


const store = createStore(rootReducer)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store = {store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
};

export default preview;
