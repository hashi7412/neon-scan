# Common Error Messages
An API call that encounters an error ⚠ will return 0 as its status code and display the cause of the error under the result field.

```json
{
   "status":"0",
   "message":"NOTOK",
   "result":"Max rate limit reached, please use API Key for higher rate limit"
}
```

## Max rate limit

> "Max rate limit reached, please use API Key for higher rate limit"

This error occurs when you exceed the rate limit assigned to your specific API key.

To resolve, adhere to the  of your available plan by waiting for a certain amount of time before each request. 

If you are using a script or application, apply throttling to limit the frequency of calls.

## Missing or invalid action

> "Error! Missing Or invalid Action name"

This error occurs when you do not specify, or specify an invalid module and action name.

To resolve, double check your API query to use a valid module and action name.

If you require some help getting started, try copying the sample queries provided in the  and pasting them into your browser.

# Endpoint-specific errors

> "Error! Block number already pass"
> "Error! Invalid address format"
> "Contract source code not verified"

These error messages returned are specific to certain endpoints and their related parameters.

To resolve, kindly refer to the specific endpoint's documentation, and check for the correct format or values to be specified as parameters.