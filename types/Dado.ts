import Sensor from "./Sensor";

type Dado = {
    id: number;
    sid: number;
    air_temperature: number;
    air_humidity: number;
    soil_humidity: number;
    readed_at: Date;

    sensor?: Sensor;
}

export default Dado;