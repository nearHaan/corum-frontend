import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarButton from "../../components/sidebar_btn";
import { TagButton } from "../../components/TagButton";
import { CircleQuestionMark, ArrowRightFromLineIcon } from "lucide-react";
import { useQuestionContext } from "../../contexts/QuestionContext";

type TagType = {
  id: string;
  name: string;
};

export default function HomePage() {
  const { selectedTags, setSelectedTags, setQuestions } = useQuestionContext();
  const [quickTags, setQuickTags] = useState<TagType[]>([]);
  const [, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Questions");
  const location = useLocation();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions/tags");
        const data = await response.json();
        setQuickTags(data.map((t: any) => ({ id: t._id, name: t.tagName })));
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    fetchQuestions([]);
  }, []);

  const fetchQuestions = async (tags: string[]) => {
    setLoading(true);
    try {
      let response;
      if (!tags.length) {
        response = await fetch("http://localhost:5000/questions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        response = await fetch("http://localhost:5000/questions/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ tags }),
        });
      }

      const data = await response.json();
      console.log(data);
      if (data.username) {
        console.log("Logged in");
      } else {
        console.log("Logged out");
      }
      const formattedQuestions = data.questions.map((q: any) => ({
        id: q._id,
        title: q.title,
        votes: q.votes,
        tags: q.tags.map((t: any) => ({ id: t._id, name: t.tagName })),
        views: q.views || 0,
        comments: q.comments?.length || 0,
      }));

      setQuestions(formattedQuestions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (id: string) => {
    const newSelectedTags = selectedTags.includes(id)
      ? selectedTags.filter((tagId) => tagId !== id)
      : [...selectedTags, id];

    setSelectedTags(newSelectedTags);

    setQuickTags((prev) =>
      [...prev].sort((a, b) => {
        const aSelected = newSelectedTags.includes(a.id) ? 0 : 1;
        const bSelected = newSelectedTags.includes(b.id) ? 0 : 1;
        return aSelected - bSelected;
      })
    );

    fetchQuestions(newSelectedTags);
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center justify-start text-black">
      <header className="relative top-0 sticky w-full flex items-center justify-between shadow-[0px_2px_#00000020] bg-white z-30 px-5">
        <h2 className="text-2xl my-2">CORUM</h2>
        <div className="flex-1 max-w-md rounded-lg my-2 mx-5 ring-1 ring-[#00000020]">
          <input className="p-2 w-full" type="text" placeholder="Search" />
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <a
            href="/new-question"
            className="h-10 px-4 py-1 bg-[#147324] text-white text-sm rounded-md flex items-center"
          >
            Ask a Question
          </a>
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
        </div>
      </header>
      <main className="w-full h-full flex items-start justify-center">
        <div className="w-80 h-full shadow-[2px_0px_#00000020] flex flex-col">
          <div className="p-5 gap-y-2 flex flex-col items-center">
            <SideBarButton
              isActive={activeTab === "Questions"}
              onClick={setActiveTab}
              title="Questions"
              toLink="/"
              icon={CircleQuestionMark}
            />
            <SideBarButton
              isActive={activeTab === "Rooms"}
              onClick={setActiveTab}
              title="Rooms"
              toLink="/rooms"
              icon={ArrowRightFromLineIcon}
            />
          </div>
          {location.pathname === "/" && (
            <div className="p-5">
              <p className="text-lg mb-3">Quick Tags</p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <TagButton
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    selected={selectedTags.includes(tag.id)}
                    toggle={() => toggleTag(tag.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
