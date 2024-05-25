import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function ModalW({ isOpen, onClose, user }) {
  const [form, setForm] = useState({
    id: user.id,
    login: user.login,
    password: '*******',
    name: user.name || null,
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    middleName: user.middleName || null,
    role: user.role,
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put('/api/teacher', form);
      if (result.data) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Body>
          <Form className='mb-5' id='myForm' onSubmit={onHandleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type='text'
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type='password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </Form.Group>
            {user.role === 'admin' && (
              <>
                <Form.Group className='mb-3'>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Отчество</Form.Label>
                  <Form.Control
                    type='text'
                    name='middleName'
                    value={form.middleName}
                    onChange={(e) =>
                      setForm({ ...form, middleName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </>
            )}
            {user.role === 'student' && (
              <>
                <Form.Group className='mb-3'>
                  <Form.Label>ФИО</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Отменить
          </Button>

          <Button variant='primary' type='submit' form='myForm'>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalW;
