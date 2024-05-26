import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../Context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCard from '../components/UserCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AdminPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const { user } = useContext(appContext);
  const [teachers, setTeachers] = useState([]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
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
      fetchTeachers();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teacher/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <>
      {user?.role === 'admin' ? (
        <>
          <h1 className='mb-5'>Управление преподавателями</h1>
          <Container className='p-5 bg-light rounded panel'>
            <Row style={{ height: '100%' }}>
              <Col md={4}>
                <h3 className='mb-4'>Добавить преподавателя</h3>
                <Form onSubmit={onHandleSubmit}>
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
                      placeholder='Введите фамилию'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Введите имя'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Введите отчество'
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant='primary' type='submit'>
                    Добавить
                  </Button>
                </Form>
              </Col>
              <Col
                md={4}
                className='d-flex justify-content-center align-items-center'
              >
                <div className='divider'></div>
              </Col>
              <Col md={4}>
                <h3 className='mb-4'>Список преподавателей</h3>
                <div className='teachers-list list'>
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <UserCard
                        user={teacher}
                        key={teacher.id}
                        setUsers={setTeachers}
                      />
                    ))
                  ) : (
                    <p>Список пуст</p>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <h1>404</h1>
      )}
    </>
  );
}

export default AdminPage;
