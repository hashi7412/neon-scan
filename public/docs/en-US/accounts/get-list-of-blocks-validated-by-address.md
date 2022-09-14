# Get list of Blocks Validated by Address

Returns the list of blocks validated by an address.

```
https://scan.neonlink.io/api
   ?module=account
   &action=getminedblocks
   &address=0x0000000000000000000000000000000000000000
   &blocktype=blocks
   &page=1
   &offset=10
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"28464634",
         "timeStamp":"1642615534",
         "blockReward":"271316865284500000"
      },
      {
         "blockNumber":"28464633",
         "timeStamp":"1642615533",
         "blockReward":"143362832386800000"
      },
      {
         "blockNumber":"28464632",
         "timeStamp":"1642615533",
         "blockReward":"80059215949400000"
      },
      {
         "blockNumber":"28464631",
         "timeStamp":"1642615532",
         "blockReward":"301414222354950000"
      },
      {
         "blockNumber":"28464630",
         "timeStamp":"1642615532",
         "blockReward":"59395647390800000"
      }
   ]
}
```

​
> ⏳ Note : The timeStamp is represented in 