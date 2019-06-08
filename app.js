const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const route = require("./routes/khaltiRoute");
// const router = express.Router();



app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

// app.post('/transaction', function(req, res){
//     // console.log("inside transaction");
//     res.send("transaction");
// })

app.listen(3000, function(error){
    if(error){
        console.log("SOMTHING WENT WRONG");
    }else{
        console.log("SERVER IS RUNNING ON PORT 3000");
    }
})