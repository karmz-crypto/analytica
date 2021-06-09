const ClientsModel = require('../model/ClientsModel');
const getDataFromDb = require('../utility/getDataFromDb');
const mongoose = require('mongoose');

exports.getClients = (req,res)=>{ //this function is to get the clients page with full clients list frm database
   /* ClientsModel.init().then(
        ClientsModel.find({}).exec().then(clients=>{
            res.render('clientView',{pageTitle:'Clients',clients:clients})
        }).catch(error=>res.render('error',{pageTitle:'Error',error:error}))
    ).catch(error=>console.log(error));  */
    var dataObject = getDataFromDb();
    Promise.all([dataObject.p1,dataObject.p2,dataObject.p3]).then(function(result){
            productArray = result[0]; 
            clientArray = result[1]; console.log(clientArray);
            purchaseArray = result[2];
            res.render('clientView',{pageTitle:'Clients',clients:clientArray});

    }).catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});

};

exports.getClientsForm = (req,res)=>{ // this function is to render clients form to add clients
    res.render('addClientsForm',{pageTitle:'Add Client'});
};

exports.addClients = (req,res)=>{ // this function is to add client's details to the database
    ClientsModel.init().then( ()=>{
        ClientsModel.create({
            _id : new mongoose.Types.ObjectId(),
            clientName : req.body.clientName,
            email : req.body.clientEmail
        } 

    ).then(()=>{res.render('success',{pageTitle:'Success'})})
    .catch(error=>{res.render('error',{pageTitle:Error,error:error})})
    }
        
    ).catch(error=>console.log(error));
};

