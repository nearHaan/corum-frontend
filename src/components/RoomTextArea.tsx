import { useEffect, useRef, useState } from "react";

type RoomTextAreaProps = {
  id: string;
  title: string;
  body: string;
  onChange?: (body: string) => void;
};

export const RoomTextArea: React.FC<RoomTextAreaProps> = ({
  title,
  body,
  onChange,
}) => {
  const [text, setText] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Update local text when body prop changes
  useEffect(() => {
    setText(body);
  }, [body]);

  return (
    <div className="w-full bg-neutral-100 rounded-xl overflow-hidden flex flex-col justify-start">
      <p className="p-2 font-bold text-sm mb-2">{title}</p>
      <textarea
        ref={textareaRef}
        className="px-2 w-full resize-none overflow-hidden"
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const newValue =
              text.substring(0, start) + "\t" + text.substring(end);
            setText(newValue);
            setTimeout(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                start + 1;
            }, 0);
            onChange?.(newValue);
          }
        }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder="Type something..."
      />
    </div>
  );
};
