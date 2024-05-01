import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./login/Login";
import Home from "./home/Home";
import Cadastro from "./cadastro/Cadastro";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/home" element={<Home/>} ></Route>
                <Route exact path="/cadastrar" element={<Cadastro/>} ></Route>
                <Route exact path="/" element={<App/>} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas