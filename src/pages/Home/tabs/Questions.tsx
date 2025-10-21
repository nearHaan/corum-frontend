import { useQuestionContext } from "../../../contexts/QuestionContext";
import { QuestionBox } from "../../../components/QuestionBox";

export default function QuestionsPage() {
  const { questions } = useQuestionContext();

  if (!questions || questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        No questions found.
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col p-2 items-center justify-start">
      <div className="h-10"></div>
      {questions.map((q: any) => (
        <QuestionBox
          key={q.id}
          id={q.id}
          title={q.title}
          votes={q.votes.upvotes}
          tags={q.tags}
          views={q.views || 0}
          comments={q.comments?.length || 0}
        />
      ))}
    </div>
  );
}
