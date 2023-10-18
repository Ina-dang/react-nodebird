import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
  return (
    <div>
      {/* class속성이 a태그에 있을경우 legacyBehavior 속성 추가 */}
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/' legacyBehavior>
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'>프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'>회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        {/*브레이크포인트: xs 모바일 <576,  sm 태블릿 >= 576, md 작은데스크탑 >=768 lg: 큰화면 >=992*/}
        <Col xs={24} md={6}>
          왼쪽메뉴
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
