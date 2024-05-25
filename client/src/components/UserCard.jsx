import axios from 'axios';
import { useState } from 'react';
import ModalW from './ModalW';

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
    <div>
      {user.role === 'student' && <> {user.name}</>}
      {user.role === 'admin' && (
        <>
          {' '}
          {user.lastName} {user.firstName} {user.middleName}
        </>
      )}
      {user.login !== 'admin' && (
        <>
          <img
            className='icon'
            src='/edit.svg'
            alt='Change'
            onClick={handleEditOpen}
          />
          <img
            className='icon'
            src='/delete.svg'
            alt='Delete'
            onClick={handleDelete}
          />
        </>
      )}
      {isModalOpen && (
        <>
          <ModalW
            isOpen={isModalOpen}
            onClose={closeModal}
            user={user}
          ></ModalW>
        </>
      )}
    </div>
  );
}

export default UserCard;
