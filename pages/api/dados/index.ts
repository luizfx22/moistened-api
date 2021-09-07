import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON);

// Validadores
const DadoValidator = yup.object().shape({
	sensor_id: yup.number().required(),
	air_temperature: yup.number().required(),
	air_humidity: yup.number().required(),
	soil_humidity: yup.number().required(),
	readed_at: yup.string().required(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).json({ message: "Invalid method!" });

	const valid = await DadoValidator.validate(req.body).catch((e) => res.status(500).json({ ...e }));
	if (!valid) return res.status(500).json({ message: "Invalid request!" });

	const { error } = await supabase.from("Dados").insert([{ ...req.body }]);
	if (error) return res.status(500).json({ message: error.message });

	return res.status(201).json({ success: true });
};
