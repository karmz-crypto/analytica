//const purchaseData = require('../model/PurchaseModel');
const productData = require('../model/ProductModel');
const mongoose = require('mongoose');

function processPurchase(purchaseData,month){
   // console.log(purchaseData);
    let dataProcessType ={
        monthlyPurchase:'monthlyPurchaseData'
    };
    let dataProcessResult = {currentYearMonthlyPurchase:{},previousYearMonthlyPurchase:{}};
    let productIdArray = [];
    let exclusiveArray = [];
    purchaseData.then(data=>{
        data.forEach(element=>{
            element.purchaseProductInfo.forEach(data=>{
                productIdArray.push(stringifyObject(data.productId));
            });
        });
       exclusiveArray = removeDuplicate(productIdArray);// unique item list ..
        dataProcessResult.currentYearMonthlyPurchase = dataProcessing(data,exclusiveArray,dataProcessType.monthlyPurchase,month,new Date().getFullYear()); // the array of object id passed is string not an object ... 
        dataProcessResult.previousYearMonthlyPurchase = dataProcessing(data,exclusiveArray,dataProcessType.monthlyPurchase,month,new Date().getFullYear()-1); // the array of object id passed is string not an object ... 
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
   if(operations==='monthlyPurchaseData'){
       return monthlyPurchaseData(purchaseData,exclusiveArray,month,year);
   }
}

function monthlyPurchaseData(purchaseData,exclusiveArray,month,year){
    let purchaseDataArray ={productId:[],purchase:[]};
    //let currentYear = new Date().getFullYear(); 
       exclusiveArray.forEach(item=>{  let purchaseWeight = 0;
            purchaseData.forEach(data=>{
                if(new Date(data.date).getMonth()===month && new Date(data.date).getFullYear()===year){
                    data.purchaseProductInfo.forEach(product=>{
                        if(JSON.stringify(product.productId)===item){
                                purchaseWeight += product.purchaseWeight;  
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


const processedData = {processPurchase};

module.exports = processedData;