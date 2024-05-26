import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appContext } from '../Context';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from '../components/UserCard';
import ModulesList from '../components/ModulesList';

function GroupPage() {
  const { group } = useParams();
  const { user } = useContext(appContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [students, setStudents] = useState([]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const student = {
      login,
      password,
      name,
      group,
      role: 'student',
    };
    try {
      await axios.post('/api/auth/addUser', student);
      fetchStudents();
      setLogin('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/api/teacher/${group}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user?.role === 'admin' ? (
        <>
          <h1 className='mb-5'>Управление группой {group}</h1>
          <Container className='p-5 bg-light rounded panel'>
            <Row>
              <Col md={4}>
                <h3 className='mb-4'>Добавить студента</h3>
                <Form onSubmit={onHandleSubmit}>
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
                  <Button variant='primary' type='submit'>
                    Создать
                  </Button>
                </Form>
              </Col>
              <Col
                md={4}
                className='d-flex align-items-center justify-content-center'
              >
                <div className='divider'></div>
              </Col>
              <Col md={4}>
                <h3 className='mb-4'>Студенты группы {group}</h3>
                <div className='list2'>
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
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <h3 className='mb-4'>Статистика группы</h3>
                <ModulesList students={students} />
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

export default GroupPage;
