import React, { Component, useState, useEffect  } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';

const DelivaryProfile = (props)=> {

    const { id } = props.match.params
    const [DelevaryId, setDelevaryId] = useState(id)
    const [Address, setAddress] = useState("")
    const [Farstname, setFarstname] = useState("")
    const [Lastname, setLastname] = useState("")
    const [doB, doBset] = useState("")
    const [email, setEmail] = useState("")
    const [userPic, setUserPic] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [PastOrders, setPastOrders] = useState([])

    const getDelevaryUser = async (infoArgumnt) => {
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
    const pastOrdersInfo = async (infoArgumnt) => {
        axios
            .get(`http://localhost:5000/delvarymanOrders/${infoArgumnt}`)
            .then(async (response) => {
                console.log("response.data",response.data);
                setPastOrders(response.data)
            })
            .catch((err) => {
                throw err
            });
    };
    const delvaredOrders = PastOrders.map((e, index) =>
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
    useEffect(()=>{getDelevaryUser(DelevaryId);  pastOrdersInfo(DelevaryId)},[])
    return (
      <div>
          <h1 className="p-3 mb-2 bg-success text-white">{Farstname}'s DelivaryProfile</h1>
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
                    </div>
                    <div>
                        <ul>
                            {delvaredOrders}
                        </ul>
                    </div>
      </div>
    )
  }

export default DelivaryProfile
