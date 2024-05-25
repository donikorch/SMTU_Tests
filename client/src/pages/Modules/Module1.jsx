import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Module1() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const text2 = useRef(null);

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const correctAnswers = {
    question1: '22220000000055554444',
    question2: '6',
    question3: '3',
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
            inputValue !== correctAnswers[`question${index}`])
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
          e.target.className === 'area' &&
          inputValue === correctAnswers[`question${index}`]
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

        if (e.target.className === 'img') {
          if (attempts < maxAttempts - 1) {
            alert(
              `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
            );
            return { ...prevAnswers, [`question${index}`]: attempts + 1 };
          } else {
            alert('Неверно! Попытки кончились.');
            setQuestion(index + 1);

            if (index === 4) {
              const element = text2.current;
              if (element) {
                element.style.display = 'none';
              }
            }

            return { ...prevAnswers, [`question${index}`]: false };
          }
        }

        if (e.target.className === 'area') {
          setQuestion(index + 1);

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
      module: 1,
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
              Используя способ цепочного кодирования, опишите данный контур
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    1. Напишите цепь кодов, используя начальную левую нижнюю
                    точку и обход по часовой стрелке. Щелкните затем по центру
                    векторов направлений.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 1)}
                  >
                    <img
                      src='/img/Module1/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '365px',
                        left: '820px',
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
                    2. Напишите значение координаты Х в указанной точке и
                    сделайте по ней щелчок.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 2)}
                  >
                    <img
                      src='/img/Module1/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '225px',
                        left: '660px',
                        width: '50px',
                        height: '50px',
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
                    3. Напишите значение координаты Y в указанной точке и
                    сделайте по ней щелчок.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick1(e, 3)}
                  >
                    <img
                      src='/img/Module1/test1/3.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '120px',
                        left: '755px',
                        width: '50px',
                        height: '50px',
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
                Выполните перенос точек отрезка на расстояние S=5 по оси Х и
                Р=-2 по оси Y.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      1. Перенесите начальную точку по оси Х, щелкнув в новое
                      положение.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 1)}
                    >
                      <img
                        src='/img/Module1/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '38px',
                          left: '670px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 2 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      2. Перенесите конечную точку по оси Х, щелкнув в новое
                      положение.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 2)}
                    >
                      <img
                        src='/img/Module1/test2/2.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '225px',
                          left: '1040px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 3 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      3. Перенесите конечную точку по оси Y, щелкнув в новое
                      положение.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 3)}
                    >
                      <img
                        src='/img/Module1/test2/3.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '418px',
                          left: '1045px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 4 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      4. Перенесите начальную точку по оси Y, щелкнув в новое
                      положение.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick2(e, 4)}
                    >
                      <img
                        src='/img/Module1/test2/4.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '228px',
                          left: '658px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
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
          <SelectTest moduleId={1} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module1;
