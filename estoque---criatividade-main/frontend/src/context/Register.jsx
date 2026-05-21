import { Container, Box, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [setor, setSetor] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async() =>{
        if(!name || !email || !setor || !password || !confirmPassword){
            setError("Preencha todos os campos!");
            return;
        }

        if(password !== confirmPassword){
            setError("As senhas não coincidem!");
            return;
        }

        try{
            //envia name, email, setor, e password para  o backend
            await api.post("/auth/register", { name, email, setor, password});
            alert("Cadastro realizado com sucesso!");
            navigate("/"); // Redireciona para login 
        }catch(err){
            setError(err.response?.data?.msg || "Erro ao cadastrar usuário");
        }
    };

    return(
        <Container
            maxWidth="sm"
            sx={{
                display:"flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}    
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width:"100%",
                    bgcolor:"var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    boxShadow: "var(--shadow)"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb:3,
                        color: "var(--text-h)",
                        fontWeight:600,
                        textAlign: "center"
                    }}
                >
                    Cadastro
                </Typography>
                { error && (
                    <Typography
                        sx={{
                            color:"var(--text-h)",
                            fontWeight: 600,
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </Typography>
                )}

                <Box 
                    component="form" 
                    sx={{
                        display: "flex",
                        flexDirection:"column",
                        gap:2
                    }}
                >
                    <TextField 
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            input: { color: "var(--text)"}
                        }}
                    />
                    <TextField
                        label="Email"
                        variant="outline"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ input: { color:"var(--text)"}}}
                    />
                    <TextField
                        select
                        label="Setor"
                        variant="outlined"
                        fullWidth
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                        sx={{ input: {color: "var(--text)"}}}
                    >    
                        <MenuItem value="TI">Ti</MenuItem>
                        <MenuItem value="RH">RH</MenuItem>
                        <MenuItem value="Pedagogia">Pedagogia</MenuItem>
                        <MenuItem value="Comercial">Comercial</MenuItem>
                        <MenuItem value="Docente">Docente</MenuItem>
                        <MenuItem value="Almoxarifado">Almoxarifado</MenuItem>
                        <MenuItem value="Gerencia">Gerencia</MenuItem>
                    </TextField>
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outline"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            input:{color: "var(--text)"}
                        }}
                    />
                    <TextField
                        label="Confirmar Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ input: {color:"var(--text)"}}}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleRegister}
                        sx={{
                            mt:2,
                            bgcolor:"var(--primary)",
                            "&:hover":{ bgcolor: "var(--primary)" },
                        }}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}