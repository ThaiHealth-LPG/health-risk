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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import AssessHearingLossTab from "./AssessHearingLossTab";
import { useHearingLossRisk } from "@/context/HearingLossRiskContext";
import RiskGauge from "@/components/gauge/RiskGauge";
import AssessHaringLossResult from "./AssessHaringLossResult";
import { MdNavigateBefore } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

export default function AssessHearingLossForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState("");
  const [apiError, setApiError] = useState("");
  const {
    hearingLossRiskScore,
    hearingLossRiskLevel,
    calculateHearingLossRisk,
    resetHearingLossRisk,
  } = useHearingLossRisk();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCalculateRisk = (values, actions) => {
    try {
      calculateHearingLossRisk(values);
      setTabIndex(1);
    } catch (error) {
      setSubmissionError("Failed to calculate hearing loss risk.");
      actions.resetForm();
    }
  };

  const handleSaveData = async (values) => {
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

      console.log("Data saved successfully:", response.data);
    } catch (error) {
      setApiError("Failed to save data: " + error.message);
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
      {({ isSubmitting, resetForm, submitForm, values }) => (
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
                    isDisabled={isSubmitting}
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
                  >
                    กลับสู่หน้าหลัก
                  </Button>
                </Link>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {submissionError && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {submissionError}
            </div>
          )}

          {apiError && (
            <div style={{ color: "red", marginTop: "10px" }}>{apiError}</div>
          )}

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleSaveData(values)}
                >
                  บันทึกข้อมูล
                </Button>
                <Button variant="ghost" onClick={onClose}>
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
