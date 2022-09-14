# Get Contract ABI for Verified Contract Source Codes

Returns the contract Application Binary Interface ( ABI ) of a verified smart contract.

Find verified contracts ✅ on our  page.

```
https://scan.neonlink.io/api
   ?module=contract
   &action=getabi
   &address=0xe8B0643c1330307a6fA81e5e8b09548455aCA538
   &apikey=YourApiKeyToken
```

> Try this endpoint in your 🔗
​
## Sample Response

```json
{
   "status":"1",
   "message":"OK",
   "result":""
}
```

A simple sample for retrieving the contractABI using Web3.js and Jquery to interact with a contract.

```js
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
​
$.getJSON("https://scan.neonlink.io/api?module=contract&action=getabi&address=0x0000000000000000000000000000000000001004&apikey=YourApiKeyToken", function (data) {
    var contractABI = "";
    contractABI = JSON.parse(data.result);
    if (contractABI != '') {
        var MyContract = web3.eth.contract(contractABI);
        var myContractInstance = MyContract.at("0x0000000000000000000000000000000000001004");
        var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
        console.log("result1 : " + result);
        var result = myContractInstance.members(1);
        console.log("result2 : " + result);
    } else {
        console.log("Error");
    }
});
```
