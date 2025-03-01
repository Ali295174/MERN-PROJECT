import { createSlice } from "@reduxjs/toolkit";

const localStatefromlocalStorage = () => {
  try {
    const cartData = window.localStorage.getItem("cart");
    if (cartData == null) {
      return {
        items: [],
      };
    } 
    //Parse the JSON data from local storage and return it as an object.
    return JSON.parse(cartData);

  } catch (error) {
     
    console.log("Error while loading cart", error)
    return {
      items: [],
    };
  }
};

const saveDataintolocalStorage = (state)=>{
    try {
        const cartData= JSON.stringify(state);
        window.localStorage.setItem("cart",cartData);
    } catch (error) {
        console.log("Error while saving cart", error);
        
    }
}



export const cartSlice = createSlice({
  name: "cart",
  initialState: localStatefromlocalStorage(),
  reducers: {
     addtoCart : (state,action)=>{
        const item = action.payload;
        const existingItem = state.items.find((i) => 
         i.productId == item.productId );

        if (existingItem){
            existingItem.quantity += item.quantity;
        }
            else{
                state.items.push(item)
        } 
        saveDataintolocalStorage(state);
          
    },
    removeFromCart : (state,action)=>{
        const itemId = action.payload;
        state.items = state.items.filter((i) => i.productId !== itemId.productId);
        saveDataintolocalStorage(state);
    },
    updateCart: (state, action) => {
        const {productId, quantity} = action.payload;
        const  existingItem = state.items.find((i)=>
            i.productId == productId);

        if(existingItem){
            existingItem.quantity = quantity;
        }
        saveDataintolocalStorage(state);
       
    }
},



}


);

export const{addtoCart, removeFromCart, updateCart} = cartSlice.actions;

export default cartSlice.reducer;
