import React from 'react';
import { createBrowserHistory } from 'history';
import { render } from 'react-testing-library';

import ApplicationProviders from './ApplicationProviders';
import setupStore from './setupStore';

export function renderWithProviders(ui, { initialState, store } = {}) {
  let appStore = store;
  let history = null;
  if (!store) {
    history = createBrowserHistory();
    appStore = store || setupStore(history, initialState);
  }
  return {
    ...render(
      <ApplicationProviders history={history} store={appStore}>
        {ui}
      </ApplicationProviders>,
    ),
    store: appStore,
  };
}
