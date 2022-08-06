const mongoose=require("mongoose");



const ToDoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    image :{
        type:String,
        
    },
    deadline :{
        type:String,
    },

    taskDone:{
        type:String,
        // required:true
    },
    date:{
        type:String
    }

}
)


const ToDo=mongoose.model("TodoDatabase",ToDoSchema);

module.exports=ToDo;

// const newTodo=new ToDo({title:"mahadeva",description:"sab ke saath",deadline:"april",taskDone:"started"})
// newTodo.save(); 

