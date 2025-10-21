import { useEffect, useState } from "react";
import { TagButton } from "../../../components/TagButton";
import { useNavigate } from "react-router-dom";

export default function AskQuestion() {
  type tagType = {
    id: string;
    name: string;
  };
  const [tags, setTags] = useState<Array<tagType>>([]);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/questions/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data.map((t: any) => ({ id: t._id, name: t.tagName })));
      })
      .catch(console.error);
  }, []);

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col justify-center p-5">
      <h2 className="text-2xl">Ask a Question</h2>
      <div>
        <p className="mt-2 text-sm">Title</p>
        <input
          value={title}
          className="w-full bg-neutral-100 text-md rounded p-1 mt-1"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mt-2 text-sm">Description</p>
        <textarea
          value={body}
          className="w-full min-h-20 bg-neutral-100 text-md rounded p-1 mt-1 flex items-start"
          onChange={(e) => setBody(e.target.value)}
        />
        <p className="mt-2 text-sm">Tags</p>
        <div className="mt-1 p-3 rounded border-1 border-neutral-400 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagButton
              key={tag.id}
              id={tag.id}
              name={tag.name}
              selected={selectedTags.includes(tag.id)}
              toggle={() => toggleTag(tag.id)}
            />
          ))}
        </div>
        <button
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:5000/questions/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  title,
                  body,
                  tags: selectedTags,
                  isPrivate: false,
                }),
              });

              const data = await response.json();

              if (response.ok) {
                alert("Question posted successfully!");
              } else {
                alert(`Error: ${data.error || "Something went wrong"}`);
                navigate("/auth");
              }
            } catch (error) {
              console.error(error);
              alert("Error: Unable to post question");
            } finally {
              navigate("/");
            }
          }}
          className="mt-10 text-sm text-white bg-[#147324]"
        >
          Post
        </button>
      </div>
    </div>
  );
}
