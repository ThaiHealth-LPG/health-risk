import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@chakra-ui/react";

export default function LanguageSwitcher() {
  const { lang, changeLang } = useContext(LanguageContext);

  return (
    <Button onClick={() => changeLang(lang === "th" ? "en" : "th")}>
      {lang === "th" ? "EN" : "TH"}
    </Button>
  );
}
