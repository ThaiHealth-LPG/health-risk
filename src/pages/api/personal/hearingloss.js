import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("personal").select(`
          *,
          hearingloss (
            *
          ), audiometry (
            *
          )
        `);

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error fetching combined records:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
