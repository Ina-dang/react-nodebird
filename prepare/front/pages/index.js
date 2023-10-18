import React from 'react';
import AppLayout from '../components/AppLayout';

/**
 * 첫 랜더페이지 (구버전 Next는 Pages 안에 있는 컴포넌트들을 코드스플리팅된 각 페이지로 매핑한다)
 * @returns React.Componenet
 */
const Home = () => {
  return (
    <AppLayout>
      <div>Hello, Next!</div>
    </AppLayout>
  );
};
export default Home;