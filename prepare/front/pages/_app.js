import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';

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

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default NodeBird;
