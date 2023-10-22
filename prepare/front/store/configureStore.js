import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducer from '../reducers';

const configureStore = (context) => {
  console.log(context);
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
