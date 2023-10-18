import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf=8' />
        <title>nodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
