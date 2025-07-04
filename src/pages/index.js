import Menu from "@/components/home/Menu";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen w-full bg-success-light flex flex-col justify-between">
      <Head>
        <title>{t.header}</title>
        <meta name="description" content="Health Risk Assessment Application" />
        <link rel="icon" href="/logo/thaihealth-lpg-logo.svg" />
      </Head>

      <div className="max-w-[1024px] w-full mx-auto flex flex-col items-center xl:flex-row-reverse justify-around text-bases-content p-5 md:pt-10 gap-10">
        <div className="flex flex-col justify-center w-full text-center md:gap-2">
          <h2 className="text-2xl md:text-4xl font-extrabold w-full text-secondary-light-content">
            {t.title1}
          </h2>
          <h2 className="text-xl md:text-4xl font-semibold ">
            {t.title2}
          </h2>
          <h2 className="text-xl md:text-4xl">
            {t.title3} <br />
            {t.location}
          </h2>
        </div>
        <Image
          src="/logo/thaihealth-lpg-logo.svg"
          alt="logo-thaihealth"
          className="md:max-w-[80%] xl:max-w-[50%] flex justify-center"
          width={300}
          height={300}
        />
      </div>

      <main className="bottom-0 max-w-[1024px] bg-bases-light w-full mx-auto p-5 rounded-t-3xl pb-6">
        <Menu />
      </main>
    </div>
  );
}
