import React,{useState,useEffect} from "react";
import jwt_decode from 'jwt-decode';
import axios from "axios";


const Content =({ close,...props})=>{
const[quantity,setQuantity]=useState(1)
const[orderList,setOrderList]=useState([])
const {
  available_product,
  discount_available,
  picture,
  product_category_id,
  product_descripition,
  product_id,
  product_name,
  quantity_per_unit,
  store_id,
  unit_price,
} = props.data;



const addToCart=()=>{
  const user = jwt_decode(localStorage.getItem("token"))
const data={
  user_id:user.user_id,
  delivary_user_id:0,
  store_id,
  product_id,
  product_name,
  price:unit_price*quantity,
  quantity:quantity,
  picture:picture
}
axios.post("http://localhost:5000/order",data)
.then((response)=>{
console.log('response',response.data);

}).catch((error) => {
  throw error;
});
}

const getOrders =async () => {
  const user = jwt_decode(localStorage.getItem("token"))
  let data = { user_id:user.user_id};
 axios
    .get(`http://localhost:5000/getorder/${user.user_id}`)
    .then(( response) => {
      // console.log('response',response,data);
      setOrderList(response.data);

    })
    .catch((error) => {
      throw error;
    });
   
        
};

  
  
 
  useEffect(() => {
    // getOrders();
    
  },[])
   
const IncrementItem = () => {
  setQuantity(quantity+1)
}

const DecreaseItem = () => {
  if(quantity!==0){
  setQuantity(quantity-1)
  }
}

const r=orderList.map((order)=>{
  
})

  
  
  return(
<div className="modal">
     <a className="close" onClick={close}>
       &times;
    </a>
     <div className="header"> {product_name} </div>
   <div className="content">
   <img className="img-popup" src={picture} alt={product_name} />
    <div className="info-popup">
   <h2>{product_name}</h2> 
   <p>{product_descripition}</p> 
  <p>{unit_price} {quantity_per_unit}</p>
   <p>Quantity:</p>
   <input type="text" name="partridge"  value={quantity}/>
   <button onClick={IncrementItem}>+</button>
    <button onClick={DecreaseItem}>-</button>

<div> <button onClick={addToCart}>Add to Cart</button></div>
    </div>
   
    </div>
  </div>
)
}

export default Content;
