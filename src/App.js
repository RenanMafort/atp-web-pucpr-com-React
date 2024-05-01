import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./login/Login";
import Cadastro from "./cadastro/Cadastro";
import Home from "./home/Home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;