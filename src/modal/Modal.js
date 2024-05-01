import './App.css'
const Modal = (props) => {
    return(
        <div >
            <div className="message">
                <div className="message-header" >
                    <h2>Menssagem do Sistema:</h2>
                    <button onClick={props.onClose} className="clear">X</button>
                </div>
                {props.menssagem}
            </div>

        </div>
    )
}

export default Modal;
