type Tag = {
  _id: string;
  name: string;
};

type QuestionBoxProps = {
  id: string;
  title: string;
  votes: number;
  tags: Tag[];
  views: number;
  comments: number;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  id,
  title,
  votes,
  tags,
  views,
  comments,
}) => {
  return (
    <div className="py-1 w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex items-center gap-x-2">
      <div className="flex items-center justify-center flex-col py-10 px-8">
        <p className="text-4xl">{votes.toString()}</p>
        <p className="text-xs w-full text-center">Votes</p>
      </div>
      <div>
        <a className="text-black text-2xl mb-5" href={`/question/${id}`}>
          {title}
        </a>
        <div className="mt-2 grid mb-5 grid-cols-2 gap-2 w-fit">
          {tags.map((item) => (
            <p className="text-gray-500 mx-1 text-sm rounded-full py-1 px-2 bg-gray-100 w-fit">
              {item.name}
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
