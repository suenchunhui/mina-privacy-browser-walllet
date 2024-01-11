interface SendPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>
}

function SendPage({switchPage}: SendPageProps) {
    return (
        <div id="send_page">
            <div className="row justify-content-center">
                <h2 className="col-sm-auto" id="send_from_text">Send from public_private</h2>
            </div>
            <div className="row">
                <input className="form-control" type="text" id="recipient_pk_input" placeholder="Recipient public key" />
            </div>
            <div className="row justify-content-center">
                <input className="form-control" type="text" id="amount_input" placeholder="Amount" />
            </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="send_to_public_radio" value="send_to_public" checked />
                    <label className="form-check-label" htmlFor="send_to_public_radio">
                        Send to public
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="send_to_private_radio" value="send_to_private" />
                    <label className="form-check-label" htmlFor="send_to_private_radio">
                        Send to private
                    </label>
                </div>    
            <div className="row justify-content-center">
                <button type="button" className="btn btn-primary col-auto" id="send_confirm_btn" onClick={()=>{switchPage('wallet')}}>Send</button>
                <div className="col-auto"></div>
                <button type="button" className="btn btn-danger col-auto" id="cancel_to_wallet1_btn" onClick={()=>{switchPage('wallet')}}>Cancel</button>
            </div>
        </div>)
}

export default SendPage;