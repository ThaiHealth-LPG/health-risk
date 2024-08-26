import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { diseaseOptions, medicalOptions } from "./Option";
import { useEffect, useState } from "react";
import { MdNavigateBefore } from "react-icons/md";

export default function HealthInfoTab({ prevTab, isLoading }) {
  const { values, setFieldValue } = useFormikContext();
  const { bodyWeight, bodyHeight, bmi } = values;
  const [earSymptoms, setEarSymptoms] = useState("");

  useEffect(() => {
    if (bodyWeight && bodyHeight) {
      const weight = parseFloat(bodyWeight);
      const height = parseFloat(bodyHeight) / 100;
      if (height > 0) {
        const calculatedBmi = (weight / (height * height)).toFixed(0);
        setFieldValue("bmi", calculatedBmi);
      }
    } else {
      setFieldValue("bmi", "");
    }
  }, [bodyWeight, bodyHeight, setFieldValue]);

  const getBmiCategory = (bmi) => {
    if (!bmi) return { color: "gray", label: "ไม่พบข้อมูล" };
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5)
      return { color: "blue.300", label: "น้ำหนักต่ำกว่าเกณฑ์" };
    if (bmiValue < 23) return { color: "green.300", label: "สมส่วน" };
    if (bmiValue < 25) return { color: "yellow.300", label: "น้ำหนักเกิน" };
    if (bmiValue < 30) return { color: "orange.300", label: "โรคอ้วน" };
    return { color: "red.300", label: "โรคอ้วนอันตราย" };
  };

  const isFormValid = () => {
    return values.medical && values.diseases && values.earSymptoms;
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>น้ำหนัก*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="bodyWeight"
            placeholder="น้ำหนัก"
          />
          <InputRightAddon>กิโลกรัม</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ส่วนสูง*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="bodyHeight"
            placeholder="ส่วนสูง"
          />
          <InputRightAddon>เซนติเมตร</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>BMI</FormLabel>
        <InputGroup>
          <Field as={Input} name="bmi" readOnly placeholder="BMI" />
          <InputRightAddon
            bg={getBmiCategory(bmi).color}
            className="text-black"
          >
            {getBmiCategory(bmi).label}
          </InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>สิทธิการรักษาพยาบาล*</FormLabel>
        <Field as={Select} name="medical">
          {medicalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </FormControl>

      <FormControl>
        <FormLabel>โรคประจำตัว*</FormLabel>
        <Field as={Select} name="diseases">
          {diseaseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </FormControl>

      <FormControl>
        <FormLabel>อาการผิดปกติเกี่ยวกับหู*</FormLabel>
        <Field
          as={Select}
          name="earSymptoms"
          onChange={(e) => {
            setEarSymptoms(e.target.value);
            setFieldValue("earSymptoms", e.target.value);
            if (e.target.value !== "มีอาการ") {
              setFieldValue("earSymptomsDetails", "");
            }
          }}
        >
          <option value="">เลือกอาการผิดปกติเกี่ยวกับหู</option>
          <option value="ไม่มีอาการ">ไม่มีอาการ</option>
          <option value="มีอาการ">มีอาการ</option>
        </Field>
      </FormControl>

      {earSymptoms === "มีอาการ" && (
        <FormControl>
          <FormLabel>ระบุอาการผิดปกติเกี่ยวกับหู*</FormLabel>
          <Field
            as={Input}
            type="text"
            name="earSymptomsDetails"
            placeholder="ระบุอาการผิดปกติเกี่ยวกับหู"
          />
        </FormControl>
      )}

      <div className="flex justify-between gap-10">
        <Button
          type="button"
          onClick={prevTab}
          colorScheme="orange"
          className="w-full"
        >
          <MdNavigateBefore className="text-4xl text-bases" />
          ย้อนกลับ
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          colorScheme="green"
          className="w-full disabled:text-black"
          isDisabled={!isFormValid()}
        >
          บันทึกข้อมูล
        </Button>
      </div>
    </Stack>
  );
}
