import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      personalId,
      workAddress,
      workLatitude,
      workLongitude,
      workSeparation,
    } = req.body;

    try {
      const { error } = await supabase.from("workplace").insert([
        {
          personal_id: personalId,
          work_address: workAddress,
          work_latitude: workLatitude,
          work_longitude: workLongitude,
          work_separation: workSeparation,
        },
      ]);

      if (error) throw error;

      res.status(200).json({ message: "Workplace data inserted successfully" });
    } catch (error) {
      console.error("Error inserting workplace data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
