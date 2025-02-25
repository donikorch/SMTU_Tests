import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appContext } from '../Context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCard from '../components/UserCard';
import Container from 'react-bootstrap/Container';
import ModulesList from '../components/ModulesList';

function GroupPage() {
  const { group } = useParams();
  const { user } = useContext(appContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [students, setStudents] = useState('');
  const onHandleSubmit = async () => {
    const student = {
      login,
      password,
      name,
      group,
      role: 'student',
    };
    try {
      await axios.post('/api/auth/addUser', student);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(`/api/teacher/${group}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <>
      {user?.role === 'admin' ? (
        <>
          <Container className='panel'>
            <Form className='mb-5' onSubmit={onHandleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  type='text'
                  name='login'
                  placeholder='Введите логин'
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Введите пароль'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Введите ФИО'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Button variant='secondary' type='submit'>
                Создать
              </Button>
            </Form>
            <div>
              <p>Студенты группы N{group}</p>
              {students.length > 0 ? (
                students.map((student) => (
                  <UserCard
                    user={student}
                    key={student.id}
                    setUsers={setStudents}
                  />
                ))
              ) : (
                <p>Список пуст</p>
              )}
            </div>
            <div>
              <p className='mb-2'>Cтатистика группы</p>
              <ModulesList students={students} />
            </div>
          </Container>
        </>
      ) : (
        <h1>404</h1>
      )}
    </>
  );
}

export default GroupPage;
