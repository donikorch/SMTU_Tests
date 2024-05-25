import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../Context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCard from '../components/UserCard';
import Container from 'react-bootstrap/Container';

function AdminPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const { user } = useContext(appContext);
  const [teachers, SetTeachers] = useState([]);

  const onHandleSubmit = async () => {
    const teacher = {
      login,
      password,
      firstName,
      lastName,
      middleName,
      role: 'admin',
    };
    try {
      await axios.post('/api/auth/addUser', teacher);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await axios.get('/api/teacher/teachers');
        SetTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <>
      {user?.role === 'admin' ? (
        <>
          <Container className='panel'>
            <div>
              <p>Добавить преподавателя</p>

              <Form className='mb-5' onSubmit={onHandleSubmit}>
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
                <Form.Group className='mb-3'>
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    placeholder='Введите фамилия'
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    placeholder='Введите имя'
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Отчество</Form.Label>
                  <Form.Control
                    type='text'
                    name='middleName'
                    placeholder='Введите отчество'
                    value={middleName}
                    required
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Form.Group>
                <Button variant='secondary' type='submit'>
                  Добавить
                </Button>
              </Form>
            </div>
            <div>
              <p>Список преподавателей</p>
              <div>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <UserCard
                      user={teacher}
                      key={teacher.id}
                      setUsers={SetTeachers}
                    />
                  ))
                ) : (
                  <p>Список пуст</p>
                )}
              </div>
            </div>
          </Container>
        </>
      ) : (
        <h1>404</h1>
      )}
    </>
  );
}
export default AdminPage;
