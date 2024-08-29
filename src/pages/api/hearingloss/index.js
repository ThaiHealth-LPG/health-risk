import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      position,
      noise,
      noiseLevel,
      workingHours,
      bodyHeight,
      earSymptoms,
      firstName,
      lastName,
      riskScore,
      riskLevel,
    } = req.body;

    try {
      const { data: personalData, error: personalError } = await supabase
        .from("personal")
        .select("id")
        .eq("first_name", firstName)
        .eq("last_name", lastName)
        .single();

      if (!personalData) {
        return res
          .status(404)
          .json({ success: false, error: "Personal record not found" });
      }

      const personalId = personalData.id;

      const { data, error } = await supabase.from("hearingloss").insert([
        {
          personal_id: personalId,
          position,
          noise,
          noise_level: noiseLevel,
          working_hours: workingHours,
          body_height: bodyHeight,
          ear_symptoms: earSymptoms,
          risk_score: riskScore,
          risk_level: riskLevel,
        },
      ]);

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Catch Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("hearingloss").select("*");

      if (error) {
        throw error;
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Catch Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
