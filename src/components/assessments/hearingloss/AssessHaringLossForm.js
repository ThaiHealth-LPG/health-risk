import React, { useState } from "react";
import { Button, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import AssessHearingLossTab from "./AssessHearingLossTab";
import { useHearingLossRisk } from "@/context/HearingLossRiskContext";
import RiskGauge from "@/components/gauge/RiskGauge";
import AssessHaringLossResult from "./AssessHaringLossResult";
import { MdNavigateBefore } from "react-icons/md";
import Link from "next/link";

export default function AssessHearingLossForm() {
  const [tabIndex, setTabIndex] = useState(1);
  const [submissionError, setSubmissionError] = useState("");
  const {
    hearingLossRiskLevel,
    calculateHearingLossRisk,
    resetHearingLossRisk,
  } = useHearingLossRisk();

  const handleSubmit = (values, actions) => {
    try {
      calculateHearingLossRisk(values);
      actions.resetForm();
      setTabIndex(1);
    } catch (error) {
      setSubmissionError("Failed to calculate hearing loss risk.");
      actions.resetForm();
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
        assessAddress: "",
        assessLatitude: "",
        assessLongitude: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, resetForm, submitForm }) => (
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
                    onClick={submitForm}
                    colorScheme="orange"
                    className="w-full"
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
        </Form>
      )}
    </Formik>
  );
}
