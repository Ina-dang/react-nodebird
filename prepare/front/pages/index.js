import React from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

/**
 * 첫 랜더페이지 (구버전 Next는 Pages 안에 있는 컴포넌트들을 코드스플리팅된 각 페이지로 매핑한다)
 * @returns React.Componenet
 */
const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};
export default Home;
