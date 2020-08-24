const  express = require('express')

var app=express();
app.listen(3000,()=>{
  console.log("localhost:3000 start...")
});
app.use(express.static('./'));