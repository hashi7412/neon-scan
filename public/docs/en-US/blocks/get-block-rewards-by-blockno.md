# Get Block Rewards by BlockNo

Returns the block reward awarded for validating a certain block.

```
https://scan.neonlink.io/api
   ?module=block
   &action=getblockreward
   &blockno=28830390 
   &apikey=YourApiKeyToken
```

> Try this endpoint in your ​🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "blockNumber":"28830390",
      "timeStamp":"1642952101",
      "blockMiner":"0x0000000000000000000000000000000000000000",
      "blockReward":"1107280315376846237",
      "uncles":[
         
      ],
      "uncleInclusionReward":"0"
   }
}
```
​​ 
> ⏳ Tip : The timestamp field is denoted in ​