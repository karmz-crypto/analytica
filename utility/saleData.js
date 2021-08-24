const sales = require('../model/SalesModel');
const mongoose = require('mongoose');

function addSales(req,res){
    // first way to add sales data ... general way fill a form and add the data 
   /* var addSales  = new salesModel({
        _id:new mongoose.Types.ObjectId(),
        client: ObjectId(req.body.clientId), // received via sale form
        date:new Date(req.body.date),
        saleSilver:req.body.saleSilver,
        saleCash:req.body.saleCash
    }); 
    addSales.save().then(saleData=>{
        salesModel.findById(saleData._id).exec().then(data=>{
            console.log(req.body.saleTunch.length);
        }).catch();
    }).catch(); */
    console.log(req.body);
    return 'here frm func';
}

let salesData = {addSales};
module.exports = salesData;