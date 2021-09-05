const salesModel = require('../model/SalesModel');
const productData = require('../utility/productData');
const clientModel = require('../model/ClientsModel');
const clientData = require('../utility/clientData')
const mongoose = require('mongoose');
const { promiseImpl } = require('ejs');
const { ObjectId } = require('bson');
const { ObjectID } = require('bson');

function getSaleData(req,res){
    var paramId = req.params.id;
    if(paramId){
        //var query = purchaseModel.findById(paramId).exec();
        var saleDataPromise = new Promise((resolve,reject)=>{
            var query = salesModel.findById(paramId).populate('saleProductInfo.productId client').sort('-date').exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
    var saleDataPromise = new Promise((resolve,reject)=>{
        var query = salesModel.find({}).populate({path:'saleProductInfo.productId',model:'Product',path:'client',model:'Client'}).sort('-date').exec();
        if(query){resolve(query)}else{reject(error)}
    });}
    return saleDataPromise;
}

function addSales(req,res){ //console.log(req.body);
    // first way to add sales data ... general way fill a form and add the data 
    var addSales  = new salesModel({
        _id:new mongoose.Types.ObjectId(),
        client: ObjectId(req.body.clientId), // received via sale form
        date:new Date(req.body.date),
        saleSilver:req.body.saleSilver,
        saleCash:req.body.saleCash
    }); 
    addSales.save().then(saleData=>{
        salesModel.findById(saleData._id).exec().then(
            data=>{ //console.log(data);
           var numberOfProduct = req.body.saleTunch.length;
           for(var i =0;i<numberOfProduct;i++){
            data.saleProductInfo.push({ productId:req.body.saleProductId[i],
                saleWeight:req.body.saleWeight[i],
                saleTunch:req.body.saleTunch[i],
                saleLabourPerKg:req.body.saleLabourPerKg[i],
                fineSilver:parseFloat(req.body.saleWeight[i])*parseFloat(req.body.saleTunch[i])/100,
                saleCash:parseFloat(req.body.saleWeight[i])*parseFloat(req.body.saleLabourPerKg[i])/1000
              });
           } data.save().then(
               data=>{
                   let totalSaleCash = 0;
                   let totalSaleSilver = 0;
                   data.saleProductInfo.forEach(e=>{ console.log(e);
                       productData.reduceProductData(e.productId,e.saleWeight);
                       totalSaleCash += data.saleCash;//console.log(totalSaleCash);
                       totalSaleSilver += e.fineSilver;
                   });
                   let updateClientData ={
                       saleTransactionId : data._id,
                       totalSaleCash : totalSaleCash,
                       totalSaleSilver : totalSaleSilver,
                   };
                   clientData.updateSaleClientModel(data.client,updateClientData);

               }
           ).catch();
        }).catch();
    }).catch(); 
    //console.log(req.body.saleTunch.length);
    //return 'here frm func';
}

function searchSaleData(req,res){
    if(req.params.id==='searchName'){
        var promiseData = new Promise((resolve,reject)=>{
            let query = clientModel.find({clientName:req.body.name}).populate({path:'salesProduct',model:'Sales',populate:{path:'saleProductInfo.productId',model:'Product'}}).sort('-date').exec();
            if(query){resolve(query)}else{reject(error)}
        }); 
     }else{
         var promiseData = new Promise((resolve,reject)=>{
             let query = salesModel.find({}).populate('saleProductInfo.productId client').sort('-date').exec();
             if(query){resolve(query)}else{reject(error)}
         }); 
     }
     return promiseData;

}

let salesData = {addSales,getSaleData,searchSaleData};
module.exports = salesData;