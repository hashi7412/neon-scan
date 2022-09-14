# Check Transaction Receipt Status

Returns the status code of a transaction execution.

```
https://scan.neonlink.io/api
   ?module=transaction
   &action=gettxreceiptstatus
   &txhash=0xdc89147c069b91d85289555a89cc7267c4d768e49da9b92a587c575e487b226f
   &apikey=YourApiKeyToken
```

> Try this endpoint in your  🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "status":"0"
   }
}
```

> 📖 Tip: The status field returns 0 for failed transactions and 1 for successful transactions.