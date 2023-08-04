"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aptos_1 = require("aptos");
const provider = new aptos_1.Provider(aptos_1.Network.DEVNET);
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const faucetClient = new aptos_1.FaucetClient(NODE_URL, FAUCET_URL);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const alice = new aptos_1.AptosAccount();
        console.log("account created");
        yield faucetClient.fundAccount(alice.address(), 100000000);
        console.log("account funded");
        const entryFunctionPayload = new aptos_1.TxnBuilderTypes.TransactionPayloadEntryFunction(aptos_1.TxnBuilderTypes.EntryFunction.natural("372facd49db7a5b87809ce066ae07d647289ef30aab10c99e60b3bb01867548b::see_my_message_store", "create_message", [], [aptos_1.BCS.bcsSerializeStr("hi, first message")]));
        const rawTxn = yield provider.generateSignSubmitTransaction(alice, entryFunctionPayload);
        const response = yield provider.waitForTransaction(rawTxn);
        const viewPayload = {
            function: "372facd49db7a5b87809ce066ae07d647289ef30aab10c99e60b3bb01867548b::see_my_message_store::see_message",
            type_arguments: [],
            arguments: [alice.address().hex()]
        };
        try {
            const message = yield provider.view(viewPayload);
            console.log({ message });
        }
        catch (e) {
            console.log(e);
        }
    });
}
main();
