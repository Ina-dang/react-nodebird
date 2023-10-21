import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  margin-top: 15px;
`;

// eslint-disable-next-line react/prop-types
const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />0
        </div>,
        <div key='followings'>
          팔로잉
          <br />1
        </div>,
        <div key='followers'>
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>Inadang</Avatar>} title='Inadang' />
      <ButtonWrapper onClick={onLogOut}>로그아웃</ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
