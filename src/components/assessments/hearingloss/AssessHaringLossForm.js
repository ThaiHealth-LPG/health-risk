import React, { useState } from "react";
import {
  Button,
  TabPanel,
  TabPanels,
  Tabs,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import AssessHearingLossTab from "./AssessHearingLossTab";
import { useHearingLossRisk } from "@/context/HearingLossRiskContext";
import RiskGauge from "@/components/gauge/RiskGauge";
import AssessHaringLossResult from "./AssessHaringLossResult";
import { MdNavigateBefore } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AssessHearingLossForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [nameNotFound, setNameNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    hearingLossRiskScore,
    hearingLossRiskLevel,
    calculateHearingLossRisk,
    resetHearingLossRisk,
  } = useHearingLossRisk();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    resetHearingLossRisk();
    setLoading(false);
  }, []);

  const handleCalculateRisk = (values) => {
    try {
      calculateHearingLossRisk(values);
      setTabIndex(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveData = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/hearingloss", {
        position: values.position,
        noise: values.noise,
        workingHours: values.workingHours,
        bodyHeight: values.bodyHeight,
        earSymptoms: values.earSymptoms,
        firstName: values.firstName,
        lastName: values.lastName,
        riskScore: hearingLossRiskScore,
        riskLevel: hearingLossRiskLevel,
      });

      if (response.status === 404 || response.data.error) {
        setNameNotFound(true);
        setLoading(false);
        return;
      }

      console.log("Data saved successfully:", response.data);
      resetForm();
      resetHearingLossRisk();
      router.push("/");
    } catch (error) {
      console.log("Failed to save data. Please try again later.");
      if (error.response && error.response.status === 404) {
        setNameNotFound(true);
      } else {
        console.error("Error saving risk data:", error.message);
        setNameNotFound(false);
      }
      setLoading(false);
    }
  };

  const resetTab = () => setTabIndex(0);

  return (
    <Formik
      initialValues={{
        position: "",
        noise: "",
        workingHours: "",
        bodyHeight: "",
        earSymptoms: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={handleCalculateRisk}
    >
      {({ resetForm, submitForm, values, setFieldValue }) => (
        <Form>
          <RiskGauge riskLevel={hearingLossRiskLevel} />
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabPanels>
              <TabPanel>
                <AssessHearingLossTab submitForm={submitForm} />
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    resetTab();
                    resetHearingLossRisk();
                  }}
                  className="w-full mt-4"
                >
                  ล้างข้อมูล
                </Button>
              </TabPanel>

              <TabPanel>
                <AssessHaringLossResult riskLevel={hearingLossRiskLevel} />
                <div className="flex gap-4 items-center mt-5">
                  <Button
                    type="button"
                    onClick={() => {
                      resetForm();
                      resetTab();
                      resetHearingLossRisk();
                    }}
                    className="w-full"
                  >
                    <MdNavigateBefore className="text-4xl text-back" />
                    ประเมินอีกครั้ง
                  </Button>
                  <Button
                    type="button"
                    colorScheme="orange"
                    className="w-full"
                    onClick={onOpen}
                  >
                    บันทึกผลการประเมิน
                  </Button>
                </div>
                <Link href="/">
                  <Button
                    type="button"
                    colorScheme="green"
                    className="w-full mt-4"
                    onClick={() => {
                      resetForm();
                      resetTab();
                      resetHearingLossRisk();
                    }}
                  >
                    กลับสู่หน้าหลัก
                  </Button>
                </Link>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Modal */}
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setFieldValue("firstName", "");
              setFieldValue("lastName", "");
              setNameNotFound(false);
              onClose();
            }}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>ข้อมูลผู้ได้รับการประเมิน</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>ชื่อ*</FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="firstName"
                      placeholder="ชื่อ"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>นามสกุล*</FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="lastName"
                      placeholder="นามสกุล"
                    />
                  </FormControl>
                  {nameNotFound && (
                    <p style={{ color: "red" }}>
                      ไม่พบชื่อนามสกุลในระบบ
                      <br />
                      กรุณาตรวจสอบชื่อนามสกุลอีกครั้ง
                      <br />
                      หรือกดลงทะเบียนผู้ประกอบอาชีพทำครกหิน
                    </p>
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                {nameNotFound && (
                  <Link href="/register/worker">
                    <Button colorScheme="blue" mr={3} isLoading={loading}>
                      ลงทะเบียน
                    </Button>
                  </Link>
                )}

                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveData(values, { resetForm });
                  }}
                  isLoading={loading}
                >
                  บันทึกข้อมูล
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFieldValue("firstName", "");
                    setFieldValue("lastName", "");
                    setNameNotFound(false);
                    onClose();
                  }}
                >
                  ยกเลิก
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
