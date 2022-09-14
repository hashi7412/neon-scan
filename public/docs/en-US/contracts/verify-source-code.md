# Verify Source Code

Submits a contract source code to NeonScan for verification.
​
> 📝 Note : This endpoint is limited to 100 verifications/day, regardless of API PRO tier. 
Requires a valid , it will be rejected otherwise
Only supports HTTP POST due to max transfer size limitations for HTTP GET
Supports up to 10 different library pairs
Contracts that use "imports" will need to have the code concatenated into one file as we do not support "imports" in separate files.
List of , only solc version v0.4.11 and above is supported e.g. v0.4.25+commit.59dbf8f1
Upon successful submission you will receive a GUID (50 characters) as a receipt
You may use this GUID to track the status of your submission
Verified Source Codes will be displayed at the  page.
Source Code Submission Gist
​

> 👇 Note: Upon successful submission, a GUID is returned, which can be used to check for submission status.

```js
//Submit Source Code for Verification
$.ajax({
    type: "POST", //Only POST supported  
    url: "//scan.neonlink.io/api", //Set to the  correct API url for Other Networks
    data: {
        apikey: $('#apikey').val(),                     //A valid API-Key is required        
        module: 'contract',                             //Do not change
        action: 'verifysourcecode',                     //Do not change
        contractaddress: $('#contractaddress').val(),   //Contract Address starts with 0x...     
        sourceCode: $('#sourceCode').val(),             //Contract Source Code (Flattened if necessary)
        codeformat: $('#codeformat').val(),             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
        contractname: $('#contractname').val(),         //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
        compilerversion: $('#compilerversion').val(),   // see https://NeonScan.com/solcversions for list of support versions
        optimizationUsed: $('#optimizationUsed').val(), //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
        runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
        constructorArguements: $('#constructorArguements').val(),   //if applicable
        evmversion: $('#evmVersion').val(),             //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
        licenseType: $('#licenseType').val(),           //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://NeonScan.com/contract-license-types
        libraryname1: $('#libraryname1').val(),         //if applicable, a matching pair with libraryaddress1 required
        libraryaddress1: $('#libraryaddress1').val(),   //if applicable, a matching pair with libraryname1 required
        libraryname2: $('#libraryname2').val(),         //if applicable, matching pair required
        libraryaddress2: $('#libraryaddress2').val(),   //if applicable, matching pair required
        libraryname3: $('#libraryname3').val(),         //if applicable, matching pair required
        libraryaddress3: $('#libraryaddress3').val(),   //if applicable, matching pair required
        libraryname4: $('#libraryname4').val(),         //if applicable, matching pair required
        libraryaddress4: $('#libraryaddress4').val(),   //if applicable, matching pair required
        libraryname5: $('#libraryname5').val(),         //if applicable, matching pair required
        libraryaddress5: $('#libraryaddress5').val(),   //if applicable, matching pair required
        libraryname6: $('#libraryname6').val(),         //if applicable, matching pair required
        libraryaddress6: $('#libraryaddress6').val(),   //if applicable, matching pair required
        libraryname7: $('#libraryname7').val(),         //if applicable, matching pair required
        libraryaddress7: $('#libraryaddress7').val(),   //if applicable, matching pair required
        libraryname8: $('#libraryname8').val(),         //if applicable, matching pair required
        libraryaddress8: $('#libraryaddress8').val(),   //if applicable, matching pair required
        libraryname9: $('#libraryname9').val(),         //if applicable, matching pair required
        libraryaddress9: $('#libraryaddress9').val(),   //if applicable, matching pair required
        libraryname10: $('#libraryname10').val(),       //if applicable, matching pair required
        libraryaddress10: $('#libraryaddress10').val()  //if applicable, matching pair required
    },
    success: function (result) {
        console.log(result);
        if (result.status == "1") {
            //1 = submission success, use the guid returned (result.result) to check the status of your submission.
            // Average time of processing is 30-60 seconds
            document.getElementById("postresult").innerHTML = result.status + ";" + result.message + ";" + result.result;
            // result.result is the GUID receipt for the submission, you can use this guid for checking the verification status
        } else {
            //0 = error
            document.getElementById("postresult").innerHTML = result.status + ";" + result.message + ";" + result.result;
        }
        console.log("status : " + result.status);
        console.log("result : " + result.result);
    },
    error: function (result) {
        console.log("error!");
        document.getElementById("postresult").innerHTML = "Unexpected Error"
    }
});
```
