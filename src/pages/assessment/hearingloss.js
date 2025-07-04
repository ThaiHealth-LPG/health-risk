import React, {useContext} from "react";
import Head from "next/head";
import { MdNavigateBefore } from "react-icons/md";
import Link from "next/link";
import AssessHaringLossForm from "@/components/assessments/hearingloss/AssessHaringLossForm";
import LanguageSwitcher from "@/components/button/LangaugeSwitcher";
import { LanguageContext } from "@/context/LanguageContext";

export default function AssessmentHearingLossPage() {
  
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen w-full bg-bases">
      <Head>
        <title>{t.headerHl}</title>
        <meta name="description" content="Register Worker" />
        <link rel="icon" href="/logo/thaihealth-lpg-logo.svg" />
      </Head>

      <nav className="w-full h-12 bg-success-light">
        <div className="max-w-[1024px] mx-auto  pt-2 pl-2 flex justify-between">
          <Link href="/" className="flex items-center w-fit">
            <MdNavigateBefore className="text-4xl text-neutral" />
            <span>{t.backBtn}</span>
          </Link>
          <LanguageSwitcher/>
        </div>
      </nav>

      <main className="max-w-[1024px] mx-auto h-full p-5">
        <AssessHaringLossForm />
      </main>
    </div>
  );
}
