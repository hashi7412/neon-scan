
## Get NEON Balance for Multiple Addresses in a Single Call

Returns the balance of the accounts from a list of addresses.

```shell
https://scan.neonlink.io/api
   ?module=account
   &action=balancemulti
   &address=0x1B5248B881762576d630246feeA92E5c6FceD2e1,0x48Eb0e2b01c9B35521c6ff877D525D5dcB582671
   &tag=latest
   &apikey=YourApiKeyToken
```

Try this endpoint in your  [browser](https://scan.neonlink.io/api?module=account&action=balancemulti&address=0x1B5248B881762576d630246feeA92E5c6FceD2e1,0x48Eb0e2b01c9B35521c6ff877D525D5dcB582671,0xFC336AA34c058A38f4BB7d17f4a79FAc4589F2Fc&tag=latest&apikey=YourApiKeyToken) 🔗
​
### Request

| Parameter | Description |
| --------- | ---------------------------------------------------------------------------------- |
| address   | the strings representing the addresses to check for balance, separated by , commas |
| tag       | the string pre-defined block parameter, either earliest, pending or latest         |


