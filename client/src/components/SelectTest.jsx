import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { tests } from '../pages/Modules/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SelectTest({ moduleId, setTest }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tests/getResults')
      .then((res) => {
        setResults(res.data.results);
      })
      .catch(console.log);
  }, []);

  const disableTest = (moduleId, testId) => {
    const result = results.some(
      (item) => item.module === moduleId && item.type === testId
    );

    return result;
  };

  const onHandleTest = (testId) => {
    switch (testId) {
      case 1:
        setTest(1);
        break;
      case 2:
        setTest(2);
        break;
      default:
        break;
    }
  };

  return (
    <ButtonGroup size='lg' className='mb-2'>
      <Button
        variant='outline-secondary'
        onClick={() => onHandleTest(1)}
        disabled={disableTest(moduleId, 1)}
      >
        {tests.find((item) => item.moduleId === moduleId).firstTest}
      </Button>
      <Button
        variant='outline-secondary'
        onClick={() => onHandleTest(2)}
        disabled={disableTest(moduleId, 2)}
      >
        {tests.find((item) => item.moduleId === moduleId).secondTest}
      </Button>
    </ButtonGroup>
  );
}

SelectTest.propTypes = {
  moduleId: PropTypes.number.isRequired,
  setTest: PropTypes.func,
};

export default SelectTest;
