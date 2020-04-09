var express = require ('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config');
var router = express.Router();
const Http = require("http");
var app = express();
const port = "3000";
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const authenticate = require ('./routes/users');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

//db
mongoose.connect(config.db,{useNewUrlParser:true,  useUnifiedTopology: true });

mongoose.connection.on('connected',()=>{
       console.log("connected to db"+ config.db); 
});

//on error
mongoose.connection.on('error',(err)=>{
    console.log("Database error" +err);
});





 //cors
 var corsOption = {
    origin: true,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    exposeHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true,parameterLimit: 1000000}));


//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// static
// app.use(express.static(path.join(__dirname, 'public/')));
// app.use('*', express.static(__dirname  +  '/public/index.html'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', authenticate);

//authenticate
// app.use('/users', authenticate) ;




//port
app.listen(port,(err, res)=>{
    if(err) throw err;
    console.log('server on port 3000');
});
