const getDataFromDb = require('../utility/getDataFromDb');
const productModel = require('../model/ProductModel');
const mongoose = require('mongoose');

exports.getProductApi = (req,res)=>{
    if(req.params.id!==undefined){
        productModel.findById(req.params.id).exec()
            .then((data)=>{
                res.send(data);
            })
            .catch();
    }else{
    var dataArray = getDataFromDb();
    Promise.all([dataArray.p1]).then((result)=>{
        productArray = result[0];
        res.send(productArray);
    }).catch(error=>{console.log(error)}); 
    }   //closing of else

};