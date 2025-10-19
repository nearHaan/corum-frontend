import { SendHorizonal, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

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

type ForumElementProps = {
  _id: string;
  isAnswer: boolean;
  votes: number;
  desc: string;
  comments: Comment[];
  onUpVote: Function;
  onDownVote: Function;
};

export const ForumElement: React.FC<ForumElementProps> = ({
  _id,
  votes,
  isAnswer,
  desc,
  comments,
  onUpVote,
  onDownVote,
}) => {
  const [comment, setComment] = useState("");
  const [sendVisible, setSendVisible] = useState(false);
  return (
    <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex flex-col">
      <div className="w-full flex items-center gap-x-2">
        <div className="h-full flex items-center justify-start flex-col py-10 px-8">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => {
                onUpVote(_id, isAnswer);
              }}
            >
              <ThumbsUpIcon size={20} />
            </button>
            <p className="text-4xl">{votes.toString()}</p>
            <p className="text-xs w-full text-center">Votes</p>
            <button
              onClick={() => {
                onDownVote(_id, isAnswer);
              }}
            >
              <ThumbsDownIcon size={20} />
            </button>
          </div>
        </div>
        {/* <div className="h-20 w-0.5 bg-neutral-100"></div> */}
        <div className="w-full h-full p-5">
          <p className="text-sm mb-5">{desc}</p>
          <div className="flex gap-x-5"></div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center ring-1 ring-[#00000020] rounded-xl mb-3">
          <input
            value={comment}
            onChange={(e) => {
              const val = e.target.value;
              setComment(e.target.value);
              setSendVisible(val.trim().length > 0);
            }}
            className="h-full w-full text-md p-2"
            type="text"
            placeholder="Add a Comment"
          />
          {sendVisible && (
            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    "http://localhost:5000/comments/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        parentType: isAnswer ? "answer" : "question",
                        id: _id,
                        body: comment,
                      }),
                    }
                  );

                  const data = await response.json();

                  if (response.ok) {
                    alert("Comment posted successfully!");
                  } else {
                    alert(`Error: ${data.error || "Something went wrong"}`);
                  }
                } catch (error) {
                  console.error(error);
                  alert("Error: Unable to post comment");
                }
              }}
            >
              <SendHorizonal color="#505050" />
            </button>
          )}
        </div>
        <div className="w-full flex flex-col gap-y-2">
          {comments.map((comment, index) => (
            <div
              key={comment._id}
              className="flex items-center gap-x-2 bg-gray-100 p-2 rounded-md w-full"
            >
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
              <div className="mr-5">
                <p className="text-sm text-black">{comment.author.username}</p>
                <p className="text-xs text-gray-400">
                  Date:{" "}
                  {comment.createdAt ? comment.createdAt.substring(0, 10) : ""}
                </p>
                <p className="text-xs text-gray-400">
                  Time:{" "}
                  {comment.createdAt ? comment.createdAt.substring(11, 16) : ""}
                </p>
              </div>
              <div className="flex-1">
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
