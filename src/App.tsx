import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import WelcomePage from "./WelcomePage"; 
import PrivateKeyPage from "./PrivateKeyPage";
import WalletPage from "./WalletPage";
import SendPage from "./SendPage";
import ReceivePage from "./ReceivePage";
 
function App() {
  const [activePage, setActivePage] = useState('');
  const [isImporting, setImporting] = useState(false);
  useEffect(() => {
    chrome.runtime.sendMessage(['get-data', 'public-key'], (response) => {
      if(response) 
        setActivePage('wallet')
      else
        setActivePage('welcome')
    });  
  }, []);

  return (
    <div className="App" style={{minWidth: 500}} >

      {(activePage == 'welcome') && <WelcomePage switchPage={setActivePage} setImporting={setImporting} />}
      {(activePage == 'privatekey') && <PrivateKeyPage switchPage={setActivePage} isImporting={isImporting} />}
      {(activePage == 'wallet') && <WalletPage switchPage={setActivePage} />}
      {(activePage == 'send') && <SendPage switchPage={setActivePage} />}
      {(activePage == 'receive') && <ReceivePage switchPage={setActivePage} />}
    </div>
  );
}

export default App;
 