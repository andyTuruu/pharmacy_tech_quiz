import { useQuiz } from "../contexts/QuizContext";

function Explanation() {
  const { question } = useQuiz();
  return <div className="explanation">{question.explanation}</div>;
}

export default Explanation;
