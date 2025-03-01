function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the Pharmacy Tech Quiz!</h2>
      <h3>
        Carefully selected and curated questions designed to equip you with the
        knowledge you need for PTCE.
      </h3>
      {/* <button className="btn" onClick={() => dispatch({ type: "start" })}> */}
      <button
        className="btn"
        onClick={() => dispatch({ type: "configureQuiz" })}
      >
        Take a quiz
      </button>
    </div>
  );
}

export default StartScreen;
