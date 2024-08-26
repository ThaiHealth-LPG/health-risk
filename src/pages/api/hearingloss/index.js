import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      position,
      noise,
      workingHours,
      bodyHeight,
      earSymptoms,
      firstName,
      lastName,
      riskScore,
      riskLevel,
    } = req.body;

    try {
      console.log("Request Body:", req.body); // Debugging statement

      // Step 1: Look up the personalId based on firstName and lastName
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

      // Step 2: Insert the data into the hearingloss table
      const { data, error } = await supabase.from("hearingloss").insert([
        {
          personal_id: personalId,
          position,
          noise,
          working_hours: workingHours,
          body_height: bodyHeight,
          ear_symptoms: earSymptoms,
          risk_score: riskScore,
          risk_level: riskLevel,
        },
      ]);

      if (error) {
        console.error("Insert Error:", error.message); // Debugging statement
        throw error;
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Catch Error:", error.message); // Debugging statement
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
