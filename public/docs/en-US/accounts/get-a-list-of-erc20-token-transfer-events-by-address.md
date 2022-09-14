# Get a list of 'ERC-20 Token Transfer Events' by Address

Returns the list of ERC-20 tokens transferred by an address, with optional filtering by token contract.
```shell
https://scan.neonlink.io/api
   ?module=account
   &action=tokentx
   &contractaddress=0x69c744d3444202d35a2783929a0f930f2fbb05ad
   &address=0x489d55df278224a05f793098d41753d5669d5144
   &startblock=0
   &endblock=99999999
   &page=1
   &offset=5
   &sort=asc
   &apikey=YourApiKeyToken
```

Usage:
- ERC-20 transfers from an address, specify the address parameter
- ERC-20 transfers from a contract address, specify the contract address parameter
- ERC-20 transfers from an address filtered by a token contract, specify both address and contract address 

parameters.
Try this endpoint in your   
🔗
​
## Sample Response
```json
{
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"10239120",
         "timeStamp":"1624259946",
         "hash":"0x0d60c10381cbf4ffce4c8c97f36d921fbd51a677ad56040bf5eb3c6717dfa3aa",
         "nonce":"4",
         "blockHash":"0x0000446f00000798306cec6ef5b79783107e39fef8a80e6f60bebb0c2328476b",
         "from":"0x0000000000000000000000000000000000000000",
         "contractAddress":"0x69c744d3444202d35a2783929a0f930f2fbb05ad",
         "to":"0x489d55df278224a05f793098d41753d5669d5144",
         "value":"484000000000000000000",
         "tokenName":"Staked NEON",
         "tokenSymbol":"SNEON",
         "tokenDecimal":"18",
         "transactionIndex":"2",
         "gas":"92037",
         "gasPrice":"51000000000",
         "gasUsed":"88536",
         "cumulativeGasUsed":"732045",
         "input":"deprecated",
         "confirmations":"18225216"
      },
      {
         "blockNumber":"10239166",
         "timeStamp":"1624259987",
         "hash":"0x5cff6123b6515c16bd151719ddb8e466022ef94e79972759b5231a862d44afd0",
         "nonce":"6",
         "blockHash":"0x0000446f00000a6f06ce775b47f350458eaf6b8ee4d755f9fe1d2ce8b621e881",
         "from":"0x489d55df278224a05f793098d41753d5669d5144",
         "contractAddress":"0x69c744d3444202d35a2783929a0f930f2fbb05ad",
         "to":"0xbb634cafef389cdd03bb276c82738726079fcf2e",
         "value":"484000000000000000000",
         "tokenName":"Staked NEON",
         "tokenSymbol":"SNEON",
         "tokenDecimal":"18",
         "transactionIndex":"0",
         "gas":"1983810",
         "gasPrice":"51000000000",
         "gasUsed":"1924516",
         "cumulativeGasUsed":"1924516",
         "input":"deprecated",
         "confirmations":"18225170"
      }
   ]
}
```
