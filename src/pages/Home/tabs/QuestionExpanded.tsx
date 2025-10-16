import { useState } from "react";
import { ForumElement } from "../../../components/ForumElem";
import { useParams } from "react-router-dom";

export default function QuestionExpandedPage() {
  const { questionId } = useParams();
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
      <div className="flex flex-col w-full mb-3 p-3">
        <h1 className="text-2xl text-black">{questionId}</h1>
        <p className="text-sm mt-2">Asked on 1212112</p>
      </div>
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
