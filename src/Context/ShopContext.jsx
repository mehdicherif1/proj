import React, { createContext, useState } from "react";
import all_product from "../component/Assets/all_product";
import CartItems from "../component/CartItems/CartItems";

export const ShopContext = createContext(null);

const getdefaultcart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index]=0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const[cartItems,setcartItems] = useState(getdefaultcart());

    const addToCart =(itemId) =>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }
    const removefromCart = (itemId) => {
        if (cartItems[itemId] === 1) {
            const { [itemId]: removedItem, ...rest } = cartItems;
            setcartItems(rest);
        } else if (cartItems[itemId] > 1) {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId of Object.keys(cartItems)) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = all_product.find(product => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * quantity;
                } else {
                    console.error(`Product with ID ${itemId} not found.`);
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]; // Utilisation de l'opérateur d'addition +=
            }
        }
        return totalItem;
    };

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removefromCart}
     
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;