type QuestionBoxProps = {
  title: string;
  votes: number;
  tags: string[];
  views: number;
  comments: number;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  title,
  votes,
  tags,
  views,
  comments,
}) => {
  return (
    <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex items-center gap-x-2">
      <div className="felx items-center justify-center flex-col py-10 px-8">
        <p className="text-4xl">{votes.toString()}</p>
        <p className="text-xs w-full text-center">Votes</p>
      </div>
      <div>
        <h2 className="text-2xl mb-5">{title}</h2>
        <div className="grid mb-5 grid-cols-2 gap-2 w-fit">
          {tags.map((item) => (
            <p className="text-gray-500 mx-1 text-sm rounded-full py-1 px-2 bg-gray-100 w-fit">
              {item}
            </p>
          ))}
        </div>
        <div className="flex gap-x-5">
          <p className="text-sm text-gray-400">{views.toString()} views</p>
          <p className="text-sm text-gray-400">
            {comments.toString()} comments
          </p>
        </div>
      </div>
    </div>
  );
};
