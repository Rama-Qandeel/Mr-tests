const connection = require("../db")

const addProduct = (req, res) => {
    const { store_id, item_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture } = req.body
    const data = [store_id, item_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture]
    const query = `INSERT INTO products (store_id,item_id,product_name,product_descripition,quantity_per_unit,unit_price,available_product,picture)
VALUES (?,?,?,?,?,?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const updateProduct = (req, res) => {
    const { store_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id } = req.body
    const data = [product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id]
    const query = `UPDATE products SET product_name=?,product_descripition=?,quantity_per_unit=?,
        unit_price=?,available_product=?,picture=? WHERE product_id=${product_id} `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getproducts = (req, res) => {
    const query = `SELECT * from products WHERE store_id=?`
    const data = [req.body.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getproductsByItem = (req, res) => {
    const query = `SELECT * from products WHERE item_id=?`
    const data = [req.body.item_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getproductsByStore = (req, res) => {
    const query = `SELECT * from products WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const deleteProduct = (req, res) => {
    const query = `DELETE FROM products WHERE product_id=?`
    const data = [req.params.product_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

//********************stores */
const addStore = (req, res) => {
    const { store_name, store_category, store_pic, user_id } = req.body
    const data = [store_name, store_category, store_pic, user_id]
    const query = `INSERT INTO store (store_name,store_category,store_pic,user_id)
    VALUES (?,?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const updateStore = (req, res) => {
    const { store_name, store_category, store_pic, store_id } = req.body
    const data = [store_name, store_category, store_pic]
    const query = `UPDATE store SET store_name=?,store_category=?,store_pic=? WHERE store_id=${store_id} `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getStores = (req, res) => {
    const query = `SELECT * from store WHERE user_id=? AND is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getStoresbyStoreId = (req, res) => {
    const query = `SELECT * from store WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const deleteStore = (req, res) => {
    const query = `UPDATE store 
    SET is_deleted=1
    WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const hardDeleteStore = (req, res) => {
    const query = `DELETE FROM store WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
//********************orders */

const createItem = (req, res) => {
    const { orders_id, product_id, total_price } = req.body
    const data = [orders_id, product_id, total_price]
    const query = `INSERT INTO items (orders_id,product_id,total_price)
    VALUES (?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getItems = (req, res) => {
    const query = `SELECT * from items WHERE orders_id=?`
    const data = [req.body.orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const deleteItem = (req, res) => {
    const query = `DELETE FROM items WHERE items_id=?`
    const data = [req.body.item_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }

        res.json(results)
    })
}

const createOrder = (req, res) => {
    const { user_id, delivary_user_id, store_id, item_id } = req.body
    const data = [user_id, delivary_user_id, store_id, item_id]
    const query = `INSERT INTO orders (user_id,delivary_user_id,store_id,item_id)
    VALUES (?,?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}



const getOrders = (req, res) => {
    const query = `SELECT * from orders WHERE user_id=? AND is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const deleteOrder = (req, res) => {
    const query = `DELETE FROM orders WHERE orders_id=?`
    const data = [req.params.order_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
// INNER JOIN store ON orders.store_id=store.store_id  
// INNER JOIN items ON orders.item_id=items.item_id
// INNER JOIN products ON items.item_id=products.item_id 
// products.product_name,,,store.store_name 
const ordersAndUsers = (req, res) => {
    const query =
        `SELECT orders.delivary_user_id, orders.user_id,store.store_name ,orders.item_id, orders.orders_id,users.first_name,
        users.last_name,orders.store_id   FROM orders 
     JOIN users ON orders.delivary_user_id=users.user_id 
     JOIN items ON orders.item_id=items.item_id
     JOIN store ON orders.store_id=store.store_id
    WHERE orders.user_id =?`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
// INNER JOIN products ON items.item_id=products.item_id 
//products.product_name

const getDelevarymanOrders = (req, res) => {
    const query =
        `SELECT orders.delivary_user_id, orders.user_id, orders.orders_id,users.first_name,
        users.last_name,orders.store_id ,orders.item_id,store.store_name   FROM orders 
     INNER JOIN users ON orders.delivary_user_id=users.user_id 
    INNER JOIN items ON orders.item_id=items.item_id
    INNER JOIN store ON orders.store_id=store.store_id  
    WHERE orders.delivary_user_id =?`
    const data = [req.params.delivary_user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const ordersAndStore = (req, res) => {
    const query =
        `SELECT products.product_name,orders.delivary_user_id, orders.user_id, orders.orders_id,users.first_name,
        users.last_name,orders.store_id ,orders.item_id,store.store_name   FROM store 
    INNER JOIN orders ON orders.store_id=store.store_id  
    INNER JOIN users ON orders.delivary_user_id=users.user_id 
    INNER JOIN items ON orders.item_id=items.item_id
    INNER JOIN products ON items.item_id=products.item_id 
    WHERE store.store_id =?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

module.exports = {
    addProduct, getproducts, deleteProduct, updateProduct, addStore, updateStore, getStores, deleteStore,
    createItem, deleteItem, createOrder, getItems, getOrders, deleteOrder, ordersAndUsers, getproductsByItem
    , getStoresbyStoreId, ordersAndStore, getproductsByStore, getDelevarymanOrders
}
