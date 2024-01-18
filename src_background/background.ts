import { Coin } from './Coin';
import { MerkleListenerLib } from './server';
import {
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
  MerkleTree,
  MerkleWitness,
  PublicKey,
  Poseidon,
  Bool,
  MerkleMap,
  Nullifier,
  Signature,
} from 'o1js';

console.log("bg start");

//tree defn
const height = 32;
class MerkleWitness32 extends MerkleWitness(height) {}

//init mina network
const NetworkURL = "https://proxy.berkeley.minaexplorer.com/graphql";
const MinaNetwork = Mina.Network(NetworkURL);
Mina.setActiveInstance(MinaNetwork);
console.log('Using network: ' + NetworkURL);
const feepayerKey = PrivateKey.fromBase58("");
const feepayerAccount = feepayerKey.toPublicKey();

//coin instance
const zkAppAddress = PublicKey.fromBase58("B62qp7KAWzaFGF6MbsReZWVCQJEfm9nuz9sx4j2KYu3J5DqZ69C2Vnq")
const coinInstance = new Coin(zkAppAddress);

//merkle listener
const api_port = 30001;
const listener = new MerkleListenerLib('localhost', api_port);

async function sendPublicPublic(recipient_b58: string, amount: bigint){

    const recipient = PublicKey.fromBase58(recipient_b58);
    const transferAmt = Field(amount);
    const sender_idx = 0n; //FIXME automatically find empty index, and store in storage
    const is_new_recipient_leaf = true; //FIXME
    const recipient_idx = 1n; //FIXME search for recipient index
    const recipient_bal = Field(0); //FIXME
    const sender_pub58 = localStorage.getItem('public-key');
    const sender_priv58 = localStorage.getItem('private-key');

    if(sender_priv58 && sender_pub58){
        const sender_priv = PrivateKey.fromBase58(sender_priv58);
        const sender_pub = PublicKey.fromBase58(sender_pub58);
        const sender_bal = Field(1000);    //FIXME get from server

        console.log(`dd1 sender=${sender_pub58} recipient=${recipient.toBase58()} amt=${transferAmt.toBigInt()} idx=${sender_idx} recp_bal=${recipient_bal.toBigInt()}`);

        const senderWitness = MerkleWitness32.fromJSON(await listener.getPublicWitness(0 /* fixme */));
        const recipientWitness = MerkleWitness32.fromJSON(await listener.getPublicWitness(1 /* fixme */));
        console.log("d3");
        const publicTreeRoot = Field(await listener.getPublicRoot());
        console.log(typeof publicTreeRoot, publicTreeRoot);

        const tx3_sig = Signature.create(sender_priv, [
            publicTreeRoot,
            transferAmt,
        ]);
        
        console.log("d4");
        const txn = await Mina.transaction({sender: feepayerAccount , fee: 1_000_000_000 /* 1 MINA */}, () => {
            coinInstance.transfer(
            //sender
            senderWitness,
            sender_pub,
            sender_bal, //sender bal
            tx3_sig, //signature
    
            //recipient
            Bool(is_new_recipient_leaf), //emptyRecipientLeaf
            recipientWitness,
            recipient,
            recipient_bal, //recipientBal 
    
            //amount
            transferAmt
            );
        });
        console.log("d5");
        await txn.prove();
        console.log("d6");
        const rsl = await txn.sign([feepayerKey]).send();
        const hash = rsl.hash();
        console.log("tx ", hash);
        return hash;
    }    
}

async function sendPublicPrivate(recipient_b58: string, amount: bigint){

    const sender_pub58 = localStorage.getItem('public-key');
    const sender_priv58 = localStorage.getItem('private-key');
    const recipient = PublicKey.fromBase58(recipient_b58);

    if(sender_priv58 && sender_pub58){
        const sender_priv = PrivateKey.fromBase58(sender_priv58);
        const sender_pub = PublicKey.fromBase58(sender_pub58);

        const senderBal = await listener.getPublicBalance(sender_pub58);
console.log(senderBal);
        const sender_bal = Field(1000);    //FIXME get from server

        const transferAmt = Field(amount);
        const nonce = Field(Math.floor(Math.random() * 100000)); //TODO not-crypto secure random

        const senderWitness = MerkleWitness32.fromJSON(await listener.getPublicWitness(0 /* sender idx fixme */));
        const utxo_index = 0n;  //TODO
        const utxoWitness = MerkleWitness32.fromJSON(await listener.getPrivateWitness(0 /* sender idx fixme */));
        const publicTreeRoot = Field(await listener.getPublicRoot());
        const privateTreeRoot = Field(await listener.getPrivateRoot());
        const sig5 = Signature.create(sender_priv, [
            publicTreeRoot,
            privateTreeRoot,
            transferAmt,
        ]);

        const txn = await Mina.transaction({sender: feepayerAccount , fee: 1_000_000_000 /* 1 MINA */}, () => {
            coinInstance.transferToPrivate(
                //sender
                senderWitness,
                sender_pub,
                sender_bal,
                sig5, //signature

                //recipient
                recipient, //recipient
                nonce, //nonce
                utxoWitness, //newPrivateWitness

                //amount
                transferAmt
            );
        });

        await txn.prove();
        const rsl = await txn.sign([feepayerKey]).send();
        const hash = rsl.hash();
        console.log("tx ", hash);
        return hash;
    }
}

chrome.runtime.onMessage.addListener((message, msgSender, sendResponse) => {
    const func:string = message[0];
    const key:any = message[1];
    console.log([func, key])
    switch(func){
        case 'get-data':
            sendResponse(localStorage.getItem(key));
            break;
        case 'set-data':
            const value:string = message[2];
            localStorage.setItem(key, value);
            break;
        case 'sendPublicPublic':
            sendPublicPublic(key[0], key[1]).then(hash => {
                sendResponse(hash);
            });
            break;
        case 'sendPublicPrivate':
            sendPublicPrivate(key[0], key[1]).then(hash => {
                sendResponse(hash);
            });
            break;
    }
});

Coin.compile();
console.log("compile done");

export {}