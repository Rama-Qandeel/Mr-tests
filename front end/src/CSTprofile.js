import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import StoreProfile from './StoreProfile';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';

const CSTprofile = (props) => {
    const { id } = props.match.params
    const [userId, setUserId] = useState(id)
    const [Address, setAddress] = useState("")
    const [Farstname, setFarstname] = useState("")
    const [Lastname, setLastname] = useState("")
    const [doB, doBset] = useState("")
    const [email, setEmail] = useState("")
    const [userPic, setUserPic] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Info, setInfo] = useState()
    const [orders, setOrders] = useState([])
    const [stores, setStores] = useState([])
    const [storeId, setStoreId] = useState("storeid")
    const [userStore, setStore] = useState(["store"])
    const [isRedirect, setRedirect] = useState(false)
    const getUser = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/users/${infoArgumnt}`)
            .then(async (response) => {
                console.log("response", response)
                if (response.data.length === 0) {
                    alert("wrong user id")
                }
                setAddress(response.data[0].address)
                setFarstname(response.data[0].first_name)
                setLastname(response.data[0].last_name)
                doBset(response.data[0].birthday)
                setEmail(response.data[0].email)
                setUserPic(response.data[0].image_profile)
                setPhoneNumber(response.data[0].phone_number)
            })
            .catch((err) => {
                throw err
            });
    };

    const getOrdersInfo = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/usersOrders/${infoArgumnt}`)
            .then(async (response) => {
                setOrders(response.data)
            })
            .catch((err) => {
                throw err
            });
    };

    const getStores = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/store/${infoArgumnt}`)
            .then(async (response) => {
                setStores(response.data)
            })
            .catch((err) => {
                throw err
            });
    };
    const deleteStore = async (infoArgumnt) => {
        axios
            .delete(`http://localhost:5000/store/${infoArgumnt}`)
            .then(async (response) => {
                getStores(userId)
            })
            .catch((err) => {
                throw err
            });
    };

    const userOrders = orders.map((e, index) =>
        <li className="list-group-item list-group-item-action" num={index + 1} key={index}>
            <div>
                <div className="bg-info" >orders_id   :  {e.orders_id} </div>
                <div>delivary name  : {e.first_name} {e.last_name}</div>
                <div>product name  :  {e.product_name} </div>
                <div>store name  :  {e.store_name} </div>
                <div>item id  :  {e.item_id} </div>
            </div>
        </li>
    )
    const userStores = stores.map((e, index) =>
        <li className="list-group-item list-group-item-action" num={index + 1} key={index}>
            <button onClick={() => deleteStore(e.store_id)}>d</button>
            <Link to={{ pathname: `/store/${e.store_id}` }}>
                <div onClick={() => { setStoreId(e.store_id); setRedirect(true) }}  >
                    <div>store name :   {e.store_name} </div>
                    <div className="bg-info" >store id :   {e.store_id}
                    </div>
                    <div>store category :   {e.store_category} </div>
                    <div><img src={e.store_pic} alt="store pic" className="pPic"></img> </div>
                </div>
            </Link>
        </li>
    )
    useEffect(() => {
        getOrdersInfo(userId); getUser(userId); getStores(userId)
    }, [])
    return (
        <Router>
            <div className="container">
                <h1 className="navbar navbar-dark bg-primary">{Farstname} profile</h1>
                <div className="row">
                    <div className="col list-group">
                        <img src={userPic} alt="profile pic" className="pPic row rounded mx-auto d-block"></img>
                        <p className="list-group-item list-group-item-action">Address    :   {Address}</p>
                        <p className="list-group-item list-group-item-action">First name : {Farstname}</p>
                        <p className="list-group-item list-group-item-action">Last name:{Lastname}</p>
                        <p className="list-group-item list-group-item-action">birthday   :   {doB}</p>
                        <p className="list-group-item list-group-item-action">email   :  {email}</p>
                        <p className="list-group-item list-group-item-action"> Phone Number  :  {PhoneNumber}</p>
                    </div>
                    <div className="col list-group">
                        <ul>
                            <p class="thead-dark display-3">{Farstname} orders</p>
                            {userOrders}
                        </ul>
                    </div>
                    <div className="col list-group">
                        <ul>
                            <p className="thead-dark display-3">{Farstname} stores</p>
                            {userStores}
                        </ul>
                    </div>
                </div>
            </div>
        </Router>
    )
}
export default CSTprofile
