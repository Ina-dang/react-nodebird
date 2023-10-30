import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutRequestAction } from '../reducers/user';

const ButtonWrapper = styled(Button)`
  margin-top: 15px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key='followers'>
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <ButtonWrapper onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
