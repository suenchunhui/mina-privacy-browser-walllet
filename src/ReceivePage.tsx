interface ReceivePageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>
}

function ReceivePage({switchPage}: ReceivePageProps) {
    return (
        <div id="receive_page">
            <div className="row justify-content-center">
                <h2 className="col-sm-auto" id="send_from_text">Receive private UTXO</h2>
            </div>
            <div className="row justify-content-center">
                <input className="form-control" type="text" placeholder="Transaction string" />
            </div>
            <div className="row justify-content-center">
                <button type="button" className="btn btn-success col-auto" id="receive_confirm_btn" onClick={()=>{switchPage('wallet')}}>Receive</button>
                <div className="col-auto"></div>
                <button type="button" className="btn btn-danger col-auto" id="cancel_to_wallet2_btn" onClick={()=>{switchPage('wallet')}}>Cancel</button>
            </div>
        </div>)
}

export default ReceivePage;