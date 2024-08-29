import React, { useEffect, useState } from "react";
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
import RiskBadge from "../badges/RiskBadge";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("/api/personal/hearingloss");
        console.log(response.data.data);
        setWorkers(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching worker data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const getLastThreeHearingloss = (hearingloss) => {
    if (!hearingloss || hearingloss.length === 0) return [];

    const sortedHearingloss = [...hearingloss].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return sortedHearingloss.slice(0, 3);
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-semibold mb-4">
        รายชื่อผู้ประกอบอาชีพแกะสลักหิน
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ลำดับ</Th>
                <Th>ชื่อ นามสกุล</Th>
                <Th>อายุ</Th>
                <Th>{"ระดับความเสี่ยง (ล่าสุด->ก่อนหน้า)"}</Th>
                <Th className="text-lg font-bold">ลงทะเบียนเมื่อ</Th>
                <Th className="text-lg font-bold">แก้ไขข้อมูล</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workers.map((worker, index) => {
                const lastThreeHearingloss = getLastThreeHearingloss(
                  worker.hearingloss
                );

                return (
                  <Tr key={worker.id}>
                    <Td>{index + 1}</Td>
                    <Td className="flex gap-3">
                      <span>{worker.first_name}</span>
                      <span>{worker.last_name}</span>
                    </Td>
                    <Td>{worker.age}</Td>
                    <Td className="flex gap-1">
                      {lastThreeHearingloss.map((record, idx) => (
                        <RiskBadge
                          key={record.created_at}
                          riskLevel={record.risk_level}
                        />
                      ))}
                    </Td>
                    <Td>{new Date(worker.created_at).toLocaleDateString()}</Td>
                    <Td>
                      <button className="text-blue-500 hover:underline">
                        แก้ไข
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
