import Menu from "@/components/home/Menu";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-success-light flex flex-col justify-between">
      <Head>
        <title>
          ระบบประเมินความเสี่ยงทางสุขภาพกลุ่มอาชีพทำครกหิน อ.เมือง จ.ลำปาง
        </title>
        <meta name="description" content="Health Risk Assessment Application" />
      </Head>

      <div className="w-full flex flex-col justify-start text-bases-content p-5 gap-3">
        <div>
          <h1 className="text-2xl">ยินดีต้อนรับ!</h1>
          <h2 className="text-xl">เข้าสู่ระบบประเมินความเสี่ยงทางสุขภาพ</h2>
          <h2 className="text-xl">กลุ่มอาชีพทำครกหิน อ.เมือง จ.ลำปาง</h2>
        </div>

        <div>
          <h2 className="text-xs">
            จัดทำโดย คณะสาธารณสุขศาสตร์ มหาวิทยาลัยธรรมศาสตร์
          </h2>
          <h2 className="text-xs">
            สนับสนุนโดย สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)
          </h2>
        </div>
      </div>

      <main className="absolute bottom-0 bg-bases-light w-full p-5 rounded-t-3xl pb-10">
        <Menu />
      </main>
    </div>
  );
}
