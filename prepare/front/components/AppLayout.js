import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const items = [
  {
    label: (
      <Link href='/' legacyBehavior>
        <a>노드버드</a>
      </Link>
    ),
    key: 'title',
  },
  {
    label: <Link href='/profile'>프로필</Link>,
    key: 'profile',
  },
  {
    label: (
      <Link href='/' legacyBehavior>
        <SearchInput enterButton />
      </Link>
    ),
    key: 'search',
  },
  {
    label: <Link href='/signup'>회원가입</Link>,
    key: 'signup',
  },
];

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      {/* class속성이 a태그에 있을경우 legacyBehavior 속성 추가 */}
      <Menu mode='horizontal' items={items} />
      <Row gutter={8}>
        {/*브레이크포인트: xs 모바일 <576,  sm 태블릿 >= 576, md 작은데스크탑 >=768 lg: 큰화면 >=992*/}
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href='https://h-owo-ld.tistory.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Made by Inadang
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
