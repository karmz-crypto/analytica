const express = require('express');
const clientViewApi = require('../apiController/clientViewApi');
const productApi = require('../apiController/productApi');
const apiFetchRouter = express.Router();

apiFetchRouter.get('/client/:id/purchase',clientViewApi.getApiPurchase);
apiFetchRouter.get('/product/:id',productApi.getProductApi);




module.exports = apiFetchRouter;