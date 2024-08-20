import React, { useState } from "react";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import PersonalInfoTab from "./PersonalInfoTab";
import WorkInfoTab from "./WorkInfoTab";
import HealthInfoTab from "./HealthInfoTab";

export default function RegisterWorkerForm() {
  const [tabIndex, setTabIndex] = useState(0);

  const nextTab = () => setTabIndex((prevIndex) => prevIndex + 1);
  const prevTab = () => setTabIndex((prevIndex) => prevIndex - 1);
  const resetTab = () => setTabIndex(0);

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
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
      }}
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
        </Form>
      )}
    </Formik>
  );
}
