import axios from 'axios';
import { useState } from 'react';
import ModalW from './ModalW';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function UserCard({ user, setUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditOpen = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const result = window.confirm('Вы уверены, что хотите удалить?');
    if (result) {
      try {
        await axios.delete(`/api/teacher/${user.role}/${user.id}`);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    }
  };

  return (
    <Col md={12} className='mb-3'>
      <Card className='teacher-card shadow-sm'>
        <Card.Body>
          <Card.Title>
            {user.role === 'admin' ? (
              <>
                ФИО: {user.lastName} {user.firstName} {user.middleName}
              </>
            ) : (
              user.name
            )}
          </Card.Title>
          <Card.Text>
            <strong>Логин:</strong> {user.login}
          </Card.Text>
        </Card.Body>
        {user.login !== 'admin' && (
          <Card.Footer className='text-muted d-flex justify-content-end'>
            <img
              className='icon'
              src='/edit.svg'
              alt='Change'
              onClick={handleEditOpen}
            />
            <img
              className='icon ms-3'
              src='/delete.svg'
              alt='Delete'
              onClick={handleDelete}
            />
          </Card.Footer>
        )}
      </Card>
      {isModalOpen && (
        <ModalW isOpen={isModalOpen} onClose={closeModal} user={user} />
      )}
    </Col>
  );
}

export default UserCard;
