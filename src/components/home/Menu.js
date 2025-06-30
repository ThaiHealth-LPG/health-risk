import React, { useContext } from "react";
import MenuCard from "./MenuCard";
import { GrUserWorker } from "react-icons/gr";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { PiUserSoundFill } from "react-icons/pi";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { RiAdminLine } from "react-icons/ri";
import { LanguageContext } from "@/context/LanguageContext";

const iconMap = [PiUserSoundFill, GrUserWorker, TbInfoTriangleFilled];
const colorMap = ["bg-accent", "bg-primary", "bg-error"];
const linkMap = [
  "/assessment/hearingloss",
  "/register/worker",
  "/info/occupational",
];

export default function Menu() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 pt-2 max-w-[760px] mx-auto">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-2xl font-semibold ml-1">{t.menuTitle}</h2>
        <Button
          type="button"
          onClick={() => router.push("/admin/login")}
          colorScheme="blue"
          className="w-fit"
          fontSize="sm"
        >
          <RiAdminLine className="text-medium text-bases mr-1" />
          {t.admin}
        </Button>
      </div>

      {t.menuItems?.map((menu, index) => (
        <MenuCard
          key={index}
          title={menu.title}
          desc={menu.desc}
          icon={iconMap[index]}
          color={colorMap[index]}
          link={linkMap[index]}
        />
      ))}
    </div>
  );
}
