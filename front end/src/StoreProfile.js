import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
// import Drawer from 'react-drag-drawer';
import "./App.css"

// import  'bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';




const StoreProfile = (props) => {
    const { id } = props.match.params
    const [userStore, setStore] = useState(["store"])
    const [storeId, setStoreId] = useState(id)
    const [storeOrders, setStoreOrder] = useState([])
    const [storeProducts, setStoreProducts] = useState([])
    const [productName, setproductName] = useState()
    const [productDescripition, setProductDescripition] = useState()
    const [quantityPerUnit, setQuantityPerUnit] = useState()
    const [unitPrice, setPrice] = useState()
    const [availableProduct, setAvailableProduct] = useState()
    const [Picture, setPicture] = useState()
    const [update, setUpdate] = useState(false)

    const getStorebyid = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/mystore/${infoArgumnt}`)
            .then(async (response) => {
                setStore(response.data[0])
            })
            .catch((err) => {
                throw err
            });
    };
    const storesOrdersbyid = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/storesOrders/${infoArgumnt}`)
            .then(async (response) => {
                setStoreOrder(response.data)
                console.log("response.data 1",response.data);

            })
            .catch((err) => {
                throw err
            });
    };
    const storesProductbyid = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/storeproducts/${infoArgumnt}`)
            .then(async (response) => {
                setStoreProducts(response.data)
                console.log("response.data",response.data);
            })
            .catch((err) => {
                throw err
            });
    };

    const deleteProduct = async (infoArgumnt) => {
        axios
            .delete(`http://localhost:5000/product/${infoArgumnt}`)
            .then(async (response) => {
                storesProductbyid(storeId)
            })
            .catch((err) => {
                throw err
            });
    };

    const updateProduct = async (infoArgumnt) => {
        const arrData = {
            product_id: infoArgumnt, product_name: productName, product_descripition: productDescripition, quantity_per_unit: quantityPerUnit,
            unit_price: unitPrice, available_product: availableProduct, picture: Picture
        }
        axios
            .put(`http://localhost:5000/product`, arrData)
            .then(async (response) => {

                storesProductbyid(storeId)
            })
            .catch((err) => {
                throw err
            });
    };

    const storeOrdersList = storeOrders.map((e, index) =>
        <li className="list-group-item list-group-item-action" num={index + 1} key={index}>
            <div>
                <div className="bg-info" >order number   :  {index + 1} </div>
                <div className="bg-info" >order id   :  {e.orders_id} </div>
                <div>delivary name  : {e.first_name} {e.last_name}</div>
                <div>product name  :  {e.product_name} </div>
                <div>store name  :  {e.store_name} </div>
                <div>item id  :  {e.item_id} </div>
            </div>
        </li>
    )
    
    const storeProductsList = storeProducts.map((e, index) =>
        <li className="list-group-item list-group-item-action" num={index + 1} key={index}>
            <div>
                <div className="bg-info" >product number   :  {index + 1}
                <div className="bg-info" >product_id   :  {e.product_id} </div>
                <div className="d-flex justify-content-end" >
                    <button className="btn btn-outline-light" onClick={() => deleteProduct(e.product_id)} >d</button>
                <Popup trigger={<button className="btn btn-outline-light" > u</button>} position="left center">
                    <div>
                        <p><input onChange={(e) => setproductName(e.target.value)} placeholder="insert new products Name" /></p>
                        <p><input onChange={(e) => setProductDescripition(e.target.value)} placeholder="insert new products Descripition" /></p>
                        <p><input onChange={(e) => setQuantityPerUnit(e.target.value)} placeholder="insert new products QuantityPerUnit" /></p>
                        <p><input onChange={(e) => setPrice(e.target.value)} placeholder="insert new products Price" /></p>
                        <p><input onChange={(e) => setAvailableProduct(e.target.value)} placeholder="insert new products available value" /></p>
                        <p><input onChange={(e) => setPicture(e.target.value)} placeholder="insert new products Picture" /></p>
                        <button className="btn btn-primary" onClick={() => updateProduct(e.product_id)} >u</button>
                    </div>
                </Popup>
                </div>
                </div>
                <div>product name  : {e.product_name}</div>
                <div>product descripition  :  {e.product_descripition}</div>
                <div>price :  {e.unit_price}</div>
                <div>available product :  {e.available_product}</div>
                <div>quantity per unit product :  {e.quantity_per_unit} </div>
                <img src={e.picture} alt="product pic" className="pPic rounded mx-auto d-block" ></img>
            </div>
        </li >
    )
    useEffect(() => {
        getStorebyid(storeId); storesOrdersbyid(storeId);
        storesProductbyid(storeId);
    }, [])
    return (
        <Router>
            <div>
                <div className="list-group-item list-group-item-action">
                    <h1 className="bg-info" >store id :{userStore.store_id}</h1>
                    <div>store name :   {userStore.store_name} </div>
                    <div>store category :   {userStore.store_category} </div>
                    <div><img src={userStore.store_pic} alt="store pic" className="pPic"></img> </div>
                </div>
                <div>
                    <p><input onChange={(e) => setproductName(e.target.value)} placeholder="insert new products Name" /></p>
                    <p><input onChange={(e) => setProductDescripition(e.target.value)} placeholder="insert new products Descripition" /></p>
                    <p><input onChange={(e) => setQuantityPerUnit(e.target.value)} placeholder="insert new products QuantityPerUnit" /></p>
                    <p><input onChange={(e) => setPrice(e.target.value)} placeholder="insert new products Price" /></p>
                    <p><input onChange={(e) => setAvailableProduct(e.target.value)} placeholder="insert new products available value" /></p>
                    <p><input onChange={(e) => setPicture(e.target.value)} placeholder="insert new products Picture" /></p>
                </div>
                <div>
                    <ul>
                        {storeOrdersList}
                    </ul>
                </div>
                <div>
                    <ul>
                        {storeProductsList}
                    </ul>
                </div>

            </div>
        </Router>
    )
}


export default StoreProfile