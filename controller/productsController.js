const productModel = require('../model/ProductModel');
const mongoose = require('mongoose');

exports.getProducts = ()=>{};

exports.addProductsForm = (req,res)=>{
    res.render('addProductForm',{pageTitle:'Product Form'});
};

exports.addProducts = (req,res)=>{ //addProduct function controller it checks for duplicate entries through 
    //console.log(req.body.productDesc);// validateUniqueness() an instance method of the model.js
    //console.log(req.body.productTunch);// if the validation fails it renders error page 
    const product = new productModel( // if uniqueness of the product is established then successful page is renders
        {_id:new mongoose.Types.ObjectId(),
             productDesc:req.body.productDesc,
             productTunch:req.body.productTunch });
        
        product.validateUniqueness((err, product1) => { //product is the instance of new productModel
            //product1 is the parameter of a call back function of validateUniqueness() function check model.js for function expression details
            if(product1.length!==0){res.render('error',{pageTitle:'Error',error:'The Product is already Present'})}
            else{
               product.save().then(()=>{res.render('success',{
                    pageTitle:'Success'})}
                    ).catch(error=>{res.render('error',{pageTitle:'Error',error:error})});
            }
        });

        
            
  
   
  // res.send('demo');
};