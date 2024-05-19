import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module4() {
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
    if (test === 1) {
      setInputValue('1');
    }
    if (test === 2) {
      setInputValue('Слой 1');
    }
  }, [test]);

  const onHandleAreaClick = (e, index) => {
    const count = test === 1 ? 7 : test === 2 ? 6 : 0;

    if (index < count) {
      const maxAttempts = 3;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          e.target.className === 'img2' ||
          (e.target.className === 'area' &&
            ((index === 4 && test === 1 && inputValue !== '0.2') ||
              (index === 3 && test === 2 && inputValue !== 'Размеры')))
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
          (e.target.className === 'area' && test === 1 && index !== 4) ||
          (e.target.className === 'area' && test === 2 && index !== 3) ||
          (e.target.className === 'area' &&
            ((index === 4 && inputValue === '0.2' && test === 1) ||
              (index === 3 && inputValue === 'Размеры' && test === 2)))
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
      module: 4,
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
              Выполните вставку фрагмента из файла ПРОЕКТ с разрушением,
              масштабом 0.2 и точкой вставки в начало координат.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    1-й шаг – выбор кнопки для вызова команды.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module4/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '724px',
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
                  <div className='mb-5 text'>
                    2-й шаг – Выбор файла фрагмента.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module4/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '122px',
                        left: '279px',
                        width: '65px',
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
                  <div className='mb-5 text'>3. Выбор способа вставки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module4/test1/3.jpg'
                      className='img'
                      alt='image'
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '287px',
                        left: '211px',
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
                    4. Ввод масштаба и щелчок на имени опции.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <input
                      type='text'
                      style={{
                        position: 'absolute',
                        top: '351px',
                        left: '152px',
                        width: '137px',
                        height: '24px',
                      }}
                      value={inputValue}
                      onChange={onHandleInputChange}
                    />
                    <img
                      src='/img/Module4/test1/4.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '351px',
                        left: '82px',
                        width: '67px',
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
                  <div className='mb-5 text'>
                    5. Выбор точки вставки фрагмента.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src='/img/Module4/test1/5.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '320px',
                        left: '472px',
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
                  <div className='mb-5 text'>6. Готово. Завершите команду.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src='/img/Module4/test1/6.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '155px',
                        left: '304px',
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
                Создайте слой с именем Размеры, сделайте его текущим и погасите
                первоначальный слой.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      1-й шаг – выбор кнопки для вызова команды создания слоя.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module4/test2/1.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '149px',
                          left: '45px',
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
                    <div className='mb-5 text'>
                      2-й шаг – выбор кнопки отображения списка слоев.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module4/test2/2.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '272px',
                          left: '123px',
                          width: '75px',
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
                      3. Ввод имени слоя и щелчок на кнопке, чтобы сделать слой
                      текущим.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '316px',
                          left: '159px',
                          width: '88px',
                          height: '22px',
                        }}
                        value={inputValue}
                        onChange={onHandleInputChange}
                      />
                      <img
                        src='/img/Module4/test2/3.jpg'
                        className='img2'
                        alt='image'
                      />

                      <div
                        style={{
                          position: 'absolute',
                          top: '317px',
                          left: '88px',
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
                    <div className='mb-5 text'>
                      4. Изменение состояния первоначального слоя.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src='/img/Module4/test2/4.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '295px',
                          left: '3px',
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
                    <div className='mb-5 text'>5. Готово. Закройте чертеж.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src='/img/Module4/test2/5.jpg'
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
        <div className='tests'>
          <SelectTest moduleId={4} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module4;
