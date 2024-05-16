import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../Context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(appContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'student') {
      navigate('/tests');
    }
  }, [user, navigate]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const user = { login, password };
    const res = await axios.post('/api/auth/sign-in', user);

    if (res.data.user.role === 'student') {
      setUser(res.data.user);
      navigate('/tests');
    }
    if (res.data.user.role === 'admin') {
      setUser(res.data.user);
      navigate('/teacher');
    }
  };

  return (
    <div className='sign-in'>
      <img src='/SMTU_Logo.png' alt='logo' className='mb-5 logo' />
      <Form onSubmit={onHandleSubmit} className='form-sign-in'>
        <Form.Group className='mb-3'>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type='text'
            placeholder='Введите логин'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant='secondary' type='submit'>
          Войти
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
