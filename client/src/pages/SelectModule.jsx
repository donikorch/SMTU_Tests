import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { modules } from './Modules/modules';

function SelectModule() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/tests/getResults')
      .then((res) => {
        setResults(res.data.results);
      })
      .catch(console.log);
  }, []);

  const disableModule = (moduleId) => {
    const result =
      results.filter(
        (item) =>
          item.module === moduleId && (item.type === 1 || item.type === 2)
      ).length === 2;

    return result;
  };

  const onHandleLink = (index) => {
    navigate(`/tests/${index}`);
  };

  return (
    <Container className='tests'>
      <span className='mb-5 text'>Выберите модуль</span>
      <ButtonGroup vertical size='lg' className='buttons'>
        {modules.map((item) => {
          const part1Result = results.find(
            (el) => el?.module === item.id && el?.type === 1
          );
          const part2Result = results.find(
            (el) => el?.module === item.id && el?.type === 2
          );

          return (
            <Button
              key={item.id}
              variant='outline-secondary'
              onClick={() => onHandleLink(item.id)}
              disabled={disableModule(item.id)}
            >
              <div className='module-text'>
                <div>
                  <b>
                    Модуль {item.id}: {item.name}
                  </b>
                </div>
                <div>
                  Часть 1: {part1Result ? part1Result.score + '%' : '??%'} |
                  Часть 2: {part2Result ? part2Result.score + '%' : '??%'}
                </div>
              </div>
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
}

export default SelectModule;
