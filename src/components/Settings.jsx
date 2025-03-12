import { useState } from "react";
import CustomQuestionsAccordion from "./CustomQuestionsAccordion";
import { useQuiz } from "../contexts/QuizContext";

// Define the available options in arrays.
const difficultyOptions = ["easy", "medium", "difficult", "mixed"];
const questionCounts = [10, 15, 20, 25];

function Settings() {
  const { dispatch } = useQuiz();
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
          {difficultyOptions.map((option) => (
            <button
              key={option}
              className={`btn ${difficulty === option ? "selected" : ""}`}
              onClick={() => setDifficulty(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className={`numQuestions ${customActive ? "disabled" : ""}`}>
        <h3>Select the number of questions:</h3>
        <div className="numBtn-group">
          {questionCounts.map((count) => (
            <button
              key={count}
              className={`btn ${numQuestions === count ? "selected" : ""}`}
              onClick={() => setNumQuestions(count)}
            >
              {count}
            </button>
          ))}
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
