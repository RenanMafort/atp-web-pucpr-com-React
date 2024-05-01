import './App.css'
import firebase from "../FireBase";
import {Link} from "react-router-dom";
import {Component} from "react";
import Modal from "../modal/Modal";
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            menssagem: "",
            rendered: false
        }
        this.acessar = this.acessar.bind(this);
    }

    async formulario(value){
        let state = this.state;
        state.rendered = value;
        this.setState(state)
       await setTimeout(async () => {
            state.rendered = false;
          await  this.setState(state)
        },5000)
    }

    validar(){
        if (this.state.email.length === 0 || this.state.senha.length === 0){
            let state = this.state;
            state.menssagem =  "Preencha todos os campos!"
            this.setState(state)
           this.formulario(true);
            return true;
        }
        return false;
    }
    async  acessar(e){
        e.preventDefault();
        if (this.validar()){
            return;
        }
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(() => {
                window.location.href = "./home";
            }).catch(async (error) =>{
                let state = this.state;
                if (error.code === "auth/internal-error"){
                    state.menssagem = "Usuário não está cadastrado!"
                }else{
                    state.menssagem = "Sistema indísponível no momento!"
                }
                this.setState(state)
                await this.formulario(true)

                console.error(error);
            })
    }

    render() {
        return (
            <form onSubmit={this.acessar}>
                 <div className="page">
                     <div className="formLogin" >
                    <h1>Login</h1>
                    <p>Digite os seus dados de acesso no campo abaixo.</p>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" placeholder="Digite seu e-mail" autoFocus={true} maxLength="40"
                           onChange={(e) => this.setState({email: e.target.value})}/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" placeholder="Digite sua senha" maxLength="40"
                           onChange={(e) => this.setState({senha: e.target.value})}/>
                    <Link to="/cadastrar">cadastrar</Link>
                    <input type="submit" value="Acessar" className="btn" />
                     </div>
                     {this.state.rendered &&
                         <Modal menssagem={this.state.menssagem} onClose={() => this.setState({ rendered: false })}></Modal>}

                 </div>
            </form>

        );
    }
}

export default Login;

