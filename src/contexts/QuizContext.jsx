import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useMemo,
} from "react";

import {
  fetchQuestions,
  shuffleArray,
  selectQuestions,
} from "../components/helpers";

const QuizContext = createContext();

const SECS_PER_QUESTION = 3;

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
      const question = state.questions[state.index];
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

function QuizProvider({ children }) {
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

  const question = questions[index];

  useEffect(() => {
    if (status === "loading") {
      const loadQuestions = async () => {
        try {
          // Fetch the entire JSON file from the public folder.
          const fullData = await fetchQuestions(
            "/data/questions_shuffled_balanced.json"
          );

          if (difficulty === "mixed") {
            const total = numQuestions;
            const perCategory = Math.floor(total / 3);
            const remainder = total % 3;
            const limits = [
              perCategory + (remainder > 0 ? 1 : 0), // easyLimit
              perCategory + (remainder > 1 ? 1 : 0), // mediumLimit
              perCategory, // hardLimit
            ];

            const easy = fullData["easy-questions"];
            const medium = fullData["medium-questions"];
            const hard = fullData["hard-questions"];

            const mixedQuestions = shuffleArray([
              ...selectQuestions(easy, limits[0]),
              ...selectQuestions(medium, limits[1]),
              ...selectQuestions(hard, limits[2]),
            ]);
            dispatch({ type: "dataReceived", payload: mixedQuestions });
          } else {
            let key = "";
            if (difficulty === "easy") key = "easy-questions";
            else if (difficulty === "medium") key = "medium-questions";
            else if (difficulty === "difficult") key = "hard-questions";

            const data = fullData[key];
            dispatch({
              type: "dataReceived",
              payload: selectQuestions(data, numQuestions),
            });
          }
        } catch (error) {
          dispatch({
            type: "dataFailed",
          });
        }
      };
      loadQuestions();
    }
  }, [status, difficulty, numQuestions, dispatch]);

  const value = useMemo(
    () => ({
      question,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      numQuestions,
      maxPossiblePoints,
      timeSpent,
      correctCount,
      difficulty,
      dispatch,
    }),
    [
      question,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      numQuestions,
      maxPossiblePoints,
      timeSpent,
      correctCount,
      difficulty,
      dispatch,
    ]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
