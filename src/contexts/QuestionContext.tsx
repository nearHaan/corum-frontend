import { createContext, useContext, useState, type ReactNode } from "react";

type TagContextType = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  questions: any[];
  setQuestions: (questions: any[]) => void;
};

const QuestionContext = createContext<TagContextType | undefined>(undefined);

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useQuestionContext must be used inside provider");
  return context;
};

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <QuestionContext.Provider
      value={{ selectedTags, setSelectedTags, questions, setQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
