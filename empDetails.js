const express= require('express')
const app =express()
const mongoose = require('mongoose')
const cors =require('cors')
const bodyparser =require('body-parser')
const jsonparser=bodyparser.json();
app.use(cors())

mongoose.connect('mongodb+srv://sonalik:1234@firstcluster.au6wwl4.mongodb.net/office?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(
    ()=>{
        console.log('database connected')
    }
)
const std = require('./modules/product.js')
// connecting mongodb to get the data


db=[
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}},
    {name:'hameed',dob:'20-02-99',loc:{city:'lucknow',state:'UP'}}
]



app.get('/mydb',(req,res)=>{
    res.json(db)
})




app.get("/empdetails",(req,res)=>{
    std.find().then((data) => {res.json(data)}).catch(
        (err)=>{console.log(err)}  
          )
} )

app.get("/searchemp/:dept",(req,res)=>{

    std.find({dept:req.params.dept}).then((data) => {console.log(data);res.json(data)}).catch(
        (err)=>{console.log(err)}  
          )
} )

app.post('/adduser',jsonparser,(req,res)=>{
    console.log(req.body)
    const student = new std ({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        dept:req.body.dept,
        location: {
            city:req.body.city,

            town:req.body.town
        },
        contact:req.body.contact,
        email:req.body.email,
        salary:req.body.salary
    })
    student.save().then(
        (result)=>{console.log(result);
            res.json(result)}).catch(
        (err)=>{console.log(err)}
    )
})
// delete
app.delete('/delprod/:id',(req,res)=>{
    id=req.params.id;
    std.deleteOne({_id:id}).then((msg) =>{console.log(msg)})
})

// update data api(edit)
app.put('/products/:id', jsonparser,(req,res)=>{
    id= req.params.id;
    std.updateOne({ _id: id},{
        $set:{
            name:req.body.name,
            dept:req.body.dept,
        location: {
            city:req.body.city,
            contact:req.body.contact,

        },
        email:req.body.email,
        salary:req.body.salary
        }
    }).then(
        (msg)=>{res.json(msg)}
    ).catch(
        (err)=>{console.log(err)}
    )
})

app.listen(4000,()=>{console.log("server running on 4000")})
// let empSch = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name:String,
//     dept:String,
//     email:String,
//     location:Object,
//     salary:Number,
//     contact:Number
// })

// module.exports = mongoose.model("empDetails",empSch)
