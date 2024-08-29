import React from "react";
import Head from "next/head";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function adminDashboard() {
  return (
    <div className="min-h-screen w-full bg-bases">
      <Head>
        <title>ระบบจัดการข้อมูลกลุ่มอาชีพทำครกหิน อ.เมือง จ.ลำปาง</title>
        <meta
          name="description"
          content="Health Risk Assessment Admin dashboard"
        />
      </Head>
      <AdminSidebar />
    </div>
  );
}
