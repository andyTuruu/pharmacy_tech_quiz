import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch } = useQuiz();
  return (
    <>
      <div className="start">
        <h2>Welcome to the Pharmacy Tech Quiz!</h2>
        <h3>
          Carefully selected and curated questions designed to equip you with
          the knowledge you need for PTCB exam.
        </h3>
        {/* <button className="btn" onClick={() => dispatch({ type: "start" })}> */}
        <button
          className="btn"
          onClick={() => dispatch({ type: "configureQuiz" })}
        >
          Take a quiz
        </button>
      </div>
      <div className="watermark">
        <img src="/images/pills.png" alt="Watermark" />
      </div>
    </>
  );
}

export default StartScreen;
