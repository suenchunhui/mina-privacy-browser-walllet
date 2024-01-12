import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'; 

interface WalletPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>,
    switchMode: React.Dispatch<React.SetStateAction<string>>
}

function WalletPage({switchPage, switchMode}: WalletPageProps) {
    const [publicKey, setPublicKey] = useState('');
    const [mode, setMode] = useState('public');
    const [totalBalance, setTotalBalance] = useState(100);
    const [publicBalance, setPublicBalance] = useState(10);
    const [privateBalance, setPrivateBalance] = useState(20);
    const [currBalance, setCurrBalance] = useState(10);

    useEffect(() => {
        chrome.runtime.sendMessage(['get-data', 'public-key'], (response) => {
            setPublicKey(response);
        });  
      }, []);
    
    function navSelect(selectedKey: string) {
        switch(selectedKey){
            case 'public':
                setMode('public');
                switchMode('public');
                setCurrBalance(publicBalance);
                break;
            case 'private':
                setMode('private');
                switchMode('private');
                setCurrBalance(privateBalance);
                break;
        }            
    }
    
    return (
    <div id="wallet_page">
        <div className="row justify-content-center">
            <h2 className="col-md-auto">Privacy Wallet</h2>
        </div>
        <div className="row justify-content-center">
            <div id="address_text" className="col-md-auto">{publicKey}</div>
            <div id="total_balance_text" className="col-sm-auto">Total bal: {totalBalance}</div>
        </div>
        <div className="row justify-content-center">
            <Nav className="col-md-auto" activeKey={mode} onSelect={(k)=>{if(k) navSelect(k)}}>
                <Nav.Item>
                    <Nav.Link eventKey="public" id="public_nav">Public</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="private" id="private_nav">Private</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
        <div className="row justify-content-center">
            <h3 id="balance_text" className="col-md-auto">{mode} bal: {currBalance}</h3>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-primary col-auto" id="send_btn" onClick={()=>{switchPage('send')}}>Send</button>
            <div className="col-auto"></div>
            <button type="button" className="btn btn-success col-auto" id="receive_btn" onClick={()=>{switchPage('receive')}}>Receive</button>
        </div>
    </div>)
}

export default WalletPage;