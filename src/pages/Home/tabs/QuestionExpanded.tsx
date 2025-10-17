import { useState } from "react";
import { ForumElement } from "../../../components/ForumElem";
import { useParams } from "react-router-dom";

export default function QuestionExpandedPage() {
  const { questionId } = useParams();
  const [forums, setForums] = useState([
    {
      id: "sdsd",
      votes: 12,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate iste quo sapiente repudiandae ea nemo enim nulla magni et, autem odio eligendi incidunt ipsa? Quo quas dicta facere fugit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate iste quo sapiente repudiandae ea nemo enim nulla magni et, autem odio eligendi incidunt ipsa? Quo quas dicta facere fugit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate iste quo sapiente repudiandae ea nemo enim nulla magni et, autem odio eligendi incidunt ipsa? Quo quas dicta facere fugit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate iste quo sapiente repudiandae ea nemo enim nulla magni et, autem odio eligendi incidunt ipsa? Quo quas dicta facere fugit!",
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
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam placeat quisquam pariatur hic nihil quia ut! Consequatur eaque nemo asperiores hic suscipit similique ab rerum, excepturi impedit aut. Blanditiis.",
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
  async function onUpVote(id: string) {
    setForums((forums) =>
      forums.map((forum) =>
        forum.id === id ? { ...forum, votes: forum.votes + 1 } : forum
      )
    );
    try {
      const response = await fetch(`http://localhost:3000/${id}/upvote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response || response.status !== 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setForums((forums) =>
        forums.map((forum) =>
          forum.id === id ? { ...forum, votes: forum.votes - 1 } : forum
        )
      );
    }
  }

  async function onDownVote(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/${id}/downvote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response || response.status !== 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-2 items-center justify-center">
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
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}
