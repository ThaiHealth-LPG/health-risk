import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      idNumber,
      gender,
      firstName,
      lastName,
      phoneNumber,
      birth,
      age,
      nation,
    } = req.body;

    try {
      const { data, error } = await supabase
        .from("personal")
        .insert([
          {
            id_number: idNumber,
            gender: gender,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            birth: birth,
            age: age,
            nation: nation,
          },
        ])
        .select();

      if (error) throw error;

      const personalId = data[0]?.id;

      res.status(200).json({ personalId });
    } catch (error) {
      console.error("Error inserting personal data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
