import { useQuiz } from "../contexts/QuizContext";

function BackButton() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="back-button"
      onClick={() => dispatch({ type: "restart" })}
    >
      Back to Start
    </button>
  );
}

export default BackButton;
