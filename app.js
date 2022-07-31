//requiring express package from node modules
const express = require('express')
//requiring Router from router.js
const router = require('./router')
const session = require('express-session')
//requiring connect-flash message for alerts
const flash = require('connect-flash')
const app = express()
//making public folder for static files e.g css
app.use(express.static('public'))
//getting access to get data from url and through get and post request
app.use(express.urlencoded({extended:false}))
//creating session to store data connect-flash to show messages
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'jobs',
    resave: false, 
    saveUninitialized: false}));
app.use(flash())
//setting up views floder for our client side files
app.set('views','views')
//setting up the view engine
app.set('view engine','ejs')
//telling our server to use router for routes
app.use('/',router)
app.listen(8080,()=> console.log("Server is running on port 8080"))