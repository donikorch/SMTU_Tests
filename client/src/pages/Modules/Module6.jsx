import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module6() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const onHandleAreaClick = (e, index) => {
    let count;
    test === 1 ? (count = 8) : test === 2 ? (count = 6) : (count = 0);

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
      module: 6,
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
              Постройте сплайновую кривую на базе представленных точек на
              плоскости.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text2'>
                    1-й шаг – выбор первой точки.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module6/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '442px',
                        left: '45px',
                        width: '20px',
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
                  <div className='mb-5 text2'>2. Выбор 2-й точки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module6/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '257px',
                        left: '172px',
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
                  <div className='mb-5 text2'>3. Выбор 3-й точки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module6/test1/3.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '165px',
                        left: '387px',
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
                  <div className='mb-5 text2'>4. Выбор следующей точки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module6/test1/4.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '42px',
                        left: '557px',
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
                  <div className='mb-5 text2'>5. Выбор следующей точки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src='/img/Module6/test1/5.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '284px',
                        left: '648px',
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
                  <div className='mb-5 text2'>6. Выбор последней точки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src='/img/Module6/test1/6.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '442px',
                        left: '728px',
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
                <div className='question'>
                  <div className='mb-5 text2'>
                    7. Готово. Сделайте щелчок по началу координат.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 7)}
                  >
                    <img
                      src='/img/Module6/test1/7.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '372px',
                        left: '30px',
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
                Укажите формулы построения пространственных кривых.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text2'>
                      1. Формула кубического В-сплайна.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module6/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          left: '2px',
                          height: '79px',
                          width: '594px',
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
                    <div className='mb-5 text2'>2. Формула кривой Безье.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module6/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '121px',
                          left: '319px',
                          width: '280px',
                          height: '123px',
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
                      3. Формула сплайна одной переменной.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <img
                        src='/img/Module6/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '162px',
                          left: '2px',
                          width: '275px',
                          height: '81px',
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
                      4. Формула кубической кривой Безье.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src='/img/Module6/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '398px',
                          left: '179px',
                          width: '350px',
                          height: '92px',
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
                      5. Формула сплайновой функции двух переменных.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src='/img/Module6/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '302px',
                          left: '142px',
                          width: '425px',
                          height: '79px',
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
          <SelectTest moduleId={6} setTest={setTest} />
        </>
      )}
    </>
  );
}

export default Module6;
