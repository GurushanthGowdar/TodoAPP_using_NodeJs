const mongoose=require('mongoose');

const AuthSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

// mongoose.connect('mongodb://localhost:27017/Authentication').then(()=>{
//     console.log("connected")
// }).catch((err)=>{
//     console.log(err)
// });


const Auth=mongoose.model("authentication",AuthSchema);

// const newUser=new Auth({username:"mahadeva",email:"mahadeva@2001",password:"mahadeva@111993"})
// newUser.save();

module.exports=Auth;