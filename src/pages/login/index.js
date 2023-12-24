import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography, Toast } from '@douyinfe/semi-ui';

import * as userApi from '@/apis/user';
import styles from './style.less';

const { Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDisabled = !username;

  const login = async () => {
    setLoading(true);
    const res = await userApi.login({ username, password });
    setLoading(false);

    if (res.code !== 0) {
      Toast.error('账号或密码错误');
      return;
    }

    if (res.code === 0) {
      localStorage.setItem('token', res.data);
      // TODO: 接入token后，需要去掉username
      localStorage.setItem('username', username);
      navigate('/');
    }
  };

  const onSubmit = async () => {
    login();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>微习惯</h1>
      <Input
        className={styles.input}
        value={username}
        onKeyUp={(e) => e.keyCode === 13 && onSubmit()}
        onChange={setUsername}
        placeholder="账号"
      />
      <Input
        className={styles.input}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="密码"
      />
      <div>
        <Button
          block
          theme="solid"
          type="primary"
          loading={loading}
          disabled={isDisabled}
          onClick={onSubmit}
        >
          登录
        </Button>
      </div>
      <div style={{ textAlign: 'right', marginTop: 5, marginRight: 5 }}>
        <Text link={{ href: '#register' }}>注册</Text>
      </div>
    </div>
  );
}

export default Login;
