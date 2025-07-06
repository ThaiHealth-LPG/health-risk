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
  FormErrorMessage,
  useToast,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { useEffect, useState, useContext } from "react";
import { noiseOptions, vibrationOptions, workOptions } from "./Option";
import { MdNavigateBefore, MdNavigateNext, MdLocationOn } from "react-icons/md";
import { LanguageContext } from "@/context/LanguageContext";

export default function WorkInfoTab({ nextTab, prevTab }) {
  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();
  const [disableOtherPPE, setDisableOtherPPE] = useState(false);
  const toast = useToast();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const selectedNoisePosition = noiseOptions.find(
      (option) => option.value === values.position
    );
    const selectedVibrationPosition = vibrationOptions.find(
      (option) => option.value === values.position
    );

    if (selectedNoisePosition) {
      setFieldValue("noise", selectedNoisePosition.noiseAvg || "");
    }

    if (selectedVibrationPosition) {
      setFieldValue("vibrateX", selectedVibrationPosition.vibrateX || "");
      setFieldValue("vibrateY", selectedVibrationPosition.vibrateY || "");
      setFieldValue("vibrateZ", selectedVibrationPosition.vibrateZ || "");
      setFieldValue("vibrateAvg", selectedVibrationPosition.vibrateAvg || "");
      setFieldValue("vibrateTwa", selectedVibrationPosition.vibrateTwa || "");
    }
  }, [values.position, setFieldValue]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFieldValue("workLatitude", position.coords.latitude);
        setFieldValue("workLongitude", position.coords.longitude);
      });
    } else {
      toast({
        title: "ไม่สามารถปักหมุดที่ทำงาน",
        description: "กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      values.noise > 0 &&
      values.workingHours > 0 &&
      values.workingWeeks > 0 &&
      values.workingYears > 0 &&
      values.workSeparation &&
      values.ppe != ""
    );
  };

  return (
    <Stack spacing={4}>
      <FormControl isInvalid={!!errors.position && touched.position}>
        <FormLabel>{t.position}*</FormLabel>
        <Field
          as={Select}
          name="position"
          onBlur={handleBlur}
          validate={(value) => {
            let error;
            if (!value) {
              error = t.error.position;
            }
            return error;
          }}
        >
          {noiseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {t.positionOptions[option.value] || option.label}
            </option>
          ))}
        </Field>
        <FormErrorMessage>{errors.position}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.noise && touched.noise}>
        <FormLabel>{t.soundLevel.title}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="noise"
            placeholder={t.placeholder.soundLevel}
            min={0}
            step={0.01}
            validate={(value) => {
              let error;
              if (!value) {
                error = t.error.soundLevel1;
              } else if (value < 0) {
                error = t.error.soundLevel2;
              }
              return error;
            }}
          />
          <InputRightAddon>dB(A)</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.noise}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>
          {t.vibrationValue} (m/s<sup>2</sup>)
        </FormLabel>
        <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
          <InputGroup>
            <InputLeftAddon>{t.x}</InputLeftAddon>
            <Field
              as={Input}
              type="number"
              name="vibrateX"
              placeholder={t.placeholder.soundLevel}
              step={0.01}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>{t.y}</InputLeftAddon>
            <Field
              as={Input}
              type="number"
              name="vibrateY"
              placeholder={t.placeholder.soundLevel}
              step={0.01}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>{t.z}</InputLeftAddon>
            <Field
              as={Input}
              type="number"
              name="vibrateZ"
              placeholder={t.placeholder.soundLevel}
              step={0.01}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>{t.accelerationAvg}</InputLeftAddon>
            <Field
              as={Input}
              type="number"
              name="vibrateAvg"
              placeholder={t.placeholder.soundLevel}
              step={0.01}
            ></Field>
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>{t.exposeAvg}</InputLeftAddon>
            <Field
              as={Input}
              type="number"
              name="vibrateTwa"
              placeholder={t.placeholder.soundLevel}
              step={0.01}
            />
          </InputGroup>
        </div>
      </FormControl>

      <FormControl isInvalid={!!errors.workingHours && touched.workingHours}>
        <FormLabel>{t.workHour}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingHours"
            placeholder={t.placeholder.soundLevel}
            min={1}
            max={24}
            step={1}
            validate={(value) => {
              let error;
              if (value === 0) {
                error = "ข้อมูลชั่วโมงการทำงานต่อวันต้องไม่ต่ำกว่า 1 ชั่วโมง";
              } else if (!value) {
                error = "กรุณาใส่ข้อมูลชั่วโมงการทำงานต่อวัน";
              } else if (value < 1) {
                error = "ข้อมูลชั่วโมงการทำงานต่อวันต้องไม่ต่ำกว่า 1 ชั่วโมง";
              } else if (value > 24) {
                error = "ข้อมูลชั่วโมงการทำงานต่อวันต้องไม่เกินกว่า 24 ชั่วโมง";
              }
              return error;
            }}
          />
          <InputRightAddon>{t.workingHours.hour}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.workingHours}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.workingWeeks && touched.workingWeeks}>
        <FormLabel>{t.workPerWeek}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingWeeks"
            placeholder={t.placeholder.soundLevel}
            min={1}
            max={7}
            step={1}
            validate={(value) => {
              let error;
              if (value === 0) {
                error = "ข้อมูลวันทำงานต่อสัปดาห์ต้องไม่ต่ำกว่า 1 วัน";
              } else if (!value) {
                error = "กรุณาใส่ข้อมูลวันทำงานต่อสัปดาห์";
              } else if (value < 1) {
                error = "ข้อมูลวันทำงานต่อสัปดาห์ต้องไม่ต่ำกว่า 1 วัน";
              } else if (value > 24) {
                error = "ข้อมูลวันทำงานต่อสัปดาห์ต้องไม่เกินกว่า 24 วัน";
              }
              return error;
            }}
          />
          <InputRightAddon>{t.dayUnit}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.workingWeeks}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.workingYears && touched.workingYears}>
        <FormLabel>{t.workExperience}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="workingYears"
            placeholder={t.placeholder.workExperience}
            min={1}
            step={1}
            validate={(value) => {
              let error;
              if (value === 0) {
                error = "ข้อมูลประสบการณ์ครกหินต้องไม่ต่ำกว่า 1 ปี";
              } else if (!value) {
                error = "กรุณาใส่ข้อมูลประสบการณ์ครกหิน";
              } else if (value < 1) {
                error = "ข้อมูลประสบการณ์ครกหินต้องไม่ต่ำกว่า 1 ปี";
              }
              return error;
            }}
          />
          <InputRightAddon>{t.age.unit}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.workingYears}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>{t.workAdress}*</FormLabel>
        <Field
          as={Textarea}
          name="workAddress"
          placeholder={t.placeholder.workAddress}
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
            readOnly
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
            readOnly
          />
        </FormControl>
      </div>

      <Button onClick={handleGeolocation} colorScheme="teal">
        <MdLocationOn />
        {t.pinLocation}
      </Button>

      <FormControl
        isInvalid={!!errors.workSeparation && touched.workSeparation}
      >
        <FormLabel>{t.workplaceCharacter}*</FormLabel>
        <Field
          as={Select}
          name="workSeparation"
          validate={(value) => {
            let error;
            if (!value) {
              error = "กรุณาเลือกลักษณะสถานที่ทำงาน";
            }
            return error;
          }}
        >
          {workOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {t.workOptions[option.value] || option.label}
            </option>
          ))}
        </Field>
        <FormErrorMessage>{errors.workSeparation}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>{t.ppeTitle}*</FormLabel>
        <Field name="ppe">
          {({ field }) => (
            <CheckboxGroup
              value={field.value}
              onChange={(value) => handlePPEChange(value)}
            >
              <Stack spacing={2} align="start">
                <Checkbox value="ไม่ได้ใช้">{t.ppeOptions.no}</Checkbox>
                <Checkbox value="หมวกผ้าคลุมหน้า" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.hatVeil}
                </Checkbox>
                <Checkbox
                  value="หน้ากากอนามัยแบบเยื่อกระดาษ 3 ชั้น"
                  isDisabled={disableOtherPPE}
                >
                  {t.ppeOptions.mask}
                </Checkbox>
                <Checkbox
                  value="หน้ากากอนามัยที่ผลิตจากผ้าฝ้าย"
                  isDisabled={disableOtherPPE}
                >
                  {t.ppeOptions.maskCotton}
                </Checkbox>
                <Checkbox value="หน้ากากชนิด N95" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.maskN95}
                </Checkbox>
                <Checkbox value="ที่อุดหู" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.earPlug}
                </Checkbox>
                <Checkbox value="ที่ครอบหู" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.earMuff}
                </Checkbox>
                <Checkbox value="ถุงมือนิรภัย" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.safetyGloves}
                </Checkbox>
                <Checkbox value="รองเท้านิรภัย" isDisabled={disableOtherPPE}>
                  {t.ppeOptions.safetyShoes}
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
          {t.back}
        </Button>
        <Button
          type="button"
          onClick={nextTab}
          colorScheme="green"
          className="w-full disabled:text-black"
          isDisabled={!isFormValid()}
        >
          {t.next}
          <MdNavigateNext className="text-4xl text-bases" />
        </Button>
      </div>
    </Stack>
  );
}
