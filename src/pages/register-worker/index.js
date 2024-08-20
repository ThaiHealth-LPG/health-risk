import React from "react";
import Head from "next/head";
import RegisterWorkerForm from "@/components/register/worker/RegisterWorkerForm";

export default function RegisterWorker() {
  return (
    <div className="min-h-screen w-full bg-bases">
      <Head>
        <title>ลงทะเบียนผู้ประกอบอาชีพทำครกหิน</title>
        <meta name="description" content="Register Worker" />
      </Head>

      <main className="w-full h-full p-5">
        <RegisterWorkerForm />
      </main>
    </div>
  );
}
