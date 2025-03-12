import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining, answer } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      if (answer === null) {
        const id = setInterval(function () {
          dispatch({ type: "tick" });
        }, 1000);
        return () => clearInterval(id);
      }
    },
    [dispatch, answer]
  );
  return (
    <button className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </button>
  );
}

export default Timer;
