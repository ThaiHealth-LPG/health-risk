import React, { useState } from "react";
import { Button, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import AssessHearingLossTab from "./AssessHearingLossTab";
import { useHearingLossRisk } from "@/context/HearingLossRiskContext";

export default function AssessHearingLossForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState("");
  const { hearingLossRisk, calculateHearingLossRisk, resetHearingLossRisk } =
    useHearingLossRisk();

  const handleSubmit = (values, actions) => {
    try {
      calculateHearingLossRisk(values);
      console.log(`Hearing Loss Risk: ${hearingLossRisk}`);
      //   actions.resetForm();
      //   setTabIndex(1);
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
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    resetTab();
                  }}
                  isDisabled={isSubmitting}
                  className="w-full mt-4"
                >
                  ประเมินอีกครั้ง
                </Button>
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
