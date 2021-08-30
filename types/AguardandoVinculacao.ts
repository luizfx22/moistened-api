type AguardandoVinculacao = {
    id: number;
    codigo_vinculacao: number;
    mac: string;
    fl_bound: boolean; // Flag que indica se foi vinculado ou não
    bounded_to?: number;
    gid?: number;

    created_at: Date;
};

export default AguardandoVinculacao;