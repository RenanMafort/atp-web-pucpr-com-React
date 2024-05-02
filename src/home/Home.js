import {Component} from "react";
import firebase from "../FireBase";
import {format} from 'date-fns';
import './App.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            dtnascimento: "",
            initpage: false
        }
    }


    async componentDidMount() {
        await firebase.auth().onAuthStateChanged(async (usuario) => {
            if (usuario) {
                const lastAcces = +usuario.metadata.b;
                const now = new Date().getTime();
                const diff = (now - lastAcces) / (1000 * 60);
                if (diff > 15){
                    window.location.href = "/"
                }else{
                    var id = usuario.uid;
                    await firebase.firestore().collection("usuario").doc(id).get()
                        .then((retorno) => {
                            this.setState({
                                nome: retorno.data().nome,
                                sobrenome: retorno.data().sobrenome,
                                dtnascimento: retorno.data().dtnascimento,
                                initpage: true
                            })
                        }).catch(error => {
                            console.log(error)
                        })
                }
            } else {
                window.location.href = "/"
            }
        })
    }

    async logout(e) {
        e.preventDefault();
        await firebase.auth().signOut()
            .then(() => {
                window.location.href = "/login"
            }).catch(() => {
                alert("Falha ao fazer logout")
            })
    }

    render() {
        return (
            <div>
                {this.state.initpage &&
                    <div className="paginiainit">
                        <div className="div-button-sair">
                            <button onClick={this.logout}>Sair</button>
                        </div>
                        <div className="pagina">
                            <div className="div-table">
                                <h2>Dados Cadastrais</h2>
                                <div className="intern">
                                    <table border="1" className="tabela">
                                        <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Sobrenome</th>
                                            <th>Data de Nascimento</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{this.state.nome}</td>
                                            <td>{this.state.sobrenome}</td>
                                            <td>{this.state.dtnascimento.length > 0 &&
                                                format(new Date(this.state.dtnascimento), 'dd/MM/yyyy')}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        )
    }
}

export default Home;