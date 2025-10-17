import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

type CommentsObject = {
  id: string;
  username: string;
  comment: string;
  timestamp: string;
};

type ForumElementProps = {
  id: string;
  votes: number;
  desc: string;
  comments: CommentsObject[];
  onUpVote: Function;
  onDownVote: Function;
};

export const ForumElement: React.FC<ForumElementProps> = ({
  id,
  votes,
  desc,
  comments,
  onUpVote,
  onDownVote,
}) => {
  return (
    <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex flex-col">
      <div className="w-full flex items-center gap-x-2">
        <div className="h-full flex items-center justify-start flex-col py-10 px-8">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => {
                onUpVote(id);
              }}
            >
              <ThumbsUpIcon size={20} />
            </button>
            <p className="text-4xl">{votes.toString()}</p>
            <p className="text-xs w-full text-center">Votes</p>
            <button
              onClick={() => {
                onDownVote(id);
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
        <div className="ring-1 ring-[#00000020] rounded-xl mb-3">
          <input
            className="h-full w-full text-md p-2"
            type="text"
            placeholder="Add a Comment"
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          {comments.map((comment, index) => (
            <div className="flex items-center gap-x-2 bg-gray-100 p-2 rounded-md w-full">
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
              <div className="mr-5">
                <p className="text-sm text-black">{comment.username}</p>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
              <div className="flex-1">
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
