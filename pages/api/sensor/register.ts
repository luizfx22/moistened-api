import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import Sensor from "~/types/Sensor";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON);

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body);
	res.status(201).send("SALVOU!");
};
