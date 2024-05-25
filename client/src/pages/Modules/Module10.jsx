import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Module10() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const text2 = useRef(null);
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const correctAnswers1 = {
    question1: 'БВ',
    question2: 'А',
  };

  const correctAnswers2 = {
    question1: 'ПОЛУСФЕРА Д30',
    question2: 'КОНУС ДН30 ДК56 ДЛ50',
    question3: 'ЦИЛИНДР Д56 ДЛ30',
    question4: 'КОНУС ДН56 ДК0 ДЛ60',
  };

  const onHandleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onHandleAreaClick1 = (e, index) => {
    if (index < 4) {
      const maxAttempts = 5;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          (e.target.className === 'area' &&
            inputValue !== correctAnswers1[`question${index}`] &&
            index !== 3)
        ) {
          if (attempts < maxAttempts - 1) {
            alert(
              `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
            );
            return { ...prevAnswers, [`question${index}`]: attempts + 1 };
          } else {
            alert('Неверно! Попытки кончились.');
            setQuestion(index + 1);
            setInputValue('');

            if (index === 3) {
              const element = text2.current;
              if (element) {
                element.style.display = 'none';
              }
            }

            return { ...prevAnswers, [`question${index}`]: false };
          }
        }

        if (
          (e.target.className === 'area' &&
            inputValue === correctAnswers1[`question${index}`] &&
            index !== 3) ||
          (e.target.className === 'area' && index === 3)
        ) {
          setQuestion(index + 1);
          setInputValue('');

          if (index === 3) {
            const element = text2.current;
            if (element) {
              element.style.display = 'none';
            }
          }

          return { ...prevAnswers, [`question${index}`]: true };
        }

        return prevAnswers;
      });

      if (index === 3) {
        setAnswers((prevAnswers) => {
          const totalQuestions = Object.keys(prevAnswers).length;
          let correctCount = 0;
          for (const key in prevAnswers) {
            if (prevAnswers[key] === true) {
              correctCount++;
            }
          }
          const calculatedScore = Math.round(
            (correctCount / totalQuestions) * 100
          );
          setScore(calculatedScore);
          return prevAnswers;
        });
      }
    }
  };

  const onHandleAreaClick2 = (e, index) => {
    if (index < 5) {
      const maxAttempts = 5;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          (e.target.className === 'area' &&
            inputValue !== correctAnswers2[`question${index}`])
        ) {
          if (attempts < maxAttempts - 1) {
            alert(
              `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
            );
            return { ...prevAnswers, [`question${index}`]: attempts + 1 };
          } else {
            alert('Неверно! Попытки кончились.');
            setQuestion(index + 1);
            setInputValue('');

            if (index === 4) {
              const element = text2.current;
              if (element) {
                element.style.display = 'none';
              }
            }

            return { ...prevAnswers, [`question${index}`]: false };
          }
        }

        if (
          e.target.className === 'area' &&
          inputValue === correctAnswers2[`question${index}`]
        ) {
          setQuestion(index + 1);
          setInputValue('');

          if (index === 4) {
            const element = text2.current;
            if (element) {
              element.style.display = 'none';
            }
          }

          return { ...prevAnswers, [`question${index}`]: true };
        }

        return prevAnswers;
      });

      if (index === 4) {
        setAnswers((prevAnswers) => {
          const totalQuestions = Object.keys(prevAnswers).length;
          let correctCount = 0;
          for (const key in prevAnswers) {
            if (prevAnswers[key] === true) {
              correctCount++;
            }
          }
          const calculatedScore = Math.round(
            (correctCount / totalQuestions) * 100
          );
          setScore(calculatedScore);
          return prevAnswers;
        });
      }
    }
  };

  const onHandleButtonClick = async () => {
    const result = {
      module: 10,
      type: test,
      passed: score >= 60,
      score,
      userId: user.id,
    };

    await axios.post('/api/tests/saveResults', result);

    setTest(0);
    setQuestion(1);
    setAnswers({});
    setScore(null);

    navigate('/tests');
  };

  return (
    <>
      {test ? (
        test === 1 ? (
          <>
            <div className='mb-5 text' ref={text2}>
              Выполните построение трехмерного тела, используя базовые элементы
              (проекции) и операции над ними.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    1. Наберите буквенные обозначения двух элементов (без
                    пробелов) и щелкните название операции для получения
                    промежуточного построения.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 1)}
                  >
                    <img
                      src='/img/Module10/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '383px',
                        left: '205px',
                        width: '118px',
                        height: '25px',
                      }}
                      className='area'
                    ></div>
                  </div>
                  <div>
                    <InputGroup size='lg' className='mb-3'>
                      <Form.Control
                        type='text'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Введите ответ'
                        required
                        value={inputValue}
                        onChange={onHandleInputChange}
                      />
                    </InputGroup>
                  </div>
                </div>
              </>
            )}
            {question === 2 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    2. Напишите буквенное обозначение следующего элемента и
                    выберите операцию.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 2)}
                  >
                    <img
                      src='/img/Module10/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '383px',
                        left: '218px',
                        width: '118px',
                        height: '25px',
                      }}
                      className='area'
                    ></div>
                  </div>
                  <div>
                    <InputGroup size='lg' className='mb-3'>
                      <Form.Control
                        type='text'
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Введите ответ'
                        required
                        value={inputValue}
                        onChange={onHandleInputChange}
                      />
                    </InputGroup>
                  </div>
                </div>
              </>
            )}
            {question === 3 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    3. Готово. Щелкните по началу координат.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 3)}
                  >
                    <img
                      src='/img/Module10/test1/3.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '201px',
                        left: '218px',
                        width: '20px',
                        height: '20px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 4 && (
              <>
                <div className='mb-5 text'>Тест пройден на {score}%</div>
                <Button variant='secondary' onClick={onHandleButtonClick}>
                  ОК
                </Button>
              </>
            )}
          </>
        ) : (
          test === 2 && (
            <>
              <div className='mb-5 text' ref={text2}>
                Выполните описание тела с помощью операторов формализованного
                языка <br />
                (ЦИЛИНДР, СФЕРА, ПОЛУСФЕРА, КОНУС) и параметров: <br />Д
                (диаметр), ДН (начальный диаметр), ДК (конечный диаметр), ДЛ
                (длина).
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      1. Описание 1-го элемента и щелчок на его номере.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 1)}
                    >
                      <img
                        src='/img/Module10/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '143px',
                          left: '31px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                    <div>
                      <InputGroup size='lg' className='mb-3'>
                        <Form.Control
                          type='text'
                          aria-describedby='inputGroup-sizing-sm'
                          placeholder='Введите ответ'
                          required
                          value={inputValue}
                          onChange={onHandleInputChange}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </>
              )}
              {question === 2 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      2. Описание 2-го элемента и щелчок на его номере.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 2)}
                    >
                      <img
                        src='/img/Module10/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '127px',
                          left: '127px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                    <div>
                      <InputGroup size='lg' className='mb-3'>
                        <Form.Control
                          type='text'
                          aria-describedby='inputGroup-sizing-sm'
                          placeholder='Введите ответ'
                          required
                          value={inputValue}
                          onChange={onHandleInputChange}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </>
              )}
              {question === 3 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      3. Описание 3-го элемента и щелчок на его номере.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 3)}
                    >
                      <img
                        src='/img/Module10/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '125px',
                          left: '227px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                    <div>
                      <InputGroup size='lg' className='mb-3'>
                        <Form.Control
                          type='text'
                          aria-describedby='inputGroup-sizing-sm'
                          placeholder='Введите ответ'
                          required
                          value={inputValue}
                          onChange={onHandleInputChange}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </>
              )}
              {question === 4 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      4. Описание 4-го элемента и щелчок на его номере.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 4)}
                    >
                      <img
                        src='/img/Module10/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '127px',
                          left: '382px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                    <div>
                      <InputGroup size='lg' className='mb-3'>
                        <Form.Control
                          type='text'
                          aria-describedby='inputGroup-sizing-sm'
                          placeholder='Введите ответ'
                          required
                          value={inputValue}
                          onChange={onHandleInputChange}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </>
              )}
              {question === 5 && (
                <>
                  <div className='mb-5 text'>Тест пройден на {score}%</div>
                  <Button variant='secondary' onClick={onHandleButtonClick}>
                    ОК
                  </Button>
                </>
              )}
            </>
          )
        )
      ) : (
        <div className='tests'>
          <SelectTest moduleId={10} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module10;
