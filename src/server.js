const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Dipen1234:ReHdtcR9Meb4SMAd@cluster0.dkmbl.mongodb.net/Ecotence-book", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected Successfluuy!"))
.catch ( err => console.log(err))

app.use('/', route)

app.use((req,res,next)=>{
    res.status(404).send({status:false, msg:`Not found ${req.url}`})
    next()
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});