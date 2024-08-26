import React, { useState } from "react";
import { Button, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import AssessHearingLossTab from "./AssessHearingLossTab";

export default function AssessHearingLossForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState("");

  const handleSubmit = async (values, actions) => {
    console.log(values);
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
      {({ isSubmitting, resetForm }) => (
        <Form>
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabPanels>
              <TabPanel>
                <AssessHearingLossTab onNextTab={() => setTabIndex(1)} />
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    resetTab();
                  }}
                  isDisabled={isSubmitting}
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
