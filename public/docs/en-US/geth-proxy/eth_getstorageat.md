# eth_getStorageAt

Returns the value from a storage position at a given address.

This endpoint is still experimental and may have potential issues

```
https://scan.neonlink.io/api
   ?module=proxy
   &action=eth_getStorageAt
   &address=0x04068da6c83afcfa0e13ba15a6696662335d5b75
   &position=0x0
   &tag=latest
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x55534420436f696e000000000000000000000000000000000000000000000010"
}
```
