# Get Block Number by Timestamp

Returns the block number that was validated at a certain timestamp.

```
https://scan.neonlink.io/api
   ?module=block
   &action=getblocknobytime
   &timestamp=1601510400
   &closest=before
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":"826295"
}
```
