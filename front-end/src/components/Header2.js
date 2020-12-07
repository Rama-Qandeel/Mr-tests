import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import AddStore from "./AddStore";
import AddProduct from "./AddProduct";



const Header = (props) => {
 const[add,setAdd]=useState(true)
  
//   const auth=()=>{
//     const user = jwt_decode(localStorage.getItem("token"));
// if(user.user_id===3){
//   setAdd(true)
// }
//   } 
  
  
//   useEffect(() => {
//     auth();
  
//   }, []);
  
  
  
  return (
    <div className="container">
      <nav className=" navheader">
        <div className="">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>

       <li id="dropdown">
         <a>Account</a>
        <div id="select">
            <a href="/Account">My Account</a>
            {add?(<div> <Popup modal trigger={
            <a >Add Store</a>
            }>
           {close =>  <AddStore  close={close}  {...props}/>}
      </Popup>
           
      <Popup modal trigger={
           <a>Add Product</a>
          }>
        {close =>  <AddProduct close={close}  {...props}/>}
      </Popup></div>):(<a >Log Out </a>)}
            
           
       
        </div>
        
        
        </li>  
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;