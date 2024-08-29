import React, { useEffect, useState } from "react";
import Head from "next/head";
import AdminSidebar from "@/components/admin/AdminSidebar";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import WorkerList from "@/components/admin/WorkerList";

export default function AdminWorkerList() {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>ระบบจัดการข้อมูลกลุ่มอาชีพทำครกหิน อ.เมือง จ.ลำปาง</title>
        <meta
          name="description"
          content="Health Risk Assessment Admin dashboard"
        />
      </Head>

      {/* sidebar */}
      <AdminSidebar />

      {/* table worker-list */}
      <WorkerList />
    </div>
  );
}
