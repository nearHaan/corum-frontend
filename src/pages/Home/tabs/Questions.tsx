import { useEffect, useState } from "react";
import { QuestionBox } from "../../../components/QuestionBox";

type QuestionType = {
  id: string;
  title: string;
  votes: number;
  tags: string[];
  views: number;
  comments: number;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        const formattedQuestions: QuestionType[] = data.map((q: any) => ({
          id: q._id,
          title: q.title,
          votes: q.votes?.upvotes - q.votes?.downvotes || 0,
          tags: q.tags?.map((t: any) => t.tagName) || [],
          views: q.views || 0,
          comments: q.comments?.length || 0,
        }));
        setQuestions(formattedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col p-2 items-center justify-center">
      <div className="h-10"></div>
      {questions.map((question) => (
        <QuestionBox
          key={question.id}
          id={question.id}
          title={question.title}
          votes={question.votes}
          tags={question.tags}
          views={question.views}
          comments={question.comments}
        />
      ))}
    </div>
  );
}
