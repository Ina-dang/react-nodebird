import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((event) => {
    setId(event.target.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  return (
    <Form>
      <div>
        <label htmlFor='user-id'>아이디</label>
        <br />
        <Input name='user-id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br />
        <Input
          name='user-password'
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div>
        <Button type='primary' htmlType='submit' loading={false}>
          로그인
        </Button>
        <Link href='/signup'>
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
