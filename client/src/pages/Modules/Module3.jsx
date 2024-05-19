import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module3() {
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
      setInputValue('45.00');
    }
    if (test === 2) {
      setInputValue('Макро:1');
    }
  }, [test]);

  const onHandleAreaClick = (e, index) => {
    if (index < 5) {
      const maxAttempts = 3;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          (e.target.className === 'area' &&
            index === 3 &&
            ((test === 1 && inputValue !== '30') ||
              (test === 2 && inputValue !== 'Бур')))
        ) {
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

        if (
          (e.target.className === 'area' && index !== 3) ||
          (e.target.className === 'area' &&
            index === 3 &&
            ((inputValue === '30' && test === 1) ||
              (inputValue === 'Бур' && test === 2)))
        ) {
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
      module: 3,
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
              Включите угловую привязку с шагом 30 градусов.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    1-й шаг – выбор кнопки для вызова настройки привязок.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module3/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '105px',
                        left: '365px',
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
                    2-й шаг – выбор команды настройки угловой привязки.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module3/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '455px',
                        left: '330px',
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
                  <div className='mb-5 text'>
                    3. Настройка параметра в 30 градусов и щелчок на включении
                    данного параметра.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <input
                      type='text'
                      style={{
                        position: 'absolute',
                        top: '362px',
                        left: '585px',
                        width: '50px',
                        height: '20px',
                      }}
                      value={inputValue}
                      onChange={onHandleInputChange}
                    />
                    <img
                      src='/img/Module3/test1/3.jpg'
                      className='img'
                      alt='image'
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '255px',
                        left: '400px',
                        width: '100px',
                        height: '15px',
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
                    4. Готово. Завершение настройки привязок.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module3/test1/4.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '448px',
                        left: '441px',
                        width: '55px',
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
                Выполните создание макроэлемента под именем Бур из выделенных
                элементов.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      1-й шаг – выбор кнопки для создания макроэлемента.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module3/test2/1.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '93px',
                          left: '718px',
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
                      2-й шаг – выбор макроэлемента.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module3/test2/2.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '267px',
                          left: '201px',
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
                      3. Ввод имени макроэлемента и щелчок на значке слева.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '266px',
                          left: '227px',
                          width: '109px',
                          height: '25px',
                        }}
                        value={inputValue}
                        onChange={onHandleInputChange}
                      />
                      <img
                        src='/img/Module3/test2/3.jpg'
                        className='img'
                        alt='image'
                      />

                      <div
                        style={{
                          position: 'absolute',
                          top: '269px',
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
              {question === 4 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      4. Готово. Сверните щелчком список Макро.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src='/img/Module3/test2/4.jpg'
                        className='img'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '240px',
                          left: '179px',
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
          <SelectTest moduleId={3} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module3;
