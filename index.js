const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const layouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const apiRouter = require('./router/apiRouter');
const apiFetchRouter = require('./router/apiFetchRouter');
const { checkNetworkStatus } = require('check-network-status');
const app = express();
checkNetworkStatus({
    timeout: 3000,
    //backUpURL: 'https://example.com',
    pingDomain: 'google.com',
    method: 'GET'
}).then((value) => {console.log(value)});
mongoose.connect( "mongodb+srv://msjDb:ladoo1827@cluster0.wv9sp.mongodb.net/analyticaDemo?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex: true,useUnifiedTopology:true});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('db connected');
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(layouts);
mongoose.Promise=global.Promise;
app.use(express.static(__dirname+'/static/js'));
app.use('/',apiRouter);
app.use('/api',apiFetchRouter);

app.listen(port,()=>console.log(`app is running on port${port}`));

