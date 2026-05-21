import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "@mui/material";

export default function Movimentacoes(){
    const [data, setData] = useState([]);

    const load =async () => {
        const res = await api.get("/movimentacoes");
        setData(res.data);
    };

    useEffect(() => { load(); }, []);

    return(
        <div>
            <h2>Histórico</h2>
            <Button
                onClick={load}
            >
                Atualizar
            </Button>
            <ul>
                {data.map(m => {
                    <li key={m.id}> {m.tipo} - {m.usuario}</li>
                })}
            </ul>
        </div>
    );
}