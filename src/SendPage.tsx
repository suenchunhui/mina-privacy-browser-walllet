import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

interface SendPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>,
    mode: string
}

function SendPage({switchPage, mode}: SendPageProps) {
    const [recipientMode, setRecipientMode] = useState('public');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0.0);

    function transfer(){
        if(mode == 'public'){
            if(recipientMode == 'public'){
                //public->public


            }else{
                //recipientMode==private
                //public->private
            }
        }else{
            //mode==private
            if(recipientMode == 'public'){
                //private->public
            }else{
                //recipientMode==private
                //private->private
            }

        }
    }

    return (
        <div id="send_page">
            <div className="row justify-content-center">
                <h2 className="col-sm-auto" id="send_from_text">Send from {mode} to {recipientMode}</h2>
            </div>
            <div className="row">
                <input className="form-control" type="text" id="recipient_pk_input" placeholder="Recipient public key" value={recipient} onChange={e=>setRecipient(e.target.value)} />
            </div>
            <div className="row justify-content-center">
                <input className="form-control" type="text" id="amount_input" placeholder="Amount" value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} />
            </div>
                <Form.Check>
                    <Form.Check.Input className="form-check-input" type="radio" name="exampleRadios" id="send_to_public_radio" value="send_to_public" 
                    checked={recipientMode === 'public'} onChange={e => {setRecipientMode('public')}} />
                    <Form.Check.Label className="form-check-label" htmlFor="send_to_public_radio">Send to public</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input className="form-check-input" type="radio" name="exampleRadios" id="send_to_private_radio" value="send_to_private" 
                    checked={recipientMode === 'private'} onChange={e => {setRecipientMode('private')}} />
                    <Form.Check.Label className="form-check-label" htmlFor="send_to_private_radio">Send to private</Form.Check.Label>
                </Form.Check>
            <div className="row justify-content-center">
                <button type="button" className="btn btn-primary col-auto" id="send_confirm_btn" onClick={()=>{switchPage('wallet')}}>Send</button>
                <div className="col-auto"></div>
                <button type="button" className="btn btn-danger col-auto" id="cancel_to_wallet1_btn" onClick={()=>{switchPage('wallet')}}>Cancel</button>
            </div>
        </div>)
}

export default SendPage;