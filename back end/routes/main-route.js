const express = require('express');
const mainRouter = express.Router();
const { addProduct, getproducts,getproductsByStore, deleteProduct, updateProduct, addStore, updateStore,getStoresbyStoreId, getStores, deleteStore,
  createItem, deleteItem, createOrder, getItems, getOrders ,deleteOrder,ordersAndUsers,ordersAndStore,
  getDelevarymanOrders,getproductsByItem} = require("../controllers/main-controller")
const { register, getAllUsers, login ,getUserById,} = require("../controllers/users_controller")

mainRouter.post('/product', addProduct);
mainRouter.get('/product', getproducts);
mainRouter.delete('/product/:product_id', deleteProduct);
mainRouter.put('/product', updateProduct);
mainRouter.get('/product/:item_id', getproductsByItem);
mainRouter.get('/storeproducts/:store_id', getproductsByStore);

mainRouter.post('/store', addStore);
mainRouter.put('/store', updateStore);
mainRouter.get('/store/:user_id', getStores);
mainRouter.get('/mystore/:store_id', getStoresbyStoreId);
mainRouter.delete('/store/:store_id', deleteStore);

mainRouter.post('/order', createOrder);
mainRouter.get('/order/:user_id', getOrders);
mainRouter.get('/delvarymanOrders/:delivary_user_id', getDelevarymanOrders);
mainRouter.delete('/order/:order_id', deleteOrder);

mainRouter.post('/item', createItem);
mainRouter.get('/item', getItems);
mainRouter.delete('/item', deleteItem);

mainRouter.post('/register', register);
mainRouter.post('/login', login);
mainRouter.get('/users', getAllUsers);
mainRouter.get('/users/:user_id', getUserById);

mainRouter.get('/usersOrders/:user_id', ordersAndUsers);
mainRouter.get('/storesOrders/:store_id', ordersAndStore);


module.exports = mainRouter;
