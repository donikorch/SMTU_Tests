import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module7() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const onHandleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const onHandleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  useEffect(() => {
    if (test === 2) {
      setInputValue1('-10^t');
      setInputValue2('20*t^2');
    }
  }, [test, question]);

  const onHandleAreaClick = (e, index) => {
    if (index < 8) {
      const maxAttempts = 5;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          e.target.className === 'img2' ||
          (e.target.className === 'area' &&
            ((index === 2 && test === 2 && inputValue1 !== '25*(1-t)') ||
              (index === 3 && test === 2 && inputValue2 !== '50*sin(t)')))
        ) {
          if (attempts < maxAttempts - 1) {
            alert(
              `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
            );
            return { ...prevAnswers, [`question${index}`]: attempts + 1 };
          } else {
            alert('Неверно! Попытки кончились.');
            setQuestion(index + 1);

            if (index === 7) {
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
          (e.target.className === 'area' &&
            test === 2 &&
            index !== 2 &&
            index !== 3) ||
          (e.target.className === 'area' &&
            ((index === 2 && inputValue1 === '25*(1-t)' && test === 2) ||
              (index === 3 && test === 2 && inputValue2 === '50*sin(t)')))
        ) {
          setQuestion(index + 1);

          if (index === 7) {
            const element = text2.current;
            if (element) {
              element.style.display = 'none';
            }
          }

          return { ...prevAnswers, [`question${index}`]: true };
        }

        return prevAnswers;
      });

      if (index === 7) {
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
      module: 7,
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
              Постройте сплайн по полюсам путем ввода данных из файла 3_spl.txt.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    1. Выбор панели построения пространственных кривых.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module7/test1/1.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '93px',
                        left: '3px',
                        width: '114px',
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
                    2. Выбор кнопки построения сплайна.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module7/test1/2.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '95px',
                        left: '222px',
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
                  <div className='mb-5 text2'>
                    3. Выбор кнопки для ввода данных.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module7/test1/3.jpg'
                      className='img2'
                      alt='image'
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '319px',
                        left: '9px',
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
                <div className='question'>
                  <div className='mb-5 text2'>4. Выбор файла.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module7/test1/4.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '195px',
                        left: '207px',
                        width: '90px',
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
                <div className='question'>
                  <div className='mb-5 text2'>
                    5. Указание типа построения сплайна.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src='/img/Module7/test1/5.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '205px',
                        left: '36px',
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
                  <div className='mb-5 text2'>6. Завершение построения.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src='/img/Module7/test1/6.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '200px',
                        left: '236px',
                        width: '25px',
                        height: '25px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 7 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    7. Готово. Закройте окно модели.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 7)}
                  >
                    <img
                      src='/img/Module7/test1/7.jpg'
                      className='img2'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '45px',
                        left: '162px',
                        width: '20px',
                        height: '20px',
                      }}
                      className='area'
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 8 && (
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
                Постройте кривую по закону красного цвета с параметрами
                X=25*(1-t) и Y=50*sin(t).
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      1. Выбор кнопки построения кривой.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module7/test2/1.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '143px',
                          left: '296px',
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
                      2. Задайте выражение для координаты X и щелкните по опции.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '345px',
                          left: '99px',
                          width: '137px',
                          height: '23px',
                        }}
                        value={inputValue1}
                        onChange={onHandleInputChange1}
                      />
                      <img
                        src='/img/Module7/test2/2.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '344px',
                          left: '29px',
                          width: '70px',
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
                      3. Задайте выражение для координаты Y и щелкните по опции.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '481px',
                          left: '99px',
                          width: '137px',
                          height: '23px',
                        }}
                        value={inputValue2}
                        onChange={onHandleInputChange2}
                      />
                      <img
                        src='/img/Module7/test2/3.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '480px',
                          left: '29px',
                          width: '70px',
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
                      4. Передвиньте бегунок для показа опций задания цвета
                      кривой.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src='/img/Module7/test2/4.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '346px',
                          left: '265px',
                          width: '20px',
                          height: '265px',
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
                    <div className='mb-5 text2'>5. Выберите цвет.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src='/img/Module7/test2/5.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '521px',
                          left: '99px',
                          width: '162px',
                          height: '25px',
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
                    <div className='mb-5 text2'>6. Завершите команду.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 6)}
                    >
                      <img
                        src='/img/Module7/test2/6.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '200px',
                          left: '236px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 7 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      7. Готово. Закройте окно модели.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 7)}
                    >
                      <img
                        src='/img/Module7/test2/7.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '47px',
                          left: '160px',
                          width: '20px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 8 && (
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
          <SelectTest moduleId={7} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module7;
