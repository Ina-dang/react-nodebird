import Head from 'next/head';
import React, { useEffect } from 'react';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

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
