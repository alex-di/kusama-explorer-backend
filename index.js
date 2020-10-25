const {WsProvider, ApiPromise} = require("@polkadot/api")

const hashOrNumber = process.argv[2]
const network = process.argv[3] || 'wss://kusama-rpc.polkadot.io'


async function main(query) {

    const provider = new WsProvider(network);
    const api = await ApiPromise.create({ provider })
    const hash = /^[0-9]+$/.test(query) ? await api.rpc.chain.getBlockHash(query) : query;

    return new Promise(y => 
        api.rpc.chain.getBlock(hash, result => {
            y(JSON.stringify(result, null, "  "))
            api.disconnect()
        })
    )
}

main(hashOrNumber)
    .then(console.info)
    .catch(console.error);