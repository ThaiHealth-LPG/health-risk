import Menu from "@/components/lpg/home/Menu";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-success-light flex flex-col justify-between">
      <Head>
        <title>ประเมินความเสี่ยงสุขภาพ</title>
        <meta name="description" content="Health Risk Assessment Application" />
        <link rel="icon" href="/logo/thaihealth-lpg-logo.svg" />
      </Head>

      <div className="max-w-[1024px] w-full mx-auto flex flex-col items-center xl:flex-row-reverse justify-around text-bases-content p-5 md:pt-10 gap-10">
        <Link href="/lpg">lpg</Link>
        <Link href="/nma">nma</Link>
        <Link href="/yst">yst</Link>
      </div>

      <main className="bottom-0 max-w-[1024px] bg-bases-light w-full mx-auto p-5 rounded-t-3xl pb-6"></main>
    </div>
  );
}
