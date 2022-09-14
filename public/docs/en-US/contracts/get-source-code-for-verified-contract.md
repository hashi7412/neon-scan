# Get Source Code for Verified Contract

Returns the Solidity source code of a verified smart contract.
​
> 📩 Tip : You can also download a CSV list of  of which the code publishers have provided a corresponding Open Source license for redistribution.

```
https://scan.neonlink.io/api
   ?module=contract
   &action=getsourcecode
   &address=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":[
      {
         "SourceCode":"",
         "ABI":"[]",
         "ContractName":"Treasury",
         "CompilerVersion":"v0.6.12+commit.27d51765",
         "OptimizationUsed":"0",
         "Runs":"200",
         "ConstructorArguments":"",
         "EVMVersion":"Default",
         "Library":"",
         "LicenseType":"",
         "Proxy":"0",
         "Implementation":"",
         "SwarmSource":""
      }
   ]
}
```
