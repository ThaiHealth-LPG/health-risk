import React, { useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import axios from "axios";
import PersonalInfoTab from "./PersonalInfoTab";
import WorkInfoTab from "./WorkInfoTab";
import HealthInfoTab from "./HealthInfoTab";
import { useRouter } from "next/router";
import { useHearingLossRisk } from "@/context/HearingLossRiskContext";
import Loading from "@/components/loading/Loading";

export default function RegisterWorkerForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    hearingLossRiskScore,
    hearingLossRiskLevel,
    calculateHearingLossRisk,
    resetHearingLossRisk,
  } = useHearingLossRisk();

  const nextTab = () => {
    setTabIndex((prevIndex) => prevIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevTab = () => {
    setTabIndex((prevIndex) => prevIndex - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetTab = () => {
    setTabIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (values, actions, resetTab) => {
    setLoading(true);
    try {
      const { data: personalData } = await axios.post("/api/personal", {
        idNumber: values.idNumber,
        gender: values.gender,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
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
          vibrateX: values.vibrateX,
          vibrateY: values.vibrateY,
          vibrateZ: values.vibrateZ,
          vibrateAvg: values.vibrateAvg,
          vibrateTwa: values.vibrateTwa,
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

      // calculateHearingLossRisk(values);

      // // await new Promise((resolve) => {
      // //   const interval = setInterval(() => {
      // //     if (hearingLossRiskScore !== null && hearingLossRiskLevel !== null) {
      // //       clearInterval(interval);
      // //       resolve();
      // //     }
      // //   }, 100);
      // // });

      // await axios.post("/api/hearingloss", {
      //   position: values.position,
      //   noise: values.noise,
      //   noiseLevel: "เฉลี่ย",
      //   workingHours: values.workingHours,
      //   bodyHeight: values.bodyHeight,
      //   earSymptoms: values.earSymptoms,
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   riskScore: hearingLossRiskScore,
      //   riskLevel: hearingLossRiskLevel,
      //   riskLatitude: values.workLatitude,
      //   riskLongitude: values.workLongitude,
      // });

      toast({
        title: "ลงทะเบียนสำเร็จ",
        description: "ระบบได้รับข้อมูลของท่านเรียบร้อย",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      actions.resetForm();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast({
            title: "ท่านได้เคยลงทะเบียนในระบบแล้ว",
            description: "ระบบจะนำท่านกลับสู่หน้าหลัก เพื่อประเมินความเสี่ยง",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          actions.resetForm();
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else if (error.response.status >= 400) {
          toast({
            title: "ข้อมูลไม่ครบถ้วน",
            description: "กรุณาตรวจสอบการกรอกข้อมูลของท่าน",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "พบปัญหาการเชื่อมต่อ",
          description: "ระบบขัดข้องกรุณาติดต่อเจ้าหน้าที่",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        noiseLevel: "",
        vibrateX: "",
        vibrateY: "",
        vibrateZ: "",
        vibrateAvg: "",
        vibrateTwa: "",
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
        disease: "",
        earSymptoms: "",
        earSymptomsDetails: "",
        riskScore: "",
        riskLevel: "",
        riskLatitude: "",
        riskLongitude: "",
      }}
      onSubmit={(values, actions) => handleSubmit(values, actions, resetTab)}
    >
      {({ isSubmitting, resetForm, errors, touched }) => (
        <Form>
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>ข้อมูลส่วนบุคคล</Tab>
              <Tab>ข้อมูลการทำงาน</Tab>
              <Tab>ข้อมูลสุขภาพ</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PersonalInfoTab
                  nextTab={nextTab}
                  errors={errors}
                  touched={touched}
                />
              </TabPanel>

              <TabPanel>
                <WorkInfoTab
                  nextTab={nextTab}
                  prevTab={prevTab}
                  errors={errors}
                  touched={touched}
                />
              </TabPanel>

              <TabPanel>
                <HealthInfoTab
                  prevTab={prevTab}
                  isLoading={isSubmitting}
                  errors={errors}
                  touched={touched}
                />
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    resetHearingLossRisk();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  isDisabled={isSubmitting || loading}
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
