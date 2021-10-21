import { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import * as yup from "yup";
import Controlador from "~/types/Controlador";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON);

async function checkController(controladorMac: string): Promise<PostgrestResponse<Controlador>> {
	return new Promise(async (resolve, reject) => {
		try {
			const controlador = await supabase
				.from<Controlador>("Controlador")
				.select("*")
				.eq("controlador_mac", controladorMac.toUpperCase());
			return resolve(controlador);
		} catch (e) {
			return reject(e);
		}
	});
}

async function registerSensor(controlador: Controlador): Promise<PostgrestResponse<Controlador>> {
	return new Promise(async (resolve, reject) => {
		try {
			const newSensor = await supabase
				.from<Controlador>("Controlador")
				.insert([{ ...controlador, controlador_mac: controlador.controlador_mac.toUpperCase() }]);
			return resolve(newSensor);
		} catch (e) {
			return reject(e);
		}
	});
}

// Validadores
const SensorValidator = yup.object().shape({
	portas: yup
		.array()
		.min(1, "É necessário registar pelo menos uma porta!")
		.required("Informe ao menos uma porta!")
		.nullable(),

	controlador_mac: yup
		.string()
		.required()
		.matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/g),
	codigo_vinculacao: yup.string().required(),

	created_at: yup.date(),
	bounded_at: yup.date(),
	bounded_by: yup.string().uuid(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET" && req.query?.mac && typeof req.query?.mac === "string") {
		return checkController(req.query?.mac)
			.then((result) => {
				if (result.data.length < 1) return res.status(200).json({ registered: false });
				return res.status(200).json({ registered: true, id: result.data[0].id });
			})
			.catch((e) => res.status(500).json({ ...e }));
	}

	if (req.method !== "POST") return res.status(405).json({ message: "Invalid method!" });

	const validBody = await SensorValidator.validate(req?.body).catch((e) => res.status(500).json({ ...e }));
	if (!validBody) return res.status(500).json({ message: "Invalid request!" });

	return registerSensor(req.body)
		.then((result) => res.status(200).json({ success: true, result: result.data[0] }))
		.catch((e) => res.status(500).json({ success: false, error: e.message }));
};
