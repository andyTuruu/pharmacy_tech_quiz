function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else emoji = "🤦‍♂️";

  return (
    <div className="finish-screen">
      <p className="result">
        <span className="emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn restart-btn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
