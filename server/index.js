require('dotenv/config')
const express = require('express')
const massive= require('massive')
const app = express()
const session = require('express-session')
const {connection_string,port,session_secret} = process.env

//middleware
app.use(express.json())
app.use(session({
    secret:session_secret,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))


//endpoints


//massive

massive(connection_string).then(db => {
    app.set('db',db)
    app.listen(port,() => console.log(`${port} Mariachis playing`))
})