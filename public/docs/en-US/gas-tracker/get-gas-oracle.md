# Get Gas Oracle

Returns the current Safe, Proposed and Fast gas prices.

```
https://scan.neonlink.io/api
   ?module=gastracker
   &action=gasoracle
   &apikey=YourApiKeyToken
```

Try this endpoint in your browser 

No parameters required.

## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "LastBlock":"28906518",
      "SafeGasPrice":"1122.2704",
      "ProposeGasPrice":"1150.3536",
      "FastGasPrice":"1227.376",
      "UsdPrice":"1.98"
   }
}
```

> Note: The gas prices are returned in Gwei.