export const addNetwork = (chainName: string, symbol: string, chainId: number, rpc: string, explorer: string) => {
    return new Promise(resolve=>{
        const { ethereum } = window
        if (ethereum) {
            ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x'+chainId.toString(16),
                    chainName,
                    nativeCurrency: {
                        name: chainName,
                        symbol,
                        decimals: 18
                    },
                    rpcUrls: [rpc],
                    blockExplorerUrls: [explorer]
                }]
            }).then((res)=>{
                console.log(res)
                resolve(true)
            }).catch((error) => {
                console.log(error)
                resolve(false)
            })
        } else {
            resolve(false)
        }
        
    })
}