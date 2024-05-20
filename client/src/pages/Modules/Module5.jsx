import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { appContext } from '../../Context';
import axios from 'axios';
import SelectTest from '../SelectTest';

import Button from 'react-bootstrap/Button';

function Module5() {
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
      setInputValue1('Новая библиотека');
      setInputValue2('');
    }
  }, [test, question]);

  const onHandleAreaClick = (e, index) => {
    const count = test === 1 ? 8 : test === 2 ? 13 : 0;

    if (index < count) {
      const maxAttempts = 3;

      setAnswers((prevAnswers) => {
        const attempts = prevAnswers[`question${index}`] || 0;

        if (
          e.target.className === 'img' ||
          e.target.className === 'img2' ||
          (e.target.className === 'area' &&
            ((index === 4 && test === 2 && inputValue1 !== 'Отверстия') ||
              (index === 8 && test === 2 && inputValue2 !== 'Отверстия')))
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
          (e.target.className === 'area' &&
            test === 2 &&
            index !== 4 &&
            index !== 8) ||
          (e.target.className === 'area' &&
            ((index === 4 && inputValue1 === 'Отверстия' && test === 2) ||
              (index === 8 && test === 2 && inputValue2 === 'Отверстия')))
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
      module: 5,
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
              Вставьте элемент Гайка из раздела Крепежные элементы библиотеки
              конструктивных элементов.
            </div>
            {question === 1 && (
              <>
                <div className='question'>
                  <div className='mb-5 text'>
                    1-й шаг – кнопка вызова панели Библиотеки.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src='/img/Module5/test1/1.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '185px',
                        left: '5px',
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
                    2. Кнопка для отображения списка библиотек.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src='/img/Module5/test1/2.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '124px',
                        left: '282px',
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
                  <div className='mb-5 text'>3. Выбор библиотеки.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src='/img/Module5/test1/3.jpg'
                      className='img'
                      alt='image'
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '151px',
                        left: '31px',
                        width: '269px',
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
                    4. Отображение элементов раздела.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src='/img/Module5/test1/4.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '209px',
                        left: '32px',
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
                  <div className='mb-5 text'>
                    5. Выбор вставляемого элемента.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src='/img/Module5/test1/5.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '291px',
                        left: '50px',
                        width: '87px',
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
                  <div className='mb-5 text'>
                    6. Указание точки вставки элемента в начало координат.
                  </div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src='/img/Module5/test1/6.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '302px',
                        left: '537px',
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
                  <div className='mb-5 text'>7. Готово. Завершите команду.</div>
                  <div
                    className='container-img'
                    onClick={(e) => onHandleAreaClick(e, 7)}
                  >
                    <img
                      src='/img/Module5/test1/7.jpg'
                      className='img'
                      alt='image'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '152px',
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
              <div className='mb-5 text2' ref={text2}>
                Создайте пользовательскую библиотеку Отверстия с тем же именем
                файла и добавьте в нее элемент из существующего файла Фрагмент.
              </div>
              {question === 1 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      1-й шаг – выбор меню для вызова команды создания
                      библиотеки.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src='/img/Module5/test2/1.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '23px',
                          left: '318px',
                          height: '20px',
                          width: '72px',
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
                    <div className='mb-5 text'>2. Выбор команды.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src='/img/Module5/test2/2.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '92px',
                          left: '79px',
                          width: '304px',
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
                    <div className='mb-5 text'>3. Выбор подкоманды.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <img
                        src='/img/Module5/test2/3.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '115px',
                          left: '388px',
                          width: '206px',
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
                      4. Ввод имени библиотеки и щелчок на значке слева.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '113px',
                          left: '71px',
                          width: '142px',
                          height: '16px',
                        }}
                        value={inputValue1}
                        onChange={onHandleInputChange1}
                      />
                      <img
                        src='/img/Module5/test2/4.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '111px',
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
              {question === 5 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      5. Кнопка вставки элемента из файла фрагмента.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src='/img/Module5/test2/5.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '54px',
                          left: '237px',
                          width: '25px',
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
                    <div className='mb-5 text'>6. Выбор файла.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 6)}
                    >
                      <img
                        src='/img/Module5/test2/6.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '617px',
                          left: '620px',
                          width: '103px',
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
                    <div className='mb-5 text'>7. Сохранение библиотеки.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 7)}
                    >
                      <img
                        src='/img/Module5/test2/7.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '53px',
                          left: '64px',
                          width: '25px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 8 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      8. Ввод имени файла и завершение диалога.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 8)}
                    >
                      <input
                        type='text'
                        style={{
                          position: 'absolute',
                          top: '550px',
                          left: '117px',
                          width: '647px',
                          height: '22px',
                        }}
                        value={inputValue2}
                        onChange={onHandleInputChange2}
                      />
                      <img
                        src='/img/Module5/test2/8.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '613px',
                          left: '584px',
                          width: '94px',
                          height: '26px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 9 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      9. Завершение создания библиотеки.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 9)}
                    >
                      <img
                        src='/img/Module5/test2/9.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '7px',
                          left: '754px',
                          width: '20px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 10 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      10. Кнопка подключения созданной библиотеки.
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 10)}
                    >
                      <img
                        src='/img/Module5/test2/10.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '189px',
                          left: '254px',
                          width: '20px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 11 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>11. Выбор файла.</div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 11)}
                    >
                      <img
                        src='/img/Module5/test2/11.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '141px',
                          left: '208px',
                          width: '136px',
                          height: '25px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 12 && (
                <>
                  <div className='question'>
                    <div className='mb-5 text'>
                      12. Готово. Выберите элемент для вставки в чертеж.{' '}
                    </div>
                    <div
                      className='container-img'
                      onClick={(e) => onHandleAreaClick(e, 12)}
                    >
                      <img
                        src='/img/Module5/test2/12.jpg'
                        className='img2'
                        alt='image'
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '235px',
                          left: '17px',
                          width: '75px',
                          height: '20px',
                        }}
                        className='area'
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 13 && (
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
          <SelectTest moduleId={5} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module5;
