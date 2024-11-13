import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersSerice";
import {getListTopic} from "../../services/topicService";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswers,setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const answersByUserId = await getAnswersByUserId();
      const topics = await getListTopic();
      console.log(topics);
      console.log(answersByUserId);

      let result = [];

      for(let i = 0 ;i < answersByUserId.length;i++){
        result.push({
          ...topics.find(item => item.id === answersByUserId[i].topicId),
          ...answersByUserId[i],
          
        })
      }
      console.log(result);
      setDataAnswers(result.reverse())
    };
    fetchAPI();
  }, []);

  console.log(dataAnswers)


    return (
    <>
    <h2>Danh sách đã luyện tập</h2>

    {dataAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/result/" + item.id}> Xem chi tiet</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
    )
  }
  
  export default Answers;
  