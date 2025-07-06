import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { useEffect, useState, useContext } from "react";
import { nationOptions } from "./Option";
import { MdLocationOn, MdNavigateNext } from "react-icons/md";
import { LanguageContext } from "@/context/LanguageContext";

export default function PersonalInfoTab({ nextTab }) {
  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();
  const toast = useToast();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const maxDate = today.toISOString().split("T")[0];
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const gregorianYear = selectedYear - 543;
      const birthDate = new Date(gregorianYear, selectedMonth - 1, selectedDay);

      if (!isNaN(birthDate)) {
        const isoDate = birthDate.toISOString();
        setFieldValue("birth", isoDate);
      }
    }
  }, [selectedDay, selectedMonth, selectedYear, setFieldValue]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const thisYear = today.getFullYear();
    const birthYear = birthDate.getFullYear();
    const age = thisYear - birthYear;

    const thisMonth = today.getMonth();
    const birthMonth = birthDate.getMonth();
    const thisDay = today.getDate();
    const birthDay = birthDate.getDate();

    if (
      thisMonth < birthMonth ||
      (thisMonth === birthMonth && thisDay < birthDay)
    ) {
      return age;
    }
    return age;
  };

  useEffect(() => {
    if (values.birth) {
      const birthDate = new Date(values.birth);
      if (!isNaN(birthDate)) {
        const age = calculateAge(birthDate);
        setFieldValue("age", age);
      }
    }
  }, [values.birth, setFieldValue]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFieldValue("homeLatitude", position.coords.latitude);
        setFieldValue("homeLongitude", position.coords.longitude);
      });
    } else {
      toast({
        title: "ไม่สามารถปักหมุดที่พักอาศัย",
        description: "กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isFormValid = () => {
    return (
      values.gender &&
      values.firstName &&
      values.lastName &&
      values.phoneNumber &&
      values.age &&
      values.nation
    );
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>{t.personalId}</FormLabel>
        <Field
          as={Input}
          name="idNumber"
          placeholder={t.personalId}
          onBlur={handleBlur}
        />
        <FormErrorMessage>{errors.idNumber}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.gender && touched.gender} as="fieldset">
        <FormLabel as="legend">{t.gender.title}*</FormLabel>
        <RadioGroup name="gender" onBlur={handleBlur}>
          <Stack direction="row" spacing={4}>
            <Field as={Radio} name="gender" value="ชาย">
              {t.gender.male}
            </Field>
            <Field as={Radio} name="gender" value="หญิง">
              {t.gender.female}
            </Field>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{errors.gender}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.firstName && touched.firstName}>
        <FormLabel>{t.fname}*</FormLabel>
        <Field
          as={Input}
          name="firstName"
          placeholder={t.placeholder.textOnly}
          onBlur={handleBlur}
          validate={(value) => {
            let error;
            if (!value) {
              error = "กรุณาใส่ข้อมูลชื่อ";
            }
            return error;
          }}
        />
        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName && touched.lastName}>
        <FormLabel>{t.lname}*</FormLabel>
        <Field
          as={Input}
          name="lastName"
          placeholder={t.placeholder.textOnly}
          onBlur={handleBlur}
          validate={(value) => {
            let error;
            if (!value) {
              error = "กรุณาใส่ข้อมูลนามสกุล";
            }
            return error;
          }}
        />
        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.phoneNumber && touched.phoneNumber}>
        <FormLabel>{t.phone}*</FormLabel>
        <Field
          as={Input}
          type="tel"
          name="phoneNumber"
          placeholder={t.placeholder.phone}
          pattern="[0-9]{10}"
          onBlur={handleBlur}
          validate={(value) => {
            let error;
            if (!/^[0-9]{10}$/.test(value)) {
              error = "กรุณาใส่ข้อมูลหมายเลขโทรศัพท์ 10 หลัก";
            }
            return error;
          }}
        />
        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.birth && touched.birth}>
        <FormLabel>{t.dob.title}</FormLabel>
        <div className="flex gap-2">
          <Select
            placeholder={t.placeholder.dob.dayUnit}
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            onBlur={handleBlur}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            placeholder={t.placeholder.dob.monthUnit}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            onBlur={handleBlur}
          >
            {[
              t.dob.jan,
              t.dob.feb,
              t.dob.mar,
              t.dob.apr,
              t.dob.may,
              t.dob.jun,
              t.dob.jul,
              t.dob.aug,
              t.dob.sep,
              t.dob.oct,
              t.dob.nov,
              t.dob.dec,
            ].map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </Select>
          <Select
            placeholder={t.placeholder.dob.yearUnit}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            onBlur={handleBlur}
          >
            {Array.from({ length: 100 }, (_, i) => {
              const buddhistYear = today.getFullYear() + 543 - i;
              return (
                <option key={buddhistYear} value={buddhistYear}>
                  {buddhistYear}
                </option>
              );
            })}
          </Select>
        </div>
        <FormErrorMessage>{errors.birth}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.birth && touched.birth}
        className="hidden"
      >
        <FormLabel>วันเดือนปีเกิด (ค.ศ.)</FormLabel>
        <Field
          as={Input}
          type="text"
          name="birth"
          placeholder="ใส่เฉพาะตัวเลข"
          max={maxDate}
          onBlur={handleBlur}
        />
      </FormControl>

      <FormControl isInvalid={!!errors.age && touched.age}>
        <FormLabel>{t.age.title}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="age"
            placeholder={t.placeholder.soundLevel}
            min={1}
            step={1}
            onBlur={handleBlur}
            validate={(value) => {
              let error;
              if (value === 0) {
                error = "ข้อมูลอายุต้องไม่ต่ำกว่า 1 ปี";
              } else if (!value) {
                error = "กรุณาใส่ข้อมูลอายุ";
              } else if (value < 1) {
                error = "ข้อมูลอายุต้องไม่ต่ำกว่า 1 ปี";
              }
              return error;
            }}
          />
          <InputRightAddon>{t.age.unit}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.age}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.nation && touched.nation}>
        <FormLabel>{t.nation}*</FormLabel>
        <Field
          as={Select}
          name="nation"
          onBlur={handleBlur}
          validate={(value) => {
            let error;
            if (!value) {
              error = "กรุณาเลือกสัญชาติ";
            }
            return error;
          }}
        >
          {nationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {t.nationOptions[option.value] || option.label}
            </option>
          ))}
        </Field>
        <FormErrorMessage>{errors.nation}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>{t.address}</FormLabel>
        <Field
          as={Textarea}
          name="homeAddress"
          placeholder={t.placeholder.address}
          onBlur={handleBlur}
        />
      </FormControl>

      <div className="flex gap-2">
        <FormControl>
          <FormLabel>Latitude</FormLabel>
          <Field
            as={Input}
            type="number"
            name="homeLatitude"
            placeholder="Latitude"
            step="any"
            min="-90"
            max="90"
            onBlur={handleBlur}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Field
            as={Input}
            type="number"
            name="homeLongitude"
            placeholder="Longitude"
            step="any"
            min="-180"
            max="180"
            onBlur={handleBlur}
          />
        </FormControl>
      </div>

      <Button onClick={handleGeolocation} colorScheme="teal">
        <MdLocationOn />
        {t.pinLocation}
      </Button>

      <FormControl isInvalid={!!errors.workingYears && touched.workingYears}>
        <FormLabel>{t.durationLiving}*</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="stayYears"
            placeholder={t.placeholder.soundLevel}
            min={1}
            step={1}
            onBlur={handleBlur}
            validate={(value) => {
              let error;
              if (value === 0) {
                error =
                  "ข้อมูลระยะเวลาที่อาศัยอยู่ในพื้นที่ต้องไม่ต่ำกว่า 1 ปี";
              } else if (!value) {
                error = "กรุณาใส่ข้อมูลระยะเวลาที่อาศัยอยู่ในพื้นที่";
              } else if (value < 1) {
                error =
                  "ข้อมูลระยะเวลาที่อาศัยอยู่ในพื้นที่ต้องไม่ต่ำกว่า 1 ปี";
              }
              return error;
            }}
          />
          <InputRightAddon>{t.age.unit}</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>{errors.stayYears}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.bornAddress && touched.bornAddress}>
        <FormLabel>{t.bornAddress}</FormLabel>
        <Field
          as={Textarea}
          name="bornAddress"
          placeholder={t.placeholder.bornAddress}
          onBlur={handleBlur}
        />
      </FormControl>

      <Button
        type="button"
        onClick={nextTab}
        colorScheme="green"
        className="w-full disabled:text-black"
        isDisabled={!isFormValid()}
      >
        <span>{t.next}</span>
        <MdNavigateNext className="text-4xl text-neutral" />
      </Button>
    </Stack>
  );
}
