import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
const Cart = (props) => {
  const [orderList, setOrderList] = useState([]);
  const[quantity,setQuantity]=useState(1)
  const[order,setOrderId]=useState("")

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = { user_id: user.user_id };
    axios
      .get(`http://localhost:5000/getorder/${user.user_id}`)
      .then((response) => {
        // console.log('response',response,data);
        setOrderList(response.data);
        
      })
      .catch((error) => {
        throw error;
      });
  };

const deleteOrder=(e)=>{
// console.log('props',e.target.value);

  const data={
    orders_id:e.target.value
}
  axios.delete(`http://localhost:5000/order/${e.target.value}`)
  .then((response)=>{
  // console.log('response',response.data);
  getOrders();
  }).catch((error) => {
    throw error;
  });
  
}
const updateOrder=(e)=>{
  // console.log('props',e.target.value);
    const data={
      quantity,
    orders_id:e.target.value
  }
      axios.put(`http://localhost:5000/order`,data)
    .then((response)=>{
    // console.log('response',response.data);
    getOrders();
    }).catch((error) => {
      throw error;
    });
    
  }





let render=orderList.map((product)=>{
  return  <div>
<div className="order">
<img src={product.picture}/>
<p>{product.product_name}</p>
<p>quantity:
<input type="text" value={product.quantity}  
style={{ width:"20px" }}/>
</p>
<p>price:{product.price}JD</p>
<button onClick={deleteOrder} value={product.orders_id}>Remove</button>
</div>
    </div>
})

 
  return (
    <div>
  {render}

    </div>
  )
}

export default Cart;
