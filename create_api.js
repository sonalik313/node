const express = require('express')
const app=express()
const mongoose =require ('mongoose')
const cors = require('cors')

app.use(cors())

emp=require('./modules/empDetails')



mongoose.connect('mongodb+srv://sonalik:sonali313@firstcluster.au6wwl4.mongodb.net/office?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>(console.log('Database connecting'))
)
data=[
    {name:'shriya', dept:'it',salary:'40000',location:'Mumbai',town:'thane'},
    {name:'shree', dept:'it',salary:'35000',location:'Mumbai',town:'mulund'},
    {name:'shrisha', dept:'it',salary:'50000',location:'Mumbai',town:'Andheri'},
    {name:'shipra', dept:'it',salary:'40000',location:'Mumbai',town:'kurla'}
]
app.get('/users',(req,res)=>{
    res.json (data);
    res.end();
})

app.get('/mdbuser',(req,res)=>{
emp.find().then( (data)=>{res.json(data);


}).catch(
    (err)=>{console.log(err)}
)

})

app.listen(3000,()=>{console.log ('server running 3000')})