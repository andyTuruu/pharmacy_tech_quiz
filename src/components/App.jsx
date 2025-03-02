import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { useEffect, useReducer } from "react";
import NextButton from "./NextButton";
import BackButton from "./BackButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Settings from "./Settings";
import Explanation from "./Explanation";
import Footer from "./Footer";
import Core from "./Core";
import { fetchQuestions, shuffleArray, selectQuestions } from "./helpers";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'ready', 'configuring', 'loading', 'error', 'active', 'finished'
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
  difficulty: "",
  numQuestions: 10,
  timeSpent: 0,
  correctCount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        secondsRemaining: action.payload.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "configureQuiz":
      return { ...state, status: "configuring" };
    case "start":
      return {
        ...state,
        difficulty: action.payload.difficulty,
        numQuestions: action.payload.numQuestions,
        status: "loading",
        startTime: Date.now(),
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        timeSpent: Math.floor((Date.now() - state.startTime) / 1000),
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      difficulty,
      numQuestions,
      timeSpent,
      correctCount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    if (status === "loading") {
      const loadQuestions = async () => {
        if (difficulty === "mixed") {
          const total = numQuestions;
          const perCategory = Math.floor(total / 3);
          const remainder = total % 3;
          const limits = [
            perCategory + (remainder > 0 ? 1 : 0), // easyLimit
            perCategory + (remainder > 1 ? 1 : 0), // mediumLimit
            perCategory, // hardLimit
          ];
          try {
            const [easy, medium, hard] = await Promise.all([
              fetchQuestions("http://localhost:9000/easy-questions"),
              fetchQuestions("http://localhost:9000/medium-questions"),
              fetchQuestions("http://localhost:9000/hard-questions"),
            ]);
            const mixedQuestions = shuffleArray([
              ...selectQuestions(easy, limits[0]),
              ...selectQuestions(medium, limits[1]),
              ...selectQuestions(hard, limits[2]),
            ]);
            dispatch({ type: "dataReceived", payload: mixedQuestions });
          } catch (error) {
            dispatch({ type: "dataFailed" });
          }
        } else {
          let endpoint = "";
          if (difficulty === "easy") {
            endpoint = "http://localhost:9000/easy-questions";
          } else if (difficulty === "medium") {
            endpoint = "http://localhost:9000/medium-questions";
          } else if (difficulty === "difficult") {
            endpoint = "http://localhost:9000/hard-questions";
          }
          try {
            const data = await fetchQuestions(endpoint);
            dispatch({
              type: "dataReceived",
              payload: selectQuestions(data, numQuestions),
            });
          } catch (err) {
            dispatch({ type: "dataFailed" });
          }
        }
      };
      loadQuestions();
    }
  }, [status, difficulty, numQuestions, dispatch]);

  return (
    <div className="app">
      <Header />
      {status === "ready" && (
        <>
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        </>
      )}
      {status === "configuring" && <Settings dispatch={dispatch} />}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "active" && (
        <Core>
          <Progress
            index={index}
            numQuestions={questions.length}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          />
          <Timer
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          {answer !== null && <Explanation question={questions[index]} />}
          <Footer>
            <BackButton dispatch={dispatch} />
            {answer !== null && (
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={questions.length}
                index={index}
              />
            )}
          </Footer>
        </Core>
      )}
      {status === "finished" && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          dispatch={dispatch}
          correctCount={correctCount}
          totalQuestions={questions.length}
          timeSpent={timeSpent}
        />
      )}
    </div>
  );
}
