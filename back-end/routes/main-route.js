const express = require('express');
const mainRouter = express.Router();
const { addProduct, getproducts,updateOrder, deleteProduct, updateProduct, addStore, updateStore, getStores, deleteStore,
  createItem, deleteItem, createOrder, getItems, getOrders,deleteOrder,getAllStores,specificStores,getCategory,getSroreById ,getStoreCategory,searchProduct} = require("../controllers/main-controller")
const { register, getAllUsers, login } = require("../controllers/users_controller")

mainRouter.post('/product', addProduct);
mainRouter.get('/getstorecategory', getStoreCategory);

mainRouter.get('/getsearch', searchProduct);
mainRouter.get('/getcategory', getCategory);
mainRouter.get('/getstore/:user_id', getSroreById);
mainRouter.post('/getproduct', getproducts);
mainRouter.delete('/product', deleteProduct);
mainRouter.put('/product', updateProduct);
 
mainRouter.post('/store', addStore);
mainRouter.put('/store', updateStore);
mainRouter.get('/store', getStores);
mainRouter.get('/allstore', getAllStores);
mainRouter.post('/specificstore', specificStores);  
  
mainRouter.delete('/store', deleteStore);

mainRouter.post('/order', createOrder);
mainRouter.put('/order', updateOrder);
mainRouter.get('/getorder/:user_id', getOrders);
mainRouter.delete('/order/:orders_id', deleteOrder);

mainRouter.post('/item', createItem);
mainRouter.get('/item', getItems);
mainRouter.delete('/item', deleteItem);

mainRouter.post('/register', register);
mainRouter.post('/login', login);
mainRouter.get('/users', getAllUsers);

 
module.exports = mainRouter;
