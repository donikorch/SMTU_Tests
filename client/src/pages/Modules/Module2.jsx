import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { appContext } from "../../Context";
import axios from "axios";
import SelectTest from "../SelectTest";

import Button from "react-bootstrap/Button";

function Module1() {
  const [test, setTest] = useState(0);
  const [answers, setAnswers] = useState({});
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(null);
  const text2 = useRef(null);

  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const onHandleAreaClick = (e, index) => {
    let count;
    test === 1 ? (count = 10) : test === 2 ? (count = 8) : (count = 0);

    if (index < count) {
      const maxAttempts = 3;
      setAnswers({ ...answers, [`question${index}`]: 1 });

      if (e.target.className === "img") {
        const attempts = answers[`question${index}`] || 0;
        if (attempts < maxAttempts - 1) {
          setAnswers({ ...answers, [`question${index}`]: attempts + 1 });

          alert(
            `Неверно! Использовано попыток ${attempts + 1} из ${maxAttempts}`
          );
        } else {
          setAnswers({ ...answers, [`question${index}`]: false });
          setQuestion(index + 1);

          alert("Неверно! Попытки кончились.");
        }
      }

      if (e.target.className === "area") {
        setAnswers({ ...answers, [`question${index}`]: true });
        setQuestion(index + 1);
      }

      if (index === count - 1) {
        const element = text2.current;

        if (element) {
          element.style.display = "none";
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
      module: 2,
      type: test,
      passed: score >= 60,
      score,
      userId: user.id,
    };

    await axios.post("/api/tests/saveResults", result);

    setTest(0);
    setQuestion(1);
    setAnswers({});
    setScore(null);

    navigate("/tests");
  };

  return (
    <>
      {test ? (
        test === 1 ? (
          <>
            <div className="mb-5 text2" ref={text2}>
              Постройте несколько геометрических объектов на чертеже.
            </div>
            {question === 1 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    1-й шаг – выбор кнопки для построения скругления левого
                    верхнего угла данной фигуры.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 1)}
                  >
                    <img
                      src="/img/Module2/test1/1.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "35px",
                        left: "255px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 2 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    2-й шаг – указание объекта скругления.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 2)}
                  >
                    <img
                      src="/img/Module2/test1/2.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "210px",
                        left: "410px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 3 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    3. Построение отрезка от центра фигуры до правого верхнего
                    угла – выбор кнопки команды.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 3)}
                  >
                    <img
                      src="/img/Module2/test1/3.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "62px",
                        left: "202px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 4 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    4. Указание начальной точки отрезка.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 4)}
                  >
                    <img
                      src="/img/Module2/test1/4.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "285px",
                        left: "550px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 5 && (
              <>
                <div className="question">
                  <div className="mb-5 text">5. Указание конечной точки.</div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 5)}
                  >
                    <img
                      src="/img/Module2/test1/5.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "210px",
                        left: "692px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 6 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    6. Построение штриховки левой части фигуры – выбор кнопки
                    команды.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 6)}
                  >
                    <img
                      src="/img/Module2/test1/6.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "63px",
                        left: "258px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 7 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    7. Указание области штриховки.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 7)}
                  >
                    <img
                      src="/img/Module2/test1/7.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "245px",
                        left: "370px",
                        width: "50px",
                        height: "100px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 8 && (
              <>
                <div className="question">
                  <div className="mb-5 text">8. Завершение команды.</div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 8)}
                  >
                    <img
                      src="/img/Module2/test1/8.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "150px",
                        left: "270px",
                        width: "25px",
                        height: "25px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 9 && (
              <>
                <div className="question">
                  <div className="mb-5 text">
                    9. Готово. Нажмите кнопку для закрытия фрагмента.
                  </div>
                  <div
                    className="container-img"
                    onClick={(e) => onHandleAreaClick(e, 9)}
                  >
                    <img
                      src="/img/Module2/test1/9.jpg"
                      className="img"
                      alt="image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "180px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="area"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {question === 10 && (
              <>
                <div className="mb-5 text">Тест пройден на {score}%</div>
                <Button variant="secondary" onClick={onHandleButtonClick}>
                  ОК
                </Button>
              </>
            )}
          </>
        ) : (
          test === 2 && (
            <>
              <div className="mb-5 text2" ref={text2}>
                Выполните сдвиг фигуры, совместив ее центр с точкой пересечения
                вспомогательных прямых.
              </div>
              {question === 1 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      1-й шаг – выбор кнопки для отображения всех команд
                      редактирования.
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 1)}
                    >
                      <img
                        src="/img/Module2/test2/1.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "82px",
                          left: "332px",
                          height: "15px",
                          width: "15px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 2 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      2-й шаг – подготовка к сдвигу (выделение объектов).
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 2)}
                    >
                      <img
                        src="/img/Module2/test2/2.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "305px",
                          left: "370px",
                          width: "235px",
                          height: "100px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 3 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      3. Выбор кнопки команды для сдвига.
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 3)}
                    >
                      <img
                        src="/img/Module2/test2/3.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "33px",
                          left: "280px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 4 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      4. Указание базовой точки для сдвига фигуры.
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 4)}
                    >
                      <img
                        src="/img/Module2/test2/4.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "345px",
                          left: "477px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 5 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      5. Указание конечной точки для сдвига.
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 5)}
                    >
                      <img
                        src="/img/Module2/test2/5.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "207px",
                          left: "607px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 6 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">6. Завершение команды.</div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 6)}
                    >
                      <img
                        src="/img/Module2/test2/6.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "150px",
                          left: "290px",
                          width: "20px",
                          height: "20px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 7 && (
                <>
                  <div className="question">
                    <div className="mb-5 text">
                      7. Готово. Нажмите кнопку для закрытия фрагмента.
                    </div>
                    <div
                      className="container-img"
                      onClick={(e) => onHandleAreaClick(e, 7)}
                    >
                      <img
                        src="/img/Module2/test2/7.jpg"
                        className="img"
                        alt="image"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "180px",
                          width: "15px",
                          height: "15px",
                        }}
                        className="area"
                      ></div>
                    </div>
                  </div>
                </>
              )}
              {question === 8 && (
                <>
                  <div className="mb-5 text">Тест пройден на {score}%</div>
                  <Button variant="secondary" onClick={onHandleButtonClick}>
                    ОК
                  </Button>
                </>
              )}
            </>
          )
        )
      ) : (
        <div className="tests">
          <SelectTest moduleId={2} setTest={setTest} />
        </div>
      )}
    </>
  );
}

export default Module1;
