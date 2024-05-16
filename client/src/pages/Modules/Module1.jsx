import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../../components/SelectTest';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Module1() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const correctAnswers = {
    question1: '22220000000055554444',
    question2: '6',
    question3: '3',
  };

  const onHandleInputChange = (e, index) => {
    setAnswers({ ...answers, [`question${index}`]: e.target.value });
  };

  const onHandleAreaClick1 = (index) => {
    if (!answers[`question${index}`]) {
      alert('Необходимо ввести значение!');
      return;
    }

    if (index < 4) {
      setQuestion(index + 1);

      if (index === 3) {
        const element = text2.current;

        if (element) {
          element.style.display = 'none';
        }
        const totalQuestions = Object.keys(correctAnswers).length;
        let correctCount = 0;
        for (const key in correctAnswers) {
          if (answers[key] === correctAnswers[key]) {
            correctCount++;
          }
        }

        const calculatedScore = Math.round(
          (correctCount / totalQuestions) * 100
        );
        setScore(calculatedScore);
      }
    }
  };

  const onHandleAreaClick2 = (e, index) => {
    if (index < 5) {
      const maxAttempts = 3;
      setAnswers({ ...answers, [`question${index}`]: 1 });

      if (e.target.className === 'img') {
        const attempts = answers[`question${index}`] || 0;
        if (attempts < maxAttempts - 1) {
          setAnswers({ ...answers, [`question${index}`]: attempts + 1 });

          alert(
            `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
          );
        } else {
          setAnswers({ ...answers, [`question${index}`]: false });
          setQuestion(index + 1);

          alert('Неверно! Попытки кончились.');
        }
      }

      if (e.target.className === 'area') {
        setAnswers({ ...answers, [`question${index}`]: true });
        setQuestion(index + 1);
      }

      if (index === 4) {
        const element = text2.current;

        if (element) {
          element.style.display = 'none';
        }

        const totalQuestions = Object.keys(answers).length;
        let correctCount = 0;
        for (const key in answers) {
          if (answers[key] === true) {
            correctCount++;
          }
        }

        const calculatedScore = Math.round(
          (correctCount / totalQuestions) * 100
        );
        setScore(calculatedScore);
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
            <div className='mb-5 text2' ref={text2}>
              Используя способ цепочного кодирования, опишите данный контур
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    1. Напишите цепь кодов, используя начальную левую нижнюю
                    точку и обход по часовой стрелке. Щелкните затем по центру
                    векторов направлений.
                  </div>
                  <div className='container-img'>
                    <img
                      src='/img/Module1/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '348px',
                        left: '780px',
                        width: '25px',
                        height: '25px',
                      }}
                      onClick={() => onHandleAreaClick1(1)}
                    ></div>
                  </div>
                  <div>
                    <InputGroup size='lg' className='mb-3'>
                      <Form.Control
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Введите ответ'
                        required
                        onChange={(e) => onHandleInputChange(e, 1)}
                      />
                    </InputGroup>
                  </div>
                </div>
              </>
            )}
            {question === 2 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    2. Напишите значение координаты Х в указанной точке и
                    сделайте по ней щелчок.
                  </div>
                  <div className='container-img'>
                    <img
                      src='/img/Module1/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '225px',
                        left: '635px',
                        width: '30px',
                        height: '30px',
                      }}
                      onClick={() => onHandleAreaClick1(2)}
                    ></div>
                  </div>
                  <div>
                    <InputGroup size='lg' className='mb-3'>
                      <Form.Control
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Введите ответ'
                        required
                        onChange={(e) => onHandleInputChange(e, 2)}
                      />
                    </InputGroup>
                  </div>
                </div>
              </>
            )}
            {question === 3 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    3. Напишите значение координаты Y в указанной точке и
                    сделайте по ней щелчок.
                  </div>
                  <div className='container-img'>
                    <img
                      src='/img/Module1/test1/3.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '125px',
                        left: '725px',
                        width: '30px',
                        height: '30px',
                      }}
                      onClick={() => onHandleAreaClick1(3)}
                    ></div>
                  </div>
                  <div>
                    <InputGroup size='lg' className='mb-3'>
                      <Form.Control
                        aria-describedby='inputGroup-sizing-sm'
                        placeholder='Введите ответ'
                        required
                        onChange={(e) => onHandleInputChange(e, 3)}
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
              <div className='mb-5 text2' ref={text2}>
                Выполните перенос точек отрезка на расстояние S=5 по оси Х и
                Р=-2 по оси Y.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
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
                          left: '635px',
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
                    <div className='mb-5 text'>
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
                          top: '212px',
                          left: '988px',
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
                    <div className='mb-5 text'>
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
                          top: '398px',
                          left: '992px',
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
                    <div className='mb-5 text'>
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
                          top: '215px',
                          left: '628px',
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
