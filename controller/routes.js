const express =require('express')
const router=express.Router()
const Todo=require('../models/todoModel')

router.get('/',(req,res)=>{
    res.render("todos/addorEdit",{Title:"Todo App"})
})


router.post('/',(req,res)=>{
    if(req.body._id=="")
    insertTodo(req,res)
    else
    updateRecords(req,res)
})

function insertTodo(req,res){
    const todo = new Todo();
    todo.task=req.body.task;
    todo.priority=req.body.priority;
    todo.deadline=req.body.deadline;
    if (!todo.task || !todo.priority ) {
        return res.status(400).json({ msg: 'Please add task and priority' });
      }
    todo.save((err, doc) => {
        if (!err) {
          res.redirect("todo/allTodos");
        } else {
          console.log("error during record insertion", err);
        }
      });
}

function updateRecords(req,res){
    Todo.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('todo/allTodos')
        }else{console.log("error occured",err)}
    })
}


router.get("/allTodos", (req, res) => {
    Todo.find((err, docs) => {
      if (!err) {
        res.render("todos/allTodos", { todos: docs });
      } else {
        console.log("error in retriving the data", err);
      }
    }).lean();
  });


  router.get("/:id", (req, res) => {
    Todo.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("todos/addorEdit", {
          Title: "update todo",
          todo: doc,
        });
      }
    }).lean();
  });

  router.get('/delete/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/todo/allTodos');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

  

module.exports=router