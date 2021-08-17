const express = require('express');
const clientViewApi = require('../apiController/clientViewApi');
const productApi = require('../apiController/productApi');
const transaction = require('../controller/transactionController');
const apiFetchRouter = express.Router();

apiFetchRouter.get('/client/:id/purchase',clientViewApi.getApiPurchase);
apiFetchRouter.get('/product/:id',productApi.getProductApi);
apiFetchRouter.get('/transaction/purchase/:id',transaction.getTransactionPurchase);
apiFetchRouter.post('/transaction/purchase/:id',transaction.getTransactionPurchase);





module.exports = apiFetchRouter;