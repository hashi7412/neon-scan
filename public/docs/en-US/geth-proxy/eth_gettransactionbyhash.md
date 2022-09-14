# eth_getTransactionByHash

Returns information about a transaction requested by transaction hash.

```
https://scan.neonlink.io/api
   ?module=proxy
   &action=eth_getTransactionByHash
   &txhash=0x7d5b5b518c039bd2deda169f552072eb578fe6c17d2e29742c8655f9f83db705
   &apikey=YourApiKeyToken
```

> Try this endpoint in your ​🔗
​
## Sample Response

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "blockHash":"0x00012311000001fb2f9ebd6dc3e9272096e215f7cbb8753c645df4a5c45af86e",
      "blockNumber":"0x1b8b83b",
      "from":"0x50fb97b2db6298c0be4c99bf09a8bbd76cff4109",
      "gas":"0x37104",
      "gasPrice":"0x119b99ec400",
      "hash":"0x7d5b5b518c039bd2deda169f552072eb578fe6c17d2e29742c8655f9f83db705",
      "input":"0x",
      "nonce":"0x3b",
      "to":"0x50fb97b2db6298c0be4c99bf09a8bbd76cff4109",
      "transactionIndex":"0x9",
      "value":"0x0",
      "type":"0x0",
      "v":"0x218",
      "r":"0xd3de47fc658a8c3c3ca27771b7d04a78b79a2192f635f265a4981aa6d2aa7b5d",
      "s":"0x583deabfbcb8767711d7a23d31c99b680653691323283edba203bf276c7200de"
   }
}
```
