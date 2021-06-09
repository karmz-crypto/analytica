const mongoose = require('mongoose');
const purchaseModel = require('../model/PurchaseModel');
const clientsModel = require('../model/ClientsModel');
const getDataFromDb = require('../utility/getDataFromDb');

exports.getApiPurchase = (req,res)=>{
   // console.log(req.params.id);
    clientsModel.findById(req.params.id).populate({path:'purchaseProduct',ref:'Purchase',populate:{path:'product',ref:'Product'}}).exec()
        .then((data)=>{res.send(data)})
        .catch(error=>{res.send(error)});

};


