import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../Context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TeacherPage() {
  const [newGroup, setNewGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const { user } = useContext(appContext);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/addGroup', { group: newGroup });
      fetchGroups();
      setNewGroup('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/teacher/groups');
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user?.role === 'admin' ? (
        <>
          <h1 className='mb-5'>Управление группами</h1>
          <Container className='p-5 bg-light rounded panel'>
            <Row style={{ height: '100%' }}>
              <Col md={4}>
                <h3 className='mb-4'>Добавить группу</h3>
                <Form onSubmit={onHandleSubmit}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Группа</Form.Label>
                    <Form.Control
                      className='no-arrows'
                      type='number'
                      name='newGroup'
                      placeholder='Введите номер группы'
                      min={0}
                      required
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
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
                <h3 className='mb-4'>Ваши группы</h3>
                <div className='list'>
                  {groups.length > 0 ? (
                    groups.map((group) => (
                      <div key={group.id}>
                        <a href={`/groups/${group.number}`}>{group.number}</a>
                      </div>
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

export default TeacherPage;
