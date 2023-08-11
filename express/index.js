const express = require("express");
const app = express();
const Joi = require('joi')
const helmet = require("helmet");
const multer = require("multer")
const morgan = require('morgan')
const { urlencoded } = require("express");
const config = require("config")
const books = require('./routers/books');
const main = require('./routers/main');
const path = require("path");
const services = require('./controller/service.controller')
const feedbacks = require('./controller/feedback.controller')
const contacts = require('./controller/admin.approval.controller')


// app.use(logger.log)
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/books', books);
app.use('/', main);
app.use('/api/services', services);
app.use('/api/feedbacks', feedbacks);
app.use('/api/contacts', contacts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log(`logger ishlavotti...`);
}




console.log(process.env.NODE_ENV)
// console.log(config.get("name"));
// console.log(config.get("mailServer.host"));
// console.log(config.get("mailServer.password"));







const port = process.env.port || 3000
app.listen(port, ()=>{
    console.log(`${port}chi portni eshitishni boshladim... `)
})
