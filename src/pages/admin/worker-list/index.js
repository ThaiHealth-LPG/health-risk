import React, { useEffect, useState } from "react";
import Head from "next/head";
import AdminSidebar from "@/components/admin/AdminSidebar";
import WorkerList from "@/components/admin/WorkerList";

export default function AdminWorkerList() {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>รายชื่อผู้ประกอบอาชีพทำครกหิน อ.เมือง จ.ลำปาง</title>
        <meta
          name="description"
          content="Health Risk Assessment Admin dashboard"
        />
      </Head>

      <div className="flex flex-row">
        {/* sidebar */}
        <AdminSidebar />

        {/* table worker-list */}
        <WorkerList />
      </div>
    </div>
  );
}
