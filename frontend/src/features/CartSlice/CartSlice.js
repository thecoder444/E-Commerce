import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

export const saveCart = createAsyncThunk("cart/save", async(cartData) => {
    let token = localStorage.getItem("token")
    const response = await fetch("/api/cart/save", {
        method:"POST",
        headers:{"Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(cartData)
    });
    return await response.json();
})
export const fetchCart = createAsyncThunk("cart/fetch", async(userId) => {
    let token = localStorage.getItem("token")
    const response  = await fetch(`/api/cart/${userId}`, {
        method: "GET",
        headers:{"Content-Type":"application/json",
        Authorization:`Bearer ${token}`
        },
    })
    return await response.json()
})

const initialState = {
    cartItems:[],
    TotalPrice:0,
    TotalQuantity:0,
}

export const cartSlice =  createSlice({
    name:"Cart",
    initialState,
    reducers:{
        addToCart : (state, actions)=>{
            const find = state.cartItems.findIndex((value)=>{
                return value._id === actions.payload._id;
            })
            if(find != -1){
                state.cartItems[find] = {
                    ...state.cartItems[find], quantity:state.cartItems[find].quantity+1,
                }
            }else{
                state.cartItems.push({...actions.payload, quantity:1})
                toast.success("Item added to cart")

            }
        },

        deleteCartItems: (state, actions)=>{
            console.log(state)
            console.log(actions.payload)
            state.cartItems = state.cartItems.filter((value)=>{
               return value._id != actions.payload._id
            })
        }, 
        cartTotalPrice: (state) => {
            const {totalPrice, totalQuantity} = state.cartItems.reduce((cartTotal, cartItem)=>
                {
                const {quantity, productPrice} = cartItem;
                const itemsTotal = parseFloat(quantity)* parseFloat(productPrice)
                cartTotal.totalPrice += itemsTotal;
                cartTotal.totalQuantity += quantity;
                return cartTotal
            },{
                totalPrice:0,
                totalQuantity:0
            })
            state.TotalPrice = totalPrice.toFixed(2);
            state.TotalQuantity = totalQuantity;
        },
        IncrementQuantity: (state, actions)=>{
            state.cartItems = state.cartItems.map((item)=>{
                if(item._id === actions.payload._id){
                    return {...item, quantity:item.quantity+1}
                }
                return item;
            })
        },
        DecrementQuantity: (state, actions)=>{
            state.cartItems = state.cartItems.map((item)=>{
                if(item._id === actions.payload._id){
                    return {...item, quantity:item.quantity>1 ? item.quantity-1 : 1}
                }
                return item;
            })
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.fulfilled, (state, action) =>{
            console.log("Fetch complete", action.payload )
            state.cartItems = action.payload.cartItems || [];
            state.TotalPrice = action.payload.totalPrice || 0; 
            state.TotalQuantity = action.payload.totalQuantity || 0;
        });
        builder.addCase(saveCart.fulfilled, (state, action) => {
            console.log("Cart Save", action.payload);
            
        })
    }
})

export const {addToCart, deleteCartItems, cartTotalPrice, IncrementQuantity, DecrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;