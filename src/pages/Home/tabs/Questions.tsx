export default function QuestionsPage() {
  const quickTags = ["node.js", "python"];
  return (
    <div className="w-full h-full flex flex-col p-2 items-center justify-center">
      <div className="h-10"></div>
      <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex items-center gap-x-2">
        <div className="felx items-center justify-center flex-col py-10 px-8">
          <p className="text-4xl">12</p>
          <p className="text-xs w-full text-center">Votes</p>
        </div>
        <div>
          <h2 className="text-2xl mb-5">Title Here</h2>
          <div className="grid mb-5 grid-cols-2 gap-2 w-fit">
            {quickTags.map((item) => (
              <p className="text-gray-500 mx-1 text-sm rounded-full py-1 px-2 bg-gray-100 w-fit">
                {item}
              </p>
            ))}
          </div>
          <div className="flex gap-x-5">
            <p className="text-sm text-gray-400">200 views</p>
            <p className="text-sm text-gray-400">200 comments</p>
          </div>
        </div>
      </div>
      <div className="w-full ring-1 ring-[#00000020] mb-2 rounded-xl flex items-center gap-x-2">
        <div className="felx items-center justify-center flex-col py-10 px-8">
          <p className="text-4xl">12</p>
          <p className="text-xs w-full text-center">Votes</p>
        </div>
        <div>
          <h2 className="text-2xl mb-5">Title Here</h2>
          <div className="grid mb-5 grid-cols-2 gap-2 w-fit">
            {quickTags.map((item) => (
              <p className="text-gray-500 mx-1 text-sm rounded-full py-1 px-2 bg-gray-100 w-fit">
                {item}
              </p>
            ))}
          </div>
          <div className="flex gap-x-5">
            <p className="text-sm text-gray-400">200 views</p>
            <p className="text-sm text-gray-400">200 comments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
