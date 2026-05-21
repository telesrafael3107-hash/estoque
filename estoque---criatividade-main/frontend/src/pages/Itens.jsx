import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TextField, Button } from "@mui/material";

export default function Itens(){
    const [itens, setItens ] = useState({});
    const [ nome, setNome ] = useState("");

    const load = async() => {
        const res = await api.get("/itens");
        setItens(res.data);
    };

    useEffect(() => { load(); }, []);
    
    const create = async() => {
        await api.post("/itens", { nome });
        load();
    }
    return(
        <div>
            <h2>Itens</h2>
            <TextField 
                label="Nome"
                onChange={(e)=>setNome(e.target.value)}
            />
            <Button onClick={create}>Cadastrar</Button>
            <ul>
                {itens.map(i => (
                    <li key={i.id}>{i.nome} - {i.status}</li>
                ))}
            </ul>
        </div>
    );
}
