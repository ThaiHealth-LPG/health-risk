import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  InputGroup,
  InputRightAddon,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { useEffect, useContext } from "react";
import { noiseOptions } from "../../register/worker/Option";
import { MdNavigateNext } from "react-icons/md";
import { LanguageContext } from "@/context/LanguageContext";

export default function AssessHearingLossTab({ submitForm }) {
  const { t } = useContext(LanguageContext);

  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();

  useEffect(() => {
    const selectedPosition = noiseOptions.find(
      (option) => option.value === values.position
    );

    if (selectedPosition) {
      if (!values.noiseLevel || values.noiseLevel === null) {
        setFieldValue("noiseLevel", "เฉลี่ย");
      }

      if (values.noiseLevel === "ต่ำสุด") {
        setFieldValue("noise", selectedPosition.noiseMin || "");
      } else if (values.noiseLevel === "เฉลี่ย") {
        setFieldValue("noise", selectedPosition.noiseAvg || "");
      } else if (values.noiseLevel === "สูงสุด") {
        setFieldValue("noise", selectedPosition.noiseMax || "");
      }
    } else {
      setFieldValue("noise", "");
    }
  }, [values.position, values.noiseLevel, setFieldValue]);

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
      <FormControl isInvalid={!!errors.position && touched.position}>
        <FormLabel>{t.position}*</FormLabel>
        <Field
          as={Select}
          name="position"
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
              {t.positionOptions[option.value] ||option.label}
            </option>
          ))}
        </Field>
        <FormErrorMessage>{errors.position}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.noise && touched.noise}>
        <div className="flex flex-row items-center justify-between mb-1">
          <FormLabel>{t.soundLevel.title}*</FormLabel>
          {values.position !== "อื่น ๆ" && (
            <div>
              <FormControl>
                <Field as={Select} name="noiseLevel">
                  <option value="ต่ำสุด">{t.soundLevel.low}</option>
                  <option value="เฉลี่ย">{t.soundLevel.avg}</option>
                  <option value="สูงสุด">{t.soundLevel.high}</option>
                </Field>
              </FormControl>
            </div>
          )}
        </div>
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
          <InputRightAddon>{t.dbA}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.noise}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.workingHours && touched.workingHours}>
        <FormLabel>{t.workingHours.title}*</FormLabel>
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
                error = t.error.workingHours1;
              } else if (!value) {
                error = t.error.workingHours2;
              } else if (value < 1) {
                error = t.error.workingHours1;
              } else if (value > 24) {
                error = t.error.workingHours3;
              }
              return error;
            }}
          />
          <InputRightAddon>{t.workingHours.hour}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.workingHours}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.bodyHeight && touched.bodyHeight}>
        <FormLabel>{t.bodyHeight.title}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="bodyHeight"
            placeholder={t.placeholder.soundLevel}
            min={50}
            step={1}
            validate={(value) => {
              let error;
              if (value === 0) {
                error = t.error.bodyHeight1;
              } else if (!value) {
                error = t.error.bodyHeight2;
              } else if (value < 1) {
                error = t.error.bodyHeight1;
              }
              return error;
            }}
          />
          <InputRightAddon>{t.bodyHeight.cm}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.bodyHeight}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>{t.earSymptoms.title}*</FormLabel>
        <Field as={Select} name="earSymptoms">
          <option value="">{t.earSymptoms.title}</option>
          <option value="ไม่มีอาการ">{t.earSymptoms.no}</option>
          <option value="มีอาการ">{t.earSymptoms.yes}</option>
        </Field>
      </FormControl>

      <Button
        type="button"
        onClick={submitForm}
        colorScheme="green"
        className="w-full disabled:text-black"
        isDisabled={!isFormValid()}
      >
        {t.assessmentBtn}
        <MdNavigateNext className="text-4xl text-bases" />
      </Button>
    </Stack>
  );
}
