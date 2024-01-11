import React, { useState, useEffect } from 'react';
import {PrivateKey} from 'o1js';

interface PrivateKeyPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>,
    isImporting: boolean,
}

function PrivateKeyPage({switchPage, isImporting}: PrivateKeyPageProps) {
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    useEffect(() => {
        if(!isImporting){
            const priv = PrivateKey.random();
            const pk = priv.toPublicKey();
            setPublicKey(pk.toBase58());
            setPrivateKey(priv.toBase58());

            // chrome.runtime.sendMessage(['gen-key', ''], (response) => {
            //     if(response){
            //         setPublicKey(response[0]);
            //         setPrivateKey(response[1]);
            //     }
            //   });  
        }
    }, []);

    function saveAll(){
        chrome.runtime.sendMessage(['set-data', 'public-key', publicKey], (response) => {});
        chrome.runtime.sendMessage(['set-data', 'private-key', privateKey], (response) => {});
    }

    return (
    <div id="private_key_page">
        <div className="row justify-content-center">
            <span className="input-group-text col-md" id="private_key_text">{privateKey}</span>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-primary col-sm-auto" id="init_key_btn" onClick={()=>{saveAll(); switchPage('wallet')}}
            >Create new wallet</button>
        </div>
    </div>)
}

export default PrivateKeyPage;        