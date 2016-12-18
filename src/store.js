import { createStore, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import ApolloClient from 'apollo-client';

import { reducer as formReducer } from 'redux-form';
import accountReducer from './authentication/accountReducer';

export const client = new ApolloClient();

const rootReducer = combineReducers({
  apollo: client.reducer(),
  form: formReducer,
  account: compose(mergePersistedState())(accountReducer)
});

const storage = compose(filter([
  'account.token',
  'account.userId',
  'account.accountType'
]))(adapter(window.localStorage));

export default () => createStore(
  rootReducer,
  composeWithDevTools(
    persistState(storage, 'account')
  )
);

