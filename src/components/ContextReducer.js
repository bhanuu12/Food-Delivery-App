// contextreducer.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }];
        // Add more cases as needed
        case 'REMOVE':
            let ar=[...state]
            ar.splice(action.index,1)
            return ar
        case 'UPDATE':
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
                return arr
            })
            return arr;
        case 'DROP':
            return []

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Log the state whenever it changes
    useEffect(() => {
        console.log("Cart state updated:", state);
    }, [state]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};

export const useCartState = () => useContext(StateContext);
export const useCartDispatch = () => useContext(DispatchContext);
