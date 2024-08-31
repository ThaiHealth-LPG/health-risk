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
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import RiskBadge from "../badges/RiskBadge";
import { RiFileEditLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
  const router = useRouter();
  const workersPerPage = 10;

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("/api/personal/hearingloss");
        const sortedWorkers = response.data.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setWorkers(sortedWorkers);
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

  const matchesRiskLevel = (riskLevel, selectedLevel) => {
    if (selectedLevel === "") return true;
    const ranges = {
      0: [0, 0],
      "0.01-1.99": [0.01, 1.99],
      "2.00-2.99": [2.0, 2.99],
      "3.00-3.99": [3.0, 3.99],
      ">4.00": [4.01, Infinity],
    };
    const [min, max] = ranges[selectedLevel];
    return riskLevel >= min && riskLevel <= max;
  };

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;

  const filteredWorkers = workers.filter((worker) => {
    const fullName = `${worker.first_name} ${worker.last_name}`;
    const matchesSearch = fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const lastThreeHearingloss = getLastThreeHearingloss(worker.hearingloss);
    const recentRiskLevel = worker.hearingloss[0]?.risk_level;

    const matchesRisk =
      selectedRiskLevel === "" ||
      matchesRiskLevel(recentRiskLevel, selectedRiskLevel);

    return matchesSearch && matchesRisk;
  });

  const currentWorkers = filteredWorkers.slice(
    indexOfFirstWorker,
    indexOfLastWorker
  );
  const totalPages = Math.ceil(filteredWorkers.length / workersPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="w-full p-8">
      <div className="shadow-2xl rounded-3xl p-8">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="">
            <h1 className="text-xl font-semibold md:text-nowrap text-wrap">
              รายชื่อผู้ประกอบอาชีพทำครกหิน
            </h1>
            <span className="text-sm font-semibold text-neutral">
              จำนวน {filteredWorkers.length} ข้อมูล
            </span>
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="ค้นหาชื่อหรือนามสกุล"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="md"
            />
            <Select
              placeholder="เลือกระดับความเสี่ยง"
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              size="md"
            >
              <option value="0">ไม่มีนัยสำคัญ</option>
              <option value="0.01-1.99">น้อย</option>
              <option value="2.00-2.99">ปานกลาง</option>
              <option value="3.00-3.99">สูง</option>
              <option value=">4.00">สูงมาก</option>
            </Select>
          </div>
        </div>

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
          <>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ลำดับ</Th>
                    <Th>ชื่อ นามสกุล</Th>
                    <Th>เพศ</Th>
                    <Th>อายุ</Th>
                    <Th>{"ระดับความเสี่ยง (ล่าสุด->ก่อนหน้า)"}</Th>
                    <Th className="hidden">ความเสี่ยงล่าสุด</Th>
                    <Th>ประเมินล่าสุด</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentWorkers.map((worker, index) => {
                    const lastThreeHearingloss = getLastThreeHearingloss(
                      worker.hearingloss
                    );

                    return (
                      <Tr key={worker.id}>
                        <Td>{indexOfFirstWorker + index + 1}</Td>
                        <Td className="flex gap-3">
                          <span>{worker.first_name}</span>
                          <span>{worker.last_name}</span>
                        </Td>
                        <Td>{worker.gender}</Td>
                        <Td>{worker.age}</Td>
                        <Td className="flex gap-1">
                          {worker.hearingloss.length === 0 ? (
                            <span>ไม่พบข้อมูล</span>
                          ) : (
                            lastThreeHearingloss.map((record) => (
                              <RiskBadge
                                key={record.created_at}
                                riskLevel={record.risk_level}
                              />
                            ))
                          )}
                        </Td>
                        <Td className="hidden">
                          {worker.hearingloss[0]?.risk_level}
                        </Td>
                        <Td>
                          {worker.hearingloss.length === 0
                            ? "ไม่พบข้อมูล"
                            : new Date(
                                worker.hearingloss[0]?.updated_at
                              ).toLocaleDateString()}
                        </Td>
                        <Td>
                          <button
                            className="text-primary hover:text-accent"
                            onClick={() =>
                              router.push(`/admin/worker-list/${worker.id}`)
                            }
                          >
                            <RiFileEditLine />
                          </button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                colorScheme="teal"
                variant="outline"
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
