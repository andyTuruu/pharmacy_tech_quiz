function BackButton({ dispatch }) {
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
