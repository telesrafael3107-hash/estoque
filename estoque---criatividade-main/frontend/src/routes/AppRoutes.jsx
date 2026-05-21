import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../context/Register";
import Itens from "../pages/Itens";
import Movimentacoes from "../pages/Movimentacoes";
import { useAuth } from "../context/AuthContext";

function Private({ children }){
    const { token } = useAuth();
    return token ? children : <Navigate to={"/"} replace />;
}

export default function AppRoutes(){
    return(
        <BrowserRouter>
            {/* Rota da navBar */}

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route 
                    path="/itens" 
                    element={
                        <Private>
                            <Itens/>
                        </Private>
                    }/>
                <Route 
                    path="/movimentacoes" 
                    element={
                        <Private>
                            <Movimentacoes/>
                        </Private>
                    }/>
            </Routes>
        </BrowserRouter>
    );
}