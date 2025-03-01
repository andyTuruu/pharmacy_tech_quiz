import { useState } from "react";
import CustomQuestionsAccordion from "./CustomQuestionsAccordion";

function Settings({ dispatch }) {
  const [customNum, setCustomNum] = useState(10);
  const [customActive, setCustomActive] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); // default to "easy"
  const [numQuestions, setNumQuestions] = useState(10); // default to 10

  const startQuiz = () => {
    // Use customNum if customActive is true; otherwise, use the predefined numQuestions.
    dispatch({
      type: "start",
      payload: {
        difficulty,
        numQuestions: customActive ? customNum : numQuestions,
      },
    });
  };

  return (
    <div className="settings">
      <div className="difficulty">
        <h3>Select the quiz difficulty:</h3>
        <div className="difBtn-group">
          <button
            className={`btn ${difficulty === "easy" ? "selected" : ""}`}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`btn ${difficulty === "medium" ? "selected" : ""}`}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`btn ${difficulty === "difficult" ? "selected" : ""}`}
            onClick={() => setDifficulty("difficult")}
          >
            Difficult
          </button>
          <button
            className={`btn ${difficulty === "mixed" ? "selected" : ""}`}
            onClick={() => setDifficulty("mixed")}
          >
            Mixed
          </button>
        </div>
      </div>
      <div className={`numQuestions ${customActive ? "disabled" : ""}`}>
        <h3>Select the number of questions:</h3>
        <div className="numBtn-group">
          <button
            className={`btn ${numQuestions === 10 ? "selected" : ""}`}
            onClick={() => setNumQuestions(10)}
          >
            10
          </button>
          <button
            className={`btn ${numQuestions === 15 ? "selected" : ""}`}
            onClick={() => setNumQuestions(15)}
          >
            15
          </button>
          <button
            className={`btn ${numQuestions === 20 ? "selected" : ""}`}
            onClick={() => setNumQuestions(20)}
          >
            20
          </button>
          <button
            className={`btn ${numQuestions === 25 ? "selected" : ""}`}
            onClick={() => setNumQuestions(25)}
          >
            25
          </button>
        </div>
      </div>

      <CustomQuestionsAccordion
        customNum={customNum}
        setCustomNum={setCustomNum}
        setCustomActive={setCustomActive}
      />
      <button className="btn" onClick={startQuiz}>
        Start
      </button>
    </div>
  );
}

export default Settings;
