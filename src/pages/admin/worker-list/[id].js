import AdminSidebar from "@/components/admin/AdminSidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function UpdateWorkerPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>แก้ไขผู้ประกอบอาชีพทำครกหิน อ.เมือง จ.ลำปาง</title>
        <meta
          name="description"
          content="Health Risk Assessment Admin dashboard"
        />
      </Head>

      <div className="flex md:ml-[276px] flex-row">
        {/* sidebar */}
        <AdminSidebar />

        {/* table worker-list */}
      </div>
    </div>
  );
}
