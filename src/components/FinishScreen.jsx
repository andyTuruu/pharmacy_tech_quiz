import { useQuiz } from "../contexts/QuizContext";
import Confetti from "./Confetti";
import { formatTime } from "./helpers";

function FinishScreen() {
  const {
    points,
    maxPossiblePoints,
    dispatch,
    correctCount,
    numQuestions,
    timeSpent,
  } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;
  let emoji, feedbackMessage;
  if (percentage === 100) {
    emoji = "🥇";
    feedbackMessage = "Perfect score! Outstanding performance!";
  } else if (percentage >= 80) {
    emoji = "🎉";
    feedbackMessage = "Great job! You really know your stuff.";
  } else if (percentage >= 50) {
    emoji = "🙃";
    feedbackMessage = "Not bad, but there's room to improve.";
  } else if (percentage > 0) {
    emoji = "🤨";
    feedbackMessage = "You got some right—review and try again!";
  } else {
    emoji = "🤦‍♂️";
    feedbackMessage = "Don't worry, practice makes perfect!";
  }

  return (
    <div className="finish-screen">
      <h3>
        <span className="emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </h3>
      <h3 className="feedback">{feedbackMessage}</h3>
      <div className="stats">
        <p>
          <strong>Correct Answers:</strong> {correctCount} out of {numQuestions}
        </p>
        <p>
          <strong>Time Taken:</strong> {formatTime(timeSpent)}
        </p>
      </div>
      <button
        className="btn restart-btn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
      <Confetti />
    </div>
  );
}

export default FinishScreen;
