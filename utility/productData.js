const productModel = require('../model/ProductModel');
const mongoose = require('mongoose');

function getProductData(req,res){
    if(req.params.id){
        var promiseData = new Promise((resolve,reject)=>{
            var query = productModel.findById(req.params.id).exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
        var promiseData = new Promise((resolve,reject)=>{
            var query = productModel.find().exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }
    return promiseData;
}

let productDbOperation = {getProductData};

module.exports = productDbOperation;

