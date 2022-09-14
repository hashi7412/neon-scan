# Verify Proxy Contract

Submits a proxy contract source code to NEONScan for verification.
Requires a valid , it will be rejected otherwise 

Current daily limit of 100 submissions per day per user (subject to change)
Only supports HTTP post

Upon successful submission you will receive a GUID (50 characters) as a receipt

You may use this GUID to track the status of your submission

Verified proxy contracts will display the "Read/Write as Proxy" of the implementation contract under the contract address's contract tab

Verifying Proxy Contract using cURL

```json
// OK
{"status":"1","message":"OK","result":"gwgrrnfy56zf6vc1fljuejwg6pelnc5yns6fg6y2i6zfpgzquz"}
// NOTOK
{"status":"0","message":"NOTOK","result":"Invalid API Key"}
Checking Proxy Contract Verification Submission Status using cURL
// OK
{"status":"1","message":"OK","result":"The proxy's (0xbc46363a7669f6e12353fa95bb067aead3675c29) implementation contract is found at 0xe45a5176bc0f2c1198e2451c4e4501d4ed9b65a6 and is successfully updated."}
​
// NOTOK
{"status":"0","message":"NOTOK","result":"A corresponding implementation contract was"}
```

​
