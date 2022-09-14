# Get Balance for a Single Address

Returns the NEON balance of a given address.

```shell
https://scan.neonlink.io/api
   ?module=account
   &action=balance
   &address=0x5A534988535cf27a70e74dFfe299D06486f185B7
   &apikey=YourApiKeyToken
```

> Try this endpoint in your [browser](https://scan.neonlink.io/api?module=account&action=balance&address=0x5A534988535cf27a70e74dFfe299D06486f185B7&apikey=YourApiKeyToken) 🔗
​

## Request

Query Parameters

| Parameter | Description |
| --------- | -------------------------------------------------------------------------- |
| address   | the string representing the address to check for balance                   |
| tag       | the string pre-defined block parameter, either earliest, pending or latest |


## Sample response

```json
{
   "status": "1",
   "message": "OK",
   "result": "15000250000000000000"
}
```
​
> 📖 Tip: The result is returned in ​wei

Convert NEON units using our [​Unit Converter](/unitconverter)

---