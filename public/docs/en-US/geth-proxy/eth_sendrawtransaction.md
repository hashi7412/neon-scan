# eth_sendRawTransaction

Submits a pre-signed transaction for broadcast to the Fantom network.

```
https://scan.neonlink.io/api
   ?module=proxy
   &action=eth_sendRawTransaction
   &hex=0xf904808000831cfde080
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```
​
> ⛏ Note: The resultrepresents the transaction hash of the submitted raw transaction.

Use eth_getTransactionReceipt to retrieve full details.