# Get Estimated Block Countdown Time by BlockNo

Returns the estimated time remaining, in seconds, until a certain block is validated.

```
https://scan.neonlink.io/api
   ?module=block
   &action=getblockcountdown
   &blockno=48830390
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "CurrentBlock":"28830869",
      "CountdownBlock":"48830390",
      "RemainingBlock":"19999521",
      "EstimateTimeInSec":"17999583.9"
   }
}
```
