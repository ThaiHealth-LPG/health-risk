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
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { nationOptions } from "./Option";
import { MdLocationOn, MdNavigateNext } from "react-icons/md";

export default function PersonalInfoTab({ nextTab }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.birth) {
      const birthDate = new Date(values.birth);
      const age = calculateAge(birthDate);
      setFieldValue("age", age);
    }
  }, [values.birth, setFieldValue]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1;
    }
    return age;
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFieldValue("homeLatitude", position.coords.latitude);
          setFieldValue("homeLongitude", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
        <FormLabel>เลขประจำตัวประชาชนหรือ Passport</FormLabel>
        <Field
          as={Input}
          name="idNumber"
          placeholder="เลขประจำตัวประชาชนหรือ Passport"
        />
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel as="legend">เพศ*</FormLabel>
        <RadioGroup name="gender">
          <Stack direction="row">
            <Field as={Radio} name="gender" value="male">
              ชาย
            </Field>
            <Field as={Radio} name="gender" value="female">
              หญิง
            </Field>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ชื่อ*</FormLabel>
        <Field as={Input} name="firstName" placeholder="ชื่อ" />
      </FormControl>

      <FormControl>
        <FormLabel>นามสกุล*</FormLabel>
        <Field as={Input} name="lastName" placeholder="นามสกุล" />
      </FormControl>

      <FormControl>
        <FormLabel>หมายเลขโทรศัพท์*</FormLabel>
        <Field
          as={Input}
          type="tel"
          name="phoneNumber"
          placeholder="หมายเลขโทรศัพท์"
          pattern="[0-9]{10}"
        />
      </FormControl>

      <FormControl>
        <FormLabel>วันเดือนปีเกิด</FormLabel>
        <Field
          as={Input}
          type="date"
          name="birth"
          placeholder="วันเดือนปีเกิด"
        />
      </FormControl>

      <FormControl>
        <FormLabel>อายุ*</FormLabel>
        <InputGroup>
          <Field as={Input} type="number" name="age" placeholder="อายุ" />
          <InputRightAddon>ปี</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>สัญชาติ*</FormLabel>
        <Field as={Select} name="nation">
          {nationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </FormControl>

      <FormControl>
        <FormLabel>ที่อยู่ที่พักอาศัย</FormLabel>
        <Field
          as={Textarea}
          name="homeAddress"
          placeholder="ที่อยู่ที่พักอาศัย"
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
          />
        </FormControl>
      </div>

      <Button onClick={handleGeolocation} colorScheme="teal">
        <MdLocationOn />
        ปักหมุดที่พักอาศัย
      </Button>

      <FormControl>
        <FormLabel>ระยะเวลาที่อาศัยอยู่ในพื้นที่</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            type="number"
            name="stayYears"
            placeholder="ระยะเวลาที่อาศัยอยู่ในพื้นที่"
          />
          <InputRightAddon>ปี</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>ที่อยู่ภูมิลำเนา (ถ้ามี)</FormLabel>
        <Field
          as={Textarea}
          name="bornAddress"
          placeholder="ที่อยู่ภูมิลำเนา"
        />
      </FormControl>

      <Button
        type="button"
        onClick={nextTab}
        colorScheme="green"
        className="w-full disabled:text-black"
        isDisabled={!isFormValid()}
      >
        <span>ถัดไป</span>
        <MdNavigateNext className="text-4xl text-neutral" />
      </Button>
    </Stack>
  );
}
