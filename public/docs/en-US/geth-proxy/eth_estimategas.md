# eth_estimateGas

Makes a call or transaction, which won't be added to the blockchain and returns the gas used.

```
https://scan.neonlink.io/api
   ?module=proxy
   &action=eth_estimateGas
   &data=0x4e71d92d
   &to=0xEeee7341f206302f2216e39D715B96D8C6901A1C
   &value=0xff22
   &gasPrice=0x51da038cc
   &gas=0x5f5e0ff
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x5248"
}
```
