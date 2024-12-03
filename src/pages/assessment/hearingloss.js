import React from "react";
import Head from "next/head";
import { MdNavigateBefore } from "react-icons/md";
import Link from "next/link";
import AssessHaringLossForm from "@/components/assessments/hearingloss/AssessHaringLossForm";

export default function AssessmentHearingLossPage() {
  return (
    <div className="min-h-screen w-full bg-bases">
      <Head>
        <title>ประเมินความเสี่ยงการรับสัมผัสเสียงดัง</title>
        <meta name="description" content="Register Worker" />
        <link rel="icon" href="/logo/thaihealth-lpg-logo.svg" />
      </Head>

      <nav className="w-full h-12 bg-success-light">
        <div className="max-w-[1024px] mx-auto  pt-2 pl-2 ">
          <Link href="/" className="flex items-center w-fit">
            <MdNavigateBefore className="text-4xl text-neutral" />
            <span>กลับสู่หน้าหลัก</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1024px] mx-auto h-full p-5">
        <AssessHaringLossForm />
      </main>
    </div>
  );
}
