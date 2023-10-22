import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';
import { Provider } from 'react-redux';

const NodeBird = ({ Component, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet='utf=8' />
        <title>nodeBird</title>
      </Head>
      <Component />
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
};

export default NodeBird;
