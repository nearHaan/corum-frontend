import { useState } from "react";
import { QuestionBox } from "../../../components/QuestionBox";
import { ForumElement } from "../../../components/ForumElem";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([
    {
      id: "dsddsd",
      title: "dfdf dfdf dfdfd fd f df df d fdfdfdfd fdfdfdf",
      votes: 12,
      tags: ["node.js", "mongodb"],
      views: 250,
      comments: 10,
    },
    {
      id: "weeewewew",
      title: "dfdf dfdfd fdfdfdf dfdfdfdf df",
      votes: 8,
      tags: ["react", "hooks"],
      views: 180,
      comments: 5,
    },
  ]);
  return (
    <div className="w-full h-full flex flex-col p-2 items-center justify-center">
      <div className="h-10"></div>
      {questions.map((question, index) => (
        <QuestionBox
          id={question.id}
          key={index}
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
