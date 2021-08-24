const express = require('express');
const indexController = require('../controller/indexController');
const clientsController = require('../controller/clientsController');
const purchaseController = require('../controller/purchaseController');
const productsController = require('../controller/productsController');
const paymentController = require('../controller/paymentController');
const bullionController = require('../controller/bullionController');
const transactionController = require('../controller/transactionController');
const api = express.Router();

api.get('/',indexController.getIndex);
api.get('/clients',clientsController.getClients);
api.get('/clients/addClientsForm',clientsController.getClientsForm);
api.post('/clients/addClients',clientsController.addClients);
api.get('/purchase',purchaseController.getPurchase);
api.get('/purchase/addPurchase',purchaseController.addPurchaseForm);
api.post('/purchase/addPurchase',purchaseController.addPurchase);
api.get('/products',productsController.getProducts);
api.get('/products/addProductsForm',productsController.addProductsForm);
api.post('/products/addProducts',productsController.addProducts);
api.get('/payment',paymentController.getPayment);
api.get('/payment/addPaymentForm',paymentController.getPaymentForm);
api.get('/bullion',bullionController.getBullion);
api.get('/bullion/addBullionClientForm',bullionController.addBullionClientForm);
api.post('/bullion/addBullionClient',bullionController.addBullionClient);
api.get('/bullion/bullionTransactionForm',bullionController.addBullionTransactionForm);
api.post('/bullion/addBullionTransaction',bullionController.addBullionTransaction);
api.get('/transactions',transactionController.getTransactions);
api.post('/sales/addSales',transactionController.addSalesTransaction);

module.exports = api;