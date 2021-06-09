const clientModel = require('../model/ClientsModel');
const productModel = require('../model/ProductModel');
const purchaseModel = require('../model/PurchaseModel');
const mongoose = require('mongoose');
//const getClientsFromDb = require('../utility/getClientsFromDb');
const getDataFromDb = require('../utility/getDataFromDb');
const { promiseImpl } = require('ejs');
const { ObjectId } = require('bson');
const { ObjectID } = require('bson');
//const PurchaseModel = require('../model/PurchaseModel');

exports.getPurchase = (req,res)=>{
  /*
    purchaseModel.init()
      .then(purchaseModel.find({}).populate('client product').exec()
          .then( element=>{ 
            res.render('purchaseView',{pageTitle:'Purchase',purchaseList:element});})
          .catch((error)=>{res.render('error',{pageTitle:'Error',error:error})})
        )
      .catch();
   // res.render('purchaseView',{pageTitle:'Purchase'}); */
   /*
          var promise = new Promise(function(resolve,reject){
           var query= productModel.find({}).exec();
            if(query){resolve(query)}else{(reject(Error('it broke')))};
          });

          promise.then(function(result){
            console.log(result)
          },function(error){console.log(error)}); */
          /*
          var p1 = new Promise(function(resolve,reject){
            var query1 = productModel.find({}).exec();
            if(query1){resolve(query1)}else { reject(error);}
          });

          var p2 = new Promise(function(resolve,reject){
            var query2 = clientModel.find({}).exec();
            if (query2){resolve(query2)}else { reject(error);}
          });
          var p3 = new Promise(function(resolve,reject){
            var query3 = purchaseModel.find({}).populate('product client').sort('-date').exec();
            if(query3){resolve(query3)}else{reject(error);}
          }); */

          var dataArray = getDataFromDb();
          
          Promise.all([dataArray.p1,dataArray.p2,dataArray.p3]).then(function(result){
            productArray = result[0]; 
            clientArray = result[1];
            purchaseArray = result[2];    
            res.render('purchaseView',{pageTitle:'Purchase',purchaseList:purchaseArray});
          }).catch(error=>{res.render('error',{pageTitle:'Error',error:error})});
            //res.send('trying hard again');


   
}; 

exports.addPurchaseForm =(req,res)=>{
    // 1. i need the clients available to populate my seletion for the purchase form 
    //2. i need the products list to populate my product select list fot tthe purchse form  
    /*
  var clients =  getClientsFromDb();
  clients.then(element=>
    { res.render('addPurchaseForm',
    {pageTitle:'Purchase Form',clients:element});
  }) */

  var dataArray = getDataFromDb();
  //console.log(dataArray);  
  Promise.all([dataArray.p1,dataArray.p2])
    .then((result)=>{
      res.render('addPurchaseForm',
      {pageTitle:'Purchase Form',clients:result[1],products:result[0]})})
    .catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});

  //res.send('try try until u succeed');

};

exports.addPurchase = (req,res)=>{

  //console.log(req.body.clientId);
  //console.log(req.body.purchaseCash);
  //adding the product data to product model via purchase form
  //const product = new productModel({
    //_id: new mongoose.Types.ObjectId(),
    //productDesc:req.body.productDesc,
    //productTunch:req.body.productTunch
  //});
  //product.save().catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});
  /*
  productModel.init() // ------this is a working code no issue with the code ------
    .then(()=>{
      productModel.create({ // this was commenteed off because i could not fetch the product._id for ref in purchase
        _id: new mongoose.Types.ObjectId(), // with the use of a instance model i can now use the instance name and
        productDesc:req.body.productDesc, // refer to the product id by 'product._id' 
        productTunch:req.body.productTunch
      })//removed then() promise i just want to catch an error
        .catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});
    })
    .catch(error=>console.log(error)); //end of product data 
    */

    //console.log(product._id);
   const purchase = new purchaseModel({
    _id:new mongoose.Types.ObjectId(),
    client: ObjectId(req.body.clientId), // received via purchase form
    date:new Date(req.body.date),
    product:ObjectId(req.body.productId),//received via form purchase form 
    purchaseWeight:req.body.purchaseWeight,
    purchaseTunch:req.body.purchaseTunch,
    purchaseLabourPerKg:req.body.purchaseLabourPerKg,
    purchaseSilver:req.body.purchaseSilver,
    purchaseCash:req.body.purchaseCash
   });
   purchase.save()
        .then(()=>{ /*trial*/ clientModel.findById(req.body.clientId).exec()
          .then((element)=>{
                      element.purchaseCount += parseInt(1);
                      element.totalPurchaseSilver += parseInt(purchase.purchaseSilver);
                      element.totalPurchaseCash += parseInt(purchase.purchaseCash);
                      element.purchaseProduct.push(purchase._id);
                      element.save()
                .then(()=>{
                  productModel.findById(req.body.productId).exec()
                      .then((productElement)=>{
                            productElement.totalProductPurchase += parseInt(purchase.purchaseWeight);
                            productElement.numberOfPurchase += parseInt(1);
                            productElement.productInStock = productElement.totalProductPurchase-productElement.totalProductSale;
                            if(productElement.productInStock>0){
                              productElement.productStatus=true;
                              if(productElement.productInStock<1500){
                                productElement.productStockMessage ="Running Out Of Stock !!"
                              }else{productElement.productStockMessage=`product Available ${productElement.productInStock}`}
                            }else{productElement.productStatus=false;}
                            productElement.save().then(pElement=>console.log(pElement))})
                            .catch(error=>console.log(error));
                      
                })
                .catch(error=>console.log(error))})
            .catch(error=>console.log(error));
          res.render('success',{pageTitle:'Success'});
        })
        .catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});
   /*
  purchaseModel.init()
    .then(()=>{
        purchaseModel.create({
          
          _id:new mongoose.Types.ObjectId(),
          client:req.body.ClientId,                   // this is a working code use it for reference .
          date:new Date(),
          product:productModel._id,
          purchaseWeight:req.body.purchaseWeight,
          purchaseTunch:req.body.purchaseTunch,
          purchaseLabourPerKg:req.body.purchaseLabourPerKg,
          purchaseSilver:req.body.purchaseSilver,
          purchaseCash:req.body.purchaseCash

        })//closing of create
          .then(()=>{
            res.render('purchaseView',{pageTitle:'Purchase'});
          })//closing of then promise of create
          .catch((error)=>{res.render('error',{pageTitle:'Error',error:error})});

    })//closing then promise of init
    .catch(error=>console.log(error));  */
  
};