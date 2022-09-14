# Get Neon Last Price
Returns the latest price of 1 Neon.

```
https://api.Neonscan.com/api
   ?module=stats
   &action=price
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
      "ethbtc":"0.0000581131104068839",
      "ethbtc_timestamp":"1643024150",
      "ethusd":"1.955",
      "ethusd_timestamp":"1643024146"
   }
}
```

> ​⏳ Tip : The timestamps are represented in 