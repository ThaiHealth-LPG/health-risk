import React from "react";
import MenuCard from "./MenuCard";
import { PiGauge } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { TbInfoTriangleFilled } from "react-icons/tb";

const MenuData = [
  {
    title: "ประเมินความเสี่ยง",
    desc: "การรับสัมผัสเสียงดัง",
    icon: PiGauge,
    color: "accent",
    link: "/assessment/hearingloss",
  },
  {
    title: "ลงทะเบียน",
    desc: "ผู้ประกอบอาชีพทำครกหิน",
    icon: GrUserWorker,
    color: "primary",
    link: "/register/worker",
  },
  {
    title: "ข่าวสาร",
    desc: "อาชีวอนามัยและความปลอดภัย",
    icon: TbInfoTriangleFilled,
    color: "error",
    link: "/info",
  },
];

export default function Menu() {
  return (
    <div className="flex flex-col gap-4 pt-2 max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-semibold ml-1">เมนู</h2>
      {MenuData.map((menu, index) => (
        <MenuCard
          key={index}
          title={menu.title}
          desc={menu.desc}
          icon={menu.icon}
          color={menu.color}
          link={menu.link}
        />
      ))}
    </div>
  );
}
