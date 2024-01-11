interface WalletPageProps {
    switchPage:  React.Dispatch<React.SetStateAction<string>>
}

function WalletPage({switchPage}: WalletPageProps) {
    return (
    <div id="wallet_page">
        <div className="row justify-content-center">
            <h2 className="col-md-auto">Privacy Wallet</h2>
        </div>
        <div className="row justify-content-center">
            <div id="address_text" className="col-md-auto">ADDRESS</div>
            <div id="total_balance_text" className="col-sm-auto">TOTAL BALANCE</div>
        </div>
        <div className="row justify-content-center">
            <ul className="nav nav-tabs col-md-auto">
                <li className="nav-item">
                    <a className="nav-link active" href="#" id="public_nav">Public</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" id="private_nav">Private</a>
                </li>
            </ul>    
        </div>
        <div className="row justify-content-center">
            <h3 id="balance_text" className="col-md-auto">BAL</h3>
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