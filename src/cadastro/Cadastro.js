import {Component} from "react";
import firebase from "../FireBase";
import './App.css'
import Modal from "../modal/Modal";
class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            nome: "",
            dtnascimento:"",
            sobrenome: "",
            rendered: false,
            menssagem: "",
        }
        this.gravar = this.gravar.bind(this);
    }

    validar(){
        if (this.state.email === "" || this.state.senha.length === 0
        || this.state.nome === "" || this.state.sobrenome === "" || this.state.dtnascimento === "") {
            let state = this.state;
            state.menssagem = "Preencha todos os campos!";
            this.setState(state)
            return true;
        }
        if (this.state.senha.length < 6){
            let state = this.state;
            state.menssagem = "Senha deve conter 6 caracteres!";
            this.setState(state)
            return true;
        }
        return false;
    }
    async gravar(e) {
        e.preventDefault();
        if (this.validar()){
            this.formulario(true)
            return;
        }
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .then(async (response) => {
                await firebase.firestore().collection("usuario").doc(response.user.uid)
                    .set({
                        nome: this.state.nome,
                        sobrenome: this.state.sobrenome,
                        dtnascimento: this.state.dtnascimento
                    })
                let state = this.state;
                state.menssagem = "Usuario cadastrado com sucesso!";
                this.setState(state)
                this.formulario(true)
                window.location.href = "/";
            }).catch((error) =>{
                let state = this.state;
                state.menssagem = error.message;
                this.setState(state)
                this.formulario(true)

            })

    }

    formulario(value){
        let state = this.state;
        state.rendered = value;
        this.setState(state)
        setTimeout(() => {
            state.rendered = false;
            this.setState(state)
        },5000)
    }

    home(e){
        e.preventDefault();
        window.location.href = "/"
    }

    render() {
        return (
           <form onSubmit={this.gravar}>
               <div className="home-page">
                   <div className="div-button">
                       <button onClick={this.home}>Logar</button>
                   </div>
                   <div className="page">
                       <div className="formLogin" >
                           <h1>Cadastrar</h1>
                           <p>Digite os seus dados para cadastrar.</p>
                           <label htmlFor="text">Nome</label>
                           <input type="text" placeholder="Digite seu nome" autoFocus={true} maxLength="30"
                                  onChange={(e) => this.setState({nome: e.target.value})}/>
                           <label htmlFor="text">Sobrenome</label>
                           <input type="text" placeholder="Digite seu sobrenome" autoFocus={true} maxLength="30"
                                  onChange={(e) => this.setState({sobrenome: e.target.value})}/>
                           <label htmlFor="text">Data de nascimento</label>
                           <input type="date" id="start" name="trip-start" min="1950-12-31" max="2024-12-31"
                                  onChange={(e) => this.setState({dtnascimento: e.target.value})}/>
                           <label htmlFor="email">E-mail</label>
                           <input type="email" placeholder="Digite seu e-mail" autoFocus={true} maxLength="40"
                                  onChange={(e) => this.setState({email: e.target.value})}/>
                           <label htmlFor="password">Senha</label>
                           <input type="password" placeholder="Digite sua senha" maxLength="30"
                                  onChange={(e) => this.setState({senha: e.target.value})}/>
                           <input type="submit"  className="btn"/>
                       </div>
                       {this.state.rendered &&
                           <Modal menssagem={this.state.menssagem} onClose={() => this.setState({ rendered: false })}></Modal>
                       }
                   </div>
               </div>

           </form>
        );
    }
}

export default Cadastro;
