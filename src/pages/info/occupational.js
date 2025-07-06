import InfoOccupational from "@/components/infoOccupational/InfoOccupational";
import React, {useContext} from "react";
import Head from "next/head";
import Link from "next/link";
import { MdNavigateBefore } from "react-icons/md";
import { LanguageContext } from "@/context/LanguageContext";

export default function InfOccupationalPage() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen w-full bg-bases">
      <Head>
        <title>{t.headerInfo}</title>
        <meta name="description" content="Info Occupational" />
        <link rel="icon" href="/logo/thaihealth-lpg-logo.svg" />
      </Head>

      <nav className="w-full h-12 bg-success-light">
        <div className="max-w-[1024px] mx-auto  pt-2 pl-2 ">
          <Link href="/" className="flex items-center w-fit">
            <MdNavigateBefore className="text-4xl text-neutral" />
            <span>{t.backBtn}</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1024px] mx-auto h-full p-5">
        <InfoOccupational />
      </main>
    </div>
  );
}
