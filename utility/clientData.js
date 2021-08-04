const clientModel =require('../model/ClientsModel');
const mongoose = require('mongoose');

function getClientData(req,res){
    if(req.params.id){
        var promiseData = new Promise((resolve,reject)=>{
            var query = clientModel.findById(req.params.id).exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
        var promiseData = new Promise((resolve,reject)=>{
            var query = clientModel.find().exec();
            if(query){resolve(query)}else{reject(query)}
        });
    }
    return promiseData;
}

let clientDbOperate = {getClientData};
module.exports = clientDbOperate;