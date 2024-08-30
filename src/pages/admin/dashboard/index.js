import React, { useEffect, useState } from "react";
import Head from "next/head";
import AdminSidebar from "@/components/admin/AdminSidebar";
import BmiChart from "@/components/charts/BmiChart";
import HearingLossChart from "@/components/charts/HearingLossChart";
import WorkLocation from "@/components/map/WorkLocation";
import WorkingHearingLossChart from "@/components/charts/WorkingHearingLossChart";

export default function AdminDashboardPage() {
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

        {/* chart */}
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8 p-8">
          <HearingLossChart />
          <WorkingHearingLossChart />
          <WorkLocation />
          <BmiChart />
        </div>
      </div>
    </div>
  );
}
