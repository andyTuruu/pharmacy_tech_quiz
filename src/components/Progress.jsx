import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <h3>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </h3>
      <h3>
        {points} / {maxPossiblePoints} Points
      </h3>
    </div>
  );
}

export default Progress;
