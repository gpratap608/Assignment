import dotenv from "dotenv"
import connectDB from "./database/configure.db.js"
import app from "./app.js"


dotenv.config({
    path:'./.env'
})

const port  = 8080 || process.env.PORT


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Something went wrong at index.js"+error);        
    })
    app.listen(port,()=>{
        console.log({
            serverStatus:`App is Running`,
            URL:`http://localhost:${process.env.PORT}`
        });
        
    })
})
.catch((error)=>{
    console.log("DB connection Failed from Index.js"+error);
})