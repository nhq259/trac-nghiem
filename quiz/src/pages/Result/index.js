import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersSerice";
import { getListQuestion } from "../../services/questionsService";
import "./Result.css";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);
      console.log(dataAnswers.answers);
      console.log(dataQuestions);

      let resultFinal = [];

      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            item => Number(item.questionId) === Number(dataQuestions[i].id)
          ),
        });
      }

      console.log(resultFinal)
      setDataResult(resultFinal);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Ket qua:</h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Câu {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Đúng</span>
              ) : (
                <span className="result__tag result__tag--flase">Sai</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              let className = "";
              let checked = false;

              if (item.answer === indexAns) {
                checked = true;
                className = "result__item--selected";
              }
              if (item.correctAnswer === indexAns) {
                className += " result__item--result";
              }
              console.log("Correct Answer:", item.correctAnswer);
              console.log("User Answer:", item.answer);

              return (
                <div className="result__answer" key={indexAns}>
                  <input type="radio" checked={checked} disabled />
                  <label className={className}>{itemAns}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
