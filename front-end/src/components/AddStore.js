import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AddStore = ({ close, ...props }) => {
  const [nameStore, setNameStore] = useState("");
  const [pictureStore, setPictureStore] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [address, setAddress] = useState("");
  const [ getStoreCategory, setGetStoreCategory] = useState([]);

  useEffect(() => {
    getstoreCategory();
  
  }, []);
  
  
 
  const getstoreCategory=()=>{
    axios
    .get("http://localhost:5000/getstorecategory")
    .then((response) => {
      setGetStoreCategory(response.data)
    })
    .catch((error) => {
      throw error;
    });
    
  }
  const handleChange = (event) => {
    if (event.target.name === "name store") {
      setNameStore(event.target.value);
    }
    if (event.target.name === "picture store") {
      setPictureStore(event.target.value);
    }
    if (event.target.name === "address") {
      setAddress(event.target.value);
    }
    if (event.target.name === "store category") {
      setStoreCategory(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    // console.log(props);

    const user = jwt_decode(localStorage.getItem("token"));
    const data = {
      user_id: user.user_id,
      store_name: nameStore,
      store_pic: pictureStore,
      address: address,
      store_category: storeCategory,
    };
    axios
      .post("http://localhost:5000/store", data)
      .then((response) => {
        if (response.data) {
          props.history.push("/home");
          alert("create a store");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="modal">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="header">
        <div>
          <label htmlFor="name store"> Name Store : </label>
          <input
            type="text"
            name="name store"
            placeholder="Enter your name store"
            value={nameStore}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="picture"> Picture : </label>
          <input
            type="text"
            name="picture store"
            placeholder="Enter picture store"
            value={pictureStore}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
          <label htmlFor="store category"> Store Category : </label>
          <input
            type="text"
            name="store category"
            placeholder="Enter store category"
            value={storeCategory}
            onChange={handleChange}
            required
          />
        </div> */}
<div>
          <label htmlFor="category"> Store Category : </label>
          <select name="store category" id="store category" onClick={handleChange}>
          <option value="none" selected="selected"> Choose One </option>
          {getStoreCategory.map((e, key) => {
        return <option key={key} value={e.store_category}>{e.store_category}</option>;
    })}
          </select>
          </div>
        <div>
          <label htmlFor="address"> Address : </label>
          <input
            type="text"
            name="address"
            placeholder="Enter store adrdress"
            value={address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Add Store</button>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
