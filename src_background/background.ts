console.log("bg start");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const func:string = message[0];
    const key:string = message[1];
    //console.log([func, key])
    switch(func){
        case 'get-data':
            sendResponse(localStorage.getItem(key));
            break;
        case 'set-data':
            const value:string = message[2];
            localStorage.setItem(key, value);
            break;
    }
});

export {}