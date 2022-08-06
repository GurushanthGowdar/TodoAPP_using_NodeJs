const express=require('express')
const app=express();
const mongoose=require('mongoose')
const path=require('path')
const method_override=require('method-override')
const ToDo=require('../models/Todo.js')
const Auth=require('../models/Authentication.js')

mongoose.connect('mongodb://localhost:27017/ToDo').then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err);
})

app.use(method_override("method_override"))

app.use(express.static('../public'))

app.set('views',path.join(__dirname,'../views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("listening at port 3000")
})

app.get('/todo',(req,res)=>{
    res.send("wellcome")
})

app.get('/addTodo',(req,res)=>{
    res.render('./newTodo.ejs');
})

app.get('/detail/:id',async (req,res)=>{
   const id=req.params.id;
 console.log(id);
  console.log("----------------------------------")
     const find=await ToDo.findById({_id:id})
     console.log(find);
    res.render("./details.ejs",{find})
       //res.send("hello")
})

app.get('/display',async (req,res)=>{
    const Todo_all=await ToDo.find({});
    res.render('./displayTodo.ejs',{Todo_all});
})
app.post('/display',async(req,res)=>{
    console.log("hello");
    const data=req.body;
    const d=new Date();
    let daymonyear=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
    let date={date:daymonyear}
    
    let fulldata={...date,...data}
    // console.log(fulldata);

    // console.log(data);
    const todo=await new ToDo(fulldata);
    todo.save();
     console.log(todo)
    res.redirect('/display')
})

app.delete('/todo/:id/delete',async (req,res)=>{
    const id=req.params.id;
    const del=await ToDo.findByIdAndDelete(id);
    console.log(del)
    res.redirect('/display')
})

app.get('/todo/:id/edit',async (req,res)=>{
    const id=req.params.id;
    const find=await ToDo.findById(id);    
    res.render("./edit.ejs",{find});
})

app.put('/todo/:id/edit',async (req,res)=>{
    const a=req.body;
    const id=req.params.id;
    const update=await ToDo.findByIdAndUpdate(id,a);
    console.log(update);
    res.redirect(`/detail/${id}`);
})

app.get('/todo/signup',async (req,res)=>{
    res.render('./signUp.ejs');
})

app.get('/todo/login',async (req,res)=>{
    res.render('./login.ejs');
})

app.post('/todo/signup',async (req,res)=>{
    const data=req.body;
    const newUser=await new Auth(data);
    newUser.save();
    console.log(newUser);
    res.redirect('/todo/login')
})


app.get('/testing',(req,res) => {
    console.log('hello from express');
    res.send('working correctly');
})

app.post("/todo/login",async (req,res)=>{
    const email=req.body.email;
    //console.log(email)
    const password=req.body.password;
    //console.log(password)
    const checkUser=await Auth.findOne({email:email});
    //console.log(checkUser);
    // console.log(checkUser.password)
   if(checkUser!==null){
    if(checkUser.password===password){
      return res.redirect('/display')
    }
}
    res.redirect('/todo/signUp')
})












// const newTodo=new ToDo({title:"mahadeva",description:"Adiyogi ",deadline:"april",taskDone:"started"})
// newTodo.save(); 

