import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import {getCookie} from "../../helpers/cookie"
import { createAnswer } from "../../services/quizService";

function Quiz() {
  const params = useParams();

  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestions(response);
    };
    fetchAPI();
  }, []);

  console.log(dataTopic);
  console.log(dataQuestions);

  const handleSubmit = async (e) => {
    e.preventDefault();
     

    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });

        
      }
    }
    console.log(selectedAnswers);

    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers : selectedAnswers,
    }

    const response = await createAnswer(options);
     if(response){
      navigate(`/result/${response.id}`)
    }

  };

  return (
    <>
      <h2>Bai quiz chu de :{dataTopic && dataTopic.name}</h2>

      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestions.map((item, index) => (
            <div className="form-qiuz__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                    {itemAns}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Nop bai</button>
        </form>
      </div>
    </>
  );
}

export default Quiz;
