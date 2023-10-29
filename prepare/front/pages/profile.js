import Head from 'next/head';
import React from 'react';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <Head>
        <meta charSet='utf=8' />
        <title>내 프로필 | profile</title>
      </Head>
      <NicknameEditForm />
      <FollowList header='팔로잉' data={me.Follwings} />
      <FollowList header='팔로워' data={me.Follwers} />
    </AppLayout>
  );
};

export default Profile;
