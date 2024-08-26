import React, { useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import axios from "axios";
import PersonalInfoTab from "./PersonalInfoTab";
import WorkInfoTab from "./WorkInfoTab";
import HealthInfoTab from "./HealthInfoTab";

export default function RegisterWorkerForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState(null);

  const nextTab = () => setTabIndex((prevIndex) => prevIndex + 1);
  const prevTab = () => setTabIndex((prevIndex) => prevIndex - 1);
  const resetTab = () => setTabIndex(0);

  const handleSubmit = async (
    values,
    actions,
    resetTab,
    setSubmissionError
  ) => {
    try {
      const { data: personalData } = await axios.post("/api/personal", {
        idNumber: values.idNumber,
        gender: values.gender,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        birth: values.birth,
        age: values.age,
        nation: values.nation,
      });

      const personalId = personalData.personalId;

      await Promise.all([
        axios.post("/api/home", {
          personalId,
          homeAddress: values.homeAddress,
          homeLatitude: values.homeLatitude,
          homeLongitude: values.homeLongitude,
          stayYears: values.stayYears,
          bornAddress: values.bornAddress,
        }),
        axios.post("/api/working", {
          personalId,
          position: values.position,
          noise: values.noise,
          workingHours: values.workingHours,
          workingWeeks: values.workingWeeks,
          workingYears: values.workingYears,
          ppe: values.ppe,
        }),
        axios.post("/api/workplace", {
          personalId,
          workAddress: values.workAddress,
          workLatitude: values.workLatitude,
          workLongitude: values.workLongitude,
          workSeparation: values.workSeparation,
        }),
        axios.post("/api/health", {
          personalId,
          bodyWeight: values.bodyWeight,
          bodyHeight: values.bodyHeight,
          bmi: values.bmi,
          medical: values.medical,
          diseases: values.diseases,
          earSymptoms: values.earSymptoms,
          earSymptomsDetails: values.earSymptomsDetails,
        }),
      ]);

      actions.resetForm();
      resetTab();
      setSubmissionError(null);
    } catch (error) {
      console.error("Failed to submit form", error);
      setSubmissionError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        idNumber: "",
        gender: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birth: "",
        age: "",
        nation: "",
        homeAddress: "",
        homeLatitude: "",
        homeLongitude: "",
        stayYears: "",
        bornAddress: "",
        position: "",
        noise: "",
        workingHours: "",
        workingWeeks: "",
        workingYears: "",
        workAddress: "",
        workLatitude: "",
        workLongitude: "",
        workSeparation: "",
        ppe: [],
        bodyWeight: "",
        bodyHeight: "",
        bmi: "",
        medical: "",
        diseases: "",
        earSymptoms: "",
        earSymptomsDetails: "",
      }}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, resetTab, setSubmissionError)
      }
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>ข้อมูลส่วนบุคคล</Tab>
              <Tab>ข้อมูลการทำงาน</Tab>
              <Tab>ข้อมูลสุขภาพ</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PersonalInfoTab nextTab={nextTab} />
              </TabPanel>

              <TabPanel>
                <WorkInfoTab nextTab={nextTab} prevTab={prevTab} />
              </TabPanel>

              <TabPanel>
                <HealthInfoTab prevTab={prevTab} isLoading={isSubmitting} />
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
