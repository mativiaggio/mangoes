import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const tags = value.split(",").filter((tag) => tag.trim() !== "");

  const addTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      const updatedTags = [...tags, inputValue.trim()];
      onChange(updatedTags.join(","));
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    onChange(updatedTags.join(","));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border px-3 py-2 rounded-md">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center px-2 py-1 text-sm bg-gray-2  00 rounded-md dark:bg-main">
          {tag}
          <button
            type="button"
            className="ml-1 text-gray-500 hover:text-red-500"
            onClick={() => removeTag(tag)}>
            <X size={16} />
          </button>
        </span>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Etiquetas"
        className="flex-1 bg-transparent border-none outline-none h-fit focus-visible:ring-0 active:ring-0"
      />
    </div>
  );
};

export default TagInput;
