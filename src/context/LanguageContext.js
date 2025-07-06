import { createContext, useState, useEffect } from "react";
import { TextIndex } from "@/utils/langauges/indexUtils";
import { TextsMenu } from "@/utils/langauges/components/menuUtils";
import { TextsAssessmentHearingLossPage } from "@/utils/langauges/assessmentHearingLossUtils";
import { TextWorkerPage } from "@/utils/langauges/register/workerUtils";
import { TextHealthInfoTab } from "@/utils/langauges/register/HealthUtils";
import { TextInfoOccupational } from "@/utils/langauges/infoUtils";
import { infoList } from "@/components/infoOccupational/infoList";

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
        ...TextWorkerPage.th,
        ...TextHealthInfoTab.th,
        ...TextInfoOccupational.th,
        ...infoList.th
    },
    en: {
        ...TextIndex.en,
        ...TextsMenu.en,
        ...TextsAssessmentHearingLossPage.en,
        ...TextWorkerPage.en,
        ...TextHealthInfoTab.en,
        ...TextInfoOccupational.en,
        ...infoList.en
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
