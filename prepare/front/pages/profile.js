import Head from 'next/head';
import React, { useEffect } from 'react';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <Head>
        <meta charSet='utf=8' />
        <title>내 프로필 | profile</title>
      </Head>
      <NicknameEditForm />
      {me.Followings && <FollowList header='팔로잉' data={me.Followings} />}
      {me.Followers && <FollowList header='팔로워' data={me.Followers} />}
    </AppLayout>
  );
};

export default Profile;
