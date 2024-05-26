import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module9() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const onHandleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (test === 2) {
      setInputValue('5');
    }
  }, [test]);

  const onHandleAreaClick = (e, index) => {
    const count = test === 1 ? 7 : test === 2 ? 6 : 0;

    if (index < count) {
      const maxAttempts = 5;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          e.target.className === 'img2' ||
          (e.target.className === 'area' &&
            index === 3 &&
            test === 2 &&
            inputValue !== '10')
        ) {
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

        if (
          (e.target.className === 'area' && test === 1) ||
          (e.target.className === 'area' && test === 2 && index !== 3) ||
          (e.target.className === 'area' &&
            index === 3 &&
            inputValue === '10' &&
            test === 2)
        ) {
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
      module: 9,
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
              Постройте линейчатую поверхность по имеющимся пространственным
              кривым.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    1. Выбор панели построения поверхностей.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module9/test1/1.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '81px',
                        left: '3px',
                        width: '99px',
                        height: '20px',
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
                    2. Выбор кнопки команды построения линейчатой поверхности.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module9/test1/2.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '60px',
                        left: '299px',
                        width: '20px',
                        height: '20px',
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
                  <div className='mb-5 text2'>3. Выбор первой кривой.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module9/test1/3.jpg'
                      className='img2'
                      alt='image'
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '238px',
                        left: '45px',
                        width: '204px',
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
                <div className='question'>
                  <div className='mb-5 text2'>4. Указание второй кривой.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module9/test1/4.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '260px',
                        left: '45px',
                        width: '204px',
                        height: '20px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 5 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>5. Завершение построения.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src='/img/Module9/test1/5.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '137px',
                        left: '647px',
                        width: '20px',
                        height: '20px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 6 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    6. Готово. Закройте окно модели.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src='/img/Module9/test1/6.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '39px',
                        left: '138px',
                        width: '20px',
                        height: '20px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 7 && (
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
                Удлините поверхность по правой кромке на расстояние 10.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>1. Выбор кнопки операции.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module9/test2/1.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '122px',
                          left: '278px',
                          height: '20px',
                          width: '20px',
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
                      2. Выбор кромки поверхности.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module9/test2/2.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '252px',
                          left: '629px',
                          width: '20px',
                          height: '173px',
                          transform: 'rotate(-8deg)',
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
                      3. Задание расстояния и щелчок на опции.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '343px',
                          left: '81px',
                          width: '128px',
                          height: '20px',
                        }}
                        value={inputValue}
                        onChange={onHandleInputChange}
                      />
                      <img
                        src='/img/Module9/test2/3.jpg'
                        className='img2'
                        alt='image'
                      />

                      <div
                        style={{
                          position: 'absolute',
                          top: '343px',
                          left: '28px',
                          width: '52px',
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
                  <div className='question'>
                    <div className='mb-5 text2'>4. Завершение операции.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src='/img/Module9/test2/4.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '174px',
                          left: '205px',
                          width: '20px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 5 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      5. Готово. Закройте окно модели.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src='/img/Module9/test2/5.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '39px',
                          left: '137px',
                          width: '20px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 6 && (
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
          <SelectTest moduleId={9} setTest={setTest} />
        </>
      )}
    </>
  );
}

export default Module9;
