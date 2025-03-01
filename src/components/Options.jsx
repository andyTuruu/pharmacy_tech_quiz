function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctOption;
        const isSelected = index === answer;
        return (
          <button
            className={`btn-option 
              ${hasAnswered && isCorrect ? "correct" : ""} 
              ${hasAnswered && isSelected && !isCorrect ? "wrong" : ""}`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
