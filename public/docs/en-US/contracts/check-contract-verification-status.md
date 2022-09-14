# Check Contract Verification Status

```js
//Check Source Code Verification Status
$.ajax({
    type: "GET",
    url: "//scan.neonlink.io/api",
    data: {
        apikey: $('#apikey').val(), 
        guid: 'ezq878u486pzijkvvmerl6a9mzwhv6sefgvqi5tkwceejc7tvn', //Replace with your Source Code GUID receipt above
        module: "contract",
        action: "checkverifystatus"
    },
    success: function (result) {
        console.log("status : " + result.status);   //0=Error, 1=Pass 
        console.log("message : " + result.message); //OK, NOTOK
        console.log("result : " + result.result);   //result explanation
        $('#guidstatus').html(">> " + result.result);
    },
    error: function (result) {
        alert('error');
    }
});
```
