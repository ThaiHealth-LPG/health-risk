import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { BsGraphUp, BsList } from "react-icons/bs";

export default function AdminSidebar() {
  const router = useRouter();
  return (
    <div className="w-[276px] h-screen p-6 bg-bases text-bases-content flex flex-col justify-between absolute top-0">
      <div className="w-full flex flex-col gap-5">
        <div className="">
          <p className="text-xl font-bold text-center">
            ระบบจัดการข้อมูล
            <br />
            กลุ่มอาชีพทำครกหิน
            <br />
            อ.เมือง จ.ลำปาง
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <button
            className="flex flex-row justify-start items-center gap-2 px-2 py-3 focus:bg-success hover:bg-success-light rounded-xl"
            onClick={() => {
              router.push("/admin/dashboard");
            }}
          >
            <BsGraphUp className="w-10" />
            <p className="text-start">สรุปภาพรวมข้อมูล</p>
          </button>

          <button
            className="flex flex-row justify-start items-center gap-2 px-2 py-3 focus:bg-success hover:bg-success-light rounded-xl"
            onClick={() => {
              router.push("/admin/worker-list");
            }}
          >
            <BsList className="w-10" />
            <p className="text-start">รายชื่อ</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <button className="flex flex-row justify-start items-center gap-2 px-2 py-3 focus:bg-success hover:bg-success-light rounded-xl">
          <BiLogOut />
          <p className="text-start">ออกจากระบบ</p>
        </button>
      </div>
    </div>
  );
}
