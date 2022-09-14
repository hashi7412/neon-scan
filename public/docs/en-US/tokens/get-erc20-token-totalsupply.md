# Get ERC-20 Token TotalSupply

Returns the total supply of a ERC-20 token.

```
https://scan.neonlink.io/api
   ?module=stats
   &action=tokensupply
   &contractaddress=0x841fad6eae12c286d1fd18d1d525dffa75c7effe
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":"8394545019028224261891720"
}
```

​
> 📈 Tip : The result is returned in the token's smallest decimal representation.

Eg. a token with a balance of 215.241526476136819398 and 18 decimal places will be returned as 215241526476136819398