import React, { useState, useEffect } from 'react';
import {PrivateKey} from 'o1js';

interface PrivateKeyPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>,
    isImporting: boolean,
}

function PrivateKeyPage({switchPage, isImporting}: PrivateKeyPageProps) {
    const [privateKey, setPrivateKey] = useState('');
    let editable = true;
    useEffect(() => {
        if(!isImporting){
            const priv = PrivateKey.random();
            setPrivateKey(priv.toBase58());
            editable = false;
        }
    }, []);

    function saveAll(){
        const priv = PrivateKey.fromBase58(privateKey);
        const pk = priv.toPublicKey();
        if(priv && pk){
            chrome.runtime.sendMessage(['set-data', 'public-key', pk.toBase58()], (response) => {});
            chrome.runtime.sendMessage(['set-data', 'private-key', privateKey], (response) => {
                switchPage('wallet')
            });
        }else{
            alert("invalid private key");
        }
    }

    return (
    <div id="private_key_page">
        <div className="row justify-content-center">
            Private key in base58:
            <input className="input-group-text col-md" id="private_key_text" value={privateKey} onChange={(e)=>{setPrivateKey(e.target.value)}} contentEditable={editable}/>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-primary col-sm-auto" id="init_key_btn" onClick={()=>{saveAll();}}
            >Create new wallet</button>
            <br/>
        </div>
    </div>)
}

export default PrivateKeyPage;        