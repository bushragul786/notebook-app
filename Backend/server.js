import express from "express";
import cors from "cors"
const app = express();

app.use(cors());
app.use(express.json());

let notes = [
    {
        id:1,
        title: "Study javaScript",
    },
    {
        id:2,
        title:"Learn Express"
    },
]

app.get("/notes",(req,res)=>{
    res.json(notes)
})

app.post("/notes",(req,res)=>{
    const newNote = {
        id: Date.now(),
        title: req.body.title,
    };

    notes.push(newNote);

    res.json(newNote);
});

app.delete("/notes/:id",(req,res)=>{
   const id = Number(req.params.id)
   notes = notes.filter((note)=>note.id !== id                  
   );
   console.log(notes)
   res.json("Deleted Successfully")
});

app.put("/notes/:id",(req,res)=>{
     const id = Number(req.params.id)
     notes= notes.map((note)=>{
        if(note.id === id){
            return {
               ...note,
               title:req.body.title
            }
        }
        return note;
     })
     console.log(notes)
     res.json("Updated Successfully")
})

app.listen(5000,()=>{
    console.log("server running");
});
