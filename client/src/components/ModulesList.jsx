import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { modules } from '../pages/Modules/modules';
import ResultCard from './ResultCard';

function ModulesList({ students }) {
  const [modalStates, setModalStates] = useState(
    modules.reduce((acc, module) => {
      acc[module.id] = false;
      return acc;
    }, {})
  );

  const closeModal = (moduleId) => {
    // Закрытие модального окна для конкретного модуля
    setModalStates((prevStates) => ({
      ...prevStates,
      [moduleId]: false,
    }));
  };

  const handleOpen = (moduleId) => {
    // Открытие модального окна для конкретного модуля
    setModalStates((prevStates) => ({
      ...prevStates,
      [moduleId]: true,
    }));
  };
  return (
    <Container className='results'>
      <ButtonGroup vertical size='lg' style={{ width: '100%' }}>
        {modules.map((item) => (
          <>
            <Button variant='secondary' onClick={() => handleOpen(item.id)}>
              <div className='module-text'>
                Модуль {item.id}: {item.name}
              </div>
            </Button>
            <ResultCard
              item={item.id}
              students={students}
              isOpen={modalStates[item.id]}
              onClose={() => closeModal(item.id)}
            />
          </>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default ModulesList;
