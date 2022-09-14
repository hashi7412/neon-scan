# Verifying Contracts Programmatically

> If you'd like to verify contracts via our website, you may do so using the page.

Source code verification provides a way for projects to open source 🌏 their smart contract code for end users to inspect and verify that it does what it claims to do.

By uploading source code, NeonScan will match the compiled contract bytecode with that on the blockchain and display it under the tab.

For repeated or multiple verification of contracts, it may be more productive to programmatically verify your contracts through an  🎯 .

The tools needed to follow along with this guide is , an API development application and a valid ​

## 1. Pointing API Endpoints

Point your API request URL to https://scan.neonlink.io/api and set your request method to POST.

If you'd like to deploy this to the Fantom blockchain testnet, replace the request URL with https://api-testnet.NeonScan.com/api


## 2. Setting API Keys & Module

Under the Request Body, set the format to x-www-form-urlencoded.

Include your API key under the apikey field, set the module to contract, and action to verifysourcecode.

## 3. Attaching Source Code

Paste your contract source code under the sourceCode parameter.

If your contract uses "imports", you will need to concatenate the code into one file ( otherwise known as "flattening" ) as we do not support "imports" in separate files.

Examples of Solidity flatteners that can be used are  by  or  by ​

## 4. Configuring Source Code Parameters

Configure the details of your deployed contract such as contractname, compilerversion, optimizationUsed and so on.

You have to specify the fields marked as required, and optional fields if applicable to your contract.

Parameter
Field
Description
contractaddress
Required
contract address, eg. 0x4c113f627fe35231fd11131a9974b9a99f584cb6
codeformat
Required
solidity-single-file by default, or solidity-standard-json-input
contractname
Required
contract name, eg HelloWorld
compilerversion
Required
compiler version used, eg. v0.7.6+commit.7338295f
see NeonScan's ​
optimizationUsed
Required
use 0 for no optimization, and 1 if optimization was used
runs
Optional
the no. of runs if optimization was used, eg. 200
constructorArguments
Optional
for contracts that were created with constructor parameters, using .
evmversion
Optional
leave blank for default compiler, specify if others such as tangerineWhistle, spuriousDragon, byzantium etc
licenseType
Optional
an integer between 1 - 12, see  for all options
default value of 1 indicating No License
libraryname
Optional
library used in contract, eg. SafeMath
supports up to 10 different libraries
libraryaddress
Optional
library address eg. 0xCfE28868F6E0A24b7333D22D8943279e76aC2cdc
a matching pair of libraryname - libraryaddress must be provided
The final body sample request using  in Postman will resemble this.
apikey:3KVM8TSNFSZT9B9DFTY9H1QJ1U1QJESNXB
module:contract
action:verifysourcecode
sourceCode:pragma solidity ^0.7.6;↵contract HelloWorl {↵    string public greet = "Hello Worl!";↵}
contractaddress:0x9Dca580D2c8B8e19e9d77345a5b4C2820B25b386
codeformat:solidity-single-file
contractname:HelloWorld
compilerversion:v0.7.6+commit.7338295f
optimizationused:1
runs:200
constructorArguements:0xfce353f66162630000000000000000000000000
evmversion://leave blank for compiler default
licenseType:1
libraryname1:SafeMath
libraryaddress1:0xCfE28868F6E0A24b7333D22D8943279e76aC2cdc
libraryname2://if applicable, matching pair required
libraryaddress2://if applicable, matching pair required
libraryname3://if applicable, matching pair required
libraryaddress3://if applicable, matching pair required
libraryname4://if applicable, matching pair required
libraryaddress4://if applicable, matching pair required


## 5. Contract Verification Results

Upon sending your request, you should receive a GUID ( 50 characters ) as your submission receipt.

You may check the status of your source code verification using the "" endpoint. The average processing time is between 30 - 60 seconds.

Upon successful verification ✅ , users will be able to interact with your contract on NeonScan and it will be listed under the  page.