import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      personalId,
      homeAddress,
      homeLatitude,
      homeLongitude,
      stayYears,
      bornAddress,
    } = req.body;

    try {
      const { error } = await supabase.from("home").insert([
        {
          personal_id: personalId,
          home_address: homeAddress,
          home_latitude: homeLatitude,
          home_longitude: homeLongitude,
          stay_years: stayYears,
          born_address: bornAddress,
        },
      ]);

      if (error) throw error;

      res.status(200).json({ message: "Home data inserted successfully" });
    } catch (error) {
      console.error("Error inserting home data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
