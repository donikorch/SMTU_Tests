import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module8() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const onHandleAreaClick = (e, index) => {
    let count;
    test === 1 ? (count = 5) : test === 2 ? (count = 4) : (count = 0);

    if (index < count) {
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

            if (index === count - 1) {
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

          if (index === count - 1) {
            const element = text2.current;
            if (element) {
              element.style.display = 'none';
            }
          }

          return { ...prevAnswers, [`question${index}`]: true };
        }

        return prevAnswers;
      });

      if (index === count - 1) {
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
      module: 8,
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
              Укажите формулы описания поверхностей.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>1. Плоскость</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module8/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '215px',
                        left: '52px',
                        width: '284px',
                        height: '52px',
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
                  <div className='mb-5 text2'>2. Тор</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module8/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '24px',
                        left: '52px',
                        width: '317px',
                        height: '145px',
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
                    3. Параметрическая поверхность
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module8/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '24px',
                        left: '428px',
                        width: '209px',
                        height: '146px',
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
                  <div className='mb-5 text2'>4. Эллипсоид</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module8/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '308px',
                        left: '262px',
                        width: '258px',
                        height: '158px',
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
        ) : (
          test === 2 && (
            <>
              <div className='mb-5 text' ref={text2}>
                Примените кинематический принцип путем сдвига контура для
                построения поверхности.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>1. Укажите контур.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module8/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '60px',
                          left: '224px',
                          height: '398px',
                          width: '166px',
                          transform: 'rotate(-35deg)',
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
                      2. Укажите траекторию сдвига.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module8/test2/2.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '151px',
                          left: '247px',
                          width: '252px',
                          height: '20px',
                          transform: 'rotate(-30deg)',
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
                      3. Готово. Щелкните по началу координат.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <img
                        src='/img/Module8/test2/3.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '425px',
                          left: '51px',
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
          )
        )
      ) : (
        <>
          <SelectTest moduleId={8} setTest={setTest} />
        </>
      )}
    </>
  );
}

export default Module8;
