import Grupo from "./Grupo";

type Sensor = {
    id: number;
    gid: number;
    mac: string;

    // Datas (auditoria)
    created_at: Date;
    bounded_at: Date;
    bounded_by: number;

    grupo?: Grupo;
} 

export default Sensor;