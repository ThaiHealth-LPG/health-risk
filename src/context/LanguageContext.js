import { createContext, useState, useEffect } from "react";
import { TextIndex } from "@/utils/langauges/indexUtils";
import { TextsMenu } from "@/utils/langauges/components/menuUtils";
import { TextsAssessmentHearingLossPage } from "@/utils/langauges/assessmentHearingLossUtils";

// ฟังก์ชันช่วยจำภาษาด้วย localStorage
const getLang = () => localStorage.getItem("lang") || "th";
const setLang = (lang) => localStorage.setItem("lang", lang);

// สร้าง context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("th");

  useEffect(() => {
    const defaultLang = getLang();
    setLangState(defaultLang);
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    setLangState(newLang);
  };

  const combinedText = {
    th:{
        ...TextIndex.th,
        ...TextsMenu.th,
        ...TextsAssessmentHearingLossPage.th,
        
    },
    en: {
        ...TextIndex.en,
        ...TextsMenu.en,
        ...TextsAssessmentHearingLossPage.en,
    }
  };

  // รวมข้อความไว้ใน t
  const safeLang = ["th", "en"].includes(lang) ? lang : "th";
  const t = combinedText[safeLang];

  return (
    <LanguageContext.Provider value={{ lang: safeLang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
