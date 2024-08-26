import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      personalId,
      bodyWeight,
      bodyHeight,
      bmi,
      medical,
      diseases,
      earSymptoms,
      earSymptomsDetails,
    } = req.body;

    try {
      const { error } = await supabase.from("health").insert([
        {
          personal_id: personalId,
          body_weight: bodyWeight,
          body_height: bodyHeight,
          bmi: bmi,
          medical: medical,
          diseases: diseases,
          ear_symptoms: earSymptoms,
          ear_symptoms_details: earSymptomsDetails,
        },
      ]);

      if (error) throw error;

      res.status(200).json({ message: "Health data inserted successfully" });
    } catch (error) {
      console.error("Error inserting health data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
