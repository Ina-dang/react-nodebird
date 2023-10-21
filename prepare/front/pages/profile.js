import Head from 'next/head';
import React from 'react';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const followerList = [
    { nickname: '이나당' },
    { nickname: '예로미' },
    { nickname: '막철' },
  ];
  const followingList = [
    { nickname: '이나당' },
    { nickname: '예로미' },
    { nickname: '막철' },
  ];
  return (
    <AppLayout>
      <Head>
        <meta charSet='utf=8' />
        <title>내 프로필 | profile</title>
      </Head>
      <NicknameEditForm />
      <FollowList header='팔로잉 목록' data={followingList} />
      <FollowList header='팔로워 목록' data={followerList} />
    </AppLayout>
  );
};

export default Profile;
