import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import BackButton from "./BackButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Settings from "./Settings";
import Explanation from "./Explanation";
import Footer from "./Footer";
import Core from "./Core";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status, answer } = useQuiz();
  return (
    <div className="app">
      <Header />
      {status === "ready" && <StartScreen />}
      {status === "configuring" && <Settings />}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "active" && (
        <Core>
          <Progress />
          <Timer />
          <Question />
          {answer !== null && <Explanation />}
          <Footer>
            <BackButton />
            {answer !== null && <NextButton />}
          </Footer>
        </Core>
      )}
      {status === "finished" && <FinishScreen />}
    </div>
  );
}
