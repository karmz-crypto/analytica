//const purchaseData = require('../model/PurchaseModel');
const productData = require('../model/ProductModel');
const mongoose = require('mongoose');

function processSale(purchaseData,month){ 
   // console.log(purchaseData);

    let dataProcessType ={
        monthlyPurchase:'monthlySaleData'
    };
    let dataProcessResult = {currentYearMonthlySale:{},previousYearMonthlySale:{}};
    let productIdArray = [];
    let exclusiveArray = [];
    purchaseData.then(data=>{
        data.forEach(element=>{
            element.saleProductInfo.forEach(data=>{
                productIdArray.push(stringifyObject(data.productId));
            });
        });
       exclusiveArray = removeDuplicate(productIdArray);// unique item list ..
        dataProcessResult.currentYearMonthlySale = dataProcessing(data,exclusiveArray,dataProcessType.monthlyPurchase,month,new Date().getFullYear()); // the array of object id passed is string not an object ... 
        dataProcessResult.previousYearMonthlySale = dataProcessing(data,exclusiveArray,dataProcessType.monthlyPurchase,month,new Date().getFullYear()-1); // the array of object id passed is string not an object ... 
    }).catch();
    return dataProcessResult;
}

function stringifyObject(arrayItem){ //this function is used to stringify object for comparision 
    return (JSON.stringify(arrayItem));
}

function removeDuplicate(itemArray){
    return [...new Set(itemArray)];
}

function converToObject(arrayItem){
    return JSON.parse(arrayItem);
}

function dataProcessing(purchaseData,exclusiveArray,operations,month,year){
   // the exclusive array is the string of productId.... an objectId of mongoDb.
   if(operations==='monthlySaleData'){
       return monthlyPurchaseData(purchaseData,exclusiveArray,month,year);
   }
}

function monthlyPurchaseData(purchaseData,exclusiveArray,month,year){
    let purchaseDataArray ={productId:[],purchase:[]};
    //let currentYear = new Date().getFullYear(); 
       exclusiveArray.forEach(item=>{  let purchaseWeight = 0;
            purchaseData.forEach(data=>{
                if(new Date(data.date).getMonth()===month && new Date(data.date).getFullYear()===year){
                    data.saleProductInfo.forEach(product=>{
                        if(JSON.stringify(product.productId)===item){
                                purchaseWeight += product.saleWeight;  
                        } 
                    });
                }
            });
           let arrayLength = purchaseDataArray.productId.length;
           purchaseDataArray.productId[arrayLength] = item;
           purchaseDataArray.purchase[arrayLength]=purchaseWeight;
       });
       return purchaseDataArray;
}


const processedData = {processSale};

module.exports = processedData;