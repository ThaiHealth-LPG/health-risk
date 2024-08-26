import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  InputGroup,
  InputRightAddon,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { positionOptions, workOptions } from "./Option";
import { MdNavigateBefore, MdNavigateNext, MdLocationOn } from "react-icons/md";

export default function WorkInfoTab({ nextTab, prevTab }) {
  const { values, setFieldValue } = useFormikContext();
  const [disableOtherPPE, setDisableOtherPPE] = useState(false);

  useEffect(() => {
    const selectedPosition = positionOptions.find(
      (option) => option.value === values.position
    );
    if (selectedPosition) {
      setFieldValue("noise", selectedPosition.noise || "");
    }
  }, [values.position, setFieldValue]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFieldValue("workLatitude", position.coords.latitude);
          setFieldValue("workLongitude", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handlePPEChange = (value) => {
    if (value.includes("ไม่ได้ใช้")) {
      setFieldValue("ppe", ["ไม่ได้ใช้"]);
      setDisableOtherPPE(true);
    } else {
      setFieldValue("ppe", value);
      setDisableOtherPPE(false);
    }
  };

  const isFormValid = () => {
    return (
      values.position &&
      values.noise &&
      values.workingHours &&
      values.workingWeeks &&
      values.workingYears &&
      values.workSeparation &&
      values.ppe
    );
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>ตำแหน่งงาน*</FormLabel>
        <Field as={Select} name="position">
          {positionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </FormControl>

      <FormControl>
        <FormLabel>ระดับความดันเสียง*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="noise"
            placeholder="ระดับความดันเสียง"
            min={0}
            step={1}
          />
          <InputRightAddon>dB(A)</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ชั่วโมงการทำงานต่อวัน*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingHours"
            placeholder="ชั่วโมงการทำงานต่อวัน"
            min={1}
            max={24}
            step={1}
          />
          <InputRightAddon>ชั่วโมง</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>วันทำงานต่อสัปดาห์*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingWeeks"
            placeholder="วันทำงานต่อสัปดาห์"
            min={1}
            max={7}
            step={1}
          />
          <InputRightAddon>วัน</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ประสบการณ์ทำงาน*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingYears"
            placeholder="ประสบการณ์ทำงาน"
            min={1}
            step={1}
          />
          <InputRightAddon>ปี</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ที่อยู่หรือชื่อสถานที่ทำงาน*</FormLabel>
        <Field
          as={Textarea}
          name="workAddress"
          placeholder="ที่อยู่หรือชื่อสถานที่ทำงาน"
        />
      </FormControl>

      <div className="flex gap-2">
        <FormControl>
          <FormLabel>Latitude</FormLabel>
          <Field
            as={Input}
            type="number"
            name="workLatitude"
            placeholder="Latitude"
            step="any"
            min="-90"
            max="90"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Field
            as={Input}
            type="number"
            name="workLongitude"
            placeholder="Longitude"
            step="any"
            min="-180"
            max="180"
          />
        </FormControl>
      </div>

      <Button onClick={handleGeolocation} colorScheme="teal">
        <MdLocationOn />
        ปักหมุดที่ทำงาน
      </Button>

      <FormControl>
        <FormLabel>ลักษณะสถานที่ทำงาน*</FormLabel>
        <Field as={Select} name="workSeparation">
          {workOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </FormControl>

      <FormControl>
        <FormLabel>การใช้อุปกรณ์ป้องกันอันตรายส่วนบุคคล*</FormLabel>
        <Field name="ppe">
          {({ field }) => (
            <CheckboxGroup
              value={field.value}
              onChange={(value) => handlePPEChange(value)}
            >
              <Stack spacing={2} align="start">
                <Checkbox value="ไม่ได้ใช้">ไม่ได้ใช้</Checkbox>
                <Checkbox value="หมวกผ้าคลุมหน้า" isDisabled={disableOtherPPE}>
                  หมวกผ้าคลุมหน้า
                </Checkbox>
                <Checkbox
                  value="หน้ากากอนามัยแบบเยื่อกระดาษ 3 ชั้น"
                  isDisabled={disableOtherPPE}
                >
                  หน้ากากอนามัยแบบเยื่อกระดาษ 3 ชั้น
                </Checkbox>
                <Checkbox
                  value="หน้ากากอนามัยที่ผลิตจากผ้าฝ้าย"
                  isDisabled={disableOtherPPE}
                >
                  หน้ากากอนามัยที่ผลิตจากผ้าฝ้าย
                </Checkbox>
                <Checkbox value="หน้ากากชนิด N95" isDisabled={disableOtherPPE}>
                  หน้ากากชนิด N95
                </Checkbox>
                <Checkbox value="ที่อุดหู" isDisabled={disableOtherPPE}>
                  ที่อุดหู
                </Checkbox>
                <Checkbox value="ที่ครอบหู" isDisabled={disableOtherPPE}>
                  ที่ครอบหู
                </Checkbox>
                <Checkbox value="ถุงมือนิรภัย" isDisabled={disableOtherPPE}>
                  ถุงมือนิรภัย
                </Checkbox>
                <Checkbox value="รองเท้านิรภัย" isDisabled={disableOtherPPE}>
                  รองเท้านิรภัย
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          )}
        </Field>
      </FormControl>

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
          type="button"
          onClick={nextTab}
          colorScheme="green"
          className="w-full disabled:text-black"
          isDisabled={!isFormValid()}
        >
          ถัดไป
          <MdNavigateNext className="text-4xl text-bases" />
        </Button>
      </div>
    </Stack>
  );
}
