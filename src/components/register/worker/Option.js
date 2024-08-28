export const medicalOptions = [
  { value: "", label: "เลือกสิทธิการรักษาพยาบาล" },
  { value: "ไม่มีสิทธิการรักษาพยาบาล", label: "ไม่มีสิทธิการรักษาพยาบาล" },
  { value: "สิทธิข้าราชการ", label: "สิทธิข้าราชการ" },
  { value: "สิทธิประกันสังคม", label: "สิทธิประกันสังคม" },
  { value: "สิทธิบัตรทอง 30 บาท", label: "สิทธิบัตรทอง 30 บาท" },
  {
    value: "สิทธิบัตรประกันสุขภาพต่างด้าว",
    label: "สิทธิบัตรประกันสุขภาพต่างด้าว",
  },
  { value: "สิทธิ อ.ส.ม.", label: "สิทธิ อ.ส.ม." },
  { value: "อื่น ๆ", label: "อื่น ๆ" },
];

export const diseaseOptions = [
  { value: "", label: "เลือกการมีโรคประจำตัว" },
  { value: "ไม่มีโรคประจำตัว", label: "ไม่มีโรคประจำตัว" },
  { value: "มีโรคประจำตัว", label: "มีโรคประจำตัว" },
];

export const workOptions = [
  { value: "", label: "เลือกลักษณะสถานที่ทำงาน" },
  { value: "แยกจากที่พักอาศัย", label: "แยกจากที่พักอาศัย" },
  { value: "อยู่บริเวณที่พักอาศัย", label: "อยู่บริเวณที่พักอาศัย" },
];

export const positionOptions = [
  { value: "", label: "เลือกตำแหน่งงาน", noise: "" },
  {
    value: "ขุดเจาะหิน",
    label: "ขุดเจาะหิน",
    noiseAvg: 95.09,
    noiseMin: 81,
    noiseMax: 102,
  },
  {
    value: "ผ่าหิน/ตกแต่งหิน",
    label: "ผ่าหิน/ตกแต่งหิน",
    noiseAvg: 98.26,
    noiseMin: 82,
    noiseMax: 102,
  },
  {
    value: "แกะสลักหิน (ครกหิน)",
    label: "แกะสลักหิน (ครกหิน)",
    noiseAvg: 84.39,
    noiseMin: 64,
    noiseMax: 102,
  },
  {
    value: "อื่น ๆ",
    label: "อื่น ๆ",
    noiseAvg: "",
    noiseMin: "",
    noiseMax: "",
  },
];

export const nationOptions = [
  { value: "", label: "เลือกสัญชาติ" },
  { value: "ไทย", label: "ไทย" },
  { value: "ลาว", label: "ลาว" },
  { value: "เมียนมาร์", label: "เมียนมาร์" },
  { value: "กัมพูชา", label: "กัมพูชา" },
  { value: "อื่น ๆ", label: "อื่น ๆ" },
];
