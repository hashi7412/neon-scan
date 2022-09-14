# Get a list of 'Normal' Transactions By Address

Returns the list of transactions performed by an address, with optional pagination.
​​ ​ 
> 📝**Note** : This API endpoint returns a **all transactions** records.

```shell
https://scan.neonlink.io/api
   ?module=account
   &action=txlist
   &address=0xb91dd8225Db88dE4E3CD7B7eC538677A2c1Be8Cb
   &startblock=0
   &endblock=99999999
   &page=1
   &offset=10
   &sort=asc
   &apikey=YourApiKeyToken
```


> Try this endpoint in your [browser](https://scan.neonlink.io/api?module=account&action=txlist&address=0xb91dd8225Db88dE4E3CD7B7eC538677A2c1Be8Cb&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken)​🔗
​

Query Parameters



 Tip: Specify a smaller startblock and endblock range for faster search results.

## Sample Response

```json
  {
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"28316553",
         "timeStamp":"1642486923",
         "hash":"0x4e2c901428bcf4bd93102b9f6daee2a35a52735e0c0d404fa60589c436fe8550",
         "nonce":"47",
         "blockHash":"0x000119e900000105dff576783bd15765b7abaf3b8350fea617e035b4caf33162",
         "transactionIndex":"7",
         "from":"0x3dea6c125df6701947ba4ad1e1dd2e57674e7633",
         "to":"",
         "value":"0",
         "gas":"1497514",
         "gasPrice":"446144000000",
         "isError":"0",
         "txreceipt_status":"1",
         "input":"0x608060......",
         "contractAddress":"0x7515d76a338bbc3592f3e079041e8bf947841886",
         "cumulativeGasUsed":"1980829",
         "gasUsed":"1497514",
         "confirmations":"146274"
      },
      {
         "blockNumber":"28320355",
         "timeStamp":"1642490071",
         "hash":"0x0eeee1fd7fb3160c92292c0066ca649212c99490f8746693056b7077db13f2b3",
         "nonce":"58",
         "blockHash":"0x000119f6000000fad06560f9016811955e247c07adffe88bf063455f0abbd12b",
         "transactionIndex":"1",
         "from":"0x3dea6c125df6701947ba4ad1e1dd2e57674e7633",
         "to":"0x7515d76a338bbc3592f3e079041e8bf947841886",
         "value":"0",
         "gas":"151999",
         "gasPrice":"360124900000",
         "isError":"0",
         "txreceipt_status":"1",
         "input":"0x96805e......",
         "contractAddress":"",
         "cumulativeGasUsed":"189349",
         "gasUsed":"151999",
         "confirmations":"142472"
      }
   ]
}
```