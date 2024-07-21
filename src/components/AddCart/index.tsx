
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addItem, removeItem } from '@/store/cartSlice';

const AddCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

const addQuantity = (cartId:number,quantity:number) => {
    let item=cart.filter(el=>el.id==cartId)
    let itemObj=item[0]

    dispatch(addItem({...itemObj,quantity:quantity+1}));
  };
  const subtractQuantity=(cartId:number,quantity:number)=>{
    let item=cart.filter(el=>el.id==cartId)
    let itemObj=item[0]

    dispatch(addItem({...itemObj,quantity:quantity-1}));

  }
  const removeCart=(id:number)=>{
    dispatch(removeItem(id))
  }

  if (!cart) return <div className="w-full h-full flex justify-center items-center">No data ...</div>;
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cart.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-cover mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-500 mb-2">Price: ${product.price}</p>
            <div className='flex gap-4'>

            
            <div className="flex items-center mb-4">
              <button
                className="bg-gray-200 px-2 py-1 rounded-l"
                disabled={product.quantity<1}
                onClick={() =>subtractQuantity(product.id,product.quantity)}
                
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{product.quantity}</span>
              <button
                className="bg-gray-200 px-2 py-1 rounded-r"
                onClick={() =>addQuantity(product.id,product.quantity)}
                
              >
                +
              </button>
            </div>
            <div>
              <button className='bg-primary-default text-white px-2 py-1 rounded-md' onClick={()=>removeCart(product.id)}>Remove</button>
            </div>
            </div>
            <p className="text-gray-600">Total: ${product.total}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AddCart;
