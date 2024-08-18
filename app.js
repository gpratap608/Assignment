import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app = express()

app.use(express.json({
    limit:'16kb'
}))

app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}))

app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set("view engine","ejs")

export default app