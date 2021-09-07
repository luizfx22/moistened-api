import Sensor from "./Sensor";

type Dado = {
	id?: number;
	sensor_id: number;
	air_temperature: number;
	air_humidity: number;
	soil_humidity: number;
	readed_at: string;

	sensor?: Sensor;
};

export default Dado;
