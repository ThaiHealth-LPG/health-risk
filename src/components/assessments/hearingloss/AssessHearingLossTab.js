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
import { useEffect } from "react";
import { positionOptions } from "../../register/worker/Option";
import { MdNavigateNext } from "react-icons/md";

export default function AssessHearingLossTab({ submitForm }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const selectedPosition = positionOptions.find(
      (option) => option.value === values.position
    );
    if (selectedPosition) {
      setFieldValue("noise", selectedPosition.noise || "");
    }
  }, [values.position, setFieldValue]);

  const isFormValid = () => {
    return (
      values.position &&
      values.noise &&
      values.workingHours &&
      values.bodyHeight &&
      values.earSymptoms
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
            step={0.01}
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
        <FormLabel>ส่วนสูง*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="bodyHeight"
            placeholder="ส่วนสูง"
            min={50}
            step={1}
          />
          <InputRightAddon>เซนติเมตร</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>อาการผิดปกติเกี่ยวกับหู*</FormLabel>
        <Field as={Select} name="earSymptoms">
          <option value="">เลือกอาการผิดปกติเกี่ยวกับหู</option>
          <option value="ไม่มีอาการ">ไม่มีอาการ</option>
          <option value="มีอาการ">มีอาการ</option>
        </Field>
      </FormControl>

      <Button
        type="button"
        onClick={submitForm}
        colorScheme="green"
        className="w-full disabled:text-black"
        isDisabled={!isFormValid()}
      >
        ประเมินความเสี่ยง
        <MdNavigateNext className="text-4xl text-bases" />
      </Button>
    </Stack>
  );
}
