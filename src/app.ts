import {Provider, FaucetClient, Network, AptosAccount, TxnBuilderTypes, BCS} from "aptos";
const provider = new Provider(Network.DEVNET);
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); 

async function main() {
    const alice = new AptosAccount();
    console.log("account created");
    await faucetClient.fundAccount(alice.address(), 100_000_000);
    console.log("account funded");
    const entryFunctionPayload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural("372facd49db7a5b87809ce066ae07d647289ef30aab10c99e60b3bb01867548b::see_my_message_store", "create_message", [], [BCS.bcsSerializeStr("hi, first message")]),
    );
    const rawTxn = await provider.generateSignSubmitTransaction(alice, entryFunctionPayload);
    const response = await provider.waitForTransaction(rawTxn)

    const viewPayload = {
        function: "372facd49db7a5b87809ce066ae07d647289ef30aab10c99e60b3bb01867548b::see_my_message_store::see_message",
        type_arguments: [],
        arguments: [alice.address().hex()]
    };
    try{
        const message = await provider.view(viewPayload);
        console.log({message})
    }catch(e){
        console.log(e)
    }
}   



main()

