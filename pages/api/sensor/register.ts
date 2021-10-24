import { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import Sensor from "~/types/Sensor";
import * as yup from "yup";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON);

async function checkSensor(sensorMac: string): Promise<PostgrestResponse<Sensor>> {
	return new Promise(async (resolve, reject) => {
		try {
			const sensor = await supabase.from<Sensor>("Sensor").select("*").eq("sensor_mac", sensorMac.toUpperCase());
			return resolve(sensor);
		} catch (e) {
			return reject(e);
		}
	});
}

async function registerSensor(sensor: Sensor): Promise<PostgrestResponse<Sensor>> {
	return new Promise(async (resolve, reject) => {
		try {
			const newSensor = await supabase
				.from<Sensor>("Sensor")
				.insert([{ ...sensor, sensor_mac: sensor.sensor_mac.toUpperCase() }]);
			return resolve(newSensor);
		} catch (e) {
			return reject(e);
		}
	});
}

// Validadores
const SensorValidator = yup.object().shape({
	horta_id: yup.string().uuid(),
	sensor_mac: yup
		.string()
		.required()
		.matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/g),
	codigo_vinculacao: yup.number().required(),
	created_at: yup.date(),
	bounded_at: yup.date(),
	bounded_by: yup.number(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET" && req.query?.mac && typeof req.query?.mac === "string") {
		return checkSensor(req.query?.mac)
			.then((result) => {
				console.log(result);
				if (result.data.length < 1) return res.status(200).json({ registered: false });
				return res.status(200).json({ registered: true, id: result.data[0].id });
			})
			.catch((e) => res.status(500).json({ registered: false, ...e }));
	}

	if (req.method !== "POST") return res.status(405).json({ message: "Invalid method!" });

	const validBody = await SensorValidator.validate(req?.body).catch((e) => res.status(500).json({ ...e }));
	if (!validBody) return res.status(500).json({ message: "Invalid request!" });

	return registerSensor(req.body)
		.then((result) => res.status(200).json({ success: true, result: result.data[0] }))
		.catch((e) => res.status(500).json({ success: false, error: e.message }));
};
