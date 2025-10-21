import { useEffect, useState } from "react";
import { ForumElement } from "../../../components/ForumElem";
import { useNavigate, useParams } from "react-router-dom";

type Tag = {
  _id: string;
  tagName: string;
};

type Comment = {
  _id: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
};

type Author = {
  _id: string;
  username: string;
};

type Answer = {
  _id: string;
  body: string;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

type ExpandedQuestion = {
  _id: string;
  title: string;
  body: string;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  tags: Tag[];
  views: number;
  answers: Answer[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export default function QuestionExpandedPage() {
  const { questionId } = useParams();
  const [yourAnswer, setYourAnswer] = useState("");
  const [question, setQuestion] = useState<ExpandedQuestion>();
  const [forums, setForums] = useState<Array<Answer>>([]);
  const [loading, setLoading] = useState(true);
  const [viewed, setViewed] = useState(false);
  const navigate = useNavigate();

  async function onUpVote(id: string, isAnswer: boolean = false) {
    if (isAnswer) {
      setForums((forums) =>
        forums.map((forum) =>
          forum._id === id
            ? {
                ...forum,
                votes: { ...forum.votes, upvotes: forum.votes.upvotes + 1 },
              }
            : forum
        )
      );
    } else {
      setQuestion((prev) =>
        prev
          ? {
              ...prev,
              votes: { ...prev.votes, upvotes: prev.votes.upvotes + 1 },
            }
          : prev
      );
    }
    try {
      const response = await fetch(
        `http://localhost:5000/${
          isAnswer ? "answers" : "questions"
        }/${id}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response || response.status !== 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      if (isAnswer) {
        setForums((forums) =>
          forums.map((forum) =>
            forum._id === id
              ? {
                  ...forum,
                  votes: { ...forum.votes, upvotes: forum.votes.upvotes - 1 },
                }
              : forum
          )
        );
      } else {
        setQuestion((prev) =>
          prev
            ? {
                ...prev,
                votes: { ...prev.votes, upvotes: prev.votes.upvotes - 1 },
              }
            : prev
        );
      }
    }
  }

  async function onDownVote(id: string, isAnswer: boolean = false) {
    if (isAnswer) {
      setForums((forums) =>
        forums.map((forum) =>
          forum._id === id
            ? {
                ...forum,
                votes: { ...forum.votes, downvotes: forum.votes.downvotes + 1 },
              }
            : forum
        )
      );
    } else {
      setQuestion((prev) =>
        prev
          ? {
              ...prev,
              votes: { ...prev.votes, downvotes: prev.votes.downvotes + 1 },
            }
          : prev
      );
    }
    try {
      const response = await fetch(
        `http://localhost:5000/${
          isAnswer ? "answers" : "questions"
        }/${id}/downvote`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 403) {
        navigate("/auth");
      }

      if (!response || response.status !== 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      if (isAnswer) {
        setForums((forums) =>
          forums.map((forum) =>
            forum._id === id
              ? {
                  ...forum,
                  votes: {
                    ...forum.votes,
                    downvotes: forum.votes.downvotes - 1,
                  },
                }
              : forum
          )
        );
      } else {
        setQuestion((prev) =>
          prev
            ? {
                ...prev,
                votes: { ...prev.votes, downvotes: prev.votes.downvotes - 1 },
              }
            : prev
        );
      }
    }
  }

  useEffect(() => {
    if (viewed) return;
    setViewed(true);
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/questions/${questionId}/`
        );

        if (!response || response.status !== 200) {
          throw new Error("Something went wrong");
        }

        const data: ExpandedQuestion = await response.json();
        setQuestion(data);
        const formattedForumAns: Answer[] = data.answers.map((a: any) => ({
          _id: a._id,
          body: a.body,
          votes: a.votes,
          comments: a.comments,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
        }));
        setForums(formattedForumAns);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [viewed]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-2 items-center justify-center">
      <div className="flex flex-col w-full mb-3 p-3">
        <h1 className="text-2xl text-black">{question?.title}</h1>
        <p className="text-sm mt-2">
          Asked on {question?.updatedAt.substring(0, 10)}
        </p>
      </div>
      <ForumElement
        _id={question!._id}
        isAnswer={false}
        votes={question!.votes.upvotes - question!.votes.downvotes}
        desc={question!.body}
        comments={question!.comments}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
      {forums.map((forum) => (
        <ForumElement
          key={forum._id}
          isAnswer={true}
          _id={forum._id}
          votes={forum.votes.upvotes - forum.votes.downvotes}
          desc={forum.body}
          comments={forum.comments}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
      <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex flex-col p-3">
        <p className="text-xl">Your Answer</p>
        <textarea
          value={yourAnswer}
          className="w-full min-h-40 bg-neutral-100 text-md rounded p-1 mt-1 flex items-start"
          onChange={(e) => setYourAnswer(e.target.value)}
        />
        <button
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:5000/answers/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  body: yourAnswer,
                  questionId: questionId,
                }),
              });

              const data = await response.json();

              if (response.ok) {
                alert("Answer posted successfully!");
              } else {
                if (response.status === 403) {
                  navigate("/auth");
                }
              }
            } catch (error) {
              console.error(error);
              alert("Error: Unable to post answer");
            }
          }}
          className="w-fit mt-2 text-sm text-white bg-[#147324]"
        >
          Post Your Answer
        </button>
      </div>
    </div>
  );
}
