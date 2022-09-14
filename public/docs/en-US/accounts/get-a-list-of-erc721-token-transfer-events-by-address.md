# Get a list of 'ERC-721 Token Transfer Events' by Address

Returns the list of ERC-721 ( NFT ) tokens transferred by an address, with optional filtering by token contract.
```shell
https://scan.neonlink.io/api
   ?module=account
   &action=tokennfttx
   &contractaddress=0x428b68C856ACD8e7eae3C5CeB5d650AEaa7F48bc
   &address=0xc28bb91d5a8d4d4715cd8666d4e1aa0089b7bee5
   &startblock=0
   &endblock=99999999
   &page=1
   &offset=100
   &sort=asc
   &apikey=YourApiKeyToken
```

Usage:
- ERC-721 transfers from an address, specify the address parameter
- ERC-721 transfers from a contract address, specify the contract address parameter
- ERC-721 transfers from an address filtered by a token contract, specify both address and contract address parameters.

> Try this endpoint in your  🔗
​
Sample Response
```json
{
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"28064057",
         "timeStamp":"1642273733",
         "hash":"0xcf42b5844dae13b8e2c0b2f9c9235dfff5b1f8715e314e7a9f15eb80eff37c1f",
         "nonce":"2",
         "blockHash":"0x0001163d00000aff2dabc660e81d78d67e6cde168d00feb8a063621af48953a0",
         "from":"0x0000000000000000000000000000000000000000",
         "contractAddress":"0x428b68c856acd8e7eae3c5ceb5d650aeaa7f48bc",
         "to":"0xc28bb91d5a8d4d4715cd8666d4e1aa0089b7bee5",
         "tokenID":"4152",
         "tokenName":"Basic Apes Token",
         "tokenSymbol":"SCAMMER",
         "tokenDecimal":"0",
         "transactionIndex":"0",
         "gas":"361630",
         "gasPrice":"279573100000",
         "gasUsed":"306420",
         "cumulativeGasUsed":"306420",
         "input":"deprecated",
         "confirmations":"400460"
      },
      {
         "blockNumber":"28083255",
         "timeStamp":"1642290741",
         "hash":"0x5318f98f7fdebd7cd0d9369737572afc7767cc061e47796722109eaf831f6016",
         "nonce":"5",
         "blockHash":"0x0001168b0000058f816549f7ee02310ef83d46a8a9bcd33d44017c663e77ce8e",
         "from":"0xc28bb91d5a8d4d4715cd8666d4e1aa0089b7bee5",
         "contractAddress":"0x428b68c856acd8e7eae3c5ceb5d650aeaa7f48bc",
         "to":"0x3b594e8001e28e676f047c4a4423f6f2cc750f41",
         "tokenID":"4152",
         "tokenName":"Basic Apes Token",
         "tokenSymbol":"SCAMMER",
         "tokenDecimal":"0",
         "transactionIndex":"6",
         "gas":"249005",
         "gasPrice":"352789000000",
         "gasUsed":"194265",
         "cumulativeGasUsed":"1211136",
         "input":"deprecated",
         "confirmations":"381262"
      }
   ]
}
```
