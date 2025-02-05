"use client";

import { useLanguage } from "@/lib/contexts/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Argentina from "./icons/argentina";
import Usa from "./icons/usa";
import Brazil from "./icons/brazil";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "esp", name: "Español", icon: Argentina },
    { code: "eng", name: "English", icon: Usa },
    { code: "por", name: "Português", icon: Brazil }, // Icon genérico para Portugués
  ];

  const selectedLanguage = languages.find((lang) => lang.code === language);

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(value as "esp" | "eng" | "por")}>
      <SelectTrigger className="w-fit border-none shadow-none focus:!ring-0 p-0 justify-center gap-2">
        <SelectValue className="flex items-center justify-center">
          {selectedLanguage?.icon && <selectedLanguage.icon />}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <lang.icon />
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
