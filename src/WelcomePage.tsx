import React from 'react';

interface WelcomePageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>
    setImporting: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomePage({switchPage, setImporting}: WelcomePageProps) {
  return (
    <div id="welcome_page">
        <div className="row justify-content-center">
            <img src="../img/icon-128.png" style={{width: 128}} className="col-sm-auto justify-content-center"/>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-primary col-sm-auto" id="new_wallet_btn" onClick={()=>{setImporting(false); switchPage('privatekey')}}
            >Create new wallet</button>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-success col-sm-auto" id="import_key_btn" onClick={()=>{setImporting(true); switchPage('privatekey')}}
            >Import existing key</button>
        </div>
        <br/>
    </div>
  );
}

export default WelcomePage;
