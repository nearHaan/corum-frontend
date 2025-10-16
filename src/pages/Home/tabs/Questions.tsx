import { useState } from "react";
import { QuestionBox } from "../../../components/QuestionBox";
import { ForumElement } from "../../../components/ForumElem";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([
    {
      title: "dfdf dfdf dfdfd fd f df df d fdfdfdfd fdfdfdf",
      votes: 12,
      tags: ["node.js", "mongodb"],
      views: 250,
      comments: 10,
    },
    {
      title: "dfdf dfdfd fdfdfdf dfdfdfdf df",
      votes: 8,
      tags: ["react", "hooks"],
      views: 180,
      comments: 5,
    },
  ]);
  const [forums, setForums] = useState([
    {
      id: "sdsd",
      votes: 12,
      desc: "dsddfdf df dfdf dffd f df dffd",
      comments: [
        {
          id: "ddffd",
          username: "fdfd",
          comment: "dfdfd",
          timestamp: "dfdf",
        },
      ],
    },
    {
      id: "fdfddfdf",
      votes: 13,
      desc: "dsddfdf df dfdf dffd f df dffd",
      comments: [
        {
          id: "dfdfdfddfd",
          username: "fdfd",
          comment: "dfdfd",
          timestamp: "dfdf",
        },
      ],
    },
  ]);
  return (
    <div className="w-full h-full flex flex-col p-2 items-center justify-center">
      <div className="h-10"></div>
      {questions.map((question, index) => (
        <QuestionBox
          key={index}
          title={question.title}
          votes={question.votes}
          tags={question.tags}
          views={question.views}
          comments={question.comments}
        />
      ))}
      {forums.map((forum, index) => (
        <ForumElement
          key={index}
          id={forum.id}
          votes={forum.votes}
          desc={forum.desc}
          comments={forum.comments}
        />
      ))}
    </div>
  );
}
